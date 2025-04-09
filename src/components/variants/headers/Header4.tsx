"use client";
import React from "react";
import { HeaderItem } from "@/components/variants/types";
import { useRef } from "react";
import Image from "next/image";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";

interface Header4Props {
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
          <div {...listeners} {...attributes} className="absolute top-0 left-0 text-xs px-1 cursor-move z-20">
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

export default function Header4({
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  updateItemPosition,
  previewMode,
}: Header4Props) {
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
    <header className="relative w-full min-h-[220px] bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-300 overflow-visible text-white">
      {/* 🔵 Background shapes */}
      <div className="absolute top-[-40px] left-[-40px] w-[200px] h-[200px] bg-pink-300 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute top-10 right-[-60px] w-[250px] h-[250px] bg-purple-400 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] bg-yellow-400 opacity-30 rounded-full blur-3xl z-0" />

      {/* Header Content */}
      <div className="relative z-10 flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-6">
          <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
            <Image src={logoUrl || "/logo.png"} alt="Logo" width={90} height={60} />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="text-2xl font-extrabold tracking-widest drop-shadow-md">
            SparkFusion
          </div>
        </div>

        <div className="flex gap-4 text-sm font-semibold">
          <a href="#" className="hover:underline">Features</a>
          <a href="#" className="hover:underline">Integraties</a>
          <a href="#" className="hover:underline">Support</a>
          <button className="ml-4 bg-white text-pink-600 px-4 py-2 rounded-full shadow hover:bg-gray-100">
            Start Gratis
          </button>
        </div>
      </div>

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
