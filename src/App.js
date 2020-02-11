// @flow
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import MainNav from "./MainNav";

import Loading from "./kit/Loading";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Splash from "./pages/Splash";
import Wedding from "./pages/Wedding";

const ME_QUERY = gql`
  query me {
    me {
      id
      firstName
      lastName
      rsvpStatus
      allowedPlusOnes
      guestType
      phone
      note
    }
  }
`;

const ProtectedRoute = ({ component, path }) => {
  const { loading, data } = useQuery(ME_QUERY);

  if (loading) {
    return <Loading />;
  }

  if (!loading) {
    if (data && data.me) {
      const Component = component;

      return (
        <>
          <MainNav />
          <Route
            path={path}
            render={props => <Component user={data.me} {...props} />}
          />
        </>
      );
    }

    return <Redirect to={{ pathname: "/" }} />;
  }
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
      <ProtectedRoute component={Wedding} path="/wedding" />

      <DevRoute component={Gallery} path="/gallery" />
    </Switch>
  );
};

export default App;
