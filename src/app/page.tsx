"use client";

import { useEffect, useState } from "react";
import headers from "@/components/variants/headers";
import footers from "@/components/variants/footers";
import Header from "@/components/Header";
import Taskbar from "@/components/Taskbar";
import Body from "@/components/Body";
import { FooterItem } from "@/components/variants/types";

export default function Home() {
  const [selectedHeader, setSelectedHeader] = useState("header1");
  const [selectedFooter, setSelectedFooter] = useState("footer1");
  const [headerItems, setHeaderItems] = useState<{ [key: string]: any[] }>({});
  const [footerItems, setFooterItems] = useState<{ [key: string]: FooterItem[] }>({});
  const [isTaskbarOpen, setIsTaskbarOpen] = useState(true);

  useEffect(() => {
    const savedHeader = localStorage.getItem("selectedHeader") || "header1";
    const savedFooter = localStorage.getItem("selectedFooter") || "footer1";
    setSelectedHeader(savedHeader);
    setSelectedFooter(savedFooter);

    const savedHeaderItems = JSON.parse(localStorage.getItem(`headerItems-${savedHeader}`) || "[]");
    const savedFooterItems = JSON.parse(localStorage.getItem(`footerItems-${savedFooter}`) || "[]");

    setHeaderItems((prev) => ({ ...prev, [savedHeader]: savedHeaderItems }));
    setFooterItems((prev) => ({ ...prev, [savedFooter]: savedFooterItems }));
  }, []);

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

    if (section === "header") {
      setHeaderItems((prev) => {
        const updated = [...(prev[selectedHeader] || []), newItem];
        localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
        return { ...prev, [selectedHeader]: updated };
      });
    }

    if (section === "footer") {
      setFooterItems((prev) => {
        const updated = [...(prev[selectedFooter] || []), newItem];
        localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
        return { ...prev, [selectedFooter]: updated };
      });
    }
  };

  const HeaderComponent = headers[selectedHeader] || headers["header1"];
  const FooterComponent = footers[selectedFooter] || footers["footer1"];

  return (
    <div className="pageContainer">
      {/* ⚙️ Instellingenbalk */}
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
      />

      {/* 🧠 Header */}
      <Header
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
        isOpen={isTaskbarOpen}
        setIsOpen={setIsTaskbarOpen}
        openModal={openModal}
      />

      {/* 📦 Body */}
      <Body />

      {/* 🔻 Footer (net als Header, met props!) */}
      <FooterComponent items={footerItems[selectedFooter] || []} />
    </div>
  );
}
