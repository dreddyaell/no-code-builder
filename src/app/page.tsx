"use client";

import { useEffect, useState } from "react";
import footers from "@/components/variants/footers";
import Taskbar from "@/components/Taskbar";
import Body from "@/components/Body";
import LayoutBuilder from "@/components/LayoutBuilder";
import { FooterItem, HeaderItem } from "@/components/variants/types";
import Header from "@/components/Header";

export default function Home() {
  const [selectedHeader, setSelectedHeader] = useState("header1");
  const [selectedFooter, setSelectedFooter] = useState("footer1");

  const [headerItems, setHeaderItems] = useState<{ [key: string]: HeaderItem[] }>({});
  const [footerItems, setFooterItems] = useState<{ [key: string]: FooterItem[] }>({});

  const [isTaskbarOpen, setIsTaskbarOpen] = useState(true);
  const [logoUrl, setLogoUrl] = useState("/logo.png");

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
    const newItem = {
      id: `item-${Date.now()}`,
      content: type === "text" ? "Nieuw Tekstelement" : "https://via.placeholder.com/100",
      type,
      width: 200,
      height: section === "footer" ? 40 : 60,
      fontSize: section === "footer" ? 14 : 16,
      fontFamily: "Arial",
      textColor: "#000000",
    };

    if (section === "footer") {
      setFooterItems((prev) => {
        const updated = [...(prev[selectedFooter] || []), newItem];
        localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
        return { ...prev, [selectedFooter]: updated };
      });
    }

    if (section === "header") {
      setHeaderItems((prev) => {
        const updated = [...(prev[selectedHeader] || []), newItem];
        localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
        return { ...prev, [selectedHeader]: updated };
      });
    }
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
        selectedFooter={selectedFooter}
        setSelectedFooter={(footer) => {
          setSelectedFooter(footer);
          localStorage.setItem("selectedFooter", footer);
        }}
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
      />

      

      <main className="flex-grow">
      <LayoutBuilder
  selectedHeader={selectedHeader}
  logoUrl={logoUrl}
  setLogoUrl={setLogoUrl}
  headerItems={headerItems[selectedHeader] || []}
  setHeaderItems={setHeaderItems}
  selectedFooter={selectedFooter}
  footerItems={footerItems[selectedFooter] || []}
  setFooterItems={setFooterItems}
  // eventueel ook: editModal props etc...

        />
        <Body />
      </main>

      <footer>
        <FooterComponent items={footerItems[selectedFooter] || []} />
      </footer>
    </div>
  );
}
