import React from "react";

import "./buttons.scss";

export const PrimaryButton = (props) => {
  const { text, background, onClick } = props;
  return (
    <button className="btn" onClick={onClick} style={{ background: background }}>
      <svg className="border">
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
        <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
      </svg>
      <span>{text}</span>
    </button>
  );
};
