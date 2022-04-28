import { React, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import MediaCard from './MediaCard';
// import { Card, Row, Col, Container, Button } from 'react-bootstrap';

import '../App.css';
import waiting from '../loading-buffering.gif';
import Pagination from './Pagination';
import { Grid } from '@material-ui/core';

const QUERY_POKEMON_LIST = gql`
    query Query($pageNum: Int, $searchTerm: String) {
        getPokemonList(pageNum: $pageNum, searchTerm: $searchTerm) {
            count
            PokemonData {
                id
                name
                url
            }
        }
    }
`;
function PokemonList() {
    let { pagenum } = useParams();
    pagenum = Number(pagenum);
    const [Page, setPage] = useState(pagenum);
    const [searchTerm, setSearch] = useState('');
    const navigate = useNavigate();
    const { data, loading, refetch, error } = useQuery(QUERY_POKEMON_LIST, {
        variables: {
            pageNum: Number(pagenum),
            onCompleted: () => setPage(pagenum),
        },
    });

    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleButton = () => {
        // console.log('Button pressed');
        refetch({
            searchTerm: searchTerm,
        });
    };
    const handlePage = (event, value) => {
        setPage(parseInt(value) - 1);
        navigate(`/pokemon/page/${Number(value) - 1}`);
    };
    if (loading) {
        return (
            <div className="loading">
                <br />
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    if (error) {
        return <div>Error</div>;
    }
    return (
        <div>
            <div>
                <h1>PokeMon List</h1>
            </div>

            <label>
                Search:{''}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleChange(e)}
                />
                <button type="button" onClick={() => handleButton()}>
                    Submit
                </button>
            </label>

            <br />
            <br />

            <div className="Pagination">
                <Pagination
                    count={Math.ceil(data.getPokemonList.count / 20)}
                    handlePage={handlePage}
                    page={Number(Page)}
                />
            </div>
            <br />
            <br />
            <div>
                <Grid
                    container
                    style={{
                        flexGrow: 1,
                        flexDirection: 'row',
                    }}
                    spacing={5}
                >
                    {data.getPokemonList.PokemonData &&
                        data.getPokemonList.PokemonData.map((singlePokemon) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    xl={2}
                                    key={singlePokemon.name}
                                >
                                    <MediaCard PokemonData={singlePokemon} />
                                </Grid>
                            );
                        })}
                    {!data.getPokemonList.PokemonData && <div>Not Found</div>}
                </Grid>
            </div>
        </div>
    );
}

export default PokemonList;
