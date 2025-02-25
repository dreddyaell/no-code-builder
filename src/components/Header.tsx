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
  const [headerColor, setHeaderColor] = useState("#3b82f6"); // Standaard blauw
  const [headerHeight, setHeaderHeight] = useState(80); // Standaard hoogte
  const [headerItems, setHeaderItems] = useState<HeaderItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Voor modal venster
  const [showModal, setShowModal] = useState(false);
  const [newElementType, setNewElementType] = useState<"text" | "image" | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");

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
      fontSize,
      fontFamily,
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
      />

      {/* Drag & Drop functionaliteit */}
      {isClient && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={headerItems.map((item) => item.id)}>
          <div className="flex flex-wrap gap-4 w-full">
              {headerItems.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                 <SortableItem key={item.id} id={item.id}>
                    <div
                        className="bg-none text-black rounded flex flex-col items-start justify-start p-2 relative"
                        style={{
                          width: `${item.width}px`,
                          height: `${item.height}px`,
                          fontSize: `${item.fontSize}px`,
                          fontFamily: item.fontFamily,
                          textAlign: "left",
                          overflowWrap: "break-word",
                          wordBreak: "break-word",
                          padding: "6px",
                          border: "none", 
                          boxShadow: "none", 
                          outline: "none", 
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

                   {/* Bewerk-knop */}
  <button
    onClick={() => openEditModal(item)}
    className="mt-2 p-1 bg-gray-500 text-white rounded hover:bg-gray-700"
  >
    ⚙️ Bewerk
  </button>

  {/* Verwijder-knop */}
  <button
    onClick={() => removeElement(item.id)}
    className="p-1 bg-red-500 text-white rounded hover:bg-red-700 mt-2"
  >
    ❌
  </button>

                  {/* Grootte wijzigen */}
                  <div className="flex flex-col items-center">
                    <label className="text-sm text-white">📏 Breedte: {item.width}px</label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      value={item.width}
                      onChange={(e) => setHeaderItems(prevItems =>
                        prevItems.map(i => i.id === item.id ? { ...i, width: parseInt(e.target.value) } : i)
                      )}
                      className="w-24"
                    />
                    <label className="text-sm text-white">📏 Hoogte: {item.height}px</label>
                    <input
                      type="range"
                      min="30"
                      max="300"
                      value={item.height}
                      onChange={(e) => setHeaderItems(prevItems =>
                        prevItems.map(i => i.id === item.id ? { ...i, height: parseInt(e.target.value) } : i)
                      )}
                      className="w-24"
                    />
                  </div>

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
    <div className="bg-white p-6 rounded shadow-md w-96 relative">
      <h2 className="text-xl mb-4 text-black">Nieuw Element Toevoegen</h2>

      {/* Tekst invoer voor nieuw element */}
      {newElementType === "text" ? (
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full p-2 border rounded text-black"
          placeholder="Voer tekst in"
        />
      ) : (
        // Afbeelding invoer
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded"
            />
          )}
        </div>
      )}
      

      {/* Opties voor lettergrootte en lettertype */}
      {newElementType === "text" && (
        <div className="mt-4">
          <label className="block text-sm text-black">Lettergrootte: {fontSize}px</label>
          <input
            type="range"
            min="10"
            max="50"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full"
          />
          <label className="block text-sm text-black mt-2">Lettertype:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full bg-gray-200 text-black p-2 rounded"
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>
      )}

{editModalOpen && selectedItem && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h2 className="text-xl mb-4 text-black">🎨 Element Bewerken</h2>

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


      {/* Knoppen om te annuleren of op te slaan */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setShowModal(false)}
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Annuleren
        </button>
        <button
          onClick={saveNewElement}
          className={`p-2 rounded text-white ${
            newElementType === "text" && newContent.trim() === ""
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={newElementType === "text" && newContent.trim() === ""}
        >
          Opslaan
        </button>
      </div>
    </div>
  </div>
    )}
    </header>
  );
}
