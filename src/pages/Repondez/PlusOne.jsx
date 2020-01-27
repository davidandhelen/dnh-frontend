// @flow
import React from "react";

import { BodyText } from "../../kit/typography";

import Input from "../../kit/Input";

const PlusOne = ({ count, onChange }) => {
  const guestNumber = count + 1;

  return (
    <>
      <BodyText>Guest {guestNumber}</BodyText>
      <Input
        name={`guest${guestNumber}FirstName`}
        onChange={onChange}
        placeholder="First name"
        required={true}
      />
      <Input
        name={`guest${guestNumber}LastName`}
        onChange={onChange}
        placeholder="Last name"
        required={true}
      />
      <Input
        name={`guest${guestNumber}Phone`}
        onChange={onChange}
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        placeholder="0000000000"
        required={true}
        type="tel"
      />
    </>
  );
};

export default PlusOne;
