import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header1 from "@/components/variants/headers/Header1";
import Header2 from "@/components/variants/headers/Header2";
import Header3 from "@/components/variants/headers/Header3";
import Header4 from "@/components/variants/headers/Header4";
import Header5 from "@/components/variants/headers/Header5";


import { HeaderItem } from "@/components/variants/types";

const mockItems: HeaderItem[] = [
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

const sharedProps = {
  items: mockItems,
  logoUrl: "/logo.png",
  setLogoUrl: jest.fn(),
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  previewMode: false,
};

const headers = [
  { name: "Header1", Component: Header1 },
  { name: "Header2", Component: Header2 },
  { name: "Header3", Component: Header3 },
  { name: "Header4", Component: Header4 },
  { name: "Header5", Component: Header5 },
];

describe("🧱 Header Variants", () => {
  it.each(headers)("%s rendert zonder crash", ({ Component }) => {
    render(<Component {...sharedProps} />);
    expect(screen.getByText(/Header Tekst/i)).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it.each(headers)("%s laat edit-button zien indien beschikbaar", ({ Component }) => {
    render(<Component {...sharedProps} />);
    const editBtn = screen.queryByRole("button", { name: /✏️/ });
    if (editBtn) {
      fireEvent.click(editBtn);
      expect(sharedProps.onEdit).toHaveBeenCalled();
    }
  });
});
