import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Ceremony from './components/Ceremony';
import About from './components/About';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route component={Home} exact={true} path='/' />
        <Route component={About} path='/about' />
        <Route component={Ceremony} path='/ceremony' />
      </Switch>
    );
  }
}

export default App;
