/* eslint-disable no-console */
import ApolloClient, { gql } from "apollo-boost";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./reducers";
import App from "./App";

import "./style/reset.scss";

const client = new ApolloClient({
  uri: "https://davidandhelen.now.sh/"
});

// TODO: the below does not work!
client
  .query({
    mutation: gql`
      {
        login(email: "elixirality@gmail.com", phone: "5162447969") {
          token
          user {
            id
            firstName
            lastName
          }
        }
      }
    `
  })
  .then(result => console.log(result));

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
