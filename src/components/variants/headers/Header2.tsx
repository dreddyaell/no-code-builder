"use client";
import React from "react";
import { useRef } from "react";
import Image from "next/image";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { HeaderItem } from "@/components/variants/types";

interface Header2Props {
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
    zIndex: 10,
    cursor: previewMode ? "default" : "move",
    pointerEvents: previewMode ? "none" : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className="relative w-full h-full text-center px-1"
        style={{ backgroundColor: "transparent" }}
      >
        {!previewMode && (
          <div
            {...attributes}
            {...listeners}
            className="absolute left-0 top-1/2 -translate-y-1/2 px-1 text-sm text-gray-900 cursor-move z-20"
          >
            ⠿
          </div>
        )}

        {/* Content */}
        <div className="w-full h-full flex items-center justify-center">
          {item.type === "text" ? (
            <div
              style={{
                fontSize: item.fontSize,
                fontFamily: item.fontFamily,
                color: item.textColor,
                backgroundColor: "transparent",
              }}
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
        </div>

        {/* Edit/Delete buttons */}
        {!previewMode && (
          <div className="flex gap-1 mt-1 justify-center">
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
    </div>
  );
}

export default function Header2({
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  updateItemPosition,
  previewMode,
}: Header2Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;
    const item = items.find((i) => i.id === id);
    if (!item || !updateItemPosition) return;
    updateItemPosition(id, item.x + delta.x, item.y + delta.y);
  };

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

  return (
    <header className="relative w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 min-h-[200px] px-8 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Image src={logoUrl || "/logo.png"} alt="Logo" width={100} height={60} />
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
        </div>

        <div className="space-x-4 text-sm">
          <a href="#" className="hover:underline">Over ons</a>
          <a href="#" className="hover:underline">Team</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        <button className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
          Aanmelden
        </button>
      </div>

      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold tracking-wider">✨ Welkom bij No-Code Builder ✨</h1>
        <p className="mt-1 text-sm text-white/90">Bouw je eigen pagina zonder één regel code!</p>
      </div>

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
