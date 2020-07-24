// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import CenteredPageLoader from "../../kit/CenteredPageLoader";
import Button from "../../kit/Button";
import { BodyText, SubTitle } from "../../kit/typography";
import RightArrow from "../../kit/RightArrow";

import { AUTH_TOKEN } from "../../index";

import css from "./Login.module.scss";

const LOGIN_MUTATION = gql`
  mutation LogIn($phone: String!) {
    login(phone: $phone) {
      token
    }
  }
`;

const Login = props => {
  const [value, setValue] = useState("");
  const [validationError, setError] = useState("");
  const [isShowingPasswordInput, showPasswordInput] = useState(false);

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

    // Check that all items are numbers
    if (Number.isNaN(Number(value))) {
      setError("Enter digits only (no symbols).");
    }
    // Check that it's 10 digits
    else if (value.length !== 10) {
      setError("Enter a 10-digit phone number.");
    }
    // If all validations pass, log in
    else {
      login({
        variables: {
          phone: value
        }
      });
    }
  };

  if (loading) {
    return <CenteredPageLoader full={true} theme="light" />;
  }

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={onSubmit}>
        <div className={css.wrapper}>
          <BodyText className={css.label}>Password</BodyText>
          <SubTitle className={css.text}>
            Please enter your phone number.
          </SubTitle>
          <div className={css.inputWrapper}>
            <input
              className={css.input}
              onChange={e => setValue(e.target.value)}
              required={true}
              type={isShowingPasswordInput ? "text" : "password"}
              value={value}
            />
            <Button className={css.button} theme="light" type="submit">
              <RightArrow />
            </Button>
          </div>
          <div className={css.inputWrapper}>
            <input
              className={css.checkbox}
              onChange={() => showPasswordInput(!isShowingPasswordInput)}
              type="checkbox"
            />
            <SubTitle className={css.text}>Show password</SubTitle>
          </div>
          {validationError && (
            <SubTitle className={css.validation}>{validationError}</SubTitle>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
