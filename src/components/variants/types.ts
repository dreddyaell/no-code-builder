import type { DragEndEvent } from "@dnd-kit/core";
import { BaseHeaderProps } from "@/components/BaseHeader";

export interface HeaderItem {
  id: string;
  content: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  type: "text" | "image";
  width: number;
  height: number;
  x: number; 
  y: number; 
}

export interface HeaderProps extends Partial<BaseHeaderProps> {
  selectedHeader: string;
}

export interface FooterItem {
  id: string;
  type: "text" | "image";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

export interface HeaderProps {
  logoUrl: string;
  setLogoUrl?: (url: string) => void;
  items: HeaderItem[];
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  previewMode?: boolean;
}

export interface FooterItem extends HeaderItem {}

export interface BodyProps {
  items: HeaderItem[];
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
  previewMode?: boolean;
}

export interface FooterProps {
  items: FooterItem[];
}