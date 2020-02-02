// @flow
import React from "react";

import { Heading1, BodyText } from "../../kit/typography";

import css from "./Home.module.scss";

const Home = () => {
  return (
    <div className={css.container}>
      <Heading1>David Shin & Helen Cho</Heading1>
      <BodyText>October 10, 2020</BodyText>
      <BodyText>Moakyang Presbyterian Church</BodyText>
    </div>
  );
};

export default Home;
