"use client";
import { useState, useEffect } from "react";
import headers from "@/components/variants/headers";
import footers from "@/components/variants/footers";
import Footer from "@/components/Footer";
import Taskbar from "@/components/Taskbar";
import Header from "@/components/Header";
import Body from "@/components/Body";

export default function Home() {
  const [selectedHeader, setSelectedHeader] = useState("header1");
  const [selectedFooter, setSelectedFooter] = useState("footer1");
  const [headerItems, setHeaderItems] = useState<{ [key: string]: any[] }>({});
  const [isTaskbarOpen, setIsTaskbarOpen] = useState(true); // ✅ State voor Taskbar

  useEffect(() => {
    const savedHeader = localStorage.getItem("selectedHeader") || "header1";
    const savedFooter = localStorage.getItem("selectedFooter") || "footer1";
    setSelectedHeader(savedHeader);
    setSelectedFooter(savedFooter);

    const savedItems = JSON.parse(localStorage.getItem(`headerItems-${savedHeader}`) || "[]");
    setHeaderItems((prev) => ({ ...prev, [savedHeader]: savedItems }));
  }, []);

  const openModal = (section: "header" | "body" | "footer", type: "text" | "image") => {
    if (section === "header") {
      const newItem = {
        id: `item-${Date.now()}`,
        content: type === "text" ? "Nieuw Tekstelement" : "https://via.placeholder.com/100",
        type,
        width: 200,
        height: 60,
        fontSize: 16,
        fontFamily: "Arial",
        textColor: "#000000",
      };

      setHeaderItems((prev) => ({
        ...prev,
        [selectedHeader]: [...(prev[selectedHeader] || []), newItem],
      }));

      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify([...headerItems[selectedHeader] || [], newItem]));
    }
  };

  const HeaderComponent = headers[selectedHeader] || headers["header1"];
  const FooterComponent = footers[selectedFooter] || footers["footer1"];

  return (
    <div className="pageContainer">
      <Header
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
        isOpen={isTaskbarOpen} // ✅ Doorsturen naar Header
        setIsOpen={setIsTaskbarOpen} // ✅ Doorsturen naar Header
        openModal={openModal} // ✅ Nu correct doorgegeven
      />
      <Body />
      <FooterComponent
        items={[
          { id: "copyright", content: "© 2025 No-Code Builder" },
          { id: "socials", content: "📱 Social Media Links" },
          { id: "contact", content: "📧 Contactgegevens" },
        ]}
      />
    </div>
  );
}
