import { v4 as uuid } from 'uuid';
const initalState = [];
let copyState = null;
let index = 0;
const trainersReducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_TRAINER':
            let newTrainer = {
                id: uuid(),
                name: payload.name,
                team: [],
                isSelected: false,
            };
            return [...state, newTrainer];
        case 'SELECT_TRAINER':
            copyState = [...state];
            copyState.map((x) => {
                if (payload.id == x.id) {
                    x.isSelected = x.isSelected === true ? false : true;
                } else {
                    x.isSelected = false;
                }
            });
            return [...copyState];
        case 'DELETE_TRAINER':
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState.splice(index, 1);
            return [...copyState];
        case 'RELEASE_POKEMON':
            copyState = [...state];
            copyState.map((x) => {
                if (x.id === payload.trainerId) {
                    let index = x.team.findIndex(
                        (z) => z.id === payload.pokemonId
                    );
                    x.team.splice(index, 1);
                }
            });
            return [...copyState];
        case 'CATCH_POKEMON':
            copyState = [...state];

            index = copyState.findIndex((x) => {
                if (x.id === payload.trainerId) {
                    x.team.push({
                        id: payload.pokemonData.id,
                        name: payload.pokemonData.name,
                        url: payload.pokemonData.url,
                    });
                }
            });
            return [...copyState];
        default:
            return state;
    }
};

export default trainersReducer;
