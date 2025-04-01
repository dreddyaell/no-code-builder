"use client";

import headers from "@/components/variants/headers";
import { HeaderItem } from "@/components/variants/types";
import type { DragEndEvent } from "@dnd-kit/core";

export interface HeaderProps {
  selectedHeader: string;
  items: HeaderItem[];
  logoUrl: string;
  setLogoUrl?: (url: string) => void;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
}

export default function Header({
  selectedHeader,
  items,
  logoUrl,
  setLogoUrl,
  onEdit,
  onDelete,
  onDragEnd,
  updateItemPosition,
}: HeaderProps) {
  const HeaderComponent = headers[selectedHeader] || headers["header1"];

  return (
    <HeaderComponent
      items={items}
      logoUrl={logoUrl ?? ""}
      setLogoUrl={setLogoUrl}
      onEdit={onEdit}
      onDelete={onDelete}
      onDragEnd={onDragEnd}
      updateItemPosition={updateItemPosition}
    />
  );
}
