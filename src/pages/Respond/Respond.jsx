// @flow
import React from "react";

import { Heading1, BodyText } from "../../kit/typography";

import css from "./Respond.module.scss";

const Respond = () => {
  return (
    <div className={css.container}>
      <Heading1>Celebrate with us</Heading1>
      <BodyText>RSVP coming soon</BodyText>
    </div>
  );
};

export default Respond;
