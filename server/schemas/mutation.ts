import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Mutation {
    createUser: String!
    login: String! 
  }
`;

export const resolvers = {
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