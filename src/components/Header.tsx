"use client";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function Header() {
  const [headerItems, setHeaderItems] = useState([
    { id: "logo", content: "🌐 Logo" },
    { id: "nav", content: "📌 Navigatie" },
    { id: "cta", content: "🔵 Call-To-Action" },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = headerItems.findIndex((item) => item.id === active.id);
    const newIndex = headerItems.findIndex((item) => item.id === over.id);

    setHeaderItems(arrayMove(headerItems, oldIndex, newIndex));
  };

  const addNewElement = () => {
    const newItem = { id: `item-${Date.now()}`, content: "🆕 Nieuw Element" };
    setHeaderItems([...headerItems, newItem]);
  };

  const removeElement = (id: string) => {
    setHeaderItems(headerItems.filter(item => item.id !== id));
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-500 text-white p-4 shadow-md flex flex-col items-center">
      <button
        onClick={addNewElement}
        className="mb-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        ➕ Nieuw Element
      </button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={headerItems.map((item) => item.id)}>
          <div className="flex gap-4">
            {headerItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <SortableItem id={item.id}>{item.content}</SortableItem>
                <button
                  onClick={() => removeElement(item.id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </header>
  );
}
