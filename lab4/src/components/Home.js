import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style.css';
import '../App.css';
const Home = () => {
    return (
        <div className="HomeBody">
            <div className="wrapper run-animation" id="animate">
                <div className="logo">
                    <span className="marvel">Marvel</span>
                    <span className="studios">Studios</span>

                    <div className="restart">Welcome !!!</div>
                    <div className="restart">
                        <p>
                            This website is built for Marvel Studios Characters,
                            Comics, Series. You can View List of each
                            respectively from the links below. You can search
                            matching Character, comics, series by keywords.
                        </p>
                    </div>

                    <div className="m-5">
                        <Link className="link" to={`/characters/page/0`}>
                            <Button className="button" variant="light">
                                Characters
                            </Button>
                        </Link>
                        <Link className="link" to={`/comics/page/0`}>
                            <Button className="button" variant="light">
                                Comics
                            </Button>
                        </Link>
                        <Link className="link" to={`/series/page/0`}>
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

            <div className="images"></div>

            <script src="../script.js"></script>
        </div>
    );
};

export default Home;
