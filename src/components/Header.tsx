// components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

// Definieer het type voor de header items
interface HeaderItem {
  id: string;
  content: string;
  type: "text" | "image";
}

export default function Header() {
  const [headerItems, setHeaderItems] = useState<HeaderItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedItems = JSON.parse(localStorage.getItem("headerItems") || "[]");
    setHeaderItems(storedItems);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("headerItems", JSON.stringify(headerItems));
    }
  }, [headerItems, isClient]);

  const addNewElement = (type: "text" | "image") => {
    const newItem: HeaderItem = {
      id: `item-${crypto.randomUUID()}`,
      content: type === "text" ? "📄 Nieuwe Tekst" : "🖼️ Nieuwe Afbeelding",
      type,
    };
    setHeaderItems([...headerItems, newItem]);
  };

  const removeElement = (id: string) => {
    setHeaderItems(headerItems.filter((item) => item.id !== id));
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-500 text-white p-4 shadow-md flex flex-col items-center">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mb-2 p-2 bg-gray-700 text-white rounded hover:bg-gray-900"
      >
        ☰ Menu
      </button>
      {menuOpen && (
        <div className="bg-white text-black p-4 rounded shadow-md flex flex-col gap-2">
          <button
            onClick={() => addNewElement("text")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            ➕ Nieuw Tekstelement
          </button>
          <button
            onClick={() => addNewElement("image")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            🖼️ Nieuw Afbeeldingselement
          </button>
        </div>
      )}
      {isClient && (
        <DndContext collisionDetection={closestCenter}>
          <SortableContext items={headerItems.map((item) => item.id)}>
            <div className="flex gap-4 p-4 border border-dashed border-white w-full min-h-[50px]">
              {headerItems.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  {item.type === "text" ? (
                    <span>{item.content}</span>
                  ) : (
                    <img src={item.content} alt="Afbeelding" className="w-16 h-16" />
                  )}
                  <button
                    onClick={() => removeElement(item.id)}
                    className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    ❌
                  </button>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </header>
  );
}
