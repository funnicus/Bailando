import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from './server/models/user';

import schema from './server/schemas';

mongoose.set('useFindAndModify', false);

const MONGODB_URI = process.env.MONGODB_URI || "undefined";

console.log('connecting to', MONGODB_URI);

try{
  void mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('connected to MongoDB');
} catch (error) {
  //error must be type asserted, otherwise eslint has a mental breakdown
  const result = (error as Error).message;
  console.error("Error connecting to MongoDB: " + result);
}

interface TokenInterface {
  id: string;
}

//creation of a new grapgql server using apollo-server
// the server is defined with a schema and a context
const server = new ApolloServer({ 
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      if(!process.env.JWT_SECRET) throw new Error("no secret value declared in .env");
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      console.log(decodedToken);
      const currentUser = await User.findById((decodedToken as TokenInterface).id);
      return { currentUser };
    }
    //if no user is logged in, return undefined
    return undefined;
  },
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});