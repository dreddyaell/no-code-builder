"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import Taskbar from "./Taskbar"; 

// Definieer het type voor de header items
interface HeaderItem {
  id: string;
  content: string;
  type: "text" | "image";
}

export default function Header() {
  const [headerItems, setHeaderItems] = useState<HeaderItem[] | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
    const savedItems = JSON.parse(localStorage.getItem("headerItems") || "[]");
    setHeaderItems(savedItems.length > 0 ? savedItems : [
      { id: "logo", content: "🌐 Logo", type: "text" },
      { id: "nav", content: "📌 Navigatie", type: "text" },
      { id: "cta", content: "🔵 Call-To-Action", type: "text" },
    ]);
  }, []);

  useEffect(() => {
    if (isClient && headerItems !== null) {
      localStorage.setItem("headerItems", JSON.stringify(headerItems));
    }
  }, [headerItems, isClient]);

  const generateId = () => `item-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = headerItems!.findIndex((item) => item.id === active.id);
    const newIndex = headerItems!.findIndex((item) => item.id === over.id);

    setHeaderItems(arrayMove(headerItems!, oldIndex, newIndex));
  };

  const addNewElement = (type: "text" | "image") => {
    const newItem: HeaderItem = {
      id: generateId(),
      content: type === "text" ? "Nieuwe Tekst" : "https://via.placeholder.com/100",
      type,
    };
    setHeaderItems((prevItems) => [...(prevItems || []), newItem]);
  };

  const removeElement = (id: string) => {
    setHeaderItems((prevItems) => prevItems!.filter(item => item.id !== id));
  };

  const startEditing = (id: string, content: string) => {
    setEditId(id);
    setEditContent(content);
  };

  const saveEdit = () => {
    setHeaderItems((prevItems) =>
      prevItems!.map(item => (item.id === editId ? { ...item, content: editContent } : item))
    );
    setEditId(null);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setHeaderItems((prevItems) =>
        prevItems!.map(item => (item.id === id ? { ...item, content: imageUrl } : item))
      );
    }
  };

  if (headerItems === null) return null; // ❗ Voorkom rendering totdat useEffect is geladen

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-500 text-white p-4 shadow-md flex flex-col items-center">
      <Taskbar addNewElement={addNewElement} />
      {isClient && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={headerItems.map((item) => item.id)}>
            <div className="flex gap-4">
              {headerItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  {editId === item.id ? (
                    <input
                      type="text"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      onBlur={saveEdit}
                      className="p-1 border rounded text-black"
                      autoFocus
                    />
                  ) : (
                    item.type === "text" ? (
                      <span onDoubleClick={() => startEditing(item.id, item.content)}>
                        {item.content}
                      </span>
                    ) : (
                      <div className="flex flex-col items-center">
                        <img 
                          src={item.content} 
                          alt="Gebruiker afbeelding" 
                          className="w-16 h-16 object-cover cursor-pointer" 
                          onClick={() => document.getElementById(`upload-${item.id}`)?.click()}
                        />
                        <input 
                          type="file" 
                          id={`upload-${item.id}`}
                          accept="image/*" 
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, item.id)}
                        />
                      </div>
                    )
                  )}
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
      )}
    </header>
  );
}
