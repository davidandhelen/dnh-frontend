// @flow
import React from "react";

import { Heading1, Heading2, BodyText } from "../../kit/typography";
import CTALink from "../../kit/CTALink";

import image1793 from "./assets/1793.jpg";

import css from "./Wedding.module.scss";

const Wedding = () => {
  return (
    <div className={css.container}>
      <div className={css.section}>
        <img alt="" src={image1793} />
      </div>
      <div className={css.section}>
        <Heading1>Wedding</Heading1>
        <BodyText>Saturday, October 10, 2020</BodyText>
        <BodyText>Doors open 3:30 PM</BodyText>
        <BodyText>Attire: Cocktail attire</BodyText>
      </div>
      <div className={css.section}>
        <Heading2>Ceremony and Reception</Heading2>
        <BodyText>Beverley Social Club</BodyText>
        <BodyText>1016 Beverley Rd</BodyText>
        <BodyText>Brooklyn, New York, NY 11218</BodyText>
      </div>
      <div className={css.section}>
        <BodyText>
          Celebrate our day of union in a 1920&apos;s Victorian ballroom. The
          <CTALink href="https://beverleysocialclub.com/">
            Beverley Social Club
          </CTALink>{" "}
          is located in Victorian Flatbush, Brooklyn. The building served as a
          Prohibition era clubhouse, a catering hall, and a place of workship.
          It was recently restored and renovated as an event hall.
        </BodyText>
      </div>
    </div>
  );
};

export default Wedding;
