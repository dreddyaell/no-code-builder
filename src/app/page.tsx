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
  const [bodyItems, setBodyItems] = useState<HeaderItem[]>(() => {
    const saved = localStorage.getItem("bodyItems-body1");
    return saved ? JSON.parse(saved) : [];
  });
  const [footerItems, setFooterItems] = useState<{ [key: string]: FooterItem[] }>({});

  const [isTaskbarOpen, setIsTaskbarOpen] = useState(true);
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [previewMode, setPreviewMode] = useState(false);

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

    setHeaderItems({ [savedHeader]: savedHeaderItems });
    setFooterItems({ [savedFooter]: savedFooterItems });
  }, []);

  useEffect(() => {
    localStorage.setItem("logoUrl", logoUrl);
  }, [logoUrl]);

  const openModal = (section: "header" | "body" | "footer", type: "text" | "image") => {
    if (type === "image") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = () => {
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          const newItem: HeaderItem = {
            id: crypto.randomUUID(),
            type: "image",
            content: reader.result as string,
            width: 300,
            height: 200,
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
              const updated = [...prev, newItem];
              localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
              return updated;
            });
          }
        };
        reader.readAsDataURL(file);
      };

      input.click();
      return;
    }

    // default: text element
    const newItem: HeaderItem = {
      id: crypto.randomUUID(),
      type: "text",
      content: "Nieuwe tekst",
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
        const updated = [...prev, newItem];
        localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
        return updated;
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
        bodyItems={bodyItems}
        setBodyItems={setBodyItems}
        setBodyColor={() => {}} // optioneel, of implementeren
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
          bodyItems={bodyItems}
          setBodyItems={setBodyItems}
          previewMode={previewMode}
        />
      </main>
    </div>
  );
}
