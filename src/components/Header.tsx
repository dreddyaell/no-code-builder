"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import Taskbar from "./Taskbar";
import "./Header.css"; // Import CSS styles

interface HeaderItem {
  id: string;
  content: string;
  type: "text" | "image";
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  textColor: string; // ✅ Nieuw veld toegevoegd voor tekstkleur
}


export default function Header() {
  const [headerColor, setHeaderColor] = useState("#3b82f6");
  const [headerHeight, setHeaderHeight] = useState(80);
  const [headerItems, setHeaderItems] = useState<HeaderItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newElementType, setNewElementType] = useState<"text" | "image" | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000"); // Standaard zwart

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HeaderItem | null>(null);

  const openEditModal = (item: HeaderItem) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };
  
  const updateSelectedItem = (field: keyof HeaderItem, value: any) => {
    setSelectedItem((prev) => prev ? { ...prev, [field]: value } : null);
  };
  
  const saveEditChanges = () => {
    if (!selectedItem) return;
    setHeaderItems((prevItems) =>
      prevItems.map((item) => (item.id === selectedItem.id ? selectedItem : item))
    );
    setEditModalOpen(false);
  };
  
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
    setFontSize(16);
    setFontFamily("Arial");
  };

  const saveNewElement = () => {
    if (!newElementType) return;
    if (newElementType === "text" && newContent.trim() === "") return;
  
    const newItem: HeaderItem = {
      id: generateId(),
      content: newElementType === "text" ? newContent : imagePreview || "https://via.placeholder.com/100",
      type: newElementType,
      width: 200,
      height: 60,
      fontSize: fontSize,
      fontFamily: fontFamily,
      textColor: textColor, // ✅ Sla de tekstkleur op
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
    <header className="header-container" style={{ backgroundColor: headerColor, height: `${headerHeight}px` }}>
      <Taskbar openModal={openModal} setHeaderColor={setHeaderColor} setHeaderHeight={setHeaderHeight} headerHeight={headerHeight} />

      {isClient && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={headerItems.map((item) => item.id)}>
            <div className="header-items-container">
            {headerItems.map((item) => (
                <div key={item.id} className="header-item">
                  <SortableItem id={item.id}>
                    <div
                      className="header-item-content"
                      style={{
                        width: `${item.width}px`,
                        height: `${item.height}px`,
                        fontSize: `${item.fontSize}px`,
                        fontFamily: item.fontFamily,
                        color: item.textColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "6px",
                        border: "1px solid black",
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                        backgroundColor: "white",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.type === "text" ? (
                        <span>{item.content}</span>
                      ) : (
                        <img src={item.content} alt="Uploaded" className="header-image" />
                      )}
                    </div>
                  </SortableItem>
                  {/* ✅ Knop om tekst te bewerken */}
                  {item.type === "text" && (
                    <button onClick={() => openEditModal(item)} className="edit-button">✏️ Bewerken</button>
                  )}
                  <button onClick={() => removeElement(item.id)} className="delete-button">❌</button>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

{editModalOpen && selectedItem && (
  <div className="modal">
    <div className="modal-content">
      <h2>🎨 Element Bewerken</h2>

      {/* Breedte wijzigen */}
      <label className="block text-sm text-black">📏 Breedte: {selectedItem.width}px</label>
      <input
        type="range"
        min="50"
        max="500"
        value={selectedItem.width}
        onChange={(e) => updateSelectedItem("width", parseInt(e.target.value))}
        className="w-full"
      />

      {/* Hoogte wijzigen */}
      <label className="block text-sm text-black mt-2">📏 Hoogte: {selectedItem.height}px</label>
      <input
        type="range"
        min="30"
        max="300"
        value={selectedItem.height}
        onChange={(e) => updateSelectedItem("height", parseInt(e.target.value))}
        className="w-full"
      />

      {/* Tekst wijzigen */}
      <label className="block text-sm text-black mt-2">📝 Tekst:</label>
      <input
        type="text"
        value={selectedItem.content}
        onChange={(e) => updateSelectedItem("content", e.target.value)}
        className="w-full p-2 border rounded text-black"
      />

      {/* Lettergrootte wijzigen */}
      <label className="block text-sm text-black mt-2">🔤 Lettergrootte: {selectedItem.fontSize}px</label>
      <input
        type="range"
        min="10"
        max="50"
        value={selectedItem.fontSize}
        onChange={(e) => updateSelectedItem("fontSize", parseInt(e.target.value))}
        className="w-full"
      />

      {/* Lettertype wijzigen */}
      <label className="block text-sm text-black mt-2">🖋️ Lettertype:</label>
      <select
        value={selectedItem.fontFamily}
        onChange={(e) => updateSelectedItem("fontFamily", e.target.value)}
        className="w-full bg-gray-200 text-black p-2 rounded"
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
      </select>

      {/* Tekstkleur wijzigen */}
      <label className="block text-sm text-black mt-2">🎨 Tekstkleur:</label>
      <input
        type="color"
        value={selectedItem.textColor}
        onChange={(e) => updateSelectedItem("textColor", e.target.value)}
        className="w-full"
      />

      {/* Sluiten en opslaan */}
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => setEditModalOpen(false)} className="p-2 bg-gray-500 text-white rounded">
          ❌ Annuleren
        </button>
        <button onClick={saveEditChanges} className="p-2 bg-blue-500 text-white rounded">
          ✅ Opslaan
        </button>
      </div>
    </div>
  </div>
)}


{showModal && (
  <div className="modal">
    <div className="modal-content">
      <h2>Nieuw Element Toevoegen</h2>

      {newElementType === "text" ? (
        <>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Voer tekst in"
          />

          {/* 🔤 Lettergrootte */}
          <label className="icon-label">
            <img src="/icons/font-size.png" alt="Lettergrootte" />
            Lettergrootte: {fontSize}px
          </label>
          <input
            type="range"
            min="10"
            max="50"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />

          {/* 🖋️ Lettertype */}
          <label className="icon-label">
            <img src="/icons/font-style.png" alt="Lettertype" />
            Lettertype:
          </label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>

          {/* 🎨 Tekstkleur */}
          <label className="icon-label">
            <img src="/icons/color-picker.png" alt="Tekstkleur" />
            Tekstkleur:
          </label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </>
      ) : (
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>
      )}

      <div className="buttons">
        <button onClick={saveNewElement} className="save-button">Opslaan</button>
        <button onClick={() => setShowModal(false)} className="cancel-button">Annuleren</button>
      </div>
    </div>
    </div>
    )}
  </header>
  );
}
