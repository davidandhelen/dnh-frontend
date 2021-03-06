// @flow
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";

import MainNav from "./modules/MainNav";

import CenteredPageLoader from "./kit/CenteredPageLoader";

const FAQ = lazy(() => import("./pages/FAQ"));
const Home = lazy(() => import("./pages/Home"));
const Wedding = lazy(() => import("./pages/Wedding"));
const Respond = lazy(() => import("./pages/Respond"));
const Respondez = lazy(() => import("./pages/Repondez"));
const Photos = lazy(() => import("./pages/Photos"));
const Login = lazy(() => import("./pages/Login"));
const Confirmation = lazy(() => import("./pages/Confirmation"));

const ME_QUERY = gql`
  query me {
    me {
      id
      firstName
      lastName
      rsvpStatus
      allowedPlusOne
      plusOne {
        id
        firstName
        lastName
        phone
      }
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

const LazyRoute = ({ component, path, ...rest }: RouteType) => {
  const { loading, data, refetch } = useQuery(ME_QUERY);
  if (loading) {
    return <CenteredPageLoader />;
  }

  const Component = component;

  return (
    <>
      <Suspense fallback={<CenteredPageLoader />}>
        <Route
          path={path}
          render={props => (
            <Component
              refetch={refetch}
              user={data?.me || null}
              {...props}
              {...rest}
            />
          )}
        />
      </Suspense>
    </>
  );
};

const App = () => (
  <>
    <MainNav />
    <Switch>
      <LazyRoute component={Home} exact={true} path="/" />
      <LazyRoute component={Wedding} path="/wedding" />
      <LazyRoute component={Photos} path="/photos" />
      <LazyRoute component={Respond} path="/rsvp" />
      <LazyRoute component={Login} path="/login" />
      <LazyRoute component={FAQ} path="/faq" />
      <LazyRoute component={Respondez} path="/rsvpez" />
      <LazyRoute component={Confirmation} path="/confirmation" />
    </Switch>
  </>
);

export default App;
