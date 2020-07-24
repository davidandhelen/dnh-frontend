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

  /**
   * Helpful resource for grouping form controls:
   * https://www.w3.org/WAI/tutorials/forms/grouping/
   */
  return (
    <form className={css.form}>
      <div className={css.fieldsWrapper}>
        {/* Field 1: Check if guest is attending */}
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>
            <BodyText>Will you be attending?</BodyText>
          </legend>
          <div className={css.radioInputWrapper}>
            <input
              checked={rsvpInput === "yes"}
              name="rsvpYes"
              onChange={onRsvpChange}
              type="radio"
              value="yes"
            />
            <label>
              <BodyText>Yes</BodyText>
            </label>
          </div>
          <div className={css.radioInputWrapper}>
            <input
              checked={rsvpInput === "no"}
              name="rsvpNo"
              onChange={onRsvpChange}
              type="radio"
              value="no"
            />
            <label>
              <BodyText>No</BodyText>
            </label>
          </div>
        </fieldset>
        {/* Field 2: Check if guest is bringing a plus one */}
        {rsvpInput === "yes" && user.allowedPlusOne && (
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>
              <BodyText>Will you be bringing a guest?</BodyText>
            </legend>
            <div className={css.radioInputWrapper}>
              <input
                checked={plusOneStatus === "yes"}
                name="plusOneYes"
                onChange={onPlusOneChange}
                type="radio"
                value="yes"
              />
              <label>
                <BodyText>Yes</BodyText>
              </label>
            </div>
            <div className={css.radioInputWrapper}>
              <input
                checked={plusOneStatus === "no"}
                name="plusOneNo"
                onChange={onPlusOneChange}
                type="radio"
                value="no"
              />
              <label>
                <BodyText>No</BodyText>
              </label>
            </div>
          </fieldset>
        )}
        {/* Field 3: If guest bringing plus one, gather their information */}
        {plusOneStatus === "yes" && (
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>
              <BodyText>Guest Information</BodyText>
            </legend>
            <div className={css.inputWrapper}>
              <label htmlFor="guestFirstName">
                <SubTitle className={css.label}>First Name</SubTitle>
              </label>
              <Input
                id="guestFirstName"
                name="guestFirstName"
                onChange={e => setPlusOneFirstName(e.target.value)}
                placeholder="David"
                required={true}
                value={plusOneFirstName}
              />
            </div>
            <div className={css.inputWrapper}>
              <label htmlFor="guestLastName">
                <SubTitle className={css.label}>Last Name</SubTitle>
              </label>
              <Input
                id="guestLastName"
                name="guestLastName"
                onChange={e => setPlusOneLastName(e.target.value)}
                placeholder="Shin"
                required={true}
                value={plusOneLastName}
              />
            </div>
            <div className={css.inputWrapper}>
              <label htmlFor="guestPhoneNumber">
                <SubTitle className={css.label}>Phone Number</SubTitle>
              </label>
              <PhoneInput
                country="US"
                id="guestPhoneNumber"
                name="guestPhoneNumber"
                onChange={setPlusOnePhone}
                placeholder="Phone Number"
                value={plusOnePhone}
              />
            </div>
          </fieldset>
        )}
      </div>
      <div className={css.buttonWrapper}>
        <Button
          disabled={
            rsvpInput === undefined ||
            rsvpInput === null ||
            (plusOneStatus === "yes" &&
              (!plusOneFirstName || !plusOneLastName || !plusOnePhone)) ||
            (user.allowedPlusOne &&
              rsvpInput === true &&
              (plusOneStatus === undefined || plusOneStatus === null))
          }
          onClick={onSubmit}
        >
          Reserve a seat
        </Button>
      </div>
    </form>
  );
};

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
