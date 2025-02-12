import DynamicComponent from "./DynamicComponent";

type HeaderProps = {
  type: string;
};

export default function Header({ type }: HeaderProps) {
  return (
    <header className="w-full fixed top-0 left-0 bg-blue-500 text-white p-4 text-center shadow-md">
      <DynamicComponent type={type} />
    </header>
  );
}
