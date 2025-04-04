"use client";

import { useEffect, useState } from "react";
import { HeaderItem, FooterItem } from "@/components/variants/types";
import headers from "@/components/variants/headers";
import bodies from "@/components/variants/bodies";
import footers from "@/components/variants/footers";

interface LayoutBuilderProps {
  selectedHeader: string;
  selectedFooter: string;
  selectedBody: string;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  headerItems: HeaderItem[];
  setHeaderItems: React.Dispatch<React.SetStateAction<{ [key: string]: HeaderItem[] }>>;
  footerItems: FooterItem[];
  setFooterItems: React.Dispatch<React.SetStateAction<{ [key: string]: FooterItem[] }>>;
  bodyItems: HeaderItem[];
  setBodyItems: React.Dispatch<React.SetStateAction<HeaderItem[]>>;
  previewMode: boolean;
}

export default function LayoutBuilder({
  selectedHeader,
  selectedFooter,
  selectedBody,
  logoUrl,
  setLogoUrl,
  headerItems,
  setHeaderItems,
  footerItems,
  setFooterItems,
  bodyItems,
  setBodyItems,
  previewMode,
}: LayoutBuilderProps) {
  const HeaderComponent = headers[selectedHeader];
  const BodyComponent = bodies[selectedBody];
  const FooterComponent = footers[selectedFooter];

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HeaderItem | null>(null);

  // 🆕 Voeg dit toe om body kleur instelbaar te maken
  const [bodyColor, setBodyColor] = useState("#1f1f1f");

  useEffect(() => {
    localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(bodyItems));
  }, [bodyItems, selectedBody]);

  const updateItemPosition = (id: string, x: number, y: number) => {
    const update = (items: HeaderItem[]) =>
      items.map((item) => (item.id === id ? { ...item, x, y } : item));

    if (headerItems.some((i) => i.id === id)) {
      const updated = update(headerItems);
      setHeaderItems((prev) => ({ ...prev, [selectedHeader]: updated }));
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
    } else if (bodyItems.some((i) => i.id === id)) {
      const updated = update(bodyItems);
      setBodyItems(updated);
      localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
    } else {
      const updated = footerItems.map((item) =>
        item.id === id ? { ...item, x, y } : item
      );
      setFooterItems((prev) => ({ ...prev, [selectedFooter]: updated }));
      localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
    }
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

    const update = (items: HeaderItem[]) =>
      items.map((item) => (item.id === selectedItem.id ? selectedItem : item));

    if (headerItems.some((i) => i.id === selectedItem.id)) {
      const updated = update(headerItems);
      setHeaderItems((prev) => ({ ...prev, [selectedHeader]: updated }));
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
    } else if (bodyItems.some((i) => i.id === selectedItem.id)) {
      const updated = update(bodyItems);
      setBodyItems(updated);
      localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
    } else {
      const updated = footerItems.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      );
      setFooterItems((prev) => ({ ...prev, [selectedFooter]: updated }));
      localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
    }

    setEditModalOpen(false);
  };

  const removeElement = (id: string) => {
    setHeaderItems((prev) => {
      const updated = (prev[selectedHeader] || []).filter((item) => item.id !== id);
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
      return { ...prev, [selectedHeader]: updated };
    });

    setBodyItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
      return updated;
    });

    setFooterItems((prev) => {
      const updated = (prev[selectedFooter] || []).filter((item) => item.id !== id);
      localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
      return { ...prev, [selectedFooter]: updated };
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden">
      {HeaderComponent && (
        <HeaderComponent
          items={headerItems}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          onEdit={openEditModal}
          onDelete={removeElement}
          updateItemPosition={updateItemPosition}
          previewMode={previewMode}
        />
      )}

      <main className="flex-1 overflow-y-auto">
        {BodyComponent && (
          <BodyComponent
            items={bodyItems}
            onEdit={openEditModal}
            onDelete={removeElement}
            updateItemPosition={updateItemPosition}
            previewMode={previewMode}
            backgroundColor={bodyColor}
          />
        )}
      </main>

      {FooterComponent && <FooterComponent items={footerItems} />}

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
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 bg-gray-500 text-white rounded"
              >
                ❌ Annuleren
              </button>
              <button
                onClick={saveEditChanges}
                className="p-2 bg-blue-500 text-white rounded"
              >
                ✅ Opslaan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}