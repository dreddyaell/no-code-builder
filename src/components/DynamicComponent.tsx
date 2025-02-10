import Header1 from "./variants/Header1";
import Header2 from "./variants/Header2";
import Footer1 from "./variants/Footer1";
import Footer2 from "./variants/Footer2";

const componentMap: { [key: string]: React.FC } = {
  "header1": Header1,
  "header2": Header2,
  "footer1": Footer1,
  "footer2": Footer2,
};

type DynamicComponentProps = {
  type: string;
};

export default function DynamicComponent({ type }: DynamicComponentProps) {
  const Component = componentMap[type] || (() => <div>Component niet gevonden</div>);
  return <Component />;
}
