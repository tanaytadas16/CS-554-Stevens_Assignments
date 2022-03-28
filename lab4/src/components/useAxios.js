import { useState, useEffect } from 'react';
const useAxios = (url, isList, page, searchTerm, startsWith) => {
    const axios = require('axios');
    const md5 = require('md5');
    const publickey = '0ecac5d6b17a21f2c833ae9bf42214fa';
    const privatekey = 'a4c3d3f6cafca2b24870e3a088669a0fb9622935';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public';
    const keyHash = 'ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    let offset = Number(page) * 20;
    let fetchUrl = '';

    if (searchTerm) {
        fetchUrl = `${baseUrl}/${url}?${startsWith}${searchTerm}&${keyHash}`;
    } else if (isList) {
        fetchUrl = `${baseUrl}/${url}?${keyHash}&offset=${offset}`;
    } else {
        fetchUrl = `${baseUrl}/${url}?${keyHash}`;
    }

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            try {
                let { data } = await axios.get(fetchUrl);
                console.log(data);
                setData(data.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [url, page, searchTerm]);

    return [data, loading];
};
export default useAxios;
