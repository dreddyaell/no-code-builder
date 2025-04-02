"use client";
import { useState } from "react";

interface TaskbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openModal: (section: "header" | "body" | "footer", type: "text" | "image") => void;
  selectedHeader: string;
  setSelectedHeader: (headerType: string) => void;
  setHeaderColor?: (color: string) => void;
  setHeaderHeight?: (height: number) => void;
  headerHeight?: number;
  setBodyColor?: (color: string) => void;
  setBodyHeight?: (height: number) => void;
  bodyHeight?: number;
  selectedFooter?: string;
  setSelectedFooter?: (footerType: string) => void;
  setFooterColor?: (color: string) => void;
  setFooterHeight?: (height: number) => void;
  footerHeight?: number;
  logoUrl?: string;
  setLogoUrl?: (url: string) => void;
  previewMode: boolean;
  setPreviewMode: (val: boolean) => void;
}

export default function Taskbar({
  isOpen,
  setIsOpen,
  openModal,
  selectedHeader,
  setSelectedHeader,
  setHeaderColor,
  setHeaderHeight,
  headerHeight,
  setBodyColor,
  setBodyHeight,
  bodyHeight,
  selectedFooter,
  setSelectedFooter,
  setFooterColor,
  setFooterHeight,
  footerHeight,
  logoUrl,
  setLogoUrl,
  previewMode,
  setPreviewMode,
}: TaskbarProps) {
  const availableHeaders = ["header1", "header2", "header3", "header4"];
  const availableFooters = ["footer1", "footer2", "footer3"];

  return (
    <div className="fixed top-1/2 left-2 -translate-y-1/2 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white rounded shadow-md mb-2"
      >
        {isOpen ? "🔽 Sluiten" : "🔼 Instellingen"}
      </button>

      <div
        className={`transition-all duration-300 ${isOpen ? "block opacity-100" : "hidden opacity-0"
          } bg-gray-800 text-white p-3 rounded shadow-md w-64`}
      >
        <h3 className="text-lg font-bold mb-2">⚙️ Instellingen</h3>

        {/* 🧪 Preview Mode Toggle */}
        <div className="mb-4 flex items-center gap-2">
          <label className="text-sm font-medium">🎬 Preview Mode:</label>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1 rounded text-white text-xs font-semibold ${previewMode ? "bg-green-600" : "bg-gray-600"
              }`}
          >
            {previewMode ? "AAN" : "UIT"}
          </button>
        </div>

        {/* 🖥️ Header Selectie */}
        <div className="mb-4">
          <label className="block text-sm">🖥️ Kies een Header:</label>
          <select
            value={selectedHeader}
            onChange={(e) => setSelectedHeader(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded"
          >
            {availableHeaders.map((header) => (
              <option key={header} value={header}>
                {header.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => openModal("header", "text")}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-700 m-1 w-full"
        >
          ➕ Tekst toevoegen
        </button>

        <button
          onClick={() => openModal("header", "image")}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-1 w-full"
        >
          🖼️ Afbeelding toevoegen
        </button>

        {setHeaderColor && (
          <div className="mt-2">
            <label className="block text-sm">🎨 Header Kleur:</label>
            <input
              type="color"
              onChange={(e) => setHeaderColor(e.target.value)}
              className="w-full bg-transparent border-none"
            />
          </div>
        )}

        {setLogoUrl && (
          <div className="mt-4">
            <label className="block text-sm mb-1">🖼️ Logo:</label>

            {/* 🔹 URL invoer */}
            <input
              type="text"
              defaultValue={logoUrl}
              onBlur={(e) => setLogoUrl(e.target.value)}
              placeholder="Plak een logo-URL..."
              className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
            />

            {/* 🔹 Bestand upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    if (reader.result) {
                      setLogoUrl(reader.result as string); // base64 afbeelding
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full text-sm bg-gray-800 text-white file:bg-gray-600 file:border-0 file:rounded file:px-3 file:py-1 file:cursor-pointer"
            />
          </div>
        )}


        {setHeaderHeight && (
          <div className="mt-2">
            <label className="block text-sm">📏 Header Hoogte: {headerHeight}px</label>
            <input
              type="range"
              min="50"
              max="300"
              value={headerHeight}
              onChange={(e) => setHeaderHeight(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* 📌 Body Opties */}
        <h4 className="font-semibold mt-4">📌 Body</h4>
        <button
          onClick={() => openModal("body", "text")}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-700 m-1 w-full"
        >
          ➕ Tekst toevoegen
        </button>
        <button
          onClick={() => openModal("body", "image")}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-1 w-full"
        >
          🖼️ Afbeelding toevoegen
        </button>

        {setBodyColor && (
          <div className="mt-2">
            <label className="block text-sm">🎨 Body Kleur:</label>
            <input
              type="color"
              onChange={(e) => setBodyColor(e.target.value)}
              className="w-full bg-transparent border-none"
            />
          </div>
        )}

        {setBodyHeight && (
          <div className="mt-2">
            <label className="block text-sm">📏 Body Hoogte: {bodyHeight}px</label>
            <input
              type="range"
              min="200"
              max="1000"
              value={bodyHeight}
              onChange={(e) => setBodyHeight(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}

        {/* 📌 Footer Opties */}
        <h4 className="font-semibold mt-4">📌 Footer</h4>
        <div className="mb-4">
          <label className="block text-sm">📌 Kies een Footer:</label>
          <select
            value={selectedFooter || "footer1"}
            onChange={(e) => setSelectedFooter && setSelectedFooter(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded"
          >
            {availableFooters.map((footer) => (
              <option key={footer} value={footer}>
                {footer.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => openModal("footer", "text")}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-700 m-1 w-full"
        >
          ➕ Tekst toevoegen
        </button>
        <button
          onClick={() => openModal("footer", "image")}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 m-1 w-full"
        >
          🖼️ Afbeelding toevoegen
        </button>

        {setFooterColor && (
          <div className="mt-2">
            <label className="block text-sm">🎨 Footer Kleur:</label>
            <input
              type="color"
              onChange={(e) => setFooterColor(e.target.value)}
              className="w-full bg-transparent border-none"
            />
          </div>
        )}

        {setFooterHeight && (
          <div className="mt-2">
            <label className="block text-sm">📏 Footer Hoogte: {footerHeight}px</label>
            <input
              type="range"
              min="50"
              max="300"
              value={footerHeight}
              onChange={(e) => setFooterHeight(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
