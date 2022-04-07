import { ApolloServer } from 'apollo-server';
import typeDefs from './schema/type-defs';
import resolvers from './schema/resolvers';

const ApolloServer = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});
