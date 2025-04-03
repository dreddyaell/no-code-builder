"use client";

import { useEffect, useState } from "react";
import footers from "@/components/variants/footers";
import Taskbar from "@/components/Taskbar";
import Body from "@/components/Body";
import LayoutBuilder from "@/components/LayoutBuilder";
import { FooterItem, HeaderItem } from "@/components/variants/types";

export default function Home() {
  const [selectedHeader, setSelectedHeader] = useState("header1");
  const [selectedFooter, setSelectedFooter] = useState("footer1");

  const [headerItems, setHeaderItems] = useState<{ [key: string]: HeaderItem[] }>({});
  const [footerItems, setFooterItems] = useState<{ [key: string]: FooterItem[] }>({});

  const [isTaskbarOpen, setIsTaskbarOpen] = useState(true);
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedBody, setSelectedBody] = useState("body1");


  useEffect(() => {
    const savedHeader = localStorage.getItem("selectedHeader") || "header1";
    const savedFooter = localStorage.getItem("selectedFooter") || "footer1";
    const savedLogo = localStorage.getItem("logoUrl") || "/logo.png";


    setSelectedHeader(savedHeader);
    setSelectedFooter(savedFooter);
    setLogoUrl(savedLogo);

    const savedHeaderItems = JSON.parse(localStorage.getItem(`headerItems-${savedHeader}`) || "[]");
    const savedFooterItems = JSON.parse(localStorage.getItem(`footerItems-${savedFooter}`) || "[]");

    setHeaderItems({ [savedHeader]: savedHeaderItems });
    setFooterItems({ [savedFooter]: savedFooterItems });
  }, []);

  useEffect(() => {
    localStorage.setItem("logoUrl", logoUrl);
  }, [logoUrl]);

  const openModal = (section: "header" | "body" | "footer", type: "text" | "image") => {
    const newItem: HeaderItem = {
      id: crypto.randomUUID(),
      type,
      content: type === "text" ? "Nieuwe tekst" : "/placeholder.jpg",
      width: 150,
      height: 40,
      fontSize: 14,
      fontFamily: "Arial",
      textColor: "#000000",
      x: 50,
      y: 50,
    };

    if (section === "header") {
      setHeaderItems((prev) => {
        const updated = [...(prev[selectedHeader] || []), newItem];
        localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
        return {
          ...prev,
          [selectedHeader]: updated,
        };
      });
    }

    if (section === "footer") {
      setFooterItems((prev) => {
        const updated = [...(prev[selectedFooter] || []), newItem];
        localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
        return {
          ...prev,
          [selectedFooter]: updated,
        };
      });
    }
  };

  const updateItemPosition = (id: string, x: number, y: number) => {
    setHeaderItems((prev) => {
      const items = prev[selectedHeader] || [];
      const updated = items.map((item) =>
        item.id === id ? { ...item, x, y } : item
      );
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
      return {
        ...prev,
        [selectedHeader]: updated,
      };
    });
  };

  const FooterComponent = footers[selectedFooter];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Taskbar
        isOpen={isTaskbarOpen}
        setIsOpen={setIsTaskbarOpen}
        openModal={openModal}
        selectedHeader={selectedHeader}
        setSelectedHeader={(header) => {
          setSelectedHeader(header);
          localStorage.setItem("selectedHeader", header);
        }}
        selectedBody={selectedBody}
        setSelectedBody={(body) => {
          setSelectedBody(body);
          localStorage.setItem("selectedBody", body);
        }}
        selectedFooter={selectedFooter}
        setSelectedFooter={(footer) => {
          setSelectedFooter(footer);
          localStorage.setItem("selectedFooter", footer);
        }}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <LayoutBuilder
          selectedHeader={selectedHeader}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          headerItems={headerItems[selectedHeader] || []}
          setHeaderItems={setHeaderItems}
          selectedFooter={selectedFooter}
          footerItems={footerItems[selectedFooter] || []}
          setFooterItems={setFooterItems}
          previewMode={previewMode}
          selectedBody={selectedBody}
        />
      </main>

    </div>
  );
}
