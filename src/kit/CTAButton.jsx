// @flow
import React from "react";
import type { Node } from "react";

import { SubTitle } from "./typography";

import css from "./CTAButton.module.scss";

type Props = {
  children: Node,
  onClick: () => void
};

const CTAButton = ({ children, onClick }: Props) => {
  return (
    <div className={css.wrapper}>
      <button className={css.button} onClick={onClick}>
        <SubTitle className={css.text}>{children}</SubTitle>
      </button>
    </div>
  );
};

export default CTAButton;
