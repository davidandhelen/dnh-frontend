// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";

import css from "./typography.module.scss";

type TypographyProps = {
  classes?: string,
  children: Node
};

export const Heading1 = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.h1, classes);
  return <h1 className={className}>{children}</h1>;
};

export const Heading2 = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.h2, classes);
  return <h2 className={className}>{children}</h2>;
};

export const Heading3 = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.h3, classes);
  return <h3 className={className}>{children}</h3>;
};

export const Heading4 = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.h4, classes);
  return <h4 className={className}>{children}</h4>;
};

export const Heading5 = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.h5, classes);
  return <h5 className={className}>{children}</h5>;
};

export const Heading6 = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.h6, classes);
  return <h6 className={className}>{children}</h6>;
};

export const SubText = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.subText, classes);
  return <h6 className={className}>{children}</h6>;
};

export const BodyText = ({ classes, children }: TypographyProps) => {
  const className = classNames(css.p, classes);
  return <p className={className}>{children}</p>;
};
