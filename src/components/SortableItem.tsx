import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SortableItem({ id, children, className }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "max-content",
    maxWidth: "100%",
    minWidth: "50px",
    display: "block",
    padding: "5px",
    whiteSpace: "normal",
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={className}>
      {children}
    </div>
  );
}
