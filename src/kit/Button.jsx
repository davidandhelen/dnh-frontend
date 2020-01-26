// @flow
import React from "react";

import css from "./Button.module.scss";

const Button = ({ children, ...rest }) => {
  return (
    <button className={css.button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
