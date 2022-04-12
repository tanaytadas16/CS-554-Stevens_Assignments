import React from 'react';
import Button from 'react-bootstrap/esm/Button';
function Pagination({ prevPage, nextPage, page }) {
    return (
        <div>
            <div>
                {page > 1 && (
                    <Button style={{ margin: '50px' }} onClick={prevPage}>
                        Previous Results
                    </Button>
                )}

                <Button style={{ margin: '50px' }} onClick={nextPage}>
                    Get More
                </Button>
            </div>
        </div>
    );
}

export default Pagination;
