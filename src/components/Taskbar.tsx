"use client";

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
  setFontSize?: (size: number) => void; // ✅ Nieuw toegevoegd
  fontSize?: number; // ✅ Nieuw toegevoegd
  setFontFamily?: (font: string) => void; // ✅ Nieuw toegevoegd
  fontFamily?: string; // ✅ Nieuw toegevoegd
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
  setFontSize,
  fontSize,
  setFontFamily,
  fontFamily,
}: TaskbarProps) {
  return (
    <div className="fixed top-2 left-2 bg-gray-800 text-white p-3 rounded shadow-md z-50">
      <h3 className="text-lg font-bold mb-2">Instellingen</h3>
      
      {/* Lettergrootte Optie */}
      {setFontSize && fontSize !== undefined && (
        <div className="mt-2">
          <label className="block text-sm">Lettergrootte: {fontSize}px</label>
          <input
            type="range"
            min="10"
            max="50"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      )}
      
      {/* Lettertype Optie */}
      {setFontFamily && fontFamily !== undefined && (
        <div className="mt-2">
          <label className="block text-sm">Lettertype:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full bg-gray-700 text-white p-2 rounded"
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>
      )}

      {/* Header Opties */}
      <h4 className="font-semibold">Header</h4>
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
          <label className="block text-sm">Header Kleur:</label>
          <input type="color" onChange={(e) => setHeaderColor(e.target.value)} className="w-full bg-transparent border-none" />
        </div>
      )}
      {setHeaderHeight && (
        <div className="mt-2">
          <label className="block text-sm">Header Hoogte: {headerHeight}px</label>
          <input type="range" min="50" max="300" value={headerHeight} onChange={(e) => setHeaderHeight(parseInt(e.target.value))} className="w-full" />
        </div>
      )}

      {/* Body Opties */}
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
  );
}
