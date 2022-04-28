import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';

export default function PaginationSize({ count, handlePage, page }) {
    return (
        <Row className="justify-content-center">
            <Col md="auto">
                <div className="m-1">
                    <Stack spacing={2} className="align-center">
                        <Pagination
                            count={count}
                            variant="outlined"
                            onChange={handlePage}
                            page={page + 1}
                        />
                    </Stack>
                </div>
            </Col>
        </Row>
    );
}
//md={{ span: 8, offset: 5 }}
