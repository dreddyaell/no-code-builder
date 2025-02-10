"use client";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem"; // Helpercomponent voor dragbare items
import DynamicComponent from "./DynamicComponent";

export default function LayoutBuilder() {
  const [layout, setLayout] = useState([
    { id: "header1", type: "header1" },
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

  return (
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
  );
}
