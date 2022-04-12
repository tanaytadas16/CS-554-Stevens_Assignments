import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import MediaCard from './MediaCard';
import Button from '@mui/material/Button';
import '../App.css';
import waiting from '../loading-buffering.gif';

const QUERY_USER_IMAGES = gql`
    query Query {
        userPostedImages {
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
const MUTATION_DELETE_USERIMAGE = gql`
    mutation Mutation($id: ID!) {
        deleteImage(id: $id) {
            id
            posterName
            url
            description
            userPosted
            binned
        }
    }
`;
function UserPost() {
    const { data, loading, refetch } = useQuery(QUERY_USER_IMAGES);

    const [AddtoBinData] = useMutation(MUTATION_UPDATE_IMAGE, {
        onCompleted: refetch,
    });
    const [RemoveFromBinData] = useMutation(MUTATION_UPDATE_IMAGE, {
        onCompleted: refetch,
    });
    const [handleRemoveUserImage] = useMutation(MUTATION_DELETE_USERIMAGE, {
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
            },
        });
    }
    function handleDeleteUserImage(ImageData) {
        const deleteData = { ...ImageData };
        handleRemoveUserImage({
            variables: {
                id: deleteData.id,
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
    if (!loading && data.userPostedImages.length)
        return (
            <div className="card-container">
                <br />
                <br />
                <Button variant="contained" size="large" href="/new-post">
                    Upload a Post
                </Button>
                <br />
                <br />
                {!data.userPostedImages === null && (
                    <div>No Post Available, Upload a new post</div>
                )}

                {data &&
                    data.userPostedImages.map((eachPhoto) => {
                        return (
                            <div key={eachPhoto.id}>
                                <br />

                                <MediaCard
                                    ImageData={eachPhoto}
                                    handleAddToBin={handleAddToBin}
                                    handleRemoveFromBin={handleRemoveFromBin}
                                    handleDeleteUserImage={
                                        handleDeleteUserImage
                                    }
                                    deletePost
                                />
                            </div>
                        );
                    })}
            </div>
        );
    else {
        return (
            <div style={{ fontSize: '25px' }}>
                {' '}
                <br />
                <br />
                <Button variant="contained" size="large" href="/new-post">
                    Upload a Post
                </Button>
                <br />
                <br />
                No Post Available, Upload a new post
            </div>
        );
    }
}
export default UserPost;
