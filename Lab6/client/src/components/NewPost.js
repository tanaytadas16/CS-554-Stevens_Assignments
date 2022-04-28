import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useQuery, gql, useMutation } from '@apollo/client';
import validator from 'validator';

const MUTATION_UPLOAD_IMAGE = gql`
    mutation Mutation(
        $url: String!
        $description: String
        $posterName: String
    ) {
        uploadImage(
            url: $url
            description: $description
            posterName: $posterName
        ) {
            id
            posterName
            url
            userPosted
            description
            binned
        }
    }
`;
function NewPost() {
    const nav = useNavigate();
    const Formstyle = {
        padding: '10px 100px 10px 100px',
    };
    const [uploadImage] = useMutation(MUTATION_UPLOAD_IMAGE);

    function handleUploadImage(e) {
        e.preventDefault();

        if (!e.target.elements.url.value) {
            alert('Please provide Image URL');
            e.target.elements.url.focus();
        } else if (!validator.isURL(e.target.elements.url.value)) {
            alert('Image URL is not of URL type');
            e.target.elements.url.focus();
        } else {
            uploadImage({
                variables: {
                    description: e.target.elements.description.value,
                    url: e.target.elements.url.value,
                    posterName: e.target.elements.author.value,
                },
            });

            e.target.elements.url.value = '';
            e.target.elements.description.value = '';
            e.target.elements.author.value = '';
            alert('Post Added');
            nav('/my-posts');
        }
    }
    return (
        <div>
            <div
                className="justify-content-center"
                style={{ marginLeft: '23%', width: '100%', paddingTop: '50px' }}
            >
                <br />
                <Card className="shadow-lg p-3 mb-5 bg-white rounded w-50 m-5 ">
                    <Form
                        autoComplete="off"
                        method="POST"
                        onSubmit={(e) => {
                            handleUploadImage(e);
                        }}
                    >
                        <Form.Group
                            className="mb-3"
                            // controlId="formDescription"
                            style={Formstyle}
                        >
                            <Form.Label>Description :</Form.Label>
                            <Form.Control
                                id="description"
                                type="text"
                                placeholder="Description"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            // controlId="formUrl"
                            style={Formstyle}
                        >
                            <Form.Label>Image URL :</Form.Label>
                            <Form.Control
                                id="url"
                                type="url"
                                placeholder="URL"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            // controlId="formAuthorName"
                            style={Formstyle}
                        >
                            <Form.Label>Author Name :</Form.Label>
                            <Form.Control
                                id="author"
                                type="text"
                                placeholder="Name"
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default NewPost;
