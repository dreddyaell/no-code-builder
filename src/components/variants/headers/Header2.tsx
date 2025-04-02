"use client";

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
}

export default function Header2({
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  updateItemPosition,
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

  const DraggableItem = ({ item }: { item: HeaderItem }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id });

    const wrapperStyle = {
      position: "absolute" as const,
      left: transform ? item.x + transform.x : item.x,
      top: transform ? item.y + transform.y : item.y,
    };

    const boxStyle = {
      width: item.width,
      height: item.height,
      fontSize: item.fontSize,
      fontFamily: item.fontFamily,
      color: item.textColor,
      backgroundColor: "transparent", // 🟣 transparant!
      padding: "8px",
      textAlign: "center" as const,
      zIndex: 10,
      border: "2px dashed rgba(255,255,255,0.4)", // subtiele witte rand
      borderRadius: "8px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.2)", // leesbaarheid
    };

    return (
      <div style={wrapperStyle}>
        {/* Drag handle links */}
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="w-6 h-6 flex justify-center items-center text-black text-lg font-extrabold cursor-grab absolute -left-8 top-2 rounded bg-white border border-gray-300 shadow hover:bg-gray-100"
        >
          ⋮
        </div>

        <div style={boxStyle}>
          {item.type === "text" ? (
            <div>{item.content}</div>
          ) : (
            <img
              src={item.content}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          )}
          <div className="flex gap-2 mt-2 justify-center">
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
  };

  return (
    <header className="relative w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-6 min-h-[200px] px-8 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Image src={logoUrl || "/logo.png"} alt="Logo" width={100} height={60} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
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
          <DraggableItem key={item.id} item={item} />
        ))}
      </DndContext>
    </header>
  );
}
