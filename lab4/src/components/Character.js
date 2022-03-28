import { React } from 'react';
import useAxios from './useAxios';
import { useParams } from 'react-router-dom';
import waiting from '../loading-buffering.gif';
const Character = () => {
    const { id } = useParams();
    const [data, loading] = useAxios(`characters/${id}`);
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
            {data.results.map((character) => {
                {
                    console.log(character);
                }
                return (
                    <div key={character.id}>
                        {character.name}
                        <div>
                            <img
                                src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                                alt="Not found"
                            ></img>
                            <p>{character.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Character;
