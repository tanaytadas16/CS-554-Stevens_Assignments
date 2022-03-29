import { React } from 'react';
import useAxios from './useAxios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import waiting from '../loading-buffering.gif';
import Error from './Error';
import '../App.css';
import ComicsList from './ComicsList';

const Comic = () => {
    let linkid = '';
    let { id } = useParams();
    id = parseInt(id);

    const [data, loading, error] = useAxios(`comics/${id}`);
    console.log('data', data);
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
                            <h2>{Comic.title}</h2>
                            <p>{Comic.description}</p>
                        </div>
                        <Row>
                            <Col>
                                <div className="contentlinks">
                                    <h4>
                                        <u> Featured in Series:</u>
                                    </h4>

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
                                    <h4>
                                        <u>Featured Characters:</u>
                                    </h4>
                                    <div>
                                        <ul>
                                            {Comic.characters.items.map(
                                                (eachCharacter) => {
                                                    console.log(eachCharacter);
                                                    linkid =
                                                        eachCharacter.resourceURI
                                                            .split('/')
                                                            .pop();
                                                    console.log(linkid);

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
                        </Row>
                    </div>
                );
            })}
        </div>
    );
};
export default Comic;
