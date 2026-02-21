# Introduction

## What is GraphQL

- https://graphql.org/

- What is GraphQL? A query language for your API. GraphQL provides the **API layer**. (data and business login can stay the same)
- Why do we need GraphQL? Client has full control over which fields to fetch. (over fetching / under fetching)
- Dev tool? `GraphiQL`
- GraphQL is an open specification with many implementations available for different languages. (js/py/kt; apollo)
- Who's using GraphQL? Facebook, Github

## Link

- https://www.udemy.com/course/graphql-by-example
- https://www.bilibili.com/video/BV1Dt42157Ma

- https://github.com/graphql-by-example/
- https://github.com/graphql-by-example/hello-world
- https://github.com/graphql-by-example/job-board

# Fundamentals

## Schema Definition

```js
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
    greeting: () => "Hello, world!",
  },
};
```

## Apollo Server

- https://graphql.org/learn/serving-over-http/ We now want to expose this API over Http.
- https://www.apollographql.com/docs/apollo-server

```shell
cd server
pnpm init
pnpm add @apollo/server graphql
```

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The type definitions represent the interface / schema for our api
// They declare what our clients can request
const typeDefs = `#graphql
  # We can define the schema and map the query operation to the Query type (default / leave it out)
  schema {
    query: Query
  }

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
```

## Query Language (web-ui)

- Apollo Sandbox

```graphql
# query {
#   greeting
# }

# writing query at the beginning is optional
# if we don't specify an operation type it defaults to query
{
  greeting
}
```

## GraphQL Over HTTP

- We can open the chrome developer tools and inspect the http requests.
- GraphQL: `POST /`

```
POST http://localhost:4000/
content-type: application/json

# Request Payload
{
    "query": "query {\n  greeting\n}",
    "variables": {}
}

# Response
{
    "data": {
        "greeting": "Hello GraphQL!"
    }
}

```

## GraphQL Client (frontend)

```js
const url = "http://localhost:4000/";

async function fetchGreeting() {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
          greeting
        }
      `,
    }),
  });
  const { data } = await response.json();
  return data.greeting;
}

fetchGreeting().then((greeting) => {
  document.getElementById("greeting").textContent = greeting;
});
```

## Code-First Vs Schema-First

- Schema-First

# Schema

## Job Board Architecture

- Frontend: `React`, `Vue`, `Angular`, `Svelte`, ...; `Next`, `Remix`, `Nuxt`, ...
- Database: `Sqlite`, `PostgreSQL`, `MySQL`, `Aurora`, ...; `MongoDB`, `DynamoDB`, `Firestore`, ...
- Data Access: `SQLite3` (Native Driver); `Knex` (Query Builder); `Prisma`, `Sequelize` (ORM)
- Backend: `Express`
- GraphQL Server: `Apollo`
- Auth: `JWT`

![](/_lib/excalidraw/job-board-arch.svg)

## Job Board Project

...

## Apollo Server with Express

- https://www.apollographql.com/docs/apollo-server/integrations/integration-index
- http://apollographql.com/docs/apollo-server/api/express-middleware
- The standalone version of Apollo Server also use Express internally.

```shell
pnpm add @apollo/server graphql
pnpm i @as-integrations/express5
```

```js
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

const typeDefs = await readFile("./schema.graphql", "utf8"); // 1️⃣
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer));

const port = 9000;
app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GraphQL endpoint: http://localhost:${port}/graphql`);
});
```

## Custom Object Types

- https://graphql.org/learn/schema/#scalar-types

> GraphQL comes with a set of [default Scalar types](https://spec.graphql.org/draft/#sec-Scalars.Built-in-Scalars) out of the box:
>
> - `Int`: A signed 32‐bit integer.
> - `Float`: A signed double-precision floating-point value.
> - `String`: A UTF‐8 character sequence.
> - `Boolean`: `true` or `false`.
> - `ID`: **A unique identifier**, often used to refetch an object or as the key for a cache. The `ID` type is serialized in the same way as a `String`; however, defining it as an `ID` signifies that it is not intended to be human‐readable.

- [schema.graphql](/note/backend/graphql-mirko/code/part01/section02-apollo-express/server/schema.graphql)
- [resolvers.js](/note/backend/graphql-mirko/code/part01/section02-apollo-express/server/src/resolvers.js)

```
query {
  job {
    title
  }
}

