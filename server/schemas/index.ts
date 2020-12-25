import { makeExecutableSchema, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUserDocument } from '../models/user';

import { typeDef as EventDef} from './event';
import { typeDef as Mutation } from './mutation';
import { typeDef as Query } from './query';
import { typeDef as UserDef } from './user';

import { events, Event } from '../../db';

interface AllEventsArgs {
    name?: string;
    id?: string;
}

interface createUserArgs {
    username: string;
    password: string;
}

interface loginArgs {
    username: string;
    password: string;
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
        createUser: async (_root: unknown, args: createUserArgs) => {

          if(!args.username || !args.password || args.password.length < 4){
            throw new Error("invalid user information");
          }

          const saltRounds = 10;
          let passwordHash: Promise<string> | string | null;
          try {
            passwordHash = await bcrypt.hash(args.password, saltRounds);
          } catch(error) {
            passwordHash = null;
          }

          if(!passwordHash) throw new Error("password hashing failed");

          const userObj = { 
            username: args.username, 
            passwordHash,
          };

          const user = new User(userObj);
    
          const savedUser = await user.save();

          return savedUser.toJSON();
        },
        login: async (_root: unknown, args: loginArgs) => {

          const user: IUserDocument | null = await User.findOne({ username: args.username });
          if (!user) throw new UserInputError("user not found");
          if(!user.passwordHash) throw new Error("password hash missing?");

          const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(args.password, user.passwordHash);
    
          if (!passwordCorrect) throw new UserInputError("wrong credentials");

          const userForToken = {
            username: user.username,
            id: user._id,
          };

          if(!process.env.JWT_SECRET) throw new Error("no jwt secret?");
    
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        }
      }
};

export default makeExecutableSchema({
    typeDefs: [ Query, EventDef, Mutation, UserDef],
    resolvers,
});