import React from 'react';
import { Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import '../style.css';
import '../App.css';
const Home = () => {
    return (
        <div className="HomeBody">
            <div class="wrapper run-animation" id="animate">
                <div class="logo">
                    <span class="marvel">Marvel</span>
                    <span class="studios">Studios</span>

                    <div class="restart">Restart</div>

                    <div className="m-5">
                        <Link className="link" to={`/characters/page/1`}>
                            <Button className="button" variant="light">
                                Characters
                            </Button>
                        </Link>
                        <Link className="link" to={`/comics/page/1`}>
                            <Button className="button" variant="light">
                                Comics
                            </Button>
                        </Link>
                        <Link className="link" to={`/series/page/1`}>
                            <Button className="button" variant="light">
                                Series
                            </Button>
                        </Link>
                        {/* <button
                            href="/characters/page/1"
                            type="button"
                            id="button"
                        >
                            Characters
                        </button>

                        <button href="/comics/page/1" type="button" id="button">
                            Comics
                        </button>
                        <button href="/series/page/1" type="button" id="button">
                            Series
                        </button> */}
                    </div>
                </div>
            </div>

            <div class="images"></div>

            <script src="../script.js"></script>
        </div>
    );
};

export default Home;
