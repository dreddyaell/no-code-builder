"use client";

import { useRef } from "react";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { HeaderItem } from "@/components/variants/types";

interface Body1Props {
  items: HeaderItem[];
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  previewMode?: boolean;
}

function DraggableItem({
  item,
  onEdit,
  onDelete,
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
    zIndex: 50,
    pointerEvents: previewMode ? "none" : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {!previewMode && (
        <div
          {...listeners}
          {...attributes}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 text-xl select-none"
        >
          ⠿
        </div>
      )}

      {item.type === "text" ? (
        <div>{item.content}</div>
      ) : (
        <img
          src={item.content}
          alt=""
          className="w-full h-full object-contain"
        />
      )}

      {!previewMode && (
        <div className="flex justify-center gap-1 mt-1">
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

export default function Body1({
  items,
  onEdit,
  onDelete,
  updateItemPosition,
  previewMode,
}: Body1Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;
    const item = items.find((i) => i.id === id);
    if (!item || !updateItemPosition) return;
    updateItemPosition(id, item.x + delta.x, item.y + delta.y);
  };

  return (
    <section className="relative w-full flex-1 min-h-[500px] sm:min-h-[calc(100vh-250px)] bg-gradient-to-b from-white via-gray-100 to-white overflow-visible">

      <div className="max-w-6xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welkom bij je No-Code Body 🎨</h2>
        <p className="text-gray-600">Voeg hier je tekst, afbeeldingen en opmaak toe via de editor!</p>
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
    </section>
  );
}
