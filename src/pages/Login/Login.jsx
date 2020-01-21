/* eslint-disable no-console */
import React from "react";

const Login = () => {
  const onSubmit = event => {
    event.preventDefault();
    console.log("submitting form");
    // Query using GraphQL a login() mutation
    // Check that phone number (user) exists in the database
    // Exists? Redirect user to /home
    // Doesn't exist? Render an error message on the form
  };

  return (
    <form onSubmit={onSubmit}>
      <input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required={true} type="tel" />
      <button type="submit">I&apos;m in</button>
    </form>
  );
};

export default Login;
