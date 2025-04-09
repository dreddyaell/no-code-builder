"use client";
import { useState } from "react";
import { FooterProps } from "../types";
import React from "react";
export default function Footer2({ items }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim() === "") return;
    alert(`Bedankt voor het abonneren, ${email}!`);
    setEmail(""); // Reset input na inschrijving
  };

  return (
    <footer className="w-full bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🔗 Navigatie */}
        <div>
          <h2 className="text-lg font-bold mb-2">Navigatie</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Over Ons</a></li>
            <li><a href="#" className="hover:underline">Diensten</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Privacybeleid</a></li>
          </ul>
        </div>

        {/* 📨 Nieuwsbrief */}
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">Schrijf je in voor de nieuwsbrief</h2>
          <input
            type="email"
            placeholder="Jouw e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded text-black w-full"
          />
          <button
            onClick={handleSubscribe}
            className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
          >
            Abonneer
          </button>
        </div>

        {/* 🌐 Social Media */}
        <div className="text-center md:text-right">
          <h2 className="text-lg font-bold mb-2">Volg ons</h2>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#" className="text-xl hover:text-blue-400">📘</a>
            <a href="#" className="text-xl hover:text-blue-500">🐦</a>
            <a href="#" className="text-xl hover:text-red-500">▶️</a>
            <a href="#" className="text-xl hover:text-purple-500">📷</a>
          </div>
        </div>
      </div>

      {/* 🏷️ Copyright */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        © 2025 No-Code Builder. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
