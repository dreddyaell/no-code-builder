"use client";

import { useEffect, useRef, useState } from "react";
import { HeaderItem } from "@/components/variants/types";

interface Body4Props {
  items: HeaderItem[];
  previewMode?: boolean;
  backgroundColor?: string;
}

export default function Body4({ items, previewMode, backgroundColor }: Body4Props) {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", description: "Beschrijving 1" },
    { id: 2, name: "Product 2", description: "Beschrijving 2" },
    { id: 3, name: "Product 3", description: "Beschrijving 3" },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempName, setTempName] = useState("");
  const [tempDesc, setTempDesc] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId !== null) {
      inputRef.current?.focus();
    }
  }, [editingId]);

  const handleEditClick = (id: number, name: string, description: string) => {
    setEditingId(id);
    setTempName(name);
    setTempDesc(description);
  };

  const handleSave = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingId ? { ...p, name: tempName, description: tempDesc } : p
      )
    );
    setEditingId(null);
  };

  return (
    <section
      className="w-full min-h-[90vh] flex flex-col items-center overflow-x-hidden px-4 py-10"
      style={{ backgroundColor: backgroundColor || "#111827" }}
    >
      <h2 className="text-white text-4xl font-bold mb-10">🛍️ Welkom bij de Webshop</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-6 shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer relative"
            onClick={() =>
              !previewMode &&
              handleEditClick(product.id, product.name, product.description)
            }
          >
            {editingId === product.id ? (
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full mb-2 border-b-2 border-gray-500 text-lg font-bold"
                />
                <input
                  type="text"
                  value={tempDesc}
                  onChange={(e) => setTempDesc(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => e.key === "Enter" && handleSave()}
                  className="w-full text-gray-700 border-b border-gray-300"
                />
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                {!previewMode && (
                  <span className="absolute top-2 right-3 text-gray-400 text-sm">✏️</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
