"use client";

import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function Header() {
  const [headerItems, setHeaderItems] = useState([
    { id: "logo", content: "🌐 Logo" },
    { id: "nav", content: "📌 Navigatie" },
    { id: "cta", content: "🔵 Call-To-Action" },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = headerItems.findIndex(item => item.id === active.id);
      const newIndex = headerItems.findIndex(item => item.id === over.id);
      setHeaderItems(arrayMove(headerItems, oldIndex, newIndex));
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-500 text-white p-4 shadow-md flex justify-center">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={headerItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="flex gap-4">
            {headerItems.map(item => (
              <SortableItem key={item.id} id={item.id}>
                {item.content}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </header>
  );
}
