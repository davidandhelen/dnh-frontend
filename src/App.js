import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Splash from "./Splash/Splash";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route component={Splash} exact={true} path="/" />
      </Switch>
    );
  }
}

export default App;
