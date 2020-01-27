/* eslint-disable no-unused-vars */
// @flow
import React, { useState } from "react";

import { Heading1, Heading2 } from "../../kit/typography";

import Button from "../../kit/Button";

import PlusOne from "./PlusOne";

import css from "./Repondez.module.scss";

const Repondez = props => {
  const onChange = event => {
    // TODO: Set state for each input
  };

  const onSubmit = event => {
    event.preventDefault();
    // TODO: RSVP users here.
  };

  const renderPlusOneSection = count => {
    const sections = [];
    for (let i = 0; i < count; i++) {
      sections.push(<PlusOne count={i} key={i} onChange={onChange} />);
    }
    return sections;
  };

  const { user: { allowedPlusOnes } = {} } = props;
  const [isShowingGuestForm, toggleGuestForm] = useState(false);
  const [form, updateForm] = useState({});

  return (
    <div className={css.container}>
      <Heading1>
        {props.user.firstName}, reserve your spot at the table.
      </Heading1>
      {!!allowedPlusOnes && (
        <>
          <Heading2>
            You have {allowedPlusOnes} guest{allowedPlusOnes > 1 ? "s " : " "}
            to your name.
          </Heading2>
          <Button onClick={() => toggleGuestForm(true)}>
            Enter guest information
          </Button>
        </>
      )}
      <form className={css.form} onSubmit={onSubmit}>
        {isShowingGuestForm && renderPlusOneSection(allowedPlusOnes)}
        <Button type="submit">Reserve</Button>
      </form>
    </div>
  );
};

export default Repondez;
