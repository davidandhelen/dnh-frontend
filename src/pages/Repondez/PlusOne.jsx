// @flow
import React from "react";

import { Heading2 } from "../../kit/typography";
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
    <div className={css.plusOneForm}>
      <Heading2>Your Guest&apos;s Info</Heading2>
      <Input
        name={"Guest's First Name"}
        onChange={e => setPlusOneFirstName(e.target.value)}
        placeholder="First Name"
        required={true}
        value={plusOneFirstName}
      />
      <Input
        name={"Guest's Last Name"}
        onChange={e => setPlusOneLastName(e.target.value)}
        placeholder="Last Name"
        required={true}
        value={plusOneLastName}
      />
      <PhoneInput
        country="US"
        name={"Guest's Phone Number"}
        onChange={setPlusOnePhone}
        placeholder="Phone Number"
        value={plusOnePhone}
      />
    </div>
  );
};

export default PlusOne;
