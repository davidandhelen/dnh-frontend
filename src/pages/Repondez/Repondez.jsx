/* eslint-disable no-unused-vars, no-console*/
// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";

import { Heading1, Heading2, BodyText } from "../../kit/typography";
import PlusOne from "./PlusOne";
import Button from "../../kit/Button";
import Input from "../../kit/Input";
import CenteredPageLoader from "../../kit/CenteredPageLoader";

import css from "./Repondez.module.scss";
import NoPermission from "../NoPermission/NoPermission";

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
  mutation UPDATE_RSVP_STATUS(
    $id: ID!
    $rsvpStatus: Boolean!
    $plusOne: UserCreateInput
  ) {
    updateUser(id: $id, rsvpStatus: $rsvpStatus, plusOne: $plusOne) {
      id
      firstName
      rsvpStatus
      plusOne {
        id
        firstName
        lastName
        phone
      }
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

const GuestForm = ({
  onSubmit,
  user,
  rsvpInput,
  setRsvpInput,
  setPlusOneInput,
  plusOneStatus,
  setPlusOneFirstName,
  setPlusOneLastName,
  setPlusOnePhone,
  plusOneFirstName,
  plusOneLastName,
  plusOnePhone
}) => {
  const onRsvpChange = e => {
    setRsvpInput(e.target.value);
  };

  const onPlusOneChange = e => {
    setPlusOneInput(e.target.value);
  };

  return (
    <div className={css.formContainer}>
      {/* <Form onSubmit={onSubmit}> */}
      {/* {props => ( */}
      <div className={css.form}>
        {/* <form
              onChange={onRsvpChange}
              onSubmit={props.handleSubmit}
            > */}
        <Heading2>Will you be attending?</Heading2>
        <div className={css.rsvpRadioGroup}>
          <span className={css.radioTrue}>
            <input
              checked={rsvpInput === "yes"}
              name="rsvpYes"
              onChange={onRsvpChange}
              type="radio"
              value="yes"
            />
            Yes
          </span>
          <span className={css.radioFalse}>
            <input
              checked={rsvpInput === "no"}
              name="rsvpNo"
              onChange={onRsvpChange}
              type="radio"
              value="no"
            />
            No
          </span>
        </div>
      </div>
      {rsvpInput === "yes" && user.allowedPlusOne ? (
        <div className={css.form}>
          <Heading2>Will you be bringing a guest?</Heading2>
          <div className={css.rsvpRadioGroup}>
            <span className={css.radioTrue}>
              <input
                checked={plusOneStatus === "yes"}
                name="plusOneYes"
                onChange={onPlusOneChange}
                type="radio"
                value="yes"
              />
              Yes
            </span>
            <span className={css.radioFalse}>
              <input
                checked={plusOneStatus === "no"}
                name="plusOneNo"
                onChange={onPlusOneChange}
                type="radio"
                value="no"
              />
              No
            </span>
          </div>
        </div>
      ) : null}
      {plusOneStatus === "yes" ? (
        <PlusOne
          plusOneFirstName={plusOneFirstName}
          plusOneLastName={plusOneLastName}
          plusOnePhone={plusOnePhone}
          setPlusOneFirstName={setPlusOneFirstName}
          setPlusOneLastName={setPlusOneLastName}
          setPlusOnePhone={setPlusOnePhone}
        />
      ) : null}
      <Button
        disabled={
          rsvpInput === undefined ||
          rsvpInput === undefined ||
          (plusOneStatus === "yes" &&
            (!plusOneFirstName || !plusOneLastName || !plusOnePhone)) ||
          (user.allowedPlusOne &&
            (plusOneStatus === undefined || plusOneStatus === null))
        }
        onClick={onSubmit}
      >
        Reserve
      </Button>
    </div>
  );
};

const Repondez = props => {
  const [updateGuestRsvp, { error, loading }] = useMutation(
    UPDATE_RSVP_STATUS_MUTATION,
    {
      onCompleted(data) {
        console.log(data);
      },
      skip: !props.user
    }
  );

  const { user } = props || undefined;

  const [alreadyRsvpedWarning, toggleAlreadyRsvpedWarning] = useState(
    user && (user.rsvpStatus === true || user.rsvpStatus === false)
  );
  // Loading guest's rsvp status to check if they've already rsvped
  let preLoadedRsvpStatus;

  if (user && user.rsvpStatus !== undefined && user.rsvpStatus !== null) {
    if (user.rsvpStatus === true) {
      preLoadedRsvpStatus = "yes";
    } else if (user.rsvpStatus === false) {
      preLoadedRsvpStatus = "no";
    }
  }

  let preLoadedPlusOneStatus;
  if (user && user.rsvpStatus === true && user.allowedPlusOne && user.plusOne) {
    preLoadedPlusOneStatus = "yes";
  } else if (
    user &&
    user.rsvpStatus === true &&
    user.allowedPlusOne &&
    !user.plusOne
  ) {
    preLoadedPlusOneStatus = "no";
  } else {
    preLoadedPlusOneStatus = undefined;
  }

  const preLoadedPlusOneInput = {
    firstName: "",
    lastName: "",
    phone: ""
  };
  if (user && user.plusOne) {
    preLoadedPlusOneInput.firstName = user.plusOne.firstName;
    preLoadedPlusOneInput.lastName = user.plusOne.lastName;
    preLoadedPlusOneInput.phone = `+1${user.plusOne.phone}`;
  }

  const [rsvpInput, setRsvpInput] = useState(preLoadedRsvpStatus);
  const [plusOneStatus, setPlusOneInput] = useState(preLoadedPlusOneStatus);
  const [plusOneFirstName, setPlusOneFirstName] = useState(
    preLoadedPlusOneInput.firstName
  );
  const [plusOneLastName, setPlusOneLastName] = useState(
    preLoadedPlusOneInput.lastName
  );
  const [plusOnePhone, setPlusOnePhone] = useState(preLoadedPlusOneInput.phone);

  if (!user) {
    return <NoPermission />;
  }
  const {
    user: { allowedPlusOne }
  } = props;
  const onSubmit = () => {
    console.log("Submitting form");
    const rsvpStatus = rsvpInput === "yes" || false;
    if (rsvpStatus === true && plusOneStatus === "yes") {
      const plusOneInfo = {
        firstName: plusOneFirstName,
        lastName: plusOneLastName,
        phone: plusOnePhone.slice(2),
        guestType: `${user.firstName} Plus One`,
        allowedPlusOne: false
      };
      updateGuestRsvp({
        variables: {
          id: user.id,
          rsvpStatus: rsvpStatus,
          plusOne: plusOneInfo
        }
      });
      console.log(rsvpStatus, plusOneInfo);
    } else {
      updateGuestRsvp({
        variables: { id: user.id, rsvpStatus: rsvpStatus }
      });
    }
  };

  let headingText;
  if (!allowedPlusOne) {
    headingText = `${user.firstName}, reserve your spot at the table.`;
  } else if (allowedPlusOne) {
    headingText = `${user.firstName}, reserve a spot at the table for you and a guest.`;
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
            plusOneFirstName={plusOneFirstName}
            plusOneLastName={plusOneLastName}
            plusOnePhone={plusOnePhone}
            plusOneStatus={plusOneStatus}
            rsvpInput={rsvpInput}
            setPlusOneFirstName={setPlusOneFirstName}
            setPlusOneInput={setPlusOneInput}
            setPlusOneLastName={setPlusOneLastName}
            setPlusOnePhone={setPlusOnePhone}
            setRsvpInput={setRsvpInput}
            user={user}
          />
        </>
      )}
    </div>
  );
};

export default Repondez;
