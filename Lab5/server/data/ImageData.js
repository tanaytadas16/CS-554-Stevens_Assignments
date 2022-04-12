const axios = require('axios');

const unsplashImages = async (pageNum) => {
    const { data } = await axios.get(
        `https://api.unsplash.com/photos?page=${pageNum}&client_id=9B57ftbG8wHf8VuiZlmDs4RW5HemrxgKpZQmwyNNJMA`
    );
    let result = [];

    for (let x of data) {
        const obj = {
            id: x.id,
            url: x.urls.regular,
            posterName: x.user.username,
            description: x.description,
            userPosted: false,
            binned: false,
        };
        result.push(obj);
    }
    return result;
};
module.exports = { unsplashImages };
