"use client";

import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function Footer() {
  const [footerItems, setFooterItems] = useState([
    { id: "copyright", content: "© 2025 No-Code Builder" },
    { id: "socials", content: "📱 Social Media Links" },
    { id: "contact", content: "📧 Contactgegevens" },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = footerItems.findIndex(item => item.id === active.id);
      const newIndex = footerItems.findIndex(item => item.id === over.id);
      setFooterItems(arrayMove(footerItems, oldIndex, newIndex));
    }
  };

  return (
    <footer className="w-full fixed bottom-0 left-0 bg-blue-500 text-white p-4 shadow-md flex justify-center">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={footerItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="flex gap-4">
            {footerItems.map(item => (
              <SortableItem key={item.id} id={item.id}>
                {item.content}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </footer>
  );
}
