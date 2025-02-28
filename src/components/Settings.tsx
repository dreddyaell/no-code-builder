"use client";
import { useState } from "react";

interface SettingsProps {
  selectedHeader: string;
  setSelectedHeader: (headerType: string) => void;
}

export default function Settings({ selectedHeader, setSelectedHeader }: SettingsProps) {
  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">Instellingen</h3>

      {/* ✅ Header wisselen */}
      <label className="block text-sm font-semibold mb-1">📌 Kies een header:</label>
      <select
        value={selectedHeader}
        onChange={(e) => setSelectedHeader(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="header1">Header 1 - Licht</option>
        <option value="header2">Header 2 - Donker</option>
      </select>
    </div>
  );
}
