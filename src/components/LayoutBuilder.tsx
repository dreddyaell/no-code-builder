"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import SortableItem from "@/components/SortableItem";
import { HeaderItem, FooterItem } from "@/components/variants/types";
import headers from "@/components/variants/headers";

interface LayoutBuilderProps {
  selectedHeader: string;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  headerItems: HeaderItem[];
  setHeaderItems: React.Dispatch<React.SetStateAction<{ [key: string]: HeaderItem[] }>>;
  selectedFooter: string;
  footerItems: FooterItem[];
  setFooterItems: React.Dispatch<React.SetStateAction<{ [key: string]: FooterItem[] }>>;
}

export default function LayoutBuilder({
  selectedHeader,
  logoUrl,
  setLogoUrl,
  headerItems,
  setHeaderItems,
  selectedFooter,
  footerItems,
  setFooterItems,
}: LayoutBuilderProps) {
  const HeaderComponent = headers[selectedHeader];
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HeaderItem | null>(null);

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
      [selectedHeader]: prevItems[selectedHeader]?.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      ) || [],
    }));
    setEditModalOpen(false);
  };

  const removeElement = (id: string) => {
    setHeaderItems((prev) => ({
      ...prev,
      [selectedHeader]: prev[selectedHeader]?.filter((item) => item.id !== id) || [],
    }));
  };

  return (
    <div className="w-full">
      {HeaderComponent && (
        <HeaderComponent
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          items={headerItems}
        />
      )}

      {editModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
    </div>
  );
}
