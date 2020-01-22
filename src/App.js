// @flow
import React from "react";
import { Route, Switch } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";

const App = () => {
  return (
    <Switch>
      <Route component={Splash} exact={true} path="/" />
      <Route component={Login} path="/login" />
      <Route component={Gallery} path="/dev/gallery" />
    </Switch>
  );
};

export default App;
