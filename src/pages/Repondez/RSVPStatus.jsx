import React from "react";

import { Heading1 } from "../../kit/typography";
import Button from "../../kit/Button";

import css from "./RSVPStatus.module.scss";

const RSVPStatus = ({ toggleResponseStatus }) => (
  <div className={css.warningContainer}>
    <div className={css.warning}>
      <Heading1>You already RSVPed, would you like to change it?</Heading1>
      <Button
        onClick={() => {
          toggleResponseStatus(false);
        }}
        type="submit"
      >
        →
      </Button>
    </div>
  </div>
);

export default RSVPStatus;
