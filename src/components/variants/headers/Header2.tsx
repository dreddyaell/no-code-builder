import React from "react";
import { HeaderProps } from "../../Header";

const Header1: React.FC<HeaderProps> = ({ items = [] }) => {
  return (
    <header>
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </header>
  );
};

export default Header1;