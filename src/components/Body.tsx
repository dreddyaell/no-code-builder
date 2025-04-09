"use client";

import bodies from "@/components/variants/bodies";
import { HeaderItem } from "@/components/variants/types";
import type { DragEndEvent } from "@dnd-kit/core";

export interface BodyProps {
  selectedBody: string;
  items: HeaderItem[];
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  previewMode?: boolean;
}

export default function Body({
  selectedBody,
  items,
  onEdit,
  onDelete,
  updateItemPosition,
  previewMode,
}: BodyProps) {
  const BodyComponent = bodies[selectedBody] || bodies["body1"];

  return (
    <BodyComponent
      items={items}
      onEdit={onEdit}
      onDelete={onDelete}
      updateItemPosition={updateItemPosition}
      previewMode={previewMode}
    />
  );
}
