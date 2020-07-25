import React from "react";

import { BodyText, SubTitle } from "../../kit/typography";
import Input from "../../kit/Input";
import PhoneInput from "../../kit/PhoneInput";
import Button from "../../kit/Button";

import css from "./GuestForm.module.scss";

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

export default GuestForm;
