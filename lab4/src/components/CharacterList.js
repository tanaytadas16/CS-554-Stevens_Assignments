import { React, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxios from './useAxios';
import waiting from '../loading-buffering.gif';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import '../Box.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const isList = true;
const CharactersList = () => {
    let { page } = useParams();
    let [data, loading] = useAxios('characters', isList, Number(page) - 1);
    let [pageNum, setPageNum] = useState(0);
    const startsWith = 'nameStartsWith=';

    if (loading) {
        return (
            <div className="loading">
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    const buildCard = (character) => {
        return (
            <Col className="mb-5">
                <Link to={`/characters/${character.id}`}>
                    <Card style={{ width: '18rem' }} key={character.id}>
                        <Card.Img
                            variant="top"
                            src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                            alt={`${character.name}`}
                        />
                        <Card.Body>
                            <Card.Title className="text-center">
                                {character.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        );
    };

    const card =
        data &&
        data.results.map((character) => {
            return buildCard(character);
        });

    const totalPage = Math.ceil(data.total / data.limit);
    const handleChange = (e) => {
        setPageNum(e.target.page);
    };
    return (
        <div className="text-center mb-5">
            <div>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChange}
                        page={pageNum}
                    />
                </Stack>
                {page > 0 && (
                    <Link
                        className="link"
                        to={`/characters/page/${Number(page) - 1}`}
                    >
                        <Button className="btn me-3 mb-5 align-center">
                            Prev
                        </Button>
                    </Link>
                )}

                <Link
                    className="link"
                    to={`/characters/page/${Number(page) + 1}`}
                >
                    <Button className="btn ms-3 mb-5 align-center">Next</Button>
                </Link>
            </div>
            <Container className="container-fluid d-flex flex-lg-wrap flex-coloumn ">
                <Row xs={2} md={3} xxl={4}>
                    {card}
                </Row>
            </Container>
        </div>
    );
};
export default CharactersList;
