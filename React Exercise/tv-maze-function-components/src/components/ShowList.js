import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core';

import '../App.css';
const useStyles = makeStyles({
    card: {
        maxWidth: 250,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    media: {
        height: '100%',
        width: '100%',
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
const ShowList = (props) => {
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState(undefined);
    const [showsData, setShowsData] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [PrevPage, setPreviousPage] = useState(true);
    const [NextPage, setNextPage] = useState(false);
    const [Error, setError] = useState(false);
    let [counter, setCounter] = useState(10);

    let card = null;
    useEffect(() => {
        console.log('on load useeffect');
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    `http://api.tvmaze.com/shows?page=${props.match.params.pagenum}`
                );

                setShowsData(data);
                setLoading(false);

                if (props.match.params.pagenum <= 0) {
                    setPreviousPage(false);
                    setNextPage(true);
                } else {
                    setPreviousPage(true);
                }
            } catch (e) {
                console.log(e);
                setError(true);
            }
            try {
                const { data: NextData } = await axios.get(
                    `http://api.tvmaze.com/shows?page=${
                        Number(props.match.params.pagenum) + 1
                    }`
                );
                if (NextData.length < 1) {
                    setNextPage(false);
                } else setNextPage(true);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [props.match.params.pagenum]);

    useEffect(() => {
        console.log('search useEffect fired');
        async function fetchData() {
            try {
                console.log(`in fetch searchTerm: ${searchTerm}`);
                const { data } = await axios.get(
                    'http://api.tvmaze.com/search/shows?q=' + searchTerm
                );
                setSearchData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        if (searchTerm) {
            console.log('searchTerm is set');
            fetchData();
        }
    }, [searchTerm]);

    const searchValue = async (value) => {
        setSearchTerm(value);
    };
    const buildCard = (show) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <Link to={`/shows/${show.id}`}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                image={
                                    show.image && show.image.original
                                        ? show.image.original
                                        : noImage
                                }
                                title="show image"
                            />

                            <CardContent>
                                <Typography
                                    className={classes.titleHead}
                                    gutterBottom
                                    variant="h6"
                                    component="h3"
                                >
                                    {show.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {show.summary
                                        ? show.summary
                                              .replace(regex, '')
                                              .substring(0, 139) + '...'
                                        : 'No Summary'}
                                    <span>More Info</span>
                                </Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };
    const decreaseCounter = async (count) => {
        setTimeout(() => {
            if (counter > 0) setCounter(counter - 1);
        }, 1000);
    };

    if (searchTerm) {
        card =
            searchData &&
            searchData.map((shows) => {
                let { show } = shows;
                return buildCard(show);
            });
    } else {
        card =
            showsData &&
            showsData.map((show) => {
                return buildCard(show);
            });
    }
    if (Error) {
        if (counter > 0) {
            decreaseCounter(counter);
        } else if (counter === 0) {
            //<Link to={`/shows/page/${Number(0)}`}></Link>;
            return (
                <div>
                    <h2>Go Back Watch those shows first :)</h2>
                    <h2>Redirecting back to Page 0 in {counter}</h2>
                </div>
            );
        }
    }

    if (loading) {
        if (counter !== 0)
            return (
                <div>
                    <h2>Loading....</h2>
                </div>
            );
    } else {
        return (
            <div>
                <SearchShows searchValue={searchValue} />
                <br />
                <br />
                {PrevPage === true && (
                    <Link
                        className="link"
                        to={`/shows/page/${
                            Number(props.match.params.pagenum) - 1
                        }`}
                    >
                        Prev
                    </Link>
                )}
                {NextPage === true && (
                    <Link
                        className="link"
                        to={`/shows/page/${
                            Number(props.match.params.pagenum) + 1
                        }`}
                    >
                        Next
                    </Link>
                )}

                <br />
                <br />
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
            </div>
        );
    }
};

export default ShowList;
