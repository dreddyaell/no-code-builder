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
  bodyItems: HeaderItem[]; // Let op! Alleen de geselecteerde
  setBodyItems: (items: HeaderItem[]) => void; // per geselecteerde body
  setBodyColor: (color: string) => void;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
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
    const allowedBodies = ["body2", "body3"];
    if (!allowedBodies.includes(selectedBody)) {
      alert("📸 Alleen body2 en body3 ondersteunen afbeeldingen.");
      return;
    }

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

      const updated = [...bodyItems, newItem];
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

        {/* Preview Toggle */}
        <div className="flex justify-between items-center mb-4">
          <span>🎬 Preview:</span>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1 text-xs rounded ${previewMode ? "bg-green-600" : "bg-gray-600"}`}
          >
            {previewMode ? "AAN" : "UIT"}
          </button>
        </div>

        <div className="mb-4">
          

          <label className="block text-sm">🖥️ Header:</label>
          <button onClick={() => openModal("header", "text")} className="bg-green-500 mt-2 w-full p-2 rounded">➕ Tekst toevoegen</button>
          <button onClick={() => openModal("header", "image")} className="bg-blue-500 mt-1 w-full p-2 rounded">🖼️ Afbeelding</button>
          <select
            value={selectedHeader}
            onChange={(e) => setSelectedHeader(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
          >
            {["header1", "header2", "header3", "header4", "header5"].map((h) => (
              <option key={h} value={h}>{h.toUpperCase()}</option>
            ))}
          </select>

        </div>

        {/* Body */}
        <div className="mb-4">
          <label className="block text-sm">🧱 Body:</label>
          <select
            value={selectedBody}
            onChange={(e) => setSelectedBody(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
          >
            {["body1", "body2", "body3", "body4", "body5"].map((b) => (
              <option key={b} value={b}>{b.toUpperCase()}</option>
            ))}
          </select>
          <label className="cursor-pointer flex items-center justify-center w-full p-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
            Klik hier om een afbeelding te selecteren
            <input
              type="file"
              accept="image/*"
              onChange={handleBodyImageUpload}
              className="hidden"
            />
          </label>

          <p className="text-xs text-gray-300 mt-1">
            Max 500KB. Alleen zichtbaar in body2 & body3.
          </p>

        </div>

        {/* Footer */}
        <div className="mb-4">
          <label className="block text-sm">📌 Footer:</label>
          <select
            value={selectedFooter}
            onChange={(e) => setSelectedFooter(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
          >
            {["footer1", "footer2", "footer3"].map((f) => (
              <option key={f} value={f}>{f.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
