"use client";

import { HeaderItem } from "@/components/variants/types";
import Image from "next/image";
import { useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
} from "@dnd-kit/core";

interface Header1Props {
  items: HeaderItem[];
  logoUrl: string;
  setLogoUrl?: (url: string) => void;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
}

function DraggableHeaderItem({
  item,
  onEdit,
  onDelete,
  updateItemPosition,
}: {
  item: HeaderItem;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id });

  const style: React.CSSProperties = {
    position: "absolute",
    left: transform ? item.x + transform.x : item.x,
    top: transform ? item.y + transform.y : item.y,
    width: item.width,
    height: item.height,
    zIndex: 10,
  };

  return (
    <div ref={setNodeRef} style={style} className="pointer-events-auto">
      <div className="relative w-full h-full bg-white p-1 text-center">
        {/* ⠿ Drag Handle */}
        <div {...listeners} {...attributes} className="cursor-move absolute top-0 left-0 px-2 py-1 z-10">
          ⠿
        </div>

        {/* Content */}
        {item.type === "text" ? (
          <div
            style={{
              fontSize: item.fontSize,
              fontFamily: item.fontFamily,
              color: item.textColor,
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

        {/* Bewerken / Verwijderen */}
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
      </div>
    </div>
  );
}


export default function Header1({
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  updateItemPosition,
}: Header1Props) {
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
    <header className="w-full border-b border-gray-300 bg-white relative min-h-[150px]">
      <div className="grid grid-cols-3 items-center px-6 py-2 text-sm text-gray-700">
        <div className="flex items-center gap-6">
          <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Image
              src={logoUrl || "/logo.png"}
              alt="Logo"
              width={80}
              height={50}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <nav className="flex gap-4">
            <a href="#">Downloads</a>
            <a href="#">Nieuws</a>
            <a href="#">Evenementen</a>
          </nav>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center border-b border-gray-400">
            <input
              type="text"
              placeholder="Zoek op trefwoord"
              className="p-1 text-sm outline-none text-gray-800"
            />
            <button className="text-teal-500 text-xl pl-2">🔍</button>
          </div>
        </div>
        <div className="flex justify-end items-center gap-2 text-sm">
          <Image src="/icons/nl-flag.png" alt="NL" width={20} height={14} />
          <span>NL</span>
          <a href="#">Extranet</a>
          <a href="#">WinWeb</a>
          <a href="#">Partner-portaal</a>
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
          />
        ))}
      </DndContext>

    </header>
  );
}
