import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NoResult() {
    return (
        <div className="no-result-container">
            <FontAwesomeIcon icon={faSearch} className="no-result-icon" />
            <h2 className="no-result-title">No Results Found</h2>
            <p className="no-result-message">We couldn't find any result matching your criteria. Please try adjusting your search or check back later.</p>
        </div>
    );
}

export default NoResult;
