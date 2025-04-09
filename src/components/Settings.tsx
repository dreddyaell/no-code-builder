"use client";
import { useState } from "react";
import React from "react";
interface SettingsProps {
  selectedHeader: string;
  setSelectedHeader: (newHeader: string) => void;
  setHeaderColor: (color: string) => void; // ✅ Toegevoegd
  setHeaderHeight: (height: number) => void; // ✅ Toegevoegd
  headerSettings: { [key: string]: { color: string; height: number } }; // ✅ Toegevoegd
}

export default function Settings({
  selectedHeader,
  setSelectedHeader,
  setHeaderColor,
  setHeaderHeight,
  headerSettings,
}: SettingsProps) {
  return (
    <div className="bg-gray-800 text-white p-3 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Instellingen</h3>

      {/* Header selectie */}
      <div className="mt-2">
        <label className="block text-sm">🖥️ Kies een Header:</label>
        <select
          value={selectedHeader}
          onChange={(e) => setSelectedHeader(e.target.value)}
          className="w-full bg-gray-700 text-white p-2 rounded"
        >
          {Object.keys(headerSettings).map((header) => (
            <option key={header} value={header}>
              {header.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Kleurinstelling per header */}
      <div className="mt-2">
        <label className="block text-sm">🎨 Header Kleur:</label>
        <input
          type="color"
          value={headerSettings[selectedHeader]?.color || "#ffffff"}
          onChange={(e) => setHeaderColor(e.target.value)}
          className="w-full bg-transparent border-none"
        />
      </div>

      {/* Hoogteinstelling per header */}
      <div className="mt-2">
        <label className="block text-sm">
          📏 Header Hoogte: {headerSettings[selectedHeader]?.height}px
        </label>
        <input
          type="range"
          min="50"
          max="300"
          value={headerSettings[selectedHeader]?.height || 100}
          onChange={(e) => setHeaderHeight(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
