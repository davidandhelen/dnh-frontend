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
const Photos = lazy(() => import("./pages/Photos"));

const ME_QUERY = gql`
  query me {
    me {
      id
      firstName
      lastName
      rsvpStatus
      allowedPlusOnes
      plusOnes {
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

const LazyRoute = ({ component, path }: RouteType) => {
  const { loading, data } = useQuery(ME_QUERY);

  if (loading) {
    return <CenteredPageLoader />;
  }

  const Component = component;

  return (
    <>
      <Suspense fallback={<CenteredPageLoader />}>
        <Route
          path={path}
          render={props => <Component user={data?.me || null} {...props} />}
        />
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <>
      <MainNav />
      <Switch>
        <LazyRoute component={Home} exact={true} path="/" />
        <LazyRoute component={Wedding} path="/wedding" />
        <LazyRoute component={Photos} path="/photos" />
        <LazyRoute component={Respond} path="/rsvp" />
        <LazyRoute component={FAQ} path="/faq" />
      </Switch>
    </>
  );
};

export default App;
