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
        PokemonData: [PokeList]
    }
    type PokeList {
        id: Int
        name: String
        url: String
    }
    type Query {
        getPokemonList(pageNum: Int, searchTerm: String): PokemonList
        getEachPokemon(id: Int): Pokemon
    }
`;
module.exports = { typeDefs };
