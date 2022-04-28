import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import MediaCard from './MediaCard';
import '../App.css';
import waiting from '../loading-buffering.gif';

import { useState } from 'react';
import Pagination from './Pagination';
const QUERY_UNSPLASH_IMAGES = gql`
    query Query($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
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

function Unsplash() {
    const [Page, setPage] = useState(1);
    const { data, loading, refetch } = useQuery(QUERY_UNSPLASH_IMAGES, {
        variables: { pageNum: Page },
    });
    const [AddtoBinData] = useMutation(MUTATION_UPDATE_IMAGE, {
        onCompleted: refetch,
    });
    const [RemoveFromBinData] = useMutation(MUTATION_UPDATE_IMAGE, {
        onCompleted: refetch,
    });

    function handleAddToBin(ImageData) {
        const DataToBin = { ...ImageData };
        DataToBin.binned = true;

        AddtoBinData({
            variables: {
                id: DataToBin.id,
                posterName: DataToBin.posterName,
                description: DataToBin.description,
                url: DataToBin.url,
                userPosted: DataToBin.userPosted,
                binned: DataToBin.binned,
            },
        });
        // return data;
    }
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
    const prevPage = () => {
        setPage(Page - 1);
    };
    const nextPage = () => {
        setPage(Page + 1);
    };

    if (loading) {
        return (
            <div className="loading">
                <br />
                <img src={waiting} height="100" alt="Loading-icon" />
            </div>
        );
    }
    return (
        <div className="card-container">
            {data &&
                data.unsplashImages.map((eachPhoto) => {
                    return (
                        <div key={eachPhoto.id}>
                            <br />
                            <MediaCard
                                ImageData={eachPhoto}
                                handleAddToBin={handleAddToBin}
                                handleRemoveFromBin={handleRemoveFromBin}
                            />
                        </div>
                    );
                })}

            <Pagination
                prevPage={() => prevPage()}
                nextPage={() => nextPage()}
                page={Page}
            />
        </div>
    );
}

export default Unsplash;
