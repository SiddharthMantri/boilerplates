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
import typeDefs from "../apolloServer/schema/typeDefs";
import resolvers from "../apolloServer/schema/resolvers";

export default (): RequestHandler => async (req, res, next) => {
  const link = createHttpLink({
    uri: "https://api.spacex.land/graphql/",
    fetch,
  });

  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: ApolloLink.from([new SchemaLink({ schema: executableSchema }), link]),
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
