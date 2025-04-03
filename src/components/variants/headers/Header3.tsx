"use client";

import { HeaderItem } from "@/components/variants/types";
import { useRef } from "react";
import Image from "next/image";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
} from "@dnd-kit/core";

interface Header3Props {
  items: HeaderItem[];
  logoUrl: string;
  setLogoUrl?: (url: string) => void;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  previewMode?: boolean;
}

function DraggableHeaderItem({
  item,
  onEdit,
  onDelete,
  updateItemPosition,
  previewMode,
}: {
  item: HeaderItem;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  previewMode?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id });

  const style: React.CSSProperties = {
    position: "absolute",
    left: transform ? item.x + transform.x : item.x,
    top: transform ? item.y + transform.y : item.y,
    width: item.width,
    height: item.height,
    zIndex: 50,
    pointerEvents: previewMode ? "none" : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="relative w-full h-full">
        {!previewMode && (
          <div {...listeners} {...attributes} className="absolute left-0 top-0 text-sm cursor-move px-1">
            ⠿
          </div>
        )}

        {item.type === "text" ? (
          <div
            style={{
              fontSize: item.fontSize,
              fontFamily: item.fontFamily,
              color: item.textColor,
              backgroundColor: "transparent",
            }}
            className="w-full h-full flex items-center justify-center text-center"
          >
            {item.content}
          </div>
        ) : (
          <img
            src={item.content}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}

        {!previewMode && (
          <div className="flex justify-center gap-1 mt-1">
            <button
              onClick={() => onEdit?.(item)}
              className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete?.(item.id)}
              className="bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              ❌
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Header3({
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  updateItemPosition,
  previewMode,
}: Header3Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && setLogoUrl) {
        setLogoUrl(reader.result as string);
        localStorage.setItem("logoUrl", reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;
    const item = items.find((i) => i.id === id);
    if (!item || !updateItemPosition) return;
    updateItemPosition(id, item.x + delta.x, item.y + delta.y);
  };

  return (
    <header className="relative w-full bg-black text-white min-h-[180px] flex items-center justify-between px-10 py-6">
      {/* ◾ Logo & Naam */}
      <div className="flex items-center gap-4">
        <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Image src={logoUrl || "/logo.png"} alt="Logo" width={80} height={60} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-wide">NoCode Studio</h1>
      </div>

      {/* ◾ Navigatie */}
      <nav className="hidden md:flex gap-6 text-sm uppercase font-medium">
        <a href="#" className="hover:underline">Product</a>
        <a href="#" className="hover:underline">Features</a>
        <a href="#" className="hover:underline">Pricing</a>
        <a href="#" className="hover:underline">Docs</a>
      </nav>

      {/* ◾ Drag & Drop Items */}
      <DndContext onDragEnd={handleDragEnd}>
        {items.map((item) => (
          <DraggableHeaderItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            updateItemPosition={updateItemPosition}
            previewMode={previewMode}
          />
        ))}
      </DndContext>
    </header>
  );
}
