const data = require('../data/pokeData');
// const BinData = require('../data/RedisData');
const resolvers = {
    Query: {
        getPokemonList: async (parent, args) => {
            const pokedata = await data.getPokeList(
                args.pageNum,
                args.searchTerm
            );
            // console.log(pokedata);
            return pokedata;
        },
        getEachPokemon: async (parent, args) => {
            const pokemon = await data.getEachPoke(args.id);
            return pokemon;
        },
    },
};

module.exports = { resolvers };
