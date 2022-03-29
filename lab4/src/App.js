import logo from './marvel-logo.png';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import Home from './components/Home';
import CharactersList from './components/CharacterList';
import ComicsList from './components/ComicsList';
import SeriesList from './components/SeriesList';
import Character from './components/Character';
import Comic from './components/Comic';
import Series from './components/Series';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    return (
        <Router>
            <div>
                <div>
                    <Navbar
                        className="color-nav navbar-brand-center justify-content-center"
                        variant="dark"
                    >
                        <div
                            className="justify-content-center"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // height: '100vh',
                            }}
                        >
                            <Container>
                                <Row className="row justify-content-center">
                                    <Col>
                                        <Link to="/">
                                            <img
                                                src={logo}
                                                height="100"
                                                alt="Marvel-Logo"
                                            />
                                        </Link>
                                    </Col>
                                </Row>
                                <div style={{ fontSize: 18 }}>
                                    <Nav className="m-auto" variant="dark">
                                        <Nav.Link href="/characters/page/0">
                                            Characters
                                        </Nav.Link>
                                        <Nav.Link href="/comics/page/0">
                                            Comics
                                        </Nav.Link>
                                        <Nav.Link href="/series/page/0">
                                            Series
                                        </Nav.Link>
                                    </Nav>
                                </div>
                            </Container>
                        </div>
                    </Navbar>
                </div>

                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                        path="/characters/page/:page"
                        element={<CharactersList />}
                    />
                    <Route path="/characters/:id" element={<Character />} />
                    <Route
                        exact
                        path="/comics/page/:page"
                        element={<ComicsList />}
                    />
                    <Route path="/comics/:id" element={<Comic />} />
                    <Route
                        exact
                        path="/series/page/:page"
                        element={<SeriesList />}
                    />
                    <Route path="/series/:id" element={<Series />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
