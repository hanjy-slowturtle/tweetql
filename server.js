import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first",
  },
  {
    id: "2",
    text: "second",
  },
];

let users = [
  {
    id: "1",
    firstName: "Jongyeop",
    lastName: "Han",
  },
  {
    id: "2",
    firstName: "first",
    lastName: "last",
  },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    fullName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
    allUsers: [User!]!
  }

  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length > 0 ? "" + (tweets[tweets.length - 1].id + 1) : "1",
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) {
        return false;
      }
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
