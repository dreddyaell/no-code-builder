"use client";

import { useEffect, useState } from "react";
import { HeaderItem, FooterItem } from "@/components/variants/types";
import headers from "@/components/variants/headers";
import bodies from "@/components/variants/bodies";
import footers from "@/components/variants/footers";

interface LayoutBuilderProps {
  selectedHeader: string;
  selectedFooter: string;
  selectedBody: string;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  headerItems: HeaderItem[];
  setHeaderItems: React.Dispatch<React.SetStateAction<{ [key: string]: HeaderItem[] }>>;
  footerItems: FooterItem[];
  setFooterItems: React.Dispatch<React.SetStateAction<{ [key: string]: FooterItem[] }>>;
  previewMode: boolean;
}

export default function LayoutBuilder({
  selectedHeader,
  selectedFooter,
  selectedBody,
  logoUrl,
  setLogoUrl,
  headerItems,
  setHeaderItems,
  footerItems,
  setFooterItems,
  previewMode,
}: LayoutBuilderProps) {
  const HeaderComponent = headers[selectedHeader];
  const BodyComponent = bodies[selectedBody];
  const FooterComponent = footers[selectedFooter];

  const [bodyItems, setBodyItems] = useState<HeaderItem[]>(() => {
    const saved = localStorage.getItem(`bodyItems-${selectedBody}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HeaderItem | null>(null);

  useEffect(() => {
    localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(bodyItems));
  }, [bodyItems, selectedBody]);

  const updateItemPosition = (id: string, x: number, y: number) => {
    const update = (items: HeaderItem[]) =>
      items.map((item) => (item.id === id ? { ...item, x, y } : item));

    if (headerItems.some((i) => i.id === id)) {
      const updated = update(headerItems);
      setHeaderItems((prev) => ({
        ...prev,
        [selectedHeader]: updated,
      }));
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
    } else if (bodyItems.some((i) => i.id === id)) {
      const updated = update(bodyItems);
      setBodyItems(updated);
      localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
    } else {
      const updated = footerItems.map((item) =>
        item.id === id ? { ...item, x, y } : item
      );
      setFooterItems((prev) => ({
        ...prev,
        [selectedFooter]: updated,
      }));
      localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
    }
  };

  const openEditModal = (item: HeaderItem) => {
    setSelectedItem({ ...item });
    setEditModalOpen(true);
  };

  const updateSelectedItem = (field: keyof HeaderItem, value: any) => {
    setSelectedItem((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const saveEditChanges = () => {
    if (!selectedItem) return;

    const update = (items: HeaderItem[]) =>
      items.map((item) => (item.id === selectedItem.id ? selectedItem : item));

    if (headerItems.some((i) => i.id === selectedItem.id)) {
      const updated = update(headerItems);
      setHeaderItems((prev) => ({
        ...prev,
        [selectedHeader]: updated,
      }));
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
    } else if (bodyItems.some((i) => i.id === selectedItem.id)) {
      const updated = update(bodyItems);
      setBodyItems(updated);
      localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
    } else {
      const updated = footerItems.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      );
      setFooterItems((prev) => ({
        ...prev,
        [selectedFooter]: updated,
      }));
      localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
    }

    setEditModalOpen(false);
  };

  const removeElement = (id: string) => {
    setHeaderItems((prev) => {
      const updated = (prev[selectedHeader] || []).filter((item) => item.id !== id);
      localStorage.setItem(`headerItems-${selectedHeader}`, JSON.stringify(updated));
      return {
        ...prev,
        [selectedHeader]: updated,
      };
    });

    setBodyItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(`bodyItems-${selectedBody}`, JSON.stringify(updated));
      return updated;
    });

    setFooterItems((prev) => {
      const updated = (prev[selectedFooter] || []).filter((item) => item.id !== id);
      localStorage.setItem(`footerItems-${selectedFooter}`, JSON.stringify(updated));
      return {
        ...prev,
        [selectedFooter]: updated,
      };
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 overflow-hidden">
      {HeaderComponent && (
        <HeaderComponent
          items={headerItems}
          logoUrl={logoUrl}
          setLogoUrl={setLogoUrl}
          onEdit={openEditModal}
          onDelete={removeElement}
          updateItemPosition={updateItemPosition}
          previewMode={previewMode}
        />
      )}

      <main className="flex-1 min-h-0 overflow-y-auto">
        {BodyComponent && (
          <BodyComponent
            items={bodyItems}
            onEdit={openEditModal}
            onDelete={removeElement}
            updateItemPosition={updateItemPosition}
            previewMode={previewMode}
          />
        )}
      </main>

      {FooterComponent && (
        <FooterComponent items={footerItems} />
      )}

      {editModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            {/* ...modal content blijft gelijk... */}
          </div>
        </div>
      )}
    </div>
  );
}
