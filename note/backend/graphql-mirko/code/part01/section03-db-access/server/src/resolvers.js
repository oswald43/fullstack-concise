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
[
  {
    data: {
      jobs: [
        { id: "f3YzmnBZpK0o", date: "2025-01-26" },
        { id: "XYZNJMXFax6n", date: "2025-01-27" },
        { id: "6mA05AZxvS1R", date: "2025-01-30" },
      ],
    },
  },
];
