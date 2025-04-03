"use client";
import { useState } from "react";

interface TaskbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openModal: (section: "header" | "body" | "footer", type: "text" | "image") => void;
  selectedHeader: string;
  setSelectedHeader: (headerType: string) => void;
  selectedBody: string;
  setSelectedBody: (bodyType: string) => void;
  selectedFooter?: string;
  setSelectedFooter?: (footerType: string) => void;
  setHeaderColor?: (color: string) => void;
  setHeaderHeight?: (height: number) => void;
  headerHeight?: number;
  setBodyColor?: (color: string) => void;
  setBodyHeight?: (height: number) => void;
  bodyHeight?: number;
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
  selectedBody,
  setSelectedBody,
  selectedFooter,
  setSelectedFooter,
  setHeaderColor,
  setHeaderHeight,
  headerHeight,
  setBodyColor,
  setBodyHeight,
  bodyHeight,
  setFooterColor,
  setFooterHeight,
  footerHeight,
  logoUrl,
  setLogoUrl,
  previewMode,
  setPreviewMode,
}: TaskbarProps) {
  const availableHeaders = ["header1", "header2", "header3", "header4", "header5"];
  const availableBodies = ["body1"]; // add more later
  const availableFooters = ["footer1", "footer2", "footer3"];

  return (
    <div className="fixed top-1/2 left-2 -translate-y-1/2 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white rounded shadow-md mb-2"
      >
        {isOpen ? "🔽 Sluiten" : "🔼 Instellingen"}
      </button>

      <div className={`transition-all duration-300 ${isOpen ? "block" : "hidden"} bg-gray-800 text-white p-3 rounded shadow-md w-64`}>
        <h3 className="text-lg font-bold mb-2">⚙️ Instellingen</h3>

        {/* Preview Mode */}
        <div className="mb-4 flex items-center gap-2">
          <label className="text-sm font-medium">🎬 Preview Mode:</label>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1 rounded text-white text-xs font-semibold ${previewMode ? "bg-green-600" : "bg-gray-600"}`}
          >
            {previewMode ? "AAN" : "UIT"}
          </button>
        </div>

        {/* Header Select */}
        <div className="mb-4">
          <label className="block text-sm">🖥️ Kies een Header:</label>
          <select
            value={selectedHeader}
            onChange={(e) => {
              setSelectedHeader(e.target.value);
              localStorage.setItem("selectedHeader", e.target.value);
            }}
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

        {/* Body Select */}
        <div className="my-4">
          <label className="block text-sm">📌 Kies een Body:</label>
          <select
            value={selectedBody}
            onChange={(e) => {
              setSelectedBody(e.target.value);
              localStorage.setItem("selectedBody", e.target.value);
            }}
            className="w-full bg-gray-700 text-white p-2 rounded"
          >
            {availableBodies.map((body) => (
              <option key={body} value={body}>
                {body.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

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

        {/* Footer Select */}
        <div className="my-4">
          <label className="block text-sm">📌 Kies een Footer:</label>
          <select
            value={selectedFooter || "footer1"}
            onChange={(e) => setSelectedFooter?.(e.target.value)}
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
      </div>
    </div>
  );
}
