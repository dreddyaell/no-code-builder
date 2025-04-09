import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Body1 from "@/components/variants/bodies/Body1";
import Body2 from "@/components/variants/bodies/Body2";
import Body3 from "@/components/variants/bodies/Body3";
import Body4 from "@/components/variants/bodies/Body4";

describe("📦 Body Variants", () => {
  const sharedProps = {
    items: [],
    setItems: jest.fn(),
    previewMode: false,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  const bodies = [
    { name: "Body1", Component: Body1, text: "Blogoverzicht" },
    { name: "Body2", Component: Body2, text: null },
    { name: "Body3", Component: Body3, text: "Welkom bij onze Webshop" },
    { name: "Body4", Component: Body4, text: "Welkom bij de Webshop" },

  ];

  it.each(bodies)("%s rendert correct", ({ Component, text }) => {
    render(<Component {...sharedProps} />);
    if (text) {
      expect(screen.getByText(new RegExp(text, "i"))).toBeInTheDocument();
    }
  });

  it.each(bodies)("%s laat edit-button zien indien beschikbaar", ({ Component }) => {
    render(<Component {...sharedProps} />);
    const buttons = screen.queryAllByRole("button", { name: "✏️" });
    if (buttons.length) {
      fireEvent.click(buttons[0]);
    }
  });
});
