/* eslint-disable no-unused-vars, no-console*/
// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import { Heading1, Heading2, BodyText } from "../../kit/typography";
import Button from "../../kit/Button";
import Input from "../../kit/Input";
import CenteredPageLoader from "../../kit/CenteredPageLoader";

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

// const RSVP_MUTATION = gql`
//   mutation CreatePlusOne(
//     $firstName: String!
//     $lastName: String!
//     $phone: String!
//     $guestType: String!
//     $rsvpStatus: Boolean!
//   ) {
//     createUser(
//       firstName: $firstName
//       lastName: $lastName
//       phone: $phone
//       guestType: $guestType
//       rsvpStatus: $rsvpStatus
//     ) {
//       token
//       user {
//         firstName
//       }
//     }
//   }
// `;

const UPDATE_RSVP_STATUS_MUTATION = gql`
  mutation UPDATE_RSVP_STATUS($id: ID!, $rsvpStatus: Boolean!) {
    updateUser(id: $id, rsvpStatus: $rsvpStatus) {
      id
      firstName
      rsvpStatus
    }
  }
`;

const AlreadyRsvpedWarning = ({ toggleAlreadyRsvpedWarning }) => (
  <div className={css.warningContainer}>
    <div className={css.warning}>
      <Heading1>You already RSVPed, would you like to change it?</Heading1>
      <Button
        onClick={() => {
          toggleAlreadyRsvpedWarning(false);
        }}
        type="submit"
      >
        →
      </Button>
    </div>
  </div>
);

const GuestForm = ({ guestCount, onSubmit, rsvpInput, setRsvpInput }) => {
  const onChange = e => {
    setRsvpInput(e.target.value);
  };

  return (
    <div className={css.formContainer}>
      <Form onSubmit={onSubmit}>
        {props => (
          <form
            className={css.form}
            onChange={onChange}
            onSubmit={props.handleSubmit}
          >
            <Heading2>Will you be attending?</Heading2>
            <div className={css.radioGroup}>
              <span className={css.radioTrue}>
                <input
                  checked={rsvpInput === "yes"}
                  name="Yes"
                  type="radio"
                  value="yes"
                />
                Yes
              </span>
              <span className={css.radioFalse}>
                <input
                  checked={rsvpInput === "no"}
                  name="No"
                  type="radio"
                  value="no"
                />
                No
              </span>
            </div>
            <Button type="submit">Reserve</Button>
          </form>
        )}
      </Form>
    </div>
  );
};

const Repondez = props => {
  const [isShowingGuestForm, toggleGuestForm] = useState(false);
  const [alreadyRsvpedWarning, toggleAlreadyRsvpedWarning] = useState(
    props.user.rsvpStatus === true || props.user.rsvpStatus === false
  );
  // Loading guest's rsvp status to check if they've already rsvped
  let preLoadedRsvpStatus;
  if (props.user.rsvpStatus !== undefined && props.user.rsvpStatus !== null) {
    if (props.user.rsvpStatus === true) {
      preLoadedRsvpStatus = "yes";
    } else if (props.user.rsvpStatus === false) {
      preLoadedRsvpStatus = "no";
    }
  }

  const [rsvpInput, setRsvpInput] = useState(preLoadedRsvpStatus);
  const [guest, updateGuest] = useState([]);

  const [updateGuestRsvp, { error, loading }] = useMutation(
    UPDATE_RSVP_STATUS_MUTATION,
    {
      onCompleted(data) {
        console.log(data);
      }
    }
  );
  if (!props.user) {
    return <CenteredPageLoader />;
  }
  const {
    user: { allowedPlusOnes }
  } = props;
  const onSubmit = values => {
    console.log("Submitting form");
    console.log(values);
    const rsvpStatus = rsvpInput === "yes" || false;

    updateGuestRsvp({
      variables: { id: props.user.id, rsvpStatus: rsvpStatus }
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
      {alreadyRsvpedWarning ? (
        <AlreadyRsvpedWarning
          toggleAlreadyRsvpedWarning={toggleAlreadyRsvpedWarning}
        />
      ) : (
        <>
          <Heading1>{headingText}</Heading1>
          <GuestForm
            onSubmit={onSubmit}
            rsvpInput={rsvpInput}
            setRsvpInput={setRsvpInput}
          />
        </>
      )}
    </div>
  );
};

export default Repondez;
