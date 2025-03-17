// ✅ Type voor een enkel navigatie-item in de header
export interface HeaderItem {
  id: string;
  content: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

// ✅ Props voor headers (elke header krijgt een lijst met items)
export interface HeaderProps {
  items: HeaderItem[];
}

// ✅ Type voor een enkel item in de footer (bijv. copyright, links)
export interface FooterItem {
  id: string;
  content: string;
}

// ✅ Props voor footers (elke footer krijgt een lijst met items)
export interface FooterProps {
  items: FooterItem[];
}
