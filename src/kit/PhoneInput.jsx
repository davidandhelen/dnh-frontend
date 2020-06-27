// @flow
import React from "react";

import css from "./Input.module.scss";
import InputPhone from "react-phone-number-input/input";

const PhoneInput = props => {
  return <InputPhone className={css.input} {...props} />;
};

export default PhoneInput;