---

{
  "data": {
    "job": {
      "title": "Full-Stack Developer"
    }
  }
}
```

## Arrays and Non-Nullability

```
query {
  job {
    id
    title
  }
}

---

{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Job.id.",
      "locations": [
        {
          "line": 3,
          "column": 5
        }
      ],
      "path": [
        "job",
        "id"  // ❌
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "stacktrace": [
          "Error: Cannot return null for non-nullable field Job.id."
        ]
      }
    }
  ],
  "data": {
    "job": null
  }
}
```

```
query {
  jobs {
    title
  }
}

---

{
  "data": {
    "jobs": [
      {
        "title": "Full-Stack Developer"
      },
      {
        "title": "Backend Developer"
      }
    ]
  }
}
```

```
query {
  jobs {
    title
  }
}

---

{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Query.jobs.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "jobs",
        2  // ❌
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "stacktrace": [
          "Error: Cannot return null for non-nullable field Query.jobs."
        ]
      }
    }
  ],
  "data": {
    "jobs": null
  }
}
```

## Database Access

- https://knexjs.org/

- [schema.graphql](/note/backend/graphql-mirko/code/part01/section03-db-access/server/schema.graphql)
- [resolvers.js](/note/backend/graphql-mirko/code/part01/section03-db-access/server/src/resolvers.js)

```
# Query
query {
  job(id: "XYZNJMXFax6n") {
    id
    title
  }
}
```

```
# Query
query GetJob($id: ID!) {
  job(id: $id) {
    id
    title
  }
}

# Variables
{
  "id": "XYZNJMXFax6n"
}
```

## Field Resolvers

```js
import { getJob, getJobs } from "./model/jobs.js";

export const resolvers = {
  // (parent, args, context, info)
  Query: {
    job: (_, { id }) => getJob(id),
    jobs: () => getJobs(),
  },

  // Resolver function: it resolves the value for that field
  Job: {
    date: ({ createdAt }) => toIsoData(createdAt),
  },
};

function toIsoData(value) {
  return value.slice(0, "yyyy-mm-dd".length);
}
```

## Resolver Chain

![resolver-chain](/_lib/excalidraw/resolver-chain.svg)

## Documentation Comments

## Object Associations

# Queries

## Starting Code

## GraphQL-Request

## Component State in React

## Query Arguments

## Query Variables

## Exercise: Company by ID

## Bidirectional Associations

## Recursive Queries

# Errors

## Starting Code

## GraphQL Errors

## Custom Errors

## Request States

# Mutations

## Starting Code

## Mutations

## Input Types

## Aside: Database Reset

## Mutation Requests

## Exercise: Delete Job

## Exercise: Update Job

# Authentication

## Starting Code

## Authentication Flow

## Resolver Context

## User-Company Association

## Client Authentication

## Secure Delete

## Exercise: Secure Update

## Where to Authenticate

# Caching with Apollo Client

## Starting Code

## Apollo Client Features

## Update: Apollo Client V4

## Apollo Client Setup

## Query Method

## Mutate Method and Auth Link

## Apollo Client Cache

## Fetch Policies

## Cache Manipulation

## Fragments

# Apollo React Integration

## Starting Code

## useQuery Hook

## React Custom Hooks

## Exercise: useJob and useJobs

## useMutation Hook

## useMutation Result

## Exercise: useCreateJob

# Data Loaders

## Starting Code

## N+1 Query Problem

## Batching with DataLoader

## Per-Request Cache

# Pagination

## Starting Code

## Pagination Strategies

## Ordering

## Limit Clause

## Offset Clause

## Basic Pagination UI

## Total Count

## Full Pagination UI

## Final Code

# Subscriptions

## Chat Project

## Github Repository

## Cache updateQuery

## Subscription Definition

## Update: Library Changes

## GraphQL-WS Server

## Subscription Resolver

## GraphQL-WS Client

## useSubscription Hook

## WebSocket Protocol

## Connection Params

## WebSocket Server Auth

## Final Code

# TypeScript Code Generation

## Job Board TypeScript Project

## Github Repository

## Server Code Generator

## Typed Resolvers

## Typed Context

## Watch Mode

## Client Code Generator

## Typed Queries