"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  withHandle?: boolean;
}

export default function SortableItem({
  id,
  children,
  className,
  withHandle = true,
}: SortableItemProps) {
  const {
    setNodeRef,
    transform,
    transition,
    listeners,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`select-none ${className || ""}`}
    >
      <div className="flex gap-2 items-start">
        {withHandle && (
          <span
            {...listeners}
            className="cursor-grab text-xl px-2"
            tabIndex={-1} 
          >
            ⠿
          </span>
        )}
        <div className="pointer-events-auto w-full">{children}</div>
      </div>
    </div>
  );
}
