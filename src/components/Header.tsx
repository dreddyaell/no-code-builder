"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import Taskbar from "./Taskbar";

// Type voor header items
interface HeaderItem {
  id: string;
  content: string;
  type: "text" | "image";
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
}

export default function Header() {
  const [headerColor, setHeaderColor] = useState("#3b82f6");
  const [headerHeight, setHeaderHeight] = useState(80);
  const [headerItems, setHeaderItems] = useState<HeaderItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");

  // Voor het modal venster
  const [showModal, setShowModal] = useState(false);
  const [newElementType, setNewElementType] = useState<"text" | "image" | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const savedItems = JSON.parse(localStorage.getItem("headerItems") || "[]");
    setHeaderItems(savedItems);
    const savedHeight = localStorage.getItem("headerHeight");
    if (savedHeight) setHeaderHeight(parseInt(savedHeight));
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("headerItems", JSON.stringify(headerItems));
      localStorage.setItem("headerHeight", headerHeight.toString());
    }
  }, [headerItems, headerHeight, isClient]);

  const generateId = () => `item-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setHeaderItems((prevItems) =>
      arrayMove(prevItems, prevItems.findIndex(i => i.id === active.id), prevItems.findIndex(i => i.id === over.id))
    );
  };

  const openModal = (section: "header" | "body" | "footer", type: "text" | "image") => {
    if (section !== "header") return;
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
      fontSize: fontSize,
      fontFamily: fontFamily,
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
    <header
      className="w-full fixed top-0 left-0 text-white shadow-md flex flex-col items-center transition-all duration-300"
      style={{ backgroundColor: headerColor, height: `${headerHeight}px` }}
    >
      {/* Taskbar met instellingen */}
      <Taskbar
        openModal={openModal}
        setHeaderColor={setHeaderColor}
        setHeaderHeight={setHeaderHeight}
        headerHeight={headerHeight}
        setFontSize={setFontSize}
        fontSize={fontSize}
        setFontFamily={setFontFamily}
        fontFamily={fontFamily}
      />

      {/* Drag & Drop functionaliteit */}
      {isClient && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={headerItems.map((item) => item.id)}>
            <div className="flex gap-4">
              {headerItems.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <SortableItem id={item.id}>
                    <div
                      className="border bg-white text-black rounded shadow-md cursor-grab flex items-center justify-center p-2 relative"
                      style={{
                        width: `${item.width}px`,
                        height: `${item.height}px`,
                        textAlign: "center",
                        overflow: "hidden",
                        wordWrap: "break-word",
                        fontSize: `${item.fontSize}px`,
                        fontFamily: item.fontFamily,
                      }}
                    >
                      {item.type === "text" ? (
                        <span className="w-full h-full flex items-center justify-center">
                          {item.content}
                        </span>
                      ) : (
                        <img src={item.content} alt="Uploaded" className="w-full h-full object-cover rounded" />
                      )}
                    </div>
                  </SortableItem>
                  <button
                    onClick={() => removeElement(item.id)}
                    className="p-1 bg-red-500 text-white rounded hover:bg-red-700 mt-2"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Modal venster voor nieuw element */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl mb-4 text-black">Nieuw Element Toevoegen</h2>
            {newElementType === "text" ? (
              <>
                <input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  placeholder="Voer tekst in"
                  style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }}
                />
              </>
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
