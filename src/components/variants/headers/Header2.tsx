"use client";

interface HeaderProps {
  color?: string;
}

export default function Header2({ color = "black" }: HeaderProps) {
  return <h1 style={{ color }}>Header 2</h1>;
}