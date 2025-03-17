"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import Taskbar from "./Taskbar";
import headers from "./variants/headers"; // ✅ Dynamische headers importeren
import "./Header.css"; // ✅ Stijlen importeren
export type { HeaderItem, HeaderProps };

interface HeaderItem {
  id: string;
  content: string;
  type: "text" | "image";
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

interface HeaderProps {
  selectedHeader: string;
  setSelectedHeader: (headerType: string) => void;
  isOpen: boolean; // ✅ Ontvangt isOpen van page.tsx
  setIsOpen: (open: boolean) => void; // ✅ Ontvangt setIsOpen van page.tsx
  openModal: (section: "header" | "body" | "footer", type: "text" | "image") => void;
}

export default function Header({ selectedHeader, setSelectedHeader, isOpen, setIsOpen }: HeaderProps) {
  const HeaderComponent = headers[selectedHeader] || null;
  const [navItems, setNavItems] = useState([]);
  const [headerItems, setHeaderItems] = useState<{ [key: string]: HeaderItem[] }>({});
  const [headerColor, setHeaderColor] = useState("#3b82f6");
  const [headerHeight, setHeaderHeight] = useState(80);
  const [isClient, setIsClient] = useState(false);

  // Modale states en instellingen voor nieuwe elementen
  const [showModal, setShowModal] = useState(false);
  const [newElementType, setNewElementType] = useState<"text" | "image" | null>(null);
  const [newContent, setNewContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HeaderItem | null>(null);

  useEffect(() => {
    setIsClient(true);

    // ✅ Laad unieke items per header, niet globaal
    const savedItems = JSON.parse(localStorage.getItem(`headerItems-${selectedHeader}`) || "[]");
    setHeaderItems((prev) => ({ ...prev, [selectedHeader]: savedItems }));
  }, [selectedHeader]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(headerItems[selectedHeader] || []));
    }
  }, [headerItems, selectedHeader, isClient]);

  const generateId = () => `item-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setHeaderItems((prev) => ({
      ...prev,
      [selectedHeader]: arrayMove(
        prev[selectedHeader] || [],
        prev[selectedHeader].findIndex((i: HeaderItem) => i.id === active.id),
        prev[selectedHeader].findIndex((i: HeaderItem) => i.id === over.id)
      ),
    }));
  };

  const openModal = (section: "header" | "body" | "footer", type: "text" | "image") => {
    if (section !== "header") return;
    setNewElementType(type);
    setShowModal(true);
    setNewContent("");
    setImagePreview(null);
  };

  const openEditModal = (item: HeaderItem) => {
    setSelectedItem({ ...item });
    setEditModalOpen(true);
  };

  const updateSelectedItem = (field: keyof HeaderItem, value: any) => {
    setSelectedItem((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const saveEditChanges = () => {
    if (!selectedItem) return;
  
    setHeaderItems((prevItems) => ({
      ...prevItems,
      [selectedHeader]: prevItems[selectedHeader]?.map((item: HeaderItem) => 
        item.id === selectedItem.id ? selectedItem : item
      ) || []
    }));
  
    setEditModalOpen(false);
  };


  const saveNewElement = (type: "text" | "image") => {
    if (!type) return;

    const newItem: HeaderItem = {
      id: generateId(),
      content: type === "text" ? newContent : imagePreview || "https://via.placeholder.com/100",
      type,
      width: 200,
      height: 60,
      fontSize,
      fontFamily,
      textColor,
    };

    setHeaderItems((prev) => ({
      ...prev,
      [selectedHeader]: [...(prev[selectedHeader] || []), newItem],
    }));

    setShowModal(false);
    setNewContent(""); // Reset de tekst zodat het de volgende keer leeg begint
};

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const removeElement = (id: string) => {
    setHeaderItems((prev) => ({
      ...prev,
      [selectedHeader]: prev[selectedHeader]?.filter((item) => item.id !== id) || [],
    }));
  };

  return (
    <header className="header-container" style={{ backgroundColor: headerColor, height: `${headerHeight}px` }}>
      <Taskbar
        isOpen={isOpen} // ✅ Correct doorgegeven
        setIsOpen={setIsOpen} // ✅ Correct doorgegeven
        openModal={openModal} // ✅ Correct doorgegeven
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
        setHeaderColor={setHeaderColor}
        setHeaderHeight={setHeaderHeight}
        headerHeight={headerHeight}
      />

<div className="header-full-width">
        {HeaderComponent ? <HeaderComponent items={[]} /> : <p>Geen header geselecteerd</p>}
      </div>


        {isClient && (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={headerItems[selectedHeader]?.map((item) => item.id) || []}>
            <div className="header-items-container">
              {headerItems[selectedHeader]?.map((item) => (
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
                        textAlign: "center",
                        padding: "6px",
                        backgroundColor: "white",
                      }}
                    >
                      {item.type === "text" ? (
                        <span>{item.content}</span>
                      ) : (
                        <img src={item.content} alt="Uploaded" />
                      )}
                    </div>
                  </SortableItem>
        
                  {/* ✏️ Bewerkknop */}
                  <button onClick={() => openEditModal(item)} className="p-1 bg-yellow-500 text-white rounded">
                    ✏️ Bewerken
                  </button>
        
                  {/* ❌ Verwijderknop */}
                  <button onClick={() => removeElement(item.id)} className="p-1 bg-red-500 text-white rounded">
                    ❌ Verwijderen
                  </button>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {editModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl mb-4 text-black">🎨 Element Bewerken</h2>
            <label className="block text-sm text-black">📏 Breedte: {selectedItem.width}px</label>
            <input
              type="range"
              min="50"
              max="500"
              value={selectedItem.width}
              onChange={(e) => updateSelectedItem("width", parseInt(e.target.value))}
              className="w-full"
            />
            <label className="block text-sm text-black mt-2">📏 Hoogte: {selectedItem.height}px</label>
            <input
              type="range"
              min="30"
              max="300"
              value={selectedItem.height}
              onChange={(e) => updateSelectedItem("height", parseInt(e.target.value))}
              className="w-full"
            />
            <label className="block text-sm text-black mt-2">📝 Tekst:</label>
            <input
              type="text"
              value={selectedItem.content}
              onChange={(e) => updateSelectedItem("content", e.target.value)}
              className="w-full p-2 border rounded text-black"
            />
            <label className="block text-sm text-black mt-2">🔤 Lettergrootte: {selectedItem.fontSize}px</label>
            <input
              type="range"
              min="10"
              max="50"
              value={selectedItem.fontSize}
              onChange={(e) => updateSelectedItem("fontSize", parseInt(e.target.value))}
              className="w-full"
            />
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
            <label className="block text-sm text-black mt-2">🎨 Tekstkleur:</label>
            <input
              type="color"
              value={selectedItem.textColor}
              onChange={(e) => updateSelectedItem("textColor", e.target.value)}
              className="w-full"
            />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-96 relative">
            <h2 className="text-xl mb-4 text-black">Nieuw Element Toevoegen</h2>
            {newElementType === "text" ? (
              <>
                <input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2 border rounded text-black"
                  placeholder="Voer tekst in"
                />
                <label className="block text-sm text-black mt-2">🔤 Lettergrootte: {fontSize}px</label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <label className="block text-sm text-black mt-2">🖋️ Lettertype:</label>
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
                <label className="block text-sm text-black mt-2">🎨 Tekstkleur:</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full"
                />
              </>
            ) : (
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
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Annuleren
              </button>
             <button onClick={() => saveNewElement(newElementType!)} className={`p-2 rounded text-white  ${
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
