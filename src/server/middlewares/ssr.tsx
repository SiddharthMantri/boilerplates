import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { makeExecutableSchema } from "graphql-tools";
import { SchemaLink } from "@apollo/client/link/schema";
import { RequestHandler } from "express";
import fetch from "cross-fetch";
import React from "react";
import LaunchesPast from "../../client/LaunchesPast";

export default (): RequestHandler => async (req, res, next) => {
  const link = createHttpLink({
    uri: "http://localhost:3000/graphql",
    fetch,
  });

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link,
    cache: new InMemoryCache(),
  });

  const App = (
    <ApolloProvider client={client}>
      <LaunchesPast />
    </ApolloProvider>
  );

  renderToStringWithData(App).then((content) => {
    const initialState = client.extract();
    console.log(initialState);
    const html = `
        <!doctype html>
        <html>
            <head />
            <body>
            <div id="root">${content}</div>
                <script>window.__APOLLO_STATE__=${JSON.stringify(
                  initialState
                ).replace(/</g, "\\u003c")}</script>
                <script src="/main.js"></script>
            </body>
        </html>`;

    res.status(200);
    res.send(html);
    res.end();
  });
};
