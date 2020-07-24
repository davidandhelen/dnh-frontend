// @flow
import React from "react";

import { BodyText } from "../../kit/typography";
import Input from "../../kit/Input";
import PhoneInput from "../../kit/PhoneInput";
import css from "./PlusOne.module.scss";

const PlusOne = ({
  setPlusOneFirstName,
  setPlusOneLastName,
  setPlusOnePhone,
  plusOneFirstName,
  plusOneLastName,
  plusOnePhone
}) => {
  return (
    <fieldset className={css.fieldset}>
      <legend>
        <BodyText>Your Guest&apos;s Info</BodyText>
      </legend>
      <div>
        <label htmlFor="guestFirstName">
          <BodyText>Full name</BodyText>
        </label>
        <Input
          id="guestFirstName"
          name="guestFirstName"
          onChange={e => setPlusOneFirstName(e.target.value)}
          placeholder="Helen"
          required={true}
          value={plusOneFirstName}
        />
      </div>
      <div>
        <label htmlFor="guestLastName">
          <BodyText>Full name</BodyText>
        </label>
        <Input
          id="guestLastName"
          name="guestLastName"
          onChange={e => setPlusOneLastName(e.target.value)}
          placeholder="Cho"
          required={true}
          value={plusOneLastName}
        />
      </div>
      <div>
        <label htmlFor="guestPhoneNumber">
          <BodyText>Phone number</BodyText>
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
  );
};

export default PlusOne;
