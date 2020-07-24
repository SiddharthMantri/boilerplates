import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

const graphqlServer = new ApolloServer({
  uploads: false,
  typeDefs,
  resolvers,
});

export default graphqlServer;
