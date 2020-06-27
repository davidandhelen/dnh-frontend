// @flow
import classNames from "classnames";
import React from "react";

import css from "./Button.module.scss";

const Button = ({ children, theme, ...rest }) => {
  const classes = classNames({
    [css.button]: true,
    [css.button_dark]: true,
    [css.button_light]: theme === "light"
  });

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
