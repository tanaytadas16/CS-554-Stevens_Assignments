import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import '../App.css';
import waiting from '../loading-buffering.gif';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSelector, useDispatch } from 'react-redux';
import { catchPokemon, releasePokemon } from '../actions';
import Button from '@mui/material/Button';

const QUERY_POKEMON = gql`
    query Query($id: Int) {
        getEachPokemon(id: $id) {
            id
            name
            url
            abilities
            types
        }
    }
`;
const cardStyle = {
    transitionDuration: '0.3s',
    height: '50vw',
    padding: '25px',
};
function Pokemon() {
    let { id } = useParams();
    id = parseInt(id);
    const dispatch = useDispatch();
    const allState = useSelector((state) => state.trainers);
    let trainerId;
    allState.forEach((x) => {
        if (x.isSelected) {
            return (trainerId = x.id);
        }
    });
    let selectTeam = {};
    let teamlen = 0;
    const selectedTrainer = allState[allState.findIndex((x) => x.isSelected)];
    if (selectedTrainer) {
        selectTeam = selectedTrainer.team;
        teamlen = selectTeam.length;
    }

    const { data, loading, refetch, error } = useQuery(QUERY_POKEMON, {
        variables: { id: id },
    });

    if (loading) {
        return (
            <div className="loading">
                <br />
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <br />
                <br />

                <div>
                    <h1>404, No Data Found </h1>
                </div>
            </div>
        );
    }
    return (
        <div className="m-5">
            <div className="m-5">
                <Grid>
                    <Grid item>
                        <h1>{data.getEachPokemon.name.toUpperCase()}</h1>
                        <Card
                            className="shadow-lg p-3 mb-5 bg-white rounded"
                            style={{
                                maxWidth: 500,
                                height: 'auto',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderRadius: 5,
                                border: '1px solid #1e8678',
                                boxShadow:
                                    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
                            }}
                        >
                            <CardMedia
                                style={{
                                    // objectFit: 'cover',
                                    height: '100%',
                                    width: '100%',
                                }}
                                component="img"
                                alt="green iguana"
                                image={data.getEachPokemon.url}
                            />
                            {selectedTrainer && (
                                <div>
                                    {selectTeam.findIndex(
                                        (x) => x.id == data.getEachPokemon.id
                                    ) != -1 ? (
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            size="large"
                                            onClick={() => {
                                                dispatch(
                                                    releasePokemon(
                                                        trainerId,
                                                        data.getEachPokemon.id
                                                    )
                                                );
                                            }}
                                        >
                                            Release
                                        </Button>
                                    ) : teamlen != 6 &&
                                      selectTeam.findIndex(
                                          (x) => x.id == data.getEachPokemon.id
                                      ) == -1 ? (
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            size="large"
                                            onClick={() => {
                                                dispatch(
                                                    catchPokemon(trainerId, {
                                                        id: data.getEachPokemon
                                                            .id,
                                                        name: data
                                                            .getEachPokemon
                                                            .name,
                                                        url: data.getEachPokemon
                                                            .url,
                                                    })
                                                );
                                            }}
                                        >
                                            Catch
                                        </Button>
                                    ) : (
                                        <button> Party Full </button>
                                    )}
                                </div>
                            )}
                            <br />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    <h2>ABILITY:</h2>
                                    {data.getEachPokemon.abilities.map(
                                        (obj) => {
                                            return (
                                                <div key={obj.length}>
                                                    {obj}
                                                </div>
                                            );
                                        }
                                    )}
                                </Typography>
                                <br />
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    <h2>TYPE:</h2>
                                    {data.getEachPokemon.types.map((obj) => {
                                        return (
                                            <div key={obj.length}>{obj}</div>
                                        );
                                    })}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Pokemon;
