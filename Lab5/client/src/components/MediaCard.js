import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

function MediaCard({
    ImageData,
    handleAddToBin,
    handleRemoveFromBin,
    handleDeleteUserImage,
    deletePost,
}) {
    const cardStyle = {
        display: 'block',
        transitionDuration: '0.3s',
        height: '45vw',
        padding: '25px',
    };
    return (
        <div className="text-center">
            <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                <CardMedia
                    style={cardStyle}
                    component="img"
                    alt="green iguana"
                    // height="4"
                    image={ImageData.url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {ImageData.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Posted By: {ImageData.posterName}
                    </Typography>
                </CardContent>
                <div>
                    <CardActions className="justify-content-center">
                        {!ImageData.binned && (
                            <Button
                                onClick={() => {
                                    handleAddToBin(ImageData);
                                }}
                                variant="contained"
                                size="large"
                            >
                                Add to Bin
                            </Button>
                        )}
                        {ImageData.binned && (
                            <Button
                                onClick={() => {
                                    handleRemoveFromBin(ImageData);
                                }}
                                variant="contained"
                                size="large"
                                color="error"
                            >
                                Remove from Bin
                            </Button>
                        )}
                        {deletePost && (
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    handleDeleteUserImage(ImageData);
                                }}
                            >
                                Delete Post
                            </Link>
                        )}
                    </CardActions>
                </div>
            </Card>
        </div>
    );
}

export default MediaCard;
