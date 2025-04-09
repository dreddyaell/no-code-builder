import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header2 from "@/components/variants/headers/Header2";
import { HeaderItem } from "@/components/variants/types";

describe("🎩 Header2", () => {
  const mockItems: HeaderItem[] = [
    {
      id: "item2",
      type: "text",
      content: "📣 Nieuws!",
      width: 180,
      height: 50,
      fontSize: 18,
      fontFamily: "Verdana",
      textColor: "#333333",
      x: 10,
      y: 5,
    },
  ];

  const noop = jest.fn();

  it("rendert header met content correct", () => {
    render(
      <Header2
        items={mockItems}
        logoUrl="/logo.png"
        setLogoUrl={noop}
        onEdit={noop}
        onDelete={noop}
        previewMode={false}
      />
    );

    expect(screen.getByText("📣 Nieuws!")).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("roept onEdit op bij klikken op ✏️", () => {
    const mockOnEdit = jest.fn();

    render(
      <Header2
        items={mockItems}
        logoUrl="/logo.png"
        setLogoUrl={noop}
        onEdit={mockOnEdit}
        onDelete={noop}
        previewMode={false}
      />
    );

    const editBtn = screen.getByRole("button", { name: "✏️" });
    fireEvent.click(editBtn);

    expect(mockOnEdit).toHaveBeenCalledWith(mockItems[0]);
  });

  it("roept onDelete op bij klikken op ❌", () => {
    const mockOnDelete = jest.fn();

    render(
      <Header2
        items={mockItems}
        logoUrl="/logo.png"
        setLogoUrl={noop}
        onEdit={noop}
        onDelete={mockOnDelete}
        previewMode={false}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: "❌" });
    fireEvent.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledWith("item2");
  });
});
