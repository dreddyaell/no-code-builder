"use client";
import { useState } from "react";

interface TaskbarProps {
  openModal: (section: "header" | "body" | "footer", type: "text" | "image") => void;
  setHeaderColor?: (color: string) => void;
  setHeaderHeight?: (height: number) => void;
  headerHeight?: number;
  setBodyColor?: (color: string) => void;
  setBodyHeight?: (height: number) => void;
  bodyHeight?: number;
  setFooterColor?: (color: string) => void;
  setFooterHeight?: (height: number) => void;
  footerHeight?: number;
}

export default function Taskbar({
  openModal,
  setHeaderColor,
  setHeaderHeight,
  headerHeight,
  setBodyColor,
  setBodyHeight,
  bodyHeight,
  setFooterColor,
  setFooterHeight,
  footerHeight,
}: TaskbarProps) {
  const [isOpen, setIsOpen] = useState(true); // Staat van de instellingenbalk

  return (
    <div className="fixed top-2 left-2 z-50">
      {/* Toggle knop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white rounded shadow-md mb-2"
      >
        {isOpen ? "🔽 Sluiten" : "🔼 Instellingen"}
      </button>

      {/* Instellingenbalk (zichtbaar of verborgen) */}
      {isOpen && (
        <div className="bg-gray-800 text-white p-3 rounded shadow-md">
          <h3 className="text-lg font-bold mb-2">Instellingen</h3>

          {/* Header Opties */}
          <h4 className="font-semibold">📌 Header</h4>
          <button
            onClick={() => openModal("header", "text")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700 m-1"
          >
            ➕ Tekst toevoegen
          </button>
          <button
            onClick={() => openModal("header", "image")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-1"
          >
            🖼️ Afbeelding toevoegen
          </button>
          {setHeaderColor && (
            <div className="mt-2">
              <label className="block text-sm">🎨 Header Kleur:</label>
              <input type="color" onChange={(e) => setHeaderColor(e.target.value)} className="w-full bg-transparent border-none" />
            </div>
          )}
          {setHeaderHeight && (
            <div className="mt-2">
              <label className="block text-sm">📏 Header Hoogte: {headerHeight}px</label>
              <input type="range" min="50" max="300" value={headerHeight} onChange={(e) => setHeaderHeight(parseInt(e.target.value))} className="w-full" />
            </div>
          )}

          {/* Body Opties */}
          <h4 className="font-semibold mt-4">📌 Body</h4>
          <button
            onClick={() => openModal("body", "text")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700 m-1"
          >
            ➕ Tekst toevoegen
          </button>
          <button
            onClick={() => openModal("body", "image")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-1"
          >
            🖼️ Afbeelding toevoegen
          </button>
          {setBodyColor && (
            <div className="mt-2">
              <label className="block text-sm">🎨 Body Kleur:</label>
              <input type="color" onChange={(e) => setBodyColor(e.target.value)} className="w-full bg-transparent border-none" />
            </div>
          )}
          {setBodyHeight && (
            <div className="mt-2">
              <label className="block text-sm">📏 Body Hoogte: {bodyHeight}px</label>
              <input type="range" min="200" max="1000" value={bodyHeight} onChange={(e) => setBodyHeight(parseInt(e.target.value))} className="w-full" />
            </div>
          )}

          {/* Footer Opties */}
          <h4 className="font-semibold mt-4">📌 Footer</h4>
          <button
            onClick={() => openModal("footer", "text")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700 m-1"
          >
            ➕ Tekst toevoegen
          </button>
          <button
            onClick={() => openModal("footer", "image")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-1"
          >
            🖼️ Afbeelding toevoegen
          </button>
          {setFooterColor && (
            <div className="mt-2">
              <label className="block text-sm">🎨 Footer Kleur:</label>
              <input type="color" onChange={(e) => setFooterColor(e.target.value)} className="w-full bg-transparent border-none" />
            </div>
          )}
          {setFooterHeight && (
            <div className="mt-2">
              <label className="block text-sm">📏 Footer Hoogte: {footerHeight}px</label>
              <input type="range" min="50" max="300" value={footerHeight} onChange={(e) => setFooterHeight(parseInt(e.target.value))} className="w-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
