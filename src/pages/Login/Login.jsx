// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React from "react";

import Input from "../../kit/Input";
import CenteredPageLoader from "../../kit/CenteredPageLoader";
import Button from "../../kit/Button";

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
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      localStorage.setItem(AUTH_TOKEN, login.token);
      props.history.push("/home");
    }
  });

  const onSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        phone: event.target.phone.value
      }
    });
  };

  // TODO: Get a real loading asset
  if (loading) {
    return <CenteredPageLoader />;
  }

  // TODO: Get a real error meessage
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className={css.container}>
      <form onSubmit={onSubmit}>
        <Input
          name="phone"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          required={true}
          type="tel"
        />
        <Button type="submit">I&apos;m in</Button>
      </form>
    </div>
  );
};

export default Login;
