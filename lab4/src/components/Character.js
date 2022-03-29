import { React } from 'react';
import useAxios from './useAxios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import waiting from '../loading-buffering.gif';
import Error from './Error';
import '../App.css';

const Character = () => {
    let linkid = '';
    const { id } = useParams();
    const [data, loading, error] = useAxios(`characters/${id}`);

    if (loading) {
        return (
            <div className="loading">
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    if (!data || error) {
        return (
            <div>
                <Error />
            </div>
        );
    }
    return (
        <div className="App">
            {data.results.map((character) => {
                return (
                    <div key={character.id}>
                        <br />
                        <br />
                        <div>
                            <img
                                src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                                alt="Not found"
                            ></img>
                            <h1>{character.name}</h1>
                            <p className="m-4 ">{character.description}</p>
                        </div>
                        <Row>
                            <Col>
                                <div className="contentlinks">
                                    <h2>
                                        <u> Featured in Series:</u>
                                    </h2>

                                    <div>
                                        <ul>
                                            {character.series.items.map(
                                                (eachSeries, index) => {
                                                    linkid =
                                                        eachSeries.resourceURI
                                                            .split('/')
                                                            .pop();

                                                    return (
                                                        <li key={index}>
                                                            {' '}
                                                            <Link
                                                                to={`/series/${linkid}`}
                                                            >
                                                                {
                                                                    eachSeries.name
                                                                }
                                                            </Link>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="contentlinks">
                                    <h2>
                                        <u>Featured in Comics:</u>
                                    </h2>
                                    <div>
                                        <ul>
                                            {character.comics.items.map(
                                                (eachSeries, index) => {
                                                    linkid =
                                                        eachSeries.resourceURI
                                                            .split('/')
                                                            .pop();

                                                    return (
                                                        <li key={index}>
                                                            {' '}
                                                            <Link
                                                                to={`/comics/${linkid}`}
                                                            >
                                                                {
                                                                    eachSeries.name
                                                                }
                                                            </Link>
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                );
            })}
        </div>
    );
};
export default Character;
