import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import schema from './server/schemas';

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

const server = new ApolloServer({ schema });

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});