const axios = require('axios');

const getPokeList = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);

    let count = data.count;

    const results = await Promise.all(
        data.results.map(async (poke) => {
            const { data } = await axios.get(poke.url);
            return await getEachPoke(data.id);
        })
    );

    return { count: count, PokemonData: results };
};
const getEachPoke = async (id) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

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

    return obj;
};

module.exports = { getPokeList, getEachPoke };
