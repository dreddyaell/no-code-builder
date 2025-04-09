// src/Test/Home.test.tsx

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

Object.defineProperty(global, "crypto", {
    value: {
      randomUUID: () => "mock-uuid-123",
    },
  });

// Mocks voor child components
jest.mock("@/components/Taskbar", () => (props: any) => (
  <div data-testid="taskbar">
    <button onClick={() => props.setPreviewMode(!props.previewMode)}>Toggle Preview</button>
    <button onClick={() => props.openModal("header", "text")}>Add Header Text</button>
  </div>
));

jest.mock("@/components/LayoutBuilder", () => (props: any) => (
  <div data-testid="layout-builder">
    Layout voor: {props.selectedHeader}, {props.selectedBody}, {props.selectedFooter}
  </div>
));

// Storage mocking
beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key.startsWith("headerItems")) return JSON.stringify([]);
    if (key.startsWith("footerItems")) return JSON.stringify([]);
    if (key.startsWith("bodyItems")) return JSON.stringify([]);
    if (key === "selectedHeader") return "header1";
    if (key === "selectedBody") return "body1";
    if (key === "selectedFooter") return "footer1";
    if (key === "logoUrl") return "/logo.png";
    return null;
  });

  Storage.prototype.setItem = jest.fn();
});

describe("🏠 Home Page", () => {
  it("rendert basis layout", () => {
    render(<Home />);
    expect(screen.getByTestId("taskbar")).toBeInTheDocument();
    expect(screen.getByTestId("layout-builder")).toBeInTheDocument();
  });

  it("kan preview mode toggelen via taskbar", () => {
    render(<Home />);
    const toggleBtn = screen.getByText("Toggle Preview");
    act(() => {
      fireEvent.click(toggleBtn);
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("logoUrl", "/logo.png");
  });

  it("kan openModal aanroepen via taskbar", () => {
    render(<Home />);
    const modalBtn = screen.getByText("Add Header Text");
    act(() => {
      fireEvent.click(modalBtn);
    });

    // LocalStorage moet geüpdatet zijn
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "headerItems-header1",
      expect.stringContaining("Nieuwe tekst")
    );
  });

  it("laadt juiste default states", () => {
    render(<Home />);
    expect(screen.getByTestId("layout-builder")).toHaveTextContent("header1");
    expect(screen.getByTestId("layout-builder")).toHaveTextContent("body1");
    expect(screen.getByTestId("layout-builder")).toHaveTextContent("footer1");
  });
});
