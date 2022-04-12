const redis = require('redis');
const port = process.env.PORT || 6379;
const client = redis.createClient(port);
const { v4: uuidv4 } = require('uuid');

(async () => {
    await client.connect();
})();

async function CheckIfInBin(id) {
    const checkInBin = await client.lRange('Binned', 0, -1);
    for (let eachPost of checkInBin) {
        if (JSON.parse(eachPost).id == id) return true;
    }
    return false;
}
async function AddPostToBin(args) {
    await client.lPush('Binned', JSON.stringify(args));
}
async function GetBinImages() {
    const BinnedImages = await client.lRange('Binned', 0, -1);
    if (!BinnedImages) return;
    let ImageArray = [];
    for (let eachpost of BinnedImages) {
        ImageArray.push(JSON.parse(eachpost));
    }

    return ImageArray;
}
async function RemoveFromBin(args) {
    let element = await client.lRange('Binned', 0, -1);

    await client.lRem(
        'Binned',
        0,
        element.find((post) => JSON.parse(post).id == args.id)
    );
}
async function AddUserImage(args) {
    if (!args) return { Error: ' Empty Arguments' };
    const upadatedObject = {
        id: uuidv4(),
        url: args.url,
        posterName: args.posterName,
        description: args.description,
        userPosted: true,
        binned: false,
    };

    const addUserImage = await client.lPush(
        'UserImage',
        JSON.stringify(upadatedObject)
    );
    if (!addUserImage) return 'Error: Could not insert User Image';
}
async function DeleteUserImage(args) {
    let element = await client.lRange('UserImage', 0, -1);
    let BinnedElement = await client.lRange('Binned', 0, -1);
    await client.lRem(
        'UserImage',
        0,
        element.find((post) => JSON.parse(post).id == args.id)
    );
    await client.lRem(
        'Binned',
        0,
        BinnedElement.find((post) => JSON.parse(post).id == args.id)
    );
}

async function GetUserImages() {
    const getUserImage = await client.lRange('UserImage', 0, -1);

    let ImageArray = [];
    for (let eachpost of getUserImage) {
        ImageArray.push(JSON.parse(eachpost));
    }

    return ImageArray;
}

module.exports = {
    AddPostToBin,
    GetBinImages,
    CheckIfInBin,
    RemoveFromBin,
    DeleteUserImage,
    AddUserImage,
    GetUserImages,
};
