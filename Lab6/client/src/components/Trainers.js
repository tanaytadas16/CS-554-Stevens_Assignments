import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pokemon from './Pokemon';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { addTrainer, deleteTrainer, selectTrainer } from '../actions';

const ariaLabel = { 'aria-label': 'description' };

function Trainers() {
    const dispatch = useDispatch();
    const allState = useSelector((state) => state.trainers);
    const [newtrainer, setNewTrainer] = useState('');
    let card = null;

    const handleChange = (e) => {
        setNewTrainer(e.target.value);
    };
    const addTrainer1 = () => {
        if (!newtrainer || newtrainer.trim() == 0) {
            return alert('Please enter a valid name');
        }
        dispatch(addTrainer(newtrainer));
        setNewTrainer('');
    };
    const buildCard = (pokemon) => {
        //let pokeId = pokemon.url.split("/")[6];

        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.name}>
                <Card
                    className={{
                        maxWidth: 250,
                        height: 'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        borderRadius: 5,
                        border: '1px solid #1e8678',
                        boxShadow:
                            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
                    }}
                    variant="outlined"
                >
                    <Link to={`/pokemon/${pokemon.id}`}>
                        <CardMedia
                            className={{
                                height: '100%',
                                width: '100%',
                            }}
                            component="img"
                            image={pokemon.url}
                            title="show image"
                        />
                        <CardContent>
                            <Typography
                                className={{
                                    borderBottom: '1px solid #1e8678',
                                    fontWeight: 'bold',
                                }}
                                gutterBottom
                                variant="h6"
                                component="h1"
                            >
                                {pokemon.name}
                            </Typography>
                        </CardContent>
                    </Link>
                </Card>
            </Grid>
        );
    };
    return (
        <div>
            <h1>Trainers</h1>{' '}
            <div className="add">
                <div className="input-selection">
                    <label>
                        Trainer:
                        <input
                            onChange={(e) => handleChange(e)}
                            value={newtrainer}
                            id="name"
                            name="name"
                            placeholder="Trainer Name..."
                            required
                        />
                    </label>
                </div>
                <br />
                <button onClick={addTrainer1}>Add Trainer</button>
                <div>
                    <br />
                    <br />
                    {allState.map((x) => {
                        return (
                            <div key={x.id}>
                                <p>{x.name}</p>
                                {x.isSelected == false ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                dispatch(selectTrainer(x.id))
                                            }
                                        >
                                            Select Trainer
                                        </button>
                                        <button
                                            onClick={() =>
                                                dispatch(deleteTrainer(x.id))
                                            }
                                        >
                                            Delete trainer
                                        </button>
                                    </div>
                                ) : (
                                    <button>Selected</button>
                                )}
                                <Grid container spacing={5}>
                                    {
                                        (card =
                                            x.team &&
                                            x.team.map((poke) => {
                                                return buildCard(poke);
                                            }))
                                    }
                                </Grid>
                                <br />
                                <br />
                                <br />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Trainers;
