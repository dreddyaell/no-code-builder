import DynamicComponent from "./DynamicComponent";

type FooterProps = {
  type: string;
};

export default function Footer({ type }: FooterProps) {
  return (
    <footer className="w-full fixed bottom-0 left-0 bg-blue-500 text-white p-4 text-center shadow-md">
      <DynamicComponent type={type} />
    </footer>
  );
}
