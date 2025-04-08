"use client";

import { useEffect, useState } from "react";
import footers from "@/components/variants/footers";
import Taskbar from "@/components/Taskbar";
import LayoutBuilder from "@/components/LayoutBuilder";
import { FooterItem, HeaderItem } from "@/components/variants/types";

export default function Home() {
  const [selectedHeader, setSelectedHeader] = useState("header1");
  const [selectedBody, setSelectedBody] = useState("body1");
  const [selectedFooter, setSelectedFooter] = useState("footer1");

  const [headerItems, setHeaderItems] = useState<{ [key: string]: HeaderItem[] }>({});
  const [bodyItems, setBodyItems] = useState<{ [key: string]: HeaderItem[] }>({});
  const [footerItems, setFooterItems] = useState<{ [key: string]: FooterItem[] }>({});

  const [isTaskbarOpen, setIsTaskbarOpen] = useState(true);
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [previewMode, setPreviewMode] = useState(false);
  const [bodyColor, setBodyColor] = useState("#1f1f1f");

  useEffect(() => {
    const savedHeader = localStorage.getItem("selectedHeader") || "header1";
    const savedBody = localStorage.getItem("selectedBody") || "body1";
    const savedFooter = localStorage.getItem("selectedFooter") || "footer1";
    const savedLogo = localStorage.getItem("logoUrl") || "/logo.png";
    

    setSelectedHeader(savedHeader);
    setSelectedBody(savedBody);
    setSelectedFooter(savedFooter);
    setLogoUrl(savedLogo);

    const savedHeaderItems = JSON.parse(localStorage.getItem(`headerItems-${savedHeader}`) || "[]");
    const savedFooterItems = JSON.parse(localStorage.getItem(`footerItems-${savedFooter}`) || "[]");
    const savedBodyItems = JSON.parse(localStorage.getItem(`bodyItems-${savedBody}`) || "[]");

    setHeaderItems({ [savedHeader]: savedHeaderItems });
    setFooterItems({ [savedFooter]: savedFooterItems });
    setBodyItems({ [savedBody]: savedBodyItems });
  }, []);

  useEffect(() => {
    localStorage.setItem("logoUrl", logoUrl);
  }, [logoUrl]);

  const openModal = (section: "header" | "body" | "footer", type: "text" | "image") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
  
    const newItem: HeaderItem = {
      id: crypto.randomUUID(),
      type,
      content: type === "image" ? "" : "Nieuwe tekst",
      width: 150,
      height: 40,
      fontSize: 14,
      fontFamily: "Arial",
      textColor: "#000000",
      x: 50,
      y: 50,
    };
  
    if (type === "image") {
      input.onchange = () => {
        const file = input.files?.[0];
        if (!file) return;
  
        const reader = new FileReader();
        reader.onload = () => {
          const updatedItem = { ...newItem, content: reader.result as string };
  
          if (section === "header") {
            setHeaderItems((prev) => {
              const updated = [...(prev[selectedHeader] || []), newItem];
              localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
              return { ...prev, [selectedHeader]: updated };
            });
          } else if (section === "footer") {
            setFooterItems((prev) => {
              const updated = [...(prev[selectedFooter] || []), newItem];
              localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
              return { ...prev, [selectedFooter]: updated };
            });
          } else if (section === "body") {
            setBodyItems((prev) => {
              const updated = [...(prev[selectedBody] || []), newItem];
              localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
              return { ...prev, [selectedBody]: updated };
            });
          }
        };
        reader.readAsDataURL(file);
      };
  
      input.click();
      return;
    }

    function updateBodyItemsMap(
      selectedBody: string,
      modify: (prevItems: HeaderItem[]) => HeaderItem[],
      setBodyItems: React.Dispatch<React.SetStateAction<{ [key: string]: HeaderItem[] }>>
    ) {
      setBodyItems((prev) => {
        const current = prev[selectedBody] || [];
        const updatedItems = modify(current);
        const updated = { ...prev, [selectedBody]: updatedItems };
        localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updatedItems));
        return updated;
      });
    }
    updateBodyItemsMap(selectedBody, (prev) => [...prev, newItem], setBodyItems);

    

    // Default: text toevoegen
    if (section === "header") {
      setHeaderItems((prev) => {
        const updated = [...(prev[selectedHeader] || []), newItem];
        localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
        return { ...prev, [selectedHeader]: updated };
      });
    } else if (section === "footer") {
      setFooterItems((prev) => {
        const updated = [...(prev[selectedFooter] || []), newItem];
        localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
        return { ...prev, [selectedFooter]: updated };
      });
    } else if (section === "body") {
      setBodyItems((prev) => {
        const updated = [...(prev[selectedBody] || []), newItem];
        localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
        return { ...prev, [selectedBody]: updated };
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Taskbar
        isOpen={isTaskbarOpen}
        setIsOpen={setIsTaskbarOpen}
        openModal={openModal}
        selectedHeader={selectedHeader}
        setSelectedHeader={setSelectedHeader}
        selectedBody={selectedBody}
        setSelectedBody={setSelectedBody}
        selectedFooter={selectedFooter}
        setSelectedFooter={setSelectedFooter}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        bodyItems={bodyItems[selectedBody] || []}
        setBodyItems={(items) => {
          setBodyItems((prev) => {
            const updatedMap = { ...prev, [selectedBody]: items };
            localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(items));
            return updatedMap;
          });
        }}
        setBodyColor={setBodyColor}
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
  selectedBody={selectedBody}
  bodyItems={bodyItems} // ✅ Geef volledige map door
  setBodyItems={setBodyItems}
  previewMode={previewMode}
/>

      </main>
    </div>
  );
}
