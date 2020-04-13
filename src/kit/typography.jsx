// @flow
import React from "react";
import type { Node } from "react";
import classNames from "classnames";

import css from "./typography.module.scss";

type TypographyProps = {
  className?: string,
  children: Node
};

export const Heading1 = ({ className, children }: TypographyProps) => {
  return <h1 className={classNames(css.h1, className)}>{children}</h1>;
};

export const Heading2 = ({ className, children }: TypographyProps) => {
  return <h2 className={classNames(css.h2, className)}>{children}</h2>;
};

export const Heading3 = ({ className, children }: TypographyProps) => {
  return <h3 className={classNames(css.h3, className)}>{children}</h3>;
};

export const Heading4 = ({ className, children }: TypographyProps) => {
  return <h4 className={classNames(css.h4, className)}>{children}</h4>;
};

export const Heading5 = ({ className, children }: TypographyProps) => {
  return <h5 className={classNames(css.h5, className)}>{children}</h5>;
};

export const Heading6 = ({ className, children }: TypographyProps) => {
  return <h6 className={classNames(css.h6, className)}>{children}</h6>;
};

export const BodyText = ({ className, children }: TypographyProps) => {
  return <p className={classNames(css.p, className)}>{children}</p>;
};

export const SubTitle = ({ className, children }: TypographyProps) => {
  return <h6 className={classNames(css.subTitle, className)}>{children}</h6>;
};
