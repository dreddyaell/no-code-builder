export { default as Footer1 } from "./Footer1";
export { default as Footer2 } from "./Footer2";

import { FooterProps } from "../types";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";

const footers: { [key: string]: React.FC<FooterProps> } = {
  footer1: Footer1,
  footer2: Footer2,
};

export default footers;
