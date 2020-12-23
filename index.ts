import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';

import { events } from './db';

mongoose.set('useFindAndModify', false);

const MONGODB_URI = process.env.MONGODB_URI || "undefined";

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('error connection to MongoDB:', error.message);
  });


interface AllEventsArgs {
    name?: string;
    id?: string;
}

const typeDefs = gql`
  type Event {
    name: String!
    id: String!
    summary: String!
    description: String!
    comments: [String!]
    votes: Int!
    user: String!
  }

  type User {
    username: String!
    id: ID!
  }

  type Query {
    eventCount: Int!
    allEvents(name: String, id: String): [Event!]!
  }

  type Mutation {
    createUser: String!
    login: String! 
  }
`;

const resolvers = {
  Query: {
    eventCount: () => events.length,
    allEvents: (_root: unknown, args: AllEventsArgs) => {
        if(args.name) return events.filter(e => e.name === args.name);
        else if(args.id) return events.find(e => e.id === args.id);
        else return events;
    },
  },
  Mutation: {
    createUser: (_root: unknown, _args: unknown) => {
      //const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      /*return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })*/
        return;
    },
    login: async (_root: unknown, _args: unknown) => {
      /*const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }*/
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});