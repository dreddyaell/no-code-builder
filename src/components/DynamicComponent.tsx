import Header1 from "./variants/headers/Header1";
import Header2 from "./variants/headers/Header2";
import Footer1 from "./variants/footers/Footer1";
import Footer2 from "./variants/footers/Footer2";

const componentMap: { [key: string]: React.FC<{ color?: string }> } = {
  "header1": Header1,
  "header2": Header2,
  "footer1": Footer1,
  "footer2": Footer2,
};

type DynamicComponentProps = {
  type: string;
  color?: string;
};

export default function DynamicComponent({ type, color }: DynamicComponentProps) {
  const Component = componentMap[type] || (() => <div>⚠️ Component niet gevonden</div>);
  return <Component color={color} />;
}