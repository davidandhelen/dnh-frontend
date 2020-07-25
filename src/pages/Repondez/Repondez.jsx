/* eslint-disable no-unused-vars, no-console*/
// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { BodyText, Heading1, Heading2, SubTitle } from "../../kit/typography";
import Input from "../../kit/Input";
import PhoneInput from "../../kit/PhoneInput";
import Button from "../../kit/Button";
import CenteredPageLoader from "../../kit/CenteredPageLoader";

import GuestForm from "./GuestForm";

import css from "./Repondez.module.scss";
import NoPermission from "../NoPermission/NoPermission";

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

const Repondez = props => {
  const [updateGuestRsvp, { error, loading }] = useMutation(
    UPDATE_RSVP_STATUS_MUTATION,
    {
      onCompleted(data) {
        props.history.push("/confirmation");
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

  if (loading) {
    return <CenteredPageLoader />;
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
        allowedPlusOne: false,
        rsvpStatus: true
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
        variables: {
          id: user.id,
          rsvpStatus: rsvpStatus
        }
      });
    }
  };

  let headingText;
  if (!allowedPlusOne) {
    headingText = `${user.firstName}, reserve your spot at the table.`;
  } else if (allowedPlusOne) {
    headingText = `${user.firstName}, reserve a spot at the table for you and a guest.`;
  }

  const rsvpForm = (
    <>
      <div className={css.wrapper}>
        <div className={css.info}>
          <Heading1 className={css.heading}>
            RSVP for the Ceremony & Reception
          </Heading1>
          <BodyText>{headingText}</BodyText>
          {/* <BodyText>RSVP verb</BodyText>
          <SubTitle>\ ˌär-ˌes-ˌvē-ˈpē \</SubTitle>
          <SubTitle>: to respond to an invitation</SubTitle>
          <BodyText>RSVP abbreviation</BodyText>
          <SubTitle>French répondez s'il vous plaît</SubTitle> */}
        </div>
      </div>
      <div className={css.wrapper}>
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
      </div>
    </>
  );

  return (
    <div className={css.container}>
      {alreadyRsvpedWarning ? (
        <AlreadyRsvpedWarning
          toggleAlreadyRsvpedWarning={toggleAlreadyRsvpedWarning}
        />
      ) : (
        rsvpForm
      )}
    </div>
  );
};

export default Repondez;
