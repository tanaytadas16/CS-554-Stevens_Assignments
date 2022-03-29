import React from 'react';
// import '../Error.scss';

const Error = () => {
    return (
        <div className="error-status-page">
            {/* <h1>404</h1> */}
            <section id="error-status" className="error-status" data-state="4">
                <div className="overlay"></div>
                <div className="flex-wrapper no-pad">
                    <div className="flex-col">
                        <div className="error-copy">
                            <h1>404 Page Not Found</h1>
                            <h4 className="dynamic-msg"></h4>
                            <p>
                                Check that you typed the address correctly, go
                                back to your previous page or try using our site
                                search to find something specific.
                            </p>
                        </div>
                    </div>
                    <div className="flex-col toAnimate no-pad">
                        <div className="error-image-animate"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Error;
