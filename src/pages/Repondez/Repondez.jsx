/* eslint-disable no-unused-vars */
// @flow
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import { Heading1, Heading2 } from "../../kit/typography";

import Button from "../../kit/Button";
import Input from "../../kit/Input";

import PlusOne from "./PlusOne";

import css from "./Repondez.module.scss";

const Repondez = props => {
  const onSubmit = values => {
    // console.log("Submitting form");
    // console.log(values);
    // TODO: RSVP users here.
  };

  // const renderPlusOneSection = count => {
  //   const sections = [];
  //   for (let i = 0; i < count; i++) {
  //     sections.push(
  //       <PlusOne
  //         count={i}
  //         key={i}
  //         onChange={onChange}
  //         updateGuest={updateGuest}
  //       />
  //     );
  //   }
  //   return sections;
  // };

  const { user: { allowedPlusOnes } = {} } = props;
  const [isShowingGuestForm, toggleGuestForm] = useState(false);
  const [guest, updateGuest] = useState([]);

  return (
    <div className={css.container}>
      <Heading1>
        {props.user.firstName}, reserve your spot at the table.
      </Heading1>
      <Form onSubmit={onSubmit}>
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name="firstName" placeholder="First Name">
              {props => (
                <Input
                  name={props.input.name}
                  onChange={props.input.onChange}
                  placeholder={props.input.placeholder}
                  value={props.input.value}
                />
              )}
            </Field>
            <Field name="lastName">
              {props => (
                <Input
                  name={props.input.name}
                  onChange={props.input.onChange}
                  value={props.input.value}
                />
              )}
            </Field>
            <Field name="phone">
              {props => (
                <Input
                  name={props.input.name}
                  onChange={props.input.onChange}
                  value={props.input.value}
                />
              )}
            </Field>
            <Button type="submit">Reserve</Button>
          </form>
        )}
      </Form>
    </div>
  );
};

export default Repondez;
