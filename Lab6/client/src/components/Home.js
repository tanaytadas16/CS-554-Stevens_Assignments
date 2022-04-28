import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <img
                src="https://media0.giphy.com/media/slVWEctHZKvWU/giphy.gif?cid=ecf05e470zbdext113hlt5z5wdsuoaemrbv4ygopjgffyv2k&rid=giphy.gif&ct=g"
                alt="pokemon gif"
            />{' '}
            <br />
            <br />
            <br />
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
