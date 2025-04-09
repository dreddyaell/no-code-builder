import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import LayoutBuilder from "@/components/LayoutBuilder";
import { HeaderItem, FooterItem } from "@/components/variants/types";

describe("🧱 LayoutBuilder", () => {
  const mockHeaderItems: HeaderItem[] = [
    {
      id: "h1",
      type: "text",
      content: "Header Tekst",
      width: 150,
      height: 40,
      fontSize: 14,
      fontFamily: "Arial",
      textColor: "#000000",
      x: 0,
      y: 0,
    },
  ];

  const mockFooterItems: { [key: string]: FooterItem[] } = {
    footer1: [],
    footer2: [],
    footer3: [],
    footer4: [],
    footer5: [],
  };

  const mockBodyItems: HeaderItem[] = [];

  it("render werkt zonder crash", () => {
    render(
      <LayoutBuilder
        selectedHeader="header1"
        headerItems={mockHeaderItems}
        setHeaderItems={jest.fn()}
        selectedFooter="footer3" // 
        footerItems={mockFooterItems}
        setFooterItems={jest.fn()}
        selectedBody="body1"
        bodyItems={mockBodyItems}
        setBodyItems={jest.fn()}
        logoUrl="/logo.png"
        setLogoUrl={jest.fn()}
        previewMode={false}
      />
    );

    expect(screen.getByText("Header Tekst")).toBeInTheDocument();

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByText("Overzicht")).toBeInTheDocument();
  });

  it("laat edit modal zien bij onEdit trigger", () => {
    const setHeaderItems = jest.fn();

    render(
      <LayoutBuilder
        selectedHeader="header1"
        headerItems={mockHeaderItems}
        setHeaderItems={setHeaderItems}
        selectedFooter="footer3"
        footerItems={mockFooterItems}
        setFooterItems={jest.fn()}
        selectedBody="body1"
        bodyItems={mockBodyItems}
        setBodyItems={jest.fn()}
        logoUrl="/logo.png"
        setLogoUrl={jest.fn()}
        previewMode={false}
      />
    );

    const editButton = screen.getByRole("button", { name: "✏️" });
    fireEvent.click(editButton);

    expect(screen.getByText("🎨 Element Bewerken")).toBeInTheDocument();
  });
});
