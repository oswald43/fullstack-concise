export const resolvers = {
  Query: {
    greeting: () => "Hello GraphQL&Express!",

    job: () => {
      return {
        id: "6mA05AZxvS1R",
        title: "Full-Stack Developer",
        description:
          "We are looking for a Full-Stack Developer familiar with Node.js, Express, and React.",
      };
    },

    jobs: () => {
      return [
        {
          id: "6mA05AZxvS1R",
          title: "Full-Stack Developer",
          description:
            "We are looking for a Full-Stack Developer familiar with Node.js, Express, and React.",
        },
        {
          id: "XYZNJMXFax6n",
          title: "Backend Developer",
          description:
            "We are looking for a Backend Developer familiar with Node.js and Express.",
        },
      ];
    },
  },
};
