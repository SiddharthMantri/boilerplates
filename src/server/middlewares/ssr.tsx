import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { RequestHandler } from "express";
import fetch from "cross-fetch";
import React from "react";
import LaunchesPast from "../../client/LaunchesPast";

export default (): RequestHandler => (req, res, next) => {
  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: "https://api.spacex.land/graphql/",
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const App = (
    <ApolloProvider client={client}>
      <LaunchesPast />
    </ApolloProvider>
  );

  renderToStringWithData(App).then((content) => {
    const initialState = client.extract();
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
