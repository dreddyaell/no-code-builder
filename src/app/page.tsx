"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

export default function Home() {
  const [selectedHeader, setSelectedHeader] = useState<string>("header1");

  useEffect(() => {
    const savedHeader = localStorage.getItem("selectedHeader") || "header1";
    setSelectedHeader(savedHeader);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Corrigeer Header props */}
      <Header selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />

      <main className="flex-grow flex flex-col items-center justify-center p-8 gap-8">
        <h1 className="text-2xl font-bold">🚀 No-Code Website Builder</h1>
      </main>

      {/* ✅ Geen className probleem meer */}
      <Footer />
    </div>
  );
}
