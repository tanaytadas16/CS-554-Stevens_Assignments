import { React } from 'react';
import useAxios from './useAxios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import waiting from '../loading-buffering.gif';
import Error from './Error';
import '../App.css';

const Series = () => {
    let linkid = '';
    const { id } = useParams();
    const [data, loading, error] = useAxios(`series/${id}`);
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
            {data.results.map((Series) => {
                return (
                    <div key={Series.id}>
                        <br />
                        <br />
                        <div>
                            <img
                                src={`${Series.thumbnail.path}/portrait_uncanny.${Series.thumbnail.extension}`}
                                alt="Not found"
                            ></img>
                            <h2>{Series.name}</h2>
                            <p>{Series.description}</p>
                        </div>
                        <Row>
                            <Col>
                                <div className="contentlinks">
                                    <h4>
                                        <u> Characters in Series:</u>
                                    </h4>

                                    <div>
                                        <ul>
                                            {Series.characters.items.map(
                                                (eachCharacter) => {
                                                    linkid =
                                                        eachCharacter.resourceURI
                                                            .split('/')
                                                            .pop();

                                                    return (
                                                        <li>
                                                            {' '}
                                                            <Link
                                                                to={`/characters/${linkid}`}
                                                            >
                                                                {
                                                                    eachCharacter.name
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
                                    <h4>
                                        <u>Based on Comics:</u>
                                    </h4>
                                    <div>
                                        <ul>
                                            {Series.comics.items.map(
                                                (eachComic) => {
                                                    linkid =
                                                        eachComic.resourceURI
                                                            .split('/')
                                                            .pop();

                                                    return (
                                                        <li>
                                                            {' '}
                                                            <Link
                                                                to={`/comics/${linkid}`}
                                                            >
                                                                {eachComic.name}
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
export default Series;
