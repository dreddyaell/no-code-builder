// src/components/DynamicComponent.tsx
"use client";
import React from "react";
import Header1 from "./variants/headers/Header1";
import Header2 from "./variants/headers/Header2";
import Footer1 from "./variants/footers/Footer1";
import Footer2 from "./variants/footers/Footer2";

import { HeaderProps, FooterProps } from "./variants/types";

type DynamicComponentProps =
  | {
      type: "header1" | "header2";
      props: HeaderProps;
    }
  | {
      type: "footer1" | "footer2";
      props: FooterProps;
    };

export default function DynamicComponent({ type, props }: DynamicComponentProps) {
  switch (type) {
    case "header1":
      return <Header1 {...props} />;
    case "header2":
      return <Header2 {...props} />;
    case "footer1":
      return <Footer1 {...props} />;
    case "footer2":
      return <Footer2 {...props} />;
    default:
      return <div>⚠️ Component niet gevonden: {type}</div>;
  }
}
