export { default as Footer1 } from "./Footer1";
export { default as Footer2 } from "./Footer2";
export { default as Footer3 } from "./Footer3";
export { default as Footer4 } from "./Footer4";
export { default as Footer5 } from "./Footer5";

import { FooterProps } from "../types";
import Footer1 from "./Footer1";
import Footer2 from "./Footer2";
import Footer3 from "./Footer3";
import Footer4 from "./Footer4";
import Footer5 from "./Footer5";

const footers: { [key: string]: React.FC<FooterProps> } = {
  footer1: Footer1,
  footer2: Footer2,
  footer3: Footer3,
  footer4: Footer4,
  footer5: Footer5,
};

export default footers;
