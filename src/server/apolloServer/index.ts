import { ApolloServer } from "apollo-server-express";
import { HttpLink } from "apollo-link-http";
import {
  makeExecutableSchema,
  mergeSchemas,
  makeRemoteExecutableSchema,
  introspectSchema,
} from "graphql-tools";
import fetch from "cross-fetch";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

const createSchemas = async () => {
  const localSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const link = new HttpLink({ uri: "https://api.spacex.land/graphql/", fetch });
  const spacexSchema = await introspectSchema(link);

  const remoteSchema = makeRemoteExecutableSchema({
    schema: spacexSchema,
    link,
  });

  return mergeSchemas({
    schemas: [localSchema, remoteSchema],
  });
};

// const graphqlServer = new ApolloServer({
//   schema: createSchemas(),
// });

export default createSchemas;
