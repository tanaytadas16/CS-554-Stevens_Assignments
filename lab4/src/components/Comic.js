import { React } from 'react';
import useAxios from './useAxios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import waiting from '../loading-buffering.gif';
import Error from './Error';
import '../App.css';

const Comic = () => {
    let linkid = '';
    let { id } = useParams();
    id = parseInt(id);

    const [data, loading, error] = useAxios(`comics/${id}`);

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
            {data.results.map((Comic) => {
                linkid = Comic.series.resourceURI.split('/').pop();
                return (
                    <div key={Comic.id}>
                        <br />
                        <br />
                        <div>
                            <img
                                src={`${Comic.thumbnail.path}/portrait_uncanny.${Comic.thumbnail.extension}`}
                                alt="Not found"
                            ></img>
                            <h1>{Comic.title}</h1>
                            <p>{Comic.description}</p>
                        </div>
                        <Row>
                            <Col>
                                <div className="contentlinks">
                                    <h2>
                                        <u> Featured in Series:</u>
                                    </h2>

                                    <div>
                                        <ul>
                                            <li>
                                                {' '}
                                                <Link to={`/series/${linkid}`}>
                                                    {Comic.series.name}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className="contentlinks">
                                    <h2>
                                        <u>Featured Characters:</u>
                                    </h2>
                                    <div>
                                        <ul>
                                            {Comic.characters.items.map(
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
                        </Row>
                    </div>
                );
            })}
        </div>
    );
};
export default Comic;
