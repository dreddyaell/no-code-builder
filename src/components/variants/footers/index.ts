export { default as Footer1 } from "./Footer1";

import { FooterProps } from "../types";
import Footer1 from "./Footer1";

const footers: { [key: string]: React.FC<FooterProps> } = {
  footer1: Footer1,
};

export default footers;
