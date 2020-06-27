// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import CenteredPageLoader from "../../kit/CenteredPageLoader";
import Button from "../../kit/Button";
import { Heading1, BodyText } from "../../kit/typography";

import { AUTH_TOKEN } from "../../index";

import css from "./Login.module.scss";

const LOGIN_MUTATION = gql`
  mutation LogIn($phone: String!) {
    login(phone: $phone) {
      token
    }
  }
`;

// TODO: We don't need this page anymore, but will leave this for now
// so that I could copy over the logic into RSVP.
const Login = props => {
  const [value, setValue] = useState("");
  const [validationError, setError] = useState("");
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    async onCompleted({ login }) {
      await localStorage.setItem(AUTH_TOKEN, login.token);
      await props.refetch();
      props.history.push("/rsvpez");
    },
    onError: () => setError("Sorry, we could not find the phone number.")
  });

  const onSubmit = event => {
    event.preventDefault();
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phone = phoneNumber.slice(1);
    setError("");
    if (phone.length < 7) {
      setError("Please enter a valid phone number");
    } else {
      login({
        variables: {
          phone: phone
        }
      });
    }
  };

  // TODO: Get a real loading asset
  if (loading) {
    return <CenteredPageLoader />;
  }

  return (
    <div className={css.container}>
      <Heading1 className={css.heading}>Celebrate with us</Heading1>
      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.wrapper}>
          <PhoneInput
            className={css.phoneInput}
            // If `country` property is not passed, then "International" format is used.
            country="US"
            onChange={setValue}
            placeholder="(714) 257-9448"
            value={value}
          />
          <BodyText className={css.text}>
            {!validationError
              ? "Please enter your phone number"
              : validationError}
          </BodyText>
        </div>
        <Button theme="light" type="submit">
          Next →
        </Button>
      </form>
    </div>
  );
};

export default Login;
