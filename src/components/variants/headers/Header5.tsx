"use client";
import React from "react";
import { useRef } from "react";
import Image from "next/image";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { HeaderItem } from "@/components/variants/types";

interface Header5Props {
  items: HeaderItem[];
  logoUrl: string;
  setLogoUrl?: (url: string) => void;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  previewMode?: boolean;
}

function DraggableItem({
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
    fontSize: item.fontSize,
    fontFamily: item.fontFamily,
    color: item.textColor,
    backgroundColor: "transparent",
    textAlign: "center",
    cursor: previewMode ? "default" : "move",
    zIndex: 50,
    pointerEvents: previewMode ? "none" : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {!previewMode && (
        <div
          {...listeners}
          {...attributes}
          className="cursor-move absolute -left-4 top-1/2 -translate-y-1/2 z-20 text-xl select-none"
        >
          ⠿
        </div>
      )}

      {item.type === "text" ? (
        <div>{item.content}</div>
      ) : (
        <img src={item.content} alt="" className="w-full h-full object-contain" />
      )}

      {!previewMode && (
        <div className="flex gap-1 justify-center mt-1">
          <button
            onClick={() => onEdit?.(item)}
            className="text-xs bg-yellow-500 text-white px-2 py-1 rounded"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete?.(item.id)}
            className="text-xs bg-red-600 text-white px-2 py-1 rounded"
          >
            ❌
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header5({
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  updateItemPosition,
  previewMode,
}: Header5Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <header className="relative w-full min-h-[220px] bg-gradient-to-br from-pink-400 via-indigo-500 to-blue-500 text-white overflow-visible">
      <div className="flex items-center justify-between px-8 py-6 relative z-10">
        <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
          <Image src={logoUrl || "/logo.png"} alt="Logo" width={100} height={60} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
          />
        </div>

        <nav className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:underline">Producten</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Support</a>
        </nav>

        <button className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
          Registreren
        </button>
      </div>

      <div className="absolute inset-0 bg-black/20 z-0" />

      <DndContext onDragEnd={handleDragEnd}>
        {items.map((item) => (
          <DraggableItem
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
