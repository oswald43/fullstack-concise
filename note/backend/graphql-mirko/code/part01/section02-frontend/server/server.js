import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The type definitions represent the interface / schema for our api
// They declare what our clients can request
const typeDefs = `#graphql
  type Query {
    greeting: String
  }
`;

// The resolvers are the implementation of the schema fields
const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL!",
  },
};

// We set up apollo server to run our graphql api
// This is without using any other backend framework
// It also provides a graphql web-ui
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Server ready at ${url}`);
