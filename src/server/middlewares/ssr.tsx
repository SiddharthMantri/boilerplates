import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import { renderToStringWithData } from "@apollo/client/react/ssr";
import { RequestHandler } from "express";
import fetch from "cross-fetch";
import React from "react";
import LaunchesPast from "../../client/LaunchesPast";

export default (): RequestHandler => async (req, res, next) => {
  const link = createHttpLink({
    uri: "http://localhost:3000/graphql",
    fetch,
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Book: { keyFields: ["id"] },
    },
  });

  const book = {
    book: "The latest book",
    author: "Chris",
    id: 5,
    __typename: "Book",
  };

  const query = gql`
    query getTest {
      test
      books
    }
  `;

  cache.writeQuery({
    query,
    data: {
      test: ["abc"],
      books: [book],
    },
  });

  const client = new ApolloClient({
    ssrMode: true,
    link,
    cache,
  });

  const appTree = (
    <ApolloProvider client={client}>
      <LaunchesPast />
    </ApolloProvider>
  );

  renderToStringWithData(appTree).then((content) => {
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
