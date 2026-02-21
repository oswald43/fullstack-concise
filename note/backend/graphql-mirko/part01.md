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

- Frontend: react
- Database: sqlite
- Data Access: knex
- Backend: express
- GraphQL Server: apollo
- Auth: jwt

## Apollo Server with Express

## Custom Object Types

## Arrays and Non-Nullability

## Database Access

## Field Resolvers

## Resolver Chain

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
