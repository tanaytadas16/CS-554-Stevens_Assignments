import { React, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAxios from './useAxios';
import waiting from '../loading-buffering.gif';
import { Card, Row, Col, Container, Button, Form } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import '../Box.css';
const isList = true;

const ComicsList = () => {
    let { page } = useParams();
    const navigate = useNavigate('');
    let [searchTerm, setSearchTerm] = useState('');
    const startsWith = 'titleStartsWith=';
    let [data, loading] = useAxios(
        'comics',
        isList,
        page,
        searchTerm,
        startsWith
    );

    if (loading) {
        return (
            <div className="loading">
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    const buildCard = (comics) => {
        return (
            <Col className="mb-5">
                <Link to={`/comics/${comics.id}`}>
                    <Card style={{ width: '18rem' }} key={comics.id}>
                        <Card.Img
                            variant="top"
                            src={`${comics.thumbnail.path}/portrait_uncanny.${comics.thumbnail.extension}`}
                            alt={`${comics.title}`}
                        />
                        <Card.Body>
                            <Card.Title className="text-center">
                                {comics.title}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        );
    };

    const card =
        data &&
        data.results.map((comics) => {
            return buildCard(comics);
        });
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const totalPage = Math.ceil(data.total / data.limit);

    const pageNum = 1;
    const handlePage = (e) => {
        navigate(`/comics/page/${pageNum}`);
    };
    // const style = { backgroundColor: '#e12835', padding: '1.5em' };
    return (
        <div className="text-center mb-5">
            <div className="Search">
                <br />
                <Row>
                    <Col md={{ span: 4, offset: 9 }}>
                        <InputGroup className="w-50 align">
                            <FormControl
                                id="searchBar"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </div>
            <div className="Pagination">
                <div className="Bootstrap pagination">
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPage}
                            variant="outlined"
                            shape="rounded"
                            onChange={handlePage}
                            page={pageNum}
                        />
                    </Stack>
                </div>

                <br />
                <br />
                {page > 0 && (
                    <Link
                        className="link"
                        to={`/comics/page/${Number(page) - 1}`}
                    >
                        <Button className="btn me-3 mb-5 align-center">
                            Prev
                        </Button>
                    </Link>
                )}

                <Link className="link" to={`/comics/page/${Number(page) + 1}`}>
                    <Button className="btn ms-3 mb-5 align-center">Next</Button>
                </Link>
            </div>
            <br />

            <div className="Content">
                <Container className="container-fluid d-flex flex-lg-wrap flex-coloumn ">
                    <Row>{card}</Row>
                </Container>
            </div>
        </div>
    );
};

export default ComicsList;
