"use client";
import { HeaderProps } from "../types";
import Image from "next/image";
import { useRef } from "react";
import SortableItem from "@/components/SortableItem"; // ✅ import

export default function Header1({ items, logoUrl, setLogoUrl }: HeaderProps & { setLogoUrl?: (url: string) => void }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && setLogoUrl) {
        setLogoUrl(reader.result as string);
        localStorage.setItem("logoUrl", reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <header className="w-full border-b border-gray-300 bg-white">
      <div className="grid grid-cols-3 items-center px-6 py-2 text-sm text-gray-700">
        {/* 🔹 Logo */}
        <div className="flex items-center gap-6">
          <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Image
              src={logoUrl || "/logo.png"}
              alt="Logo"
              width={80}
              height={50}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          {/* Navigatie links */}
          <nav className="flex gap-4">
            <a href="#">Downloads</a>
            <a href="#">Nieuws</a>
            <a href="#">Evenementen</a>
          </nav>
        </div>

        {/* 🔍 Zoekveld */}
        <div className="flex justify-center">
          <div className="flex items-center border-b border-gray-400">
            <input type="text" placeholder="Zoek op trefwoord" className="p-1 text-sm outline-none text-gray-800" />
            <button className="text-teal-500 text-xl pl-2">🔍</button>
          </div>
        </div>

        {/* 🌐 Rechter links */}
        <div className="flex justify-end items-center gap-2 text-sm">
          <Image src="/icons/nl-flag.png" alt="NL" width={20} height={14} />
          <span>NL</span>
          <a href="#">Extranet</a>
          <a href="#">WinWeb</a>
          <a href="#">Partner-portaal</a>
        </div>
      </div>

      {/* ✅ Dynamisch drag & drop content */}
      <div className="flex justify-center gap-10 py-3 bg-white text-black font-semibold text-sm tracking-wide">
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            {item.type === "text" ? (
              <div
                style={{
                  fontSize: `${item.fontSize}px`,
                  fontFamily: item.fontFamily,
                  color: item.textColor,
                }}
              >
                {item.content}
              </div>
            ) : (
              <img
                src={item.content}
                width={item.width}
                height={item.height}
                style={{ objectFit: "contain" }}
                alt=""
              />
            )}
          </SortableItem>
        ))}
      </div>
    </header>
  );
}
