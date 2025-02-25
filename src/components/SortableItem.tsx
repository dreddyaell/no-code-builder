"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export default function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform) || undefined,
    transition: transition || undefined,
    border: "none", // ❌ Geen randen
    background: "transparent", // ❌ Geen achtergrond
    borderRadius: "0px",
    cursor: "default", // ❌ Geen sleep-indicator
    width: "max-content", // ✅ Laat breedte afhangen van de tekst, maar respecteer de limieten
    maxWidth: "100%", // ✅ Voorkomt dat het element te breed wordt
    minWidth: "50px", // ✅ Zorgt ervoor dat er altijd een basisbreedte is
    height: "auto", // ✅ Hoogte past zich aan de tekstinhoud aan
    display: "block", // ✅ Laat het zich gedragen als een blok-element
    overflowWrap: "break-word", // ✅ Zorgt dat lange woorden breken
    whiteSpace: "normal", // ✅ Laat de tekst in meerdere regels vloeien
    padding: "5px", // ✅ Kleine padding voor leesbaarheid
    textAlign: "left", // ✅ Tekst links uitlijnen
  };
  

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
