import { useState, useEffect } from 'react';
import Error from './Error';
const useAxios = (url, isList, page, searchTerm, startsWith, offset) => {
    const axios = require('axios');
    const md5 = require('md5');
    const publickey = '0ecac5d6b17a21f2c833ae9bf42214fa';
    const privatekey = 'a4c3d3f6cafca2b24870e3a088669a0fb9622935';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public';
    const keyHash = 'ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    let fetchUrl = '';

    if (searchTerm) {
        fetchUrl = `${baseUrl}/${url}?${startsWith}${searchTerm}&${keyHash}&offset=${offset}`;
        console.log(fetchUrl);
    } else if (isList) {
        fetchUrl = `${baseUrl}/${url}?${keyHash}&offset=${offset}`;
    } else {
        fetchUrl = `${baseUrl}/${url}?${keyHash}`;
    }

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                let { data } = await axios.get(fetchUrl);
                if (!data) setError(true);
                console.log(data);
                setData(data.data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setData(null);
                console.log(e);
            }
        };
        getData();
    }, [url, page, searchTerm]);

    return [data, loading];
};
export default useAxios;
