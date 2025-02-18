"use client";

import { useState } from "react";

interface TaskbarProps {
  openModal: (type: "text" | "image", section: "header" | "body" | "footer") => void;
  setHeaderColor: (color: string) => void;
}

export default function Taskbar({ openModal, setHeaderColor }: TaskbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerColor, updateHeaderColor] = useState("#3b82f6"); // Standaard blauw

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    updateHeaderColor(newColor);
    setHeaderColor(newColor); // Stuur de kleur terug naar de header
  };

  return (
    <div className="fixed top-2 left-2 bg-gray-800 text-white p-3 rounded shadow-md z-50">
      {/* Settings Knop */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 bg-gray-700 text-white rounded hover:bg-gray-900"
      >
        ⚙️ Settings
      </button>

      {/* Instellingen Panel */}
      {menuOpen && (
        <div className="mt-2 bg-white text-black p-4 rounded shadow-md flex flex-col gap-2">
          {/* Kleurkiezer */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-gray-700">Kleur Header</h3>
            <input
              type="color"
              value={headerColor}
              onChange={handleColorChange}
              className="w-12 h-8 border rounded"
            />
          </div>

          {/* Header Opties */}
          <h3 className="text-lg font-bold text-gray-700 mt-4">Header</h3>
          <button
            onClick={() => openModal("text", "header")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            ➕ Nieuw Tekstelement
          </button>
          <button
            onClick={() => openModal("image", "header")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            🖼️ Nieuw Afbeeldingselement
          </button>

          {/* Body Opties */}
          <h3 className="text-lg font-bold text-gray-700 mt-4">Body</h3>
          <button
            onClick={() => openModal("text", "body")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            ➕ Nieuw Tekstelement
          </button>
          <button
            onClick={() => openModal("image", "body")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            🖼️ Nieuw Afbeeldingselement
          </button>

          {/* Footer Opties */}
          <h3 className="text-lg font-bold text-gray-700 mt-4">Footer</h3>
          <button
            onClick={() => openModal("text", "footer")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            ➕ Nieuw Tekstelement
          </button>
          <button
            onClick={() => openModal("image", "footer")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            🖼️ Nieuw Afbeeldingselement
          </button>
        </div>
      )}
    </div>
  );
}
