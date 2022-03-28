import { React, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxios from './useAxios';
import waiting from '../loading-buffering.gif';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';

const isList = true;
const SeriesList = () => {
    let { page } = useParams();
    let [data, loading] = useAxios('series', isList, page);

    if (loading) {
        return (
            <div className="loading">
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    const buildCard = (series) => {
        return (
            <Col className="mb-5">
                <Link to={`/series/${series.id}`}>
                    <Card style={{ width: '18rem' }} key={series.id}>
                        <Card.Img
                            variant="top"
                            src={`${series.thumbnail.path}/standard_fantastic.${series.thumbnail.extension}`}
                            alt={`${series.title}`}
                        />
                        <Card.Body>
                            <Card.Title className="text-center">
                                {series.title}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        );
    };

    const card =
        data &&
        data.results.map((series) => {
            return buildCard(series);
        });
    return (
        <div className="text-center mb-5">
            <div>
                {page > 0 && (
                    <Link
                        className="link"
                        to={`/series/page/${Number(page) - 1}`}
                    >
                        <Button className="btn me-3 mb-5 align-center">
                            Prev
                        </Button>
                    </Link>
                )}

                <Link className="link" to={`/series/page/${Number(page) + 1}`}>
                    <Button className="btn ms-3 mb-5 align-center">Next</Button>
                </Link>
            </div>
            <Container className="container-fluid flex-lg-wrap flex-coloumn ">
                <Row>{card}</Row>
            </Container>
        </div>
    );
};
export default SeriesList;
