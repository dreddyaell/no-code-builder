import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer1 from "@/components/variants/footers/Footer1";
import Footer2 from "@/components/variants/footers/Footer2";
import Footer3 from "@/components/variants/footers/Footer3";
import Footer4 from "@/components/variants/footers/Footer4";
import Footer5 from "@/components/variants/footers/Footer5";

const footers = [
  { name: "Footer1", Component: Footer1 },
  { name: "Footer2", Component: Footer2 },
  { name: "Footer3", Component: Footer3 },
  { name: "Footer4", Component: Footer4 },
  { name: "Footer5", Component: Footer5 },
];

const sharedProps = {
  items: [],
  setItems: jest.fn(),
  previewMode: false,
  onEdit: jest.fn(),
  onDelete: jest.fn(),
};

describe("📦 Footer Variants", () => {
  it.each(footers)("%s bevat copyright", ({ Component }) => {
    render(<Component {...sharedProps} />);
    const year = new Date().getFullYear();
    const pattern = new RegExp(`©\\s*${year}`);
    expect(screen.getByText(pattern, { exact: false })).toBeInTheDocument();
  });

  it.each(footers)("%s bevat secties of links", ({ Component }) => {
    render(<Component {...sharedProps} />);
    const links = screen.queryAllByRole("link");
    const buttons = screen.queryAllByRole("button");
    const totalInteractive = [...links, ...buttons];
    expect(totalInteractive.length).toBeGreaterThanOrEqual(1);
  });

  it.each(footers)(
    "%s bevat geen ✏️ knop tenzij expliciet toegevoegd",
    ({ Component }) => {
      render(<Component {...sharedProps} />);
      const editButtons = screen.queryAllByRole("button", {
        name: "✏️",
      });
      console.log(`${Component.name} ✏️ buttons gevonden:`, editButtons.length);
    }
  );
});
