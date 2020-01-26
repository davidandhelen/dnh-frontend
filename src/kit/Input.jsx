// @flow
import React from "react";

import css from "./Input.module.scss";

const Input = props => {
  return <input className={css.input} {...props} />;
};

export default Input;
