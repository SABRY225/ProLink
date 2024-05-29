import React, { useState } from 'react';
import { TVComponent } from '../../ImportFile/index';

function Posts() {
    const [isLoadData, setIsLoadData] = useState(false);
    
    return (
        <div className="container">
            {isLoadData ? (
                <div className="col-md-12">
                    {/* Render your content here */}
                </div>
            ) : (
                <div style={{marginLeft:"8vw"}}>
                    <TVComponent />
                </div>
            )}
        </div>
    );
}

export default Posts;
