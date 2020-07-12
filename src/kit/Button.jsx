// @flow
import classNames from "classnames";
import React from "react";

import css from "./Button.module.scss";

const Button = ({ children, className, theme, ...rest }) => (
  <button
    className={classNames(className, {
      [css.button]: true,
      [css.button_dark]: true,
      [css.button_light]: theme === "light"
    })}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
