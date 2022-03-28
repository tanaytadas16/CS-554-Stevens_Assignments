import { React } from 'react';
import useAxios from './useAxios';
import { useParams } from 'react-router-dom';
import waiting from '../loading-buffering.gif';

const Comic = () => {
    const { id } = useParams();
    const [data, loading] = useAxios(`comics/${id}`);
    console.log(data);
    if (loading) {
        return (
            <div className="loading">
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    return (
        <div className="App">
            {data.results.map((comic) => {
                {
                    console.log(comic);
                }
                return (
                    <div key={comic.id}>
                        {comic.name}
                        <div>
                            <img
                                src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                                alt="Not  found"
                            ></img>
                            <p>{comic.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Comic;
