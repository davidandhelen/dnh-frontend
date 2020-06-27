import React from "react";
import { Heading1, BodyText } from "../../kit/typography";
import CTALink from "../../kit/CTALink";
import css from "./Confirmation.module.scss";
import { Redirect } from "react-router";

const Confirmation = props => {
  if (!props.user) {
    return <Redirect to="/" />;
  }

  const { firstName, allowedPlusOne, plusOne, rsvpStatus } = props.user;
  const customHeader =
    allowedPlusOne && plusOne
      ? `${firstName}, you and ${plusOne.firstName} are all set.`
      : `${firstName}, you're all set.`;

  const CustomBody =
    rsvpStatus === true ? (
      <BodyText>
        Make sure to visit our {<CTALink href="/faq">FAQ</CTALink>} page for
        more information.
      </BodyText>
    ) : (
      <BodyText>Sorry we wont be able to see you there.</BodyText>
    );
  return (
    <div className={css.container}>
      <Heading1>{customHeader}</Heading1>
      {CustomBody}
      {rsvpStatus === true ? (
        <BodyText>See you on October 10th, 2020 @ 3:00pm.</BodyText>
      ) : null}
      <BodyText>-David and Helen</BodyText>
    </div>
  );
};

export default Confirmation;
