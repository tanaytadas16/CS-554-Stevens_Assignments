import React from 'react';
import { Row, Col } from 'react-bootstrap';
// import '../Error.scss';

const Error = () => {
    return (
        <div className="error-status-page">
            {/* <h1>404 Page Not Found</h1>
            <h4 className="dynamic-msg"></h4>
            <p>
                Check that you typed the address correctly, go back to your
                previous page or try using our site search to find something
                specific.
            </p> */}
            <Row>
                {/* <Col>
                    {' '}
                    <img
                        className="Error"
                        src={require('../IronMan.png')}
                        alt={'Error 404'}
                    />
                </Col>{' '} */}
                <img
                    className="Error"
                    src={require('../marvelError.png')}
                    alt={'Carlie Anglemire'}
                />
            </Row>
        </div>
    );
};
export default Error;
