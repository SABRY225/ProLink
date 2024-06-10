import React, { useState } from 'react';
import { TVComponent } from '../../ImportFile/index';

function Jobs() {
    const [isLoadData, setIsLoadData] = useState(false);
    
    return (
        <div className="container">
            {isLoadData ? (
                <div className="col-md-12">
                    {/* Render your content here */}
                </div>
            ) : (
                <div style={{marginLeft:"8vw"}}>
                    {/* <TVComponent /> */}
                </div>
            )}
        </div>
    );
}

export default Jobs