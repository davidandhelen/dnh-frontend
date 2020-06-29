// @flow
import React from "react";

import { BodyText } from "../../kit/typography";
import Input from "../../kit/Input";
import PhoneInput from "../../kit/PhoneInput";

const PlusOne = ({
  setPlusOneFirstName,
  setPlusOneLastName,
  setPlusOnePhone,
  plusOneFirstName,
  plusOneLastName,
  plusOnePhone
}) => {
  return (
    <div>
      <BodyText>Your Guest&apos;s Info</BodyText>
      <div>
        <Input
          name={"Guest's First Name"}
          onChange={e => setPlusOneFirstName(e.target.value)}
          placeholder="First Name"
          required={true}
          value={plusOneFirstName}
        />
      </div>
      <div>
        <Input
          name={"Guest's Last Name"}
          onChange={e => setPlusOneLastName(e.target.value)}
          placeholder="Last Name"
          required={true}
          value={plusOneLastName}
        />
      </div>
      <div>
        <PhoneInput
          country="US"
          name={"Guest's Phone Number"}
          onChange={setPlusOnePhone}
          placeholder="Phone Number"
          value={plusOnePhone}
        />
      </div>
    </div>
  );
};

export default PlusOne;
