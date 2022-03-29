import { React, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAxios from './useAxios';
import waiting from '../loading-buffering.gif';
import { Card, Row, Col, Container } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import '../Box.css';
import Error from './Error';
const isList = true;

const SeriesList = () => {
    let { page } = useParams();
    page = parseInt(page);
    const navigate = useNavigate();
    let [searchTerm, setSearchTerm] = useState('');
    let [pageNum, setPageNum] = useState(page);
    // let [offset, setOffset] = useState(pageNum * 20);
    useEffect(() => {
        setPageNum(page);
    }, [page]);

    // console.log(offset);
    const startsWith = 'titleStartsWith=';

    let [data, loading, error] = useAxios(
        'series',
        isList,
        page,
        searchTerm,
        startsWith,
        pageNum * 20
    );

    if (loading) {
        return (
            <div className="loading">
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    if (!data || error == true) {
        return <Error />;
    }
    const buildCard = (series) => {
        return (
            <Col className="mb-5" key={series.id}>
                <Link to={`/series/${series.id}`}>
                    <Card style={{ width: '18rem' }} key={series.id}>
                        <Card.Img
                            variant="top"
                            src={`${series.thumbnail.path}/portrait_uncanny.${series.thumbnail.extension}`}
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
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setPageNum(0);
        navigate('/series/page/0');
    };
    const totalPage = Math.ceil(data.total / data.limit);

    const handlePage = (event, value) => {
        setPageNum(parseInt(value) - 1);
        navigate(`/series/page/${value - 1}`);
    };

    return (
        <div className="text-center mb-5">
            <div className="Search">
                <br />
                <Row>
                    <Col md={{ span: 5, offset: 5 }}>
                        <InputGroup className="w-50 align">
                            <FormControl
                                id="searchBar"
                                placeholder="Searching for something, type here"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
            </div>
            <br />
            <br />
            <Row>
                <Col md={{ span: 8, offset: 5 }}>
                    <div className="m-1">
                        <Stack spacing={2} className="align-center">
                            <Pagination
                                count={totalPage}
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePage}
                                page={pageNum + 1}
                            />
                        </Stack>
                    </div>
                </Col>
            </Row>

            <br />

            <div className="Content">
                <Container className="container-fluid d-flex flex-lg-wrap flex-coloumn ">
                    <Row>{card}</Row>
                </Container>
            </div>
            <br />
            <Row>
                <Col md={{ span: 8, offset: 5 }}>
                    <div className="m-1">
                        <Stack spacing={2} className="align-center">
                            <Pagination
                                count={totalPage}
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePage}
                                page={pageNum + 1}
                            />
                        </Stack>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SeriesList;
