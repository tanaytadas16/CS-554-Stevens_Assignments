const addTrainer = (name) => ({
    type: 'ADD_TRAINER',
    payload: {
        name: name,
    },
});
const selectTrainer = (id) => ({
    type: 'SELECT_TRAINER',
    payload: { id: id },
});
const deleteTrainer = (id) => ({
    type: 'DELETE_TRAINER',
    payload: { id: id },
});
const catchPokemon = (trainerId, pokemonData) => ({
    type: 'CATCH_POKEMON',
    payload: {
        trainerId: trainerId,
        pokemonData: pokemonData,
    },
});
const releasePokemon = (trainerId, pokemonId) => ({
    type: 'RELEASE_POKEMON',
    payload: {
        trainerId: trainerId,
        pokemonId: pokemonId,
    },
});
module.exports = {
    addTrainer,
    deleteTrainer,
    catchPokemon,
    releasePokemon,
    selectTrainer,
};
