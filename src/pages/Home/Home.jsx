// @flow
import React from "react";

import { BodyText, Heading1 } from "../../kit/typography";

import css from "./Home.module.scss";

const Home = () => {
  return (
    <div className={css.container}>
      <Heading1>David & Helen</Heading1>
      <BodyText>October 10, 2020</BodyText>
    </div>
  );
};

export default Home;
