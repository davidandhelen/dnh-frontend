import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Splash from "./components/Splash/Splash";
import Gallery from "./components/Kit/Gallery";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route component={Splash} exact={true} path="/" />
        <Route component={Gallery} path="/kit-gallery" />
      </Switch>
    );
  }
}

export default App;
