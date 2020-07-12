// @flow
import className from "classnames";
import React from "react";

import css from "./CenteredPageLoader.module.scss";

const CenteredPageLoader = ({ full, theme }) => (
  <div
    className={className({
      [css.container]: true,
      [css.container_dark]: true,
      [css.container_light]: theme === "light",
      [css.container_full]: full
    })}
  >
    <svg
      height="50"
      viewBox="0 0 50 50"
      width="50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25,5A20.14,20.14,0,0,1,45,22.88a2.51,2.51,0,0,0,2.49,2.26h0A2.52,2.52,0,0,0,50,22.33a25.14,25.14,0,0,0-50,0,2.52,2.52,0,0,0,2.5,2.81h0A2.51,2.51,0,0,0,5,22.88,20.14,20.14,0,0,1,25,5Z"
        fill={theme === "light" ? "#fff" : "#000"}
        opacity="0.2"
      >
        <animateTransform
          attributeName="transform"
          dur="0.8s"
          from="0 25 25"
          repeatCount="indefinite"
          to="360 25 25"
          type="rotate"
        />
      </path>
    </svg>
  </div>
);

export default CenteredPageLoader;
