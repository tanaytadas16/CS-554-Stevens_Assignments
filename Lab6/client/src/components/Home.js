import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <br />
            <br />
            <br />
            {/* {<img src={bg} alt="logo" />} */}
            <h1> Gotta catch em all </h1>
            <Link className="showlink" to="/pokemon/page/0">
                Pokemon Listing
            </Link>{' '}
            <br />
            <br />
            <Link className="showlink" to="/trainers">
                Trainers
            </Link>
        </div>
    );
}

export default Home;
