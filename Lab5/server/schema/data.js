import axios from 'axios';

const getdata = async () => {
    const { data } = await axios.get(`https://api.unsplash.com/photos?page=1`);
    return data;
};

module.exports = getdata;
