import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { catchPokemon, releasePokemon } from '../actions';
import Grid from '@mui/material/Grid';

function MediaCard({ PokemonData }) {
    const dispatch = useDispatch();
    const allState = useSelector((state) => state.trainers);
    let trainerId;

    allState.forEach((x) => {
        if (x.isSelected) {
            trainerId = x.id;
        }
    });
    let selectTeam = [];
    let teamlen = 0;
    const selectedTrainer = allState[allState.findIndex((x) => x.isSelected)];
    if (selectedTrainer) {
        selectTeam = selectedTrainer.team;
        teamlen = selectTeam.length;
    }

    return (
        <Card
            style={{
                maxWidth: 350,
                height: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 5,
                border: '1px solid #1e8678',
                boxShadow:
                    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
            }}
        >
            <Link to={`/pokemon/${PokemonData.id}`}>
                <CardMedia
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    component="img"
                    alt="green iguana"
                    image={PokemonData.url}
                />

                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                            borderBottom: '1px solid #1e8678',
                            fontWeight: 'bold',
                        }}
                    >
                        {PokemonData.name}
                    </Typography>
                </CardContent>
            </Link>
            <div>
                <CardActions className="justify-content-center">
                    {selectTeam.findIndex((x) => x.id == PokemonData.id) !=
                    -1 ? (
                        <Button
                            color="secondary"
                            variant="contained"
                            size="large"
                            onClick={() => {
                                dispatch(
                                    releasePokemon(trainerId, PokemonData.id)
                                );
                            }}
                        >
                            Release
                        </Button>
                    ) : teamlen != 6 &&
                      selectTeam.findIndex((x) => x.id == PokemonData.id) ==
                          -1 ? (
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                dispatch(
                                    catchPokemon(trainerId, {
                                        id: PokemonData.id,
                                        name: PokemonData.name,
                                        url: PokemonData.url,
                                    })
                                );
                            }}
                        >
                            Catch
                        </Button>
                    ) : (
                        <Button color="error" variant="contained" size="large">
                            {' '}
                            Party Full{' '}
                        </Button>
                    )}
                </CardActions>
            </div>
        </Card>
    );
}

export default MediaCard;
