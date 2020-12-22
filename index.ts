import { ApolloServer, gql } from 'apollo-server';

interface Event {
    name: string;
    id: string;
    description: string;
}

const events: Event[] = [
  {
    name: "Junction 2020 hackathon",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
    description: "Hack the world!"
  },
  {
    name: "Flow festival",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
    "description": "Rave on!"
  },
  {
    name: "Juhanan kotibileet",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
    "description": "Täällä kuunnellaan vain hyvää musiikkia..."
  },
];

const typeDefs = gql`
  type Event {
    name: String!
    id: String!
    description: String!
  }

  type Query {
    eventCount: Int!
    allEvents: [Event!]!
  }
`;

const resolvers = {
  Query: {
    eventCount: () => events.length,
    allEvents: () => events,
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});