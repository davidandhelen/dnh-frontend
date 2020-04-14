// @flow
import React from "react";
import type { Node } from "react";

import { SubTitle } from "./typography";

import css from "./CTALink.module.scss";

type Props = {
  children: Node,
  onClick: () => void
};

const CTALink = ({ children, onClick }: Props) => {
  // TODO: This should return a <button/> or <a/>

  return (
    <div className={css.wrapper}>
      <button className={css.link} onClick={onClick}>
        <SubTitle className={css.text}>{children}</SubTitle>
      </button>
    </div>
  );
};

export default CTALink;
