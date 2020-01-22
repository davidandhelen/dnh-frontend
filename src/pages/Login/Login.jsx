// @flow
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React from "react";

// How do I organize these gql "functions"?
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

const Login = () => {
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const onSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        email: event.target.email.value,
        phone: event.target.phone.value
      }
    });
  };

  // Do something with the data. Use the token to log the user in.
  // Do something when user is not found.
  /* eslint-disable no-console */
  console.log(data);

  return (
    <form onSubmit={onSubmit}>
      <input name="email" required={true} type="email" />
      <input
        name="phone"
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        required={true}
        type="tel"
      />
      <button type="submit">I&apos;m in</button>
    </form>
  );
};

export default Login;
