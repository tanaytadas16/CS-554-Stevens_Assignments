import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import MediaCard from './MediaCard';
import waiting from '../loading-buffering.gif';
import '../App.css';
const QUERY_FROM_BIN = gql`
    query Query {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;
const MUTATION_UPDATE_IMAGE = gql`
    mutation Mutation(
        $id: ID!
        $binned: Boolean
        $url: String
        $posterName: String
        $userPosted: Boolean
        $description: String
    ) {
        updateImage(
            id: $id
            binned: $binned
            url: $url
            posterName: $posterName
            userPosted: $userPosted
            description: $description
        ) {
            binned
            id
            posterName
            description
            url
            userPosted
        }
    }
`;

function DataFromBin() {
    const { data, loading, refetch } = useQuery(QUERY_FROM_BIN);
    const [RemoveFromBinData] = useMutation(MUTATION_UPDATE_IMAGE, {
        onCompleted: refetch,
    });
    function handleRemoveFromBin(ImageData) {
        const RemoveData = { ...ImageData };
        RemoveData.binned = false;
        RemoveFromBinData({
            variables: {
                id: RemoveData.id,
                posterName: RemoveData.posterName,
                description: RemoveData.description,
                url: RemoveData.url,
                userPosted: RemoveData.userPosted,
                binned: RemoveData.binned,
            },
        });
    }

    if (loading) {
        return (
            <div className="loading">
                <br />
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    if (data.binnedImages === null || data.binnedImages.length === 0) {
        return (
            <div style={{ fontSize: '25px' }}>
                <br />
                No Images In Bin
            </div>
        );
    }
    return (
        <div className="card-container">
            <br />
            {data &&
                data.binnedImages.map((eachPhoto) => {
                    return (
                        <div key={eachPhoto.id}>
                            <br />
                            <MediaCard
                                ImageData={eachPhoto}
                                handleRemoveFromBin={handleRemoveFromBin}
                            />
                        </div>
                    );
                })}
        </div>
    );
}

export default DataFromBin;
