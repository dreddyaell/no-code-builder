export interface HeaderItem {
  id: string;
  content: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  type: "text" | "image";
  width: number;
  height: number;
}

export interface FooterItem {
  id: string;
  content: string;
  type: "text" | "image";
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

export interface HeaderProps {
  items: HeaderItem[];
  logoUrl?: string;
  setLogoUrl?: (url: string) => void;
}

export interface FooterProps {
  items: FooterItem[];
}