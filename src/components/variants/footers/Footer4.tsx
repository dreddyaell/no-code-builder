"use client";
import React from "react";
import { FooterProps } from "../types";
import { useRef } from "react";
import Image from "next/image";

export default function Footer4({ items }: FooterProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("footerLogo", reader.result as string);
      location.reload();
    };
    reader.readAsDataURL(file);
  };

  const logoUrl =
    typeof window !== "undefined"
      ? localStorage.getItem("footerLogo") || "/logo.png"
      : "/logo.png";

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white w-full px-10 py-14">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* 🖼️ Logo & beschrijving */}
        <div>
          <div
            className="cursor-pointer mb-4 w-fit"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={logoUrl}
              alt="Footer Logo"
              width={120}
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
          <p className="text-sm text-gray-400 max-w-sm">
            NoCodeBuilder: Jouw idee live in minuten. Bouw zonder code – snel, flexibel, visueel.
          </p>
        </div>

        {/* 📚 Navigatie */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Navigatie</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Features</a></li>
            <li><a href="#" className="hover:underline">Templates</a></li>
            <li><a href="#" className="hover:underline">Documentatie</a></li>
          </ul>
        </div>

        {/* 📬 Nieuwsbrief */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Nieuwsbrief</h4>
          <p className="text-sm text-gray-400 mb-2">Meld je aan voor tips, updates & events.</p>
          <input
            type="email"
            placeholder="E-mailadres"
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-sm font-medium w-full">
            Inschrijven
          </button>
        </div>

        {/* 🌍 Social media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Volg ons</h4>
          <div className="flex gap-4 text-2xl text-gray-400">
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
            <a href="#" className="hover:text-white">▶️</a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} NoCodeBuilder. Gemaakt met ❤️ door jouw creatieve geest.
      </div>
    </footer>
  );
}
