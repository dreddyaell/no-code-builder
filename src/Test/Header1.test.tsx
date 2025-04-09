import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header1 from "@/components/variants/headers/Header1";
import { HeaderItem } from "@/components/variants/types";

describe("🧢 Header1", () => {
  const mockItems: HeaderItem[] = [
    {
      id: "item1",
      type: "text",
      content: "👋 Welkom!",
      width: 150,
      height: 40,
      fontSize: 16,
      fontFamily: "Arial",
      textColor: "#000000",
      x: 0,
      y: 0,
    },
  ];

  const noop = jest.fn();

  it("rendert header met correcte tekst", () => {
    render(
      <Header1
        items={mockItems}
        logoUrl="/logo.png"
        setLogoUrl={noop}
        onEdit={noop}
        onDelete={noop}
        previewMode={false}
      />
    );

    expect(screen.getByText("👋 Welkom!")).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("activeert onEdit bij klikken op ✏️", () => {
    const mockOnEdit = jest.fn();

    render(
      <Header1
        items={mockItems}
        logoUrl="/logo.png"
        setLogoUrl={noop}
        onEdit={mockOnEdit}
        onDelete={noop}
        previewMode={false}
      />
    );

    const editButton = screen.getByRole("button", { name: "✏️" });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockItems[0]);
  });

  it("activeert onDelete bij klikken op ❌", () => {
    const mockOnDelete = jest.fn();

    render(
      <Header1
        items={mockItems}
        logoUrl="/logo.png"
        setLogoUrl={noop}
        onEdit={noop}
        onDelete={mockOnDelete}
        previewMode={false}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "❌" });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("item1");
  });
});
