import BaseHeader from "@/components/BaseHeader";
import { HeaderItem } from "@/components/variants/types";

interface Header1Props {
  items: HeaderItem[];
  logoUrl: string;
  setLogoUrl?: (url: string) => void;
  onEdit?: (item: HeaderItem) => void;
  onDelete?: (id: string) => void;
  updateItemPosition?: (id: string, x: number, y: number) => void;
}

export default function Header1(props: Header1Props) {
  return (
    <BaseHeader
      {...props}
      renderLayout={(logo, nav, children) => (
        <header className="relative min-h-[150px] bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">{logo}{nav}</div>
          {children}
        </header>
      )}
    />
  );
}
