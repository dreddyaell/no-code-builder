export { default as Footer1 } from "./Footer1";
export { default as Footer2 } from "./Footer2";
// Voeg hier meer footers toe als je wilt

import Footer1 from "./Footer1";
import Footer2 from "./Footer2";

const footers: { [key: string]: React.FC } = {
    footers1: Footer1,
    footers2: Footer2,
};

export default footers;