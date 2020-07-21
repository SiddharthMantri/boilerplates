import React, { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LaunchesPast from "./LaunchesPast";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <LaunchesPast />
    </ApolloProvider>
  );
};

export default App;
