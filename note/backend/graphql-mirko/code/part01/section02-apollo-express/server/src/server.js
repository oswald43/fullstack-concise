import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { readFile } from "node:fs/promises";
import { authMiddleware, handleLogin } from "./auth.js";
import { resolvers } from "./resolvers.js"; // 2️⃣

const app = express();
app.use(cors(), express.json(), authMiddleware);
app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf8"); // 2️⃣
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer));

const port = 9000;
app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});
