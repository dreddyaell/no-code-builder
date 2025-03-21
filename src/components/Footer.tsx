// src/components/Footer.tsx
"use client";

import { useState, useEffect } from "react";
import footers from "@/components/variants/footers";
import { FooterItem } from "@/components/variants/types";

interface FooterProps {
  selectedFooter: string;
}

export default function Footer({ selectedFooter }: FooterProps) {
  const [footerItems, setFooterItems] = useState<FooterItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const rawItems = JSON.parse(
      localStorage.getItem(`footerItems-${selectedFooter}`) || "[]"
    );

    const validatedItems: FooterItem[] =
      rawItems.length > 0
        ? rawItems.map((item: any) => ({
            id: item.id || `item-${Date.now()}`,
            content: item.content || "Leeg",
            type: item.type || "text",
            width: item.width || 200,
            height: item.height || 40,
            fontSize: item.fontSize || 14,
            fontFamily: item.fontFamily || "Arial",
            textColor: item.textColor || "#ffffff",
          }))
        : [
            {
              id: "copyright",
              content: "© 2025 No-Code Builder",
              type: "text",
              width: 200,
              height: 40,
              fontSize: 14,
              fontFamily: "Arial",
              textColor: "#ffffff",
            },
            {
              id: "socials",
              content: "📱 Social Media Links",
              type: "text",
              width: 200,
              height: 40,
              fontSize: 14,
              fontFamily: "Arial",
              textColor: "#ffffff",
            },
            {
              id: "contact",
              content: "📧 Contactgegevens",
              type: "text",
              width: 200,
              height: 40,
              fontSize: 14,
              fontFamily: "Arial",
              textColor: "#ffffff",
            },
          ];

    setFooterItems(validatedItems);
  }, [selectedFooter]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        `footerItems-${selectedFooter}`,
        JSON.stringify(footerItems)
      );
    }
  }, [footerItems, selectedFooter, isClient]);

  const FooterComponent = footers[selectedFooter];

  return (
    <div>
      {FooterComponent ? (
        <FooterComponent items={footerItems} />
      ) : (
        <p>⚠️ Footer niet gevonden!</p>
      )}
    </div>
  );
}
