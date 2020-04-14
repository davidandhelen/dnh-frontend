// @flow
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import MainNav from "./modules/MainNav";
import PublicNav from "./modules/PublicNav";

import Loading from "./kit/Loading";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Splash from "./pages/Splash";
import Wedding from "./pages/Wedding";
import Repondez from "./pages/Repondez";
import Photos from "./pages/Photos";

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

const PublicRoute = ({ component, path }) => {
  const Component = component;

  return (
    <>
      <PublicNav />
      <Route path={path} render={props => <Component {...props} />} />
    </>
  );
};

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
      <PublicRoute component={Splash} exact={true} path="/" />
      <PublicRoute component={Photos} path="/photos" />
      <PublicRoute component={Login} path="/login" />

      <ProtectedRoute component={Home} path="/home" />
      <ProtectedRoute component={Wedding} path="/wedding" />
      <ProtectedRoute component={Repondez} path="/rsvp" />
      <ProtectedRoute component={Home} path="/faq" />

      <DevRoute component={Gallery} path="/gallery" />
    </Switch>
  );
};

export default App;
