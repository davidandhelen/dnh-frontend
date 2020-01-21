import React from "react";

import { Heading1, BodyText } from "../../kit/typography";

import css from "./Splash.module.scss";

const Splash = () => {
  return (
    <div className={css.container}>
      <Heading1>David & Helen</Heading1>
      <BodyText>October 10, 2020</BodyText>
    </div>
  );
};

export default Splash;
