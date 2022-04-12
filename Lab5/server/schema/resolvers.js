const data = require('../data/ImageData');
const BinData = require('../data/RedisData');
const resolvers = {
    Query: {
        unsplashImages: async (parent, args) => {
            const pageNum = args.pageNum;
            return await data.unsplashImages(pageNum);
        },
        binnedImages: async (parent, args) => {
            const ImagesFromBin = await BinData.GetBinImages();
            // console.log(ImagesFromBin);
            if (!ImagesFromBin) return;
            return ImagesFromBin;
        },
        userPostedImages: async (parent, args) => {
            const userPostedImages = await BinData.GetUserImages();
            // console.log(userPostedImages);
            if (!userPostedImages) return;
            return userPostedImages;
        },
    },
    ImagePost: {
        binned: async (parent) => {
            // console.log(parent);
            const CheckBinned = await BinData.CheckIfInBin(parent.id);
            // console.log(CheckBinned);
            return CheckBinned;
        },
    },
    Mutation: {
        uploadImage: async (parent, args) => {
            const AddUserImage = await BinData.AddUserImage(args);
            if (!AddUserImage) return { Error: 'Could not Insert Image' };
            return { AddUserImage: 'Inserted' };
        },
        updateImage: async (parent, args) => {
            // console.log(args);
            if (args.binned == true) {
                const AddToBin = await BinData.AddPostToBin(args);
            } else {
                const RemoveFromBin = await BinData.RemoveFromBin(args);
            }
            // const CheckImageInBin = BinData.CheckIfInBin();
        },
        deleteImage: async (parent, args) => {
            const deleteUserImage = await BinData.DeleteUserImage(args);
            return deleteUserImage;
        },
    },
};

module.exports = { resolvers };
