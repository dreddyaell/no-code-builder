"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { HeaderItem } from "@/components/variants/types";

export interface BaseHeaderProps {
  items: HeaderItem[];
  logoUrl: string;
  setLogoUrl?: (url: string) => void;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  renderLayout: (
    logo: React.ReactNode,
    nav: React.ReactNode,
    content: React.ReactNode
  ) => React.ReactNode;
}

export default function BaseHeader({
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  updateItemPosition,
  renderLayout,
}: BaseHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;
    const item = items.find((i) => i.id === id);
    if (!item || !updateItemPosition) return;
    updateItemPosition(id, item.x + delta.x, item.y + delta.y);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: item.id,
    });

    const style: React.CSSProperties = {
      position: "absolute",
      left: transform ? item.x + transform.x : item.x,
      top: transform ? item.y + transform.y : item.y,
      width: item.width,
      height: item.height,
      fontSize: item.fontSize,
      fontFamily: item.fontFamily,
      color: item.textColor,
      backgroundColor: "white",
      padding: "4px",
      textAlign: "center",
      zIndex: 10,
      cursor: "move",
    };

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {item.type === "text" ? (
          item.content
        ) : (
          <img
            src={item.content}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}
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
      </div>
    );
  };

  const logoBlock = (
    <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
      <Image
        src={logoUrl || "/logo.png"}
        alt="Logo"
        width={80}
        height={50}
        className="hover:opacity-80 transition-opacity"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="hidden"
      />
    </div>
  );

  const navBlock = (
    <nav className="space-x-6 text-sm font-medium">
      <a href="#">Downloads</a>
      <a href="#">Nieuws</a>
      <a href="#">Events</a>
    </nav>
  );

  const draggableElements = (
    <DndContext onDragEnd={handleDragEnd}>
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </DndContext>
  );

  return renderLayout(logoBlock, navBlock, draggableElements);
}
