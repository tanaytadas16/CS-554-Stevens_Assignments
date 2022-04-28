const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();
(async () => {
    await client.connect();
})();

const getPokeList = async (pageNum, searchTerm) => {
    const offset = pageNum * 20;
    if (searchTerm) {
        try {
            const { data } = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            );
            const count = 1;
            const searchObj = {
                id: data.id,
                name: data.name,
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            };
            return { count: count, PokemonData: [searchObj] };
        } catch (e) {
            return { count: 0, PokemonData: null };
        }
    }

    let pokeCacheData = await client.exists(`PokeList${offset}`);

    if (pokeCacheData) {
        let pokeCacheData = await client.get(`PokeList${offset}`);

        return JSON.parse(pokeCacheData);
    } else {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}`
        );

        let count = data.count;
        const results = data.results.map((poke) => {
            let pokeId = poke.url.split('/')[6];
            let obj = {
                id: pokeId,
                name: poke.name,
                url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`,
            };
            return obj;
        });
        await client.set(
            `PokeList${offset}`,
            JSON.stringify({ count: count, PokemonData: results })
        );

        return { count: count, PokemonData: results };
    }
};
const getEachPoke = async (id) => {
    let pokeCacheData = await client.exists(`Pokemon${id}`);

    if (pokeCacheData) {
        let pokeCacheData = await client.get(`Pokemon${id}`);

        return JSON.parse(pokeCacheData);
    } else {
        const { data } = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const obj = {
            id: data.id,
            name: data.name,
            url: data.sprites.other['official-artwork'].front_default,
            abilities: data.abilities.map((soleAbility) => {
                return soleAbility.ability.name;
            }),
            types: data.types.map((soleType) => {
                return soleType.type.name;
            }),
        };
        await client.set(`Pokemon${id}`, JSON.stringify(obj));
        return obj;
    }
};

module.exports = { getPokeList, getEachPoke };
