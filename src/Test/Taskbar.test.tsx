import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Taskbar from "@/components/Taskbar";
import "@testing-library/jest-dom";

Object.defineProperty(global, "crypto", {
  value: { randomUUID: () => "mock-taskbar-uuid" },
});

describe("🧰 Taskbar Component", () => {
  const mockSetIsOpen = jest.fn();
  const mockOpenModal = jest.fn();
  const mockSetHeader = jest.fn();
  const mockSetBody = jest.fn();
  const mockSetFooter = jest.fn();
  const mockSetPreview = jest.fn();
  const mockSetBodyItems = jest.fn();
  const mockSetBodyColor = jest.fn();

  const defaultProps = {
    isOpen: true,
    setIsOpen: mockSetIsOpen,
    openModal: mockOpenModal,
    selectedHeader: "header1",
    setSelectedHeader: mockSetHeader,
    selectedBody: "body1",
    setSelectedBody: mockSetBody,
    selectedFooter: "footer1",
    setSelectedFooter: mockSetFooter,
    previewMode: false,
    setPreviewMode: mockSetPreview,
    bodyItems: [],
    setBodyItems: mockSetBodyItems,
    setBodyColor: mockSetBodyColor,
    logoUrl: "/logo.png",
    setLogoUrl: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("kan togglen via knop", () => {
    render(<Taskbar {...defaultProps} isOpen={false} />);
    const knop = screen.getByText("🔼 Instellingen");
    fireEvent.click(knop);
    expect(mockSetIsOpen).toHaveBeenCalledWith(true);
  });

  it("kan preview modus togglen", () => {
    render(<Taskbar {...defaultProps} previewMode={false} />);
    const previewBtn = screen.getByText("UIT");
    fireEvent.click(previewBtn);
    expect(mockSetPreview).toHaveBeenCalledWith(true);
  });

  it("roept openModal aan voor header tekst", () => {
    render(<Taskbar {...defaultProps} />);
    fireEvent.click(screen.getByText("➕ Tekst toevoegen"));
    expect(mockOpenModal).toHaveBeenCalledWith("header", "text");
  });

  it("roept openModal aan voor header afbeelding", () => {
    render(<Taskbar {...defaultProps} />);
    fireEvent.click(screen.getByText("🖼️ Afbeelding"));
    expect(mockOpenModal).toHaveBeenCalledWith("header", "image");
  });

  it("wijzigt geselecteerde header", () => {
    render(<Taskbar {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue("HEADER1"), {
      target: { value: "header2" },
    });
    expect(mockSetHeader).toHaveBeenCalledWith("header2");
  });

  it("wijzigt geselecteerde body", () => {
    render(<Taskbar {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue("BODY1"), {
      target: { value: "body2" },
    });
    expect(mockSetBody).toHaveBeenCalledWith("body2");
  });

  it("wijzigt geselecteerde footer", () => {
    render(<Taskbar {...defaultProps} />);
    fireEvent.change(screen.getByDisplayValue("FOOTER1"), {
      target: { value: "footer3" },
    });
    expect(mockSetFooter).toHaveBeenCalledWith("footer3");
  });

  it("toont waarschuwing bij image upload in body1", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<Taskbar {...defaultProps} selectedBody="body1" />);
  
    const input = screen.getByTestId("file-upload");
    fireEvent.change(input, {
      target: {
        files: [new File(["dummy"], "image.png", { type: "image/png" })],
      },
    });
  
    expect(alertMock).toHaveBeenCalledWith("📸 Alleen body2 en body3 ondersteunen afbeeldingen.");
    alertMock.mockRestore();
  });
});
