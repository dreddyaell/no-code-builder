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
  width: number;
  height: number;
}

export default function Header() {
  const [headerItems, setHeaderItems] = useState<HeaderItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newElementType, setNewElementType] = useState<"text" | "image" | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const savedItems = JSON.parse(localStorage.getItem("headerItems") || "[]");
    setHeaderItems(savedItems.length > 0 ? savedItems : [
      { id: "logo", content: "🌐 Logo", type: "text", width: 150, height: 50 },
      { id: "nav", content: "📌 Navigatie", type: "text", width: 200, height: 50 },
      { id: "cta", content: "🔵 Call-To-Action", type: "text", width: 180, height: 50 },
    ]);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("headerItems", JSON.stringify(headerItems));
    }
  }, [headerItems, isClient]);

  const generateId = () => `item-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setHeaderItems((prevItems) => arrayMove(prevItems, prevItems.findIndex(i => i.id === active.id), prevItems.findIndex(i => i.id === over.id)));
  };

  const openModal = (type: "text" | "image") => {
    setNewElementType(type);
    setShowModal(true);
    setNewContent("");
    setImagePreview(null);
  };

  const saveNewElement = () => {
    if (!newElementType) return;
    if (newElementType === "text" && newContent.trim() === "") return;

    const newItem: HeaderItem = {
      id: generateId(),
      content: newElementType === "text" ? newContent : imagePreview || "https://via.placeholder.com/100",
      type: newElementType,
      width: 150,
      height: 50,
    };
    setHeaderItems((prevItems) => [...prevItems, newItem]);
    setShowModal(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const removeElement = (id: string) => {
    setHeaderItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-blue-500 text-white p-4 shadow-md flex flex-col items-center">
      <Taskbar openModal={openModal} />
      {isClient && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={headerItems.map((item) => item.id)}>
            <div className="flex gap-4">
              {headerItems.map((item) => (
                <SortableItem key={item.id} id={item.id}>
                  <div
                    className="border bg-white text-black rounded shadow-md cursor-grab flex items-center justify-center p-2"
                    style={{ width: `${item.width}px`, height: `${item.height}px` }}
                  >
                    {item.type === "text" ? (
                      <span className="w-full h-full flex items-center justify-center text-center">
                        {item.content}
                      </span>
                    ) : (
                      <img src={item.content} alt="Uploaded" className="w-full h-full object-cover rounded" />
                    )}
                  </div>
                  <button
                    onClick={() => removeElement(item.id)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-700 mt-2"
                  >
                    ❌
                  </button>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl mb-4 text-black">Nieuw Element Toevoegen</h2>
            {newElementType === "text" ? (
              <input
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-2 border rounded text-black"
                placeholder="Voer tekst in"
              />
            ) : (
              <div className="flex flex-col items-center">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded" />}
              </div>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="p-2 bg-gray-500 text-white rounded">
                Annuleren
              </button>
              <button onClick={saveNewElement} className="p-2 bg-blue-500 text-white rounded">
                Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
