// @flow
import React from "react";

import Input from "../../kit/Input";

const PlusOne = () => {
  return (
    <>
      <Input name="firstName" placeholder="David" required={true} />
      <Input name="lastName" placeholder="Shin" required={true} />
      <Input
        name="phone"
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        placeholder="0000000000"
        required={true}
        type="tel"
      />
    </>
  );
};

export default PlusOne;
