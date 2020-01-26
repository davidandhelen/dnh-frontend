// @flow
import React, { useState } from "react";

import { Heading1, Heading2 } from "../../kit/typography";

import Button from "../../kit/Button";

import PlusOne from "./PlusOne";

import css from "./Repondez.module.scss";

const renderPlusOneSection = count => {
  const sections = [];
  for (let i = 0; i < count; i++) {
    sections.push(<PlusOne key={i} />);
  }
  return sections;
};

const Repondez = props => {
  const onSubmit = event => {
    event.preventDefault();
    // TODO: RSVP users here.
  };

  /**
   * Check how many plus ones this guest is allowed,
   * and render as many plus one sections as is allowed.
   */

  const { user: { allowedPlusOnes } = {} } = props;

  const [isReservingPlusOne, updatePlusOneReservation] = useState(false);

  const plusOneButtonText =
    props.user.allowedPlusOnes > 1 ? "Reserve guests" : "Reserve a guest";

  return (
    <div className={css.container}>
      <Heading1>
        {props.user.firstName}, reserve your spot at the table.
      </Heading1>
      <form className={css.form} onSubmit={onSubmit}>
        {!!allowedPlusOnes && (
          <>
            <Heading2>You have {allowedPlusOnes} guests to your name.</Heading2>
            <Button onClick={() => updatePlusOneReservation(true)}>
              {plusOneButtonText}
            </Button>
          </>
        )}
        {isReservingPlusOne && renderPlusOneSection(allowedPlusOnes)}
        <Button type="submit">Reserve</Button>
      </form>
    </div>
  );
};

Repondez.defaultProps = {
  user: {
    firstName: "Royce",
    lastName: "Kim",
    allowedPlusOnes: 3
  }
};

export default Repondez;
