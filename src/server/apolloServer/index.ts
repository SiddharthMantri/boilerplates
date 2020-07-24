import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default graphqlServer;
