import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import LaunchesPast from "./LaunchesPast";

declare global {
  interface Window {
    __APOLLO_STATE__: NormalizedCacheObject;
  }
}

const link = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link,
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
