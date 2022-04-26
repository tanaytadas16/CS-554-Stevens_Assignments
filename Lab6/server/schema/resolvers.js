const data = require('../data/pokeData');
// const BinData = require('../data/RedisData');
const resolvers = {
    Query: {
        getPokemonList: async (parent, args) => {
            const pokedata = await data.getPokeList();
            // console.log(pokedata);
            return pokedata;
        },
        getEachPokemon: async (parent, args) => {
            const pokemon = await data.getEachPoke(args.id);
            return pokemon;
        },
    },
    // ImagePost: {
    //     binned: async (parent) => {
    //         // console.log(parent);
    //         const CheckBinned = await BinData.CheckIfInBin(parent.id);
    //         // console.log(CheckBinned);
    //         return CheckBinned;
    //     },
    // },
    // Mutation: {
    //     uploadImage: async (parent, args) => {
    //         const AddUserImage = await BinData.AddUserImage(args);
    //         if (!AddUserImage) return { Error: 'Could not Insert Image' };
    //         return { AddUserImage: 'Inserted' };
    //     },
    //     updateImage: async (parent, args) => {
    //         // console.log(args);
    //         if (args.binned == true) {
    //             const AddToBin = await BinData.AddPostToBin(args);
    //         } else {
    //             const RemoveFromBin = await BinData.RemoveFromBin(args);
    //         }
    //         // const CheckImageInBin = BinData.CheckIfInBin();
    //     },
    //     deleteImage: async (parent, args) => {
    //         const deleteUserImage = await BinData.DeleteUserImage(args);
    //         return deleteUserImage;
    //     },
    // },
};

module.exports = { resolvers };
