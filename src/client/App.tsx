import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import LaunchesPast from "./LaunchesPast";

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
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
