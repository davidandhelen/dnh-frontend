// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React from "react";

import Button from "../../kit/Button";

import { AUTH_TOKEN } from "../../index";

// TODO: Reorganize this
const LOGIN_MUTATION = gql`
  mutation LogIn($email: String!, $phone: String!) {
    login(email: $email, phone: $phone) {
      token
      user {
        firstName
      }
    }
  }
`;

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
        email: event.target.email.value,
        phone: event.target.phone.value
      }
    });
  };

  // TODO: Get a real loading asset
  if (loading) {
    return <p>Loading...</p>;
  }

  // TODO: Get a real error meessage
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="email" required={true} type="email" />
      <input
        name="phone"
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        required={true}
        type="tel"
      />
      <Button type="submit">I&apos;m in</Button>
    </form>
  );
};

export default Login;
