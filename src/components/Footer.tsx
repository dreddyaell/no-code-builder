"use client";
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import footers from "@/components/variants/footers"; // ✅ Dynamische footers laden

export default function Footer() {
  const [selectedFooter, setSelectedFooter] = useState("footer1");
  const [footerItems, setFooterItems] = useState<{ id: string; content: string }[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedFooter = localStorage.getItem("selectedFooter") || "footer1";
    setSelectedFooter(savedFooter);

    const savedItems = JSON.parse(localStorage.getItem("footerItems") || "[]");
    setFooterItems(
      savedItems.length > 0
        ? savedItems
        : [
            { id: "copyright", content: "© 2025 No-Code Builder" },
            { id: "socials", content: "📱 Social Media Links" },
            { id: "contact", content: "📧 Contactgegevens" },
          ]
    );
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("footerItems", JSON.stringify(footerItems));
    }
  }, [footerItems, isClient]);

  const FooterComponent = footers[selectedFooter] || footers["footer1"];

  return (
    <FooterComponent items={footerItems} />
  );
}
