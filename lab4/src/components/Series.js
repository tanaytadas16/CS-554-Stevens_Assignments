import { React } from 'react';
import useAxios from './useAxios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
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
                            <h1>{Series.name}</h1>
                            <p>{Series.description}</p>
                        </div>
                        <Row>
                            <Col>
                                <div className="contentlinks">
                                    <h2>
                                        <u> Characters in Series:</u>
                                    </h2>

                                    <div>
                                        <ul>
                                            {Series.characters.items.map(
                                                (eachCharacter, index) => {
                                                    linkid =
                                                        eachCharacter.resourceURI
                                                            .split('/')
                                                            .pop();

                                                    return (
                                                        <li key={index}>
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
                                    <h2>
                                        <u>Based on Comics:</u>
                                    </h2>
                                    <div>
                                        <ul>
                                            {Series.comics.items.map(
                                                (eachComic, index) => {
                                                    linkid =
                                                        eachComic.resourceURI
                                                            .split('/')
                                                            .pop();

                                                    return (
                                                        <li key={index}>
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
