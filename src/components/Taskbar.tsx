"use client";
import { HeaderItem } from "@/components/variants/types";

interface TaskbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openModal: (section: "header" | "body" | "footer", type: "text" | "image") => void;
  selectedHeader: string;
  setSelectedHeader: (headerType: string) => void;
  selectedBody: string;
  setSelectedBody: (bodyType: string) => void;
  selectedFooter: string;
  setSelectedFooter: (footerType: string) => void;
  previewMode: boolean;
  setPreviewMode: (val: boolean) => void;
  setBodyItems: React.Dispatch<React.SetStateAction<HeaderItem[]>>;
  bodyItems: HeaderItem[];
  setBodyColor: (color: string) => void;
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
  previewMode,
  setPreviewMode,
  setBodyItems,
  bodyItems,
  setBodyColor,
}: TaskbarProps) {
  const handleBodyImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const newItem: HeaderItem = {
        id: crypto.randomUUID(),
        type: "image",
        content: base64,
        width: 800,
        height: 400,
        fontSize: 14,
        fontFamily: "Arial",
        textColor: "#000000",
        x: 0,
        y: 0,
      };

      const updated = [...(Array.isArray(bodyItems) ? bodyItems : []), newItem];
      setBodyItems(updated);
      localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed top-1/2 left-2 -translate-y-1/2 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-gray-800 text-white rounded shadow mb-2"
      >
        {isOpen ? "🔽 Sluiten" : "🔼 Instellingen"}
      </button>

      <div className={`transition-all ${isOpen ? "block" : "hidden"} bg-gray-800 text-white p-4 rounded shadow-md w-64`}>
        <h3 className="text-lg font-bold mb-4">⚙️ Instellingen</h3>

        {/* Preview Mode */}
        <div className="flex justify-between items-center mb-4">
          <span>🎬 Preview:</span>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1 text-xs rounded ${previewMode ? "bg-green-600" : "bg-gray-600"}`}
          >
            {previewMode ? "AAN" : "UIT"}
          </button>
        </div>

        {/* 🖥️ Header Select */}
        <div className="mb-4">
          <label className="block text-sm">🖥️ Kies een Header:</label>
          <select
            value={selectedHeader}
            onChange={(e) => setSelectedHeader(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
          >
            <option value="header1">HEADER1</option>
            <option value="header2">HEADER2</option>
            <option value="header3">HEADER3</option>
            <option value="header4">HEADER4</option>
            <option value="header5">HEADER5</option>
          </select>
          <button
            onClick={() => openModal("header", "text")}
            className="bg-green-500 mt-2 w-full p-2 rounded"
          >
            ➕ Tekst toevoegen
          </button>
          <button
            onClick={() => openModal("header", "image")}
            className="bg-blue-500 mt-1 w-full p-2 rounded"
          >
            🖼️ Afbeelding toevoegen
          </button>
        </div>

        {/* 🧱 Body Select */}
        <div className="mb-4">
          <label className="block text-sm">🧱 Kies een Body:</label>
          <select
            value={selectedBody}
            onChange={(e) => setSelectedBody(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
          >
            <option value="body1">BODY1</option>
            <option value="body2">BODY2</option>
            <option value="body3">BODY3</option>
            <option value="body4">BODY4</option>
          </select>

          <button
            onClick={() => openModal("body", "text")}
            className="bg-green-500 mt-2 w-full p-2 rounded"
          >
            ➕ Tekst toevoegen
          </button>

          <input
            type="file"
            accept="image/*"
            onChange={handleBodyImageUpload}
            className="mt-2 w-full file:cursor-pointer file:rounded file:bg-blue-600 file:text-white"
          />

          <div className="mt-4">
            <label className="block text-sm">🎨 Body Kleur:</label>
            <input
              type="color"
              defaultValue="#1f1f1f"
              onChange={(e) => setBodyColor(e.target.value)}
              className="w-full bg-transparent border-none"
            />
          </div>
        </div>

        {/* 📌 Footer Select */}
        <div className="mb-4">
          <label className="block text-sm">📌 Kies een Footer:</label>
          <select
            value={selectedFooter}
            onChange={(e) => setSelectedFooter(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
          >
            <option value="footer1">FOOTER1</option>
            <option value="footer2">FOOTER2</option>
            <option value="footer3">FOOTER3</option>
          </select>
          <button
            onClick={() => openModal("footer", "text")}
            className="bg-green-500 mt-2 w-full p-2 rounded"
          >
            ➕ Tekst toevoegen
          </button>
          <button
            onClick={() => openModal("footer", "image")}
            className="bg-blue-500 mt-1 w-full p-2 rounded"
          >
            🖼️ Afbeelding toevoegen
          </button>
        </div>
      </div>
    </div>
  );
}
