// @flow
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Splash from "./pages/Splash";

import { AUTH_TOKEN } from "./index";

// TODO: Put the routes in a separate file
const ProtectedRoute = ({ component, path, ...rest }) => {
  // TODO: Is this safe?
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  return <Route component={component} path={path} {...rest} />;
};

const DevRoute = props => {
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    return <Route {...props} />;
  }
  return <Redirect to={{ pathname: "/" }} />;
};

const App = () => {
  return (
    <Switch>
      <Route component={Splash} exact={true} path="/" />
      <Route component={Login} path="/login" />
      <ProtectedRoute component={Home} path="/home" />
      <DevRoute component={Gallery} path="/gallery" />
    </Switch>
  );
};

export default App;
