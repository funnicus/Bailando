import { makeExecutableSchema } from 'apollo-server';

import { typeDef as EventDef} from './event';
import { typeDef as Mutation } from './mutation';
import { typeDef as Query } from './query';
import { typeDef as User } from './user';

import { events, Event } from '../../db';

interface AllEventsArgs {
    name?: string;
    id?: string;
}

const resolvers = {
    Query: {
        eventCount: (): number => events.length,
        allEvents: (_root: unknown, args: AllEventsArgs): Event[] | Event | undefined => {
            if(args.name) return events.filter(e => e.name === args.name);
            else if(args.id) return events.find(e => e.id === args.id);
            else return events;
        },
      },
    Mutation: {
        createUser: (_root: unknown, _args: unknown): number => {
          //const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
          /*return user.save()
            .catch(error => {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            })*/
            return 0;
        },
        //make async
        login: (_root: unknown, _args: unknown): number => {
          /*const user = await User.findOne({ username: args.username })
    
          if (!user || args.password !== 'secret') {
            throw new UserInputError("wrong credentials")
          }
    
          const userForToken = {
            username: user.username,
            id: user._id,
          }
    
          return { value: jwt.sign(userForToken, JWT_SECRET) }*/
          return 0;
        }
      }
};

export default makeExecutableSchema({
    typeDefs: [ Query, EventDef, Mutation, User],
    resolvers,
});