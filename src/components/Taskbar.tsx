"use client";

import { useState } from "react";

export default function Taskbar({ addNewElement }: { addNewElement: (type: "text" | "image") => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-2 left-2 bg-gray-800 text-white p-3 rounded shadow-md z-50">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 bg-gray-700 text-white rounded hover:bg-gray-900"
      >
        ☰ Menu
      </button>
      {menuOpen && (
        <div className="bg-white p-4 rounded shadow-md mt-2">
          <button
            onClick={() => addNewElement("text")}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            ➕ Tekst toevoegen
          </button>
          <button
            onClick={() => addNewElement("image")}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-2"
          >
            🖼️ Afbeelding toevoegen
          </button>
        </div>
      )}
    </div>
  );
}
