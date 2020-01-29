/* eslint-disable no-unused-vars, no-console*/
// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import { Heading1, BodyText } from "../../kit/typography";

import Button from "../../kit/Button";
import Input from "../../kit/Input";

import PlusOne from "./PlusOne";

import css from "./Repondez.module.scss";

const required = value => (value ? undefined : "Required");

/**
 * The mutation needs to:
 *   - Update the user's rsvpStatus to true
 *   - Create a new user for the guest, whose rsvpStatus is true
 *   - Create as many new users as there are plus ones
 *
 */
const RSVP_MUTATION = gql`
  mutation CreatePlusOne(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $guestType: String!
    $rsvpStatus: Boolean!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      guestType: $guestType
      rsvpStatus: $rsvpStatus
    ) {
      token
      user {
        firstName
      }
    }
  }
`;

// const UPDATE_RSVP_STATUS_MUTATION = gql``;

const GuestForm = ({ guestCount, onSubmit }) => {
  const guestSections = [];

  for (let i = 0; i < guestCount; i++) {
    guestSections.push(
      <Field key={i} name={`firstName${i}`}>
        {props => (
          <Input
            name={props.input.name}
            onChange={props.input.onChange}
            placeholder="First Name"
            value={props.input.value}
          />
        )}
      </Field>
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          {guestSections}
          {/* <BodyText>Guest 1</BodyText>
          <Field name="firstName">
            {props => (
              <Input
                name={props.input.name}
                onChange={props.input.onChange}
                placeholder="First Name"
                value={props.input.value}
              />
            )}
          </Field> */}
          {/* <Field name="lastName">
            {props => (
              <Input
                name={props.input.name}
                onChange={props.input.onChange}
                placeholder="Last Name"
                value={props.input.value}
              />
            )}
          </Field>
          <Field name="phone" validate={required}>
            {({ input }) => (
              <Input
                name={input.name}
                onChange={input.onChange}
                placeholder="Phone number"
                type="tel"
                value={input.value}
              />
            )}
          </Field> */}
          <Button type="submit">Reserve</Button>
        </form>
      )}
    </Form>
  );
};

const Repondez = props => {
  const { user: { allowedPlusOnes } = {} } = props;

  const [isShowingGuestForm, toggleGuestForm] = useState(false);
  const [guest, updateGuest] = useState([]);

  const [createGuest, { error, loading }] = useMutation(RSVP_MUTATION, {
    onCompleted({ createGuest }) {
      console.log(createGuest);
    }
  });

  const onSubmit = values => {
    console.log("Submitting form");
    console.log(values);
    // TODO: RSVP users here.
    createGuest({
      variables: {
        firstName: "",
        lastName: "",
        phone: "",
        guestType: "",
        rsvpStatus: true
      }
    });
  };

  let headingText;
  if (!allowedPlusOnes) {
    headingText = `${props.user.firstName}, reserve your spot at the table.`;
  } else if (allowedPlusOnes === 1) {
    headingText = `${props.user.firstName}, reserve a spot at the table for you and a guest.`;
  } else if (allowedPlusOnes > 1) {
    headingText = `${props.user.firstName}, reserve a spot at the table for you and your guests.`;
  }

  return (
    <div className={css.container}>
      <Heading1>{headingText}</Heading1>
      <GuestForm guestCount={allowedPlusOnes} onSubmit={onSubmit} />
    </div>
  );
};

export default Repondez;
