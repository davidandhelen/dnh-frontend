// @flow
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import MainNav from "./modules/MainNav";
import PublicNav from "./modules/PublicNav";

import Loading from "./kit/Loading";
import Gallery from "./pages/Gallery";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Splash = lazy(() => import("./pages/Splash"));
const Wedding = lazy(() => import("./pages/Wedding"));
const Repondez = lazy(() => import("./pages/Repondez"));
const Photos = lazy(() => import("./pages/Photos"));

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

type RouteType = {
  component: Node,
  path: string
};

type PublicRouteProps = {
  isProtected: boolean
} & RouteType;

const PublicRoute = ({ component, isProtected, path }: PublicRouteProps) => {
  const Component = component;

  return (
    <>
      {isProtected ? <MainNav /> : <PublicNav />}
      <Suspense fallback={<Loading />}>
        <Route path={path} render={props => <Component {...props} />} />
      </Suspense>
    </>
  );
};

const ProtectedRoute = ({ component, path }: RouteType) => {
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
          <Suspense fallback={<Loading />}>
            <Route
              path={path}
              render={props => <Component user={data.me} {...props} />}
            />
          </Suspense>
        </>
      );
    }

    return <Redirect to={{ pathname: "/" }} />;
  }
};

const DevRoute = (props: RouteType) => {
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
      <PublicRoute component={Photos} isProtected={true} path="/photos" />
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
