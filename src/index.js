// @flow
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./style/reset.scss";

export const AUTH_TOKEN = "auth_token";

const client = new ApolloClient({
  // TODO: Is this safe?
  uri: "https://davidandhelen.now.sh",
  request: operation => {
    const token = localStorage.getItem(AUTH_TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? token : ""
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
