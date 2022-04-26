const { gql } = require('apollo-server');

const typeDefs = gql`
    type Pokemon {
        id: Int
        name: String
        url: String
        abilities: [String]
        types: [String]
    }
    type PokemonList {
        count: Int
        PokemonData: [Pokemon]
    }
    type Query {
        getPokemonList: PokemonList
        getEachPokemon(id: Int): Pokemon
    }
    # type Mutation {
    #     uploadImage(
    #         url: String!
    #         description: String
    #         posterName: String
    #     ): ImagePost
    #     updateImage(
    #         id: ID!
    #         url: String
    #         posterName: String
    #         description: String
    #         userPosted: Boolean
    #         binned: Boolean
    #     ): ImagePost
    #     deleteImage(id: ID!): ImagePost
    # }
`;
module.exports = { typeDefs };
