"use client";

interface HeaderProps {
  color?: string;
}

export default function Header1({ color = "black" }: HeaderProps) {
  return <h1 style={{ color }}>Header 1</h1>;
}
