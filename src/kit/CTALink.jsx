// @flow
import React from "react";
import type { Node } from "react";

import { SubTitle } from "./typography";

import css from "./CTALink.module.scss";

type Props = {
  children: Node,
  href: string
};

const CTALink = ({ children, href }: Props) => {
  return (
    <span className={css.wrapper}>
      <a className={css.link} href={href}>
        <SubTitle className={css.text}>{children}</SubTitle>
      </a>
    </span>
  );
};

export default CTALink;
