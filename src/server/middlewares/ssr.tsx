import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { RequestHandler } from "express";
import fetch from "cross-fetch";
import React from "react";
import LaunchesPast from "../../client/LaunchesPast";

export default (): RequestHandler => async (req, res, next) => {
  /* Both the local and remote schemas are now served from this one endpoint on our server.
  Resolvers are not stitched though so our server will direct queries to the relevant source */
  const link = createHttpLink({
    uri: "http://localhost:3000/graphql",
    fetch,
  });

  /* Remember that this is the interface the SSR server will use to connect to the
    API server, so we need to ensure it isn't firewalled, etc */
  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache(),
  });

  // Prepare our app to be rendered in the same way it will be rendered on the browser
  const App = (
    <ApolloProvider client={client}>
      <LaunchesPast />
    </ApolloProvider>
  );

  /* Render our application on the server with "ssrMode: true" in our ApolloClient above,
    and it will fetch all queries only one time on the server side when it is initialised below. 
    We can then extract the state from the client and attach this to the window to be used
    to rehydrate our client on the browser */
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
