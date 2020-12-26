import { AuthenticationError, makeExecutableSchema, UserInputError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User, { IUserDocument } from '../models/user';
import Event from '../models/event';
import Comment from '../models/comment';

import { typeDef as EventDef} from './event';
import { typeDef as MutationDef } from './mutation';
import { typeDef as QueryDef } from './query';
import { typeDef as UserDef } from './user';
import { typeDef as CommentDef } from './comment';

interface AllEventsArgs {
    name?: string;
    id?: string;
}

interface AllUsersArgs {
  name?: string;
  id?: string;
}

interface createUserArgs {
    username: string;
    password: string;
    email: string;
}

interface loginArgs {
    username: string;
    password: string;
}

interface createEventArgs {
  name: string;
  summary: string;
  description: string;
}

interface createCommentArgs {
  content: string;
  event: string;
}

interface Context {
  currentUser: IUserDocument | undefined;
}

const resolvers = {
    Query: {
        eventCount: () => Event.collection.countDocuments({}),
        allEvents: (_root: unknown, args: AllEventsArgs) => {
            if(args.name && args.id) return Event.find({name: args.name, id: args.id});
            if(args.name) return Event.find({name: args.name});
            if(args.id) return Event.findById(args.id).populate('comments', {});
            return Event.find({});
        },
        userCount: () => User.collection.countDocuments({}),
        allUsers: (_root: unknown, args: AllUsersArgs) => {
          if(args.name && args.id) return User.find({name: args.name, id: args.id});
          if(args.name) return User.find({name: args.name});
          if(args.id) return User.findById(args.id).populate('comments', {});
          return User.find({});
        },
      },
    Mutation: {
        createUser: async (_root: unknown, args: createUserArgs) => {

          if(!args.username || !args.password || args.password.length < 4 || !args.email){
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
            email: args.email,
            comments: []
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

          if(!process.env.JWT_SECRET) throw new Error("no JWT_SECRET declared in .env");
    
          return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
        },
        createEvent: async (_root: unknown, args: createEventArgs, context: Context) => {
          if(!context.currentUser) throw new AuthenticationError("unathorized, not logged in");
          if(!context.currentUser.id) throw new Error("user has no id, how?");

          const eventObj = {
            user: context.currentUser.id,
            name: args.name,
            summary: args.summary,
            description: args.description,
            comments: [],
            votes: 0,
            date: new Date()
          };

          //creating a new event and making sure it has an id
          const newEvent = new Event(eventObj);
          if(!newEvent._id) throw new Error("comment id missing, how?");

          //looking for the user who is posting this event
          const user = await User.findById(context.currentUser.id);
          if(!user) throw new Error("no user found");

          //adding the new event to events posted by the user
          if(!user.events) user.events = [newEvent._id];
          user.events = user.events.concat(newEvent._id);

          //saving changes
          try {
            await newEvent.save();
            await user.save();
          } catch (e) {
            const result = (e as Error).message;
            throw new UserInputError(result, {
              invalidArgs: args
            });
          }

          //return the new event as json
          return newEvent.toJSON();
        },
        createComment: async (_root: unknown, args: createCommentArgs, context: Context) => {
            if(!context.currentUser) throw new AuthenticationError("unathorized, not logged in");

            const event = await Event.findById(args.event);
            if(!event) throw new Error("no event found");
            if(!event.id || !context.currentUser.id) throw new Error("event or user id missing, how?");

            const user = await User.findById(context.currentUser.id);
            if(!user) throw new Error("no user found");

            const commentObj = {
              user: context.currentUser.id,
              event: event.id,
              content: args.content,
              votes: 0,
              date: new Date()
            };

            //creating a new comment and making sure it has an id
            const newComment = new Comment(commentObj);
            if(!newComment._id) throw new Error("comment id missing, how?");

            //if user has no comments yet, we create a new comments array for it
            if(!user.comments) user.comments = [newComment._id];
            //otherwise we concat
            else user.comments = user.comments.concat(newComment._id);

            //same for the event
            if(!event.comments) event.comments = [newComment._id];
            else event.comments = event.comments.concat(newComment._id);

            //saving changes
            try {
              await newComment.save();
              await user.save();
              await event.save();
            } catch (e) {
              const result = (e as Error).message;
              throw new UserInputError(result, {
                invalidArgs: args
              });
            }

            return newComment.toJSON();
        }
      }
};

//remember to include your new types in the typeDefs array!
export default makeExecutableSchema({
    typeDefs: [ QueryDef, EventDef, MutationDef, UserDef, CommentDef],
    resolvers,
});