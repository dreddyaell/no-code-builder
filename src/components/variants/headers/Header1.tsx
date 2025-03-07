"use client";
import { useState } from "react";
import Image from "next/image"; // Gebruik Next.js Image voor optimalisatie

export default function Header() {
  return (
    <header className="bg-white shadow-md w-full px-8 py-4 flex items-center justify-between">
      {/* LOGO */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={80} height={40} />
      </div>

      {/* NAVIGATIE */}
      <nav className="flex-1 flex justify-center space-x-6 text-black font-semibold">
        <a href="#" className="hover:text-blue-500 transition">COMPETENTIES</a>
        <a href="#" className="hover:text-blue-500 transition">PRODUCTEN</a>
        <a href="#" className="hover:text-blue-500 transition">SERVICE</a>
        <a href="#" className="hover:text-blue-500 transition">ONDERNEMING</a>
        <a href="#" className="hover:text-blue-500 transition">CONTACT</a>
      </nav>

      {/* ZOEKFUNCTIE & OPTIES */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Zoek op trefwoord..."
          className="border rounded px-3 py-1 text-sm focus:ring focus:border-blue-500"
        />
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          🔍
        </button>
        <span className="text-sm">🌐 NL | Extranet</span>
      </div>
    </header>
  );
}
