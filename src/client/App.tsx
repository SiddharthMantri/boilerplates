import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import LaunchesPast from "./LaunchesPast";

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}

const spacexLink = new HttpLink({
  uri: "https://api.spacex.land/graphql/",
});

const localLink = new HttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.concat(spacexLink, localLink),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <LaunchesPast />
    </ApolloProvider>
  );
};

export default App;
