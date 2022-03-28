import { React } from 'react';
import useAxios from './useAxios';
import { useParams } from 'react-router-dom';
import waiting from '../loading-buffering.gif';
const Series = () => {
    const { id } = useParams();
    const [data, loading] = useAxios(`series/${id}`);
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
            {data.results.map((series) => {
                {
                    console.log(series);
                }
                return (
                    <div key={series.id}>
                        {series.name}
                        <div>
                            <img
                                src={`${series.thumbnail.path}/portrait_uncanny.${series.thumbnail.extension}`}
                                alt="Not found"
                            ></img>
                            <p>{series.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Series;
