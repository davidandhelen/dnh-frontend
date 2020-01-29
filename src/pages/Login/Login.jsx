// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React from "react";

import Input from "../../kit/Input";
import Loading from "../../kit/Loading";
import Button from "../../kit/Button";

import { AUTH_TOKEN } from "../../index";

const LOGIN_MUTATION = gql`
  mutation LogIn($phone: String!) {
    login(phone: $phone) {
      token
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
        phone: event.target.phone.value
      }
    });
  };

  // TODO: Get a real loading asset
  if (loading) {
    return <Loading />;
  }

  // TODO: Get a real error meessage
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
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
