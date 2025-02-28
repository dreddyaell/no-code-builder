"use client";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import DynamicComponent from "./DynamicComponent";
import Settings from "./Settings"; // ✅ Voeg de instellingencomponent toe

export default function LayoutBuilder() {
  const [selectedHeader, setSelectedHeader] = useState("header1");

  const [layout, setLayout] = useState([
    { id: "header", type: selectedHeader }, // ✅ Dynamische header
    { id: "body", type: "body" },
    { id: "footer1", type: "footer1" },
  ]);

  

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = layout.findIndex(item => item.id === active.id);
      const newIndex = layout.findIndex(item => item.id === over.id);
      setLayout(arrayMove(layout, oldIndex, newIndex));
    }
  };

  // ✅ Update de layout wanneer de header verandert
  const handleHeaderChange = (newHeader: string) => {
    setSelectedHeader(newHeader);
    setLayout((prevLayout) =>
      prevLayout.map((item) => item.id === "header" ? { ...item, type: newHeader } : item)
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* ✅ Instellingen sectie */}
      <Settings selectedHeader={selectedHeader} setSelectedHeader={handleHeaderChange} />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={layout.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {layout.map(item => (
              <SortableItem key={item.id} id={item.id}>
                <DynamicComponent type={item.type} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
