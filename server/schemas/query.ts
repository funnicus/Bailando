import { gql } from 'apollo-server';

import { events, Event } from '../../db';

interface AllEventsArgs {
    name?: string;
    id?: string;
}

export const typeDefs = gql`
  type Query {
    eventCount: Int!
    allEvents(name: String, id: String): [Event!]!
  }
`;

export const resolvers = {
    Query: {
        eventCount: (): number => events.length,
        allEvents: (_root: unknown, args: AllEventsArgs): Event[] | Event | undefined => {
            if(args.name) return events.filter(e => e.name === args.name);
            else if(args.id) return events.find(e => e.id === args.id);
            else return events;
        },
      },
};
