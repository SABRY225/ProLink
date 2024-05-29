import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignsPost, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Jobs, Posts } from '../../ImportFile';

function PostUser() {
  const [isPost, setIsPost] = useState(true);
  const [isJobs, setIsJobs] = useState(false);

  const handlePost = () => {
    setIsJobs(false);
    setIsPost(true);
  };

  const handleJobs = () => {
    setIsPost(false);
    setIsJobs(true);
  };

  return (
    <>
      <div className='col-md-12'>
        <div className="profile-buttons">
          <div onClick={handlePost} className={`btn ${isPost ? 'btn-active' : 'btn-inactive'}`}>
            <FontAwesomeIcon icon={faSignsPost} />&nbsp; Post
          </div>
          <div onClick={handleJobs} className={`btn ${isJobs ? 'btn-active' : 'btn-inactive'}`}>
            <FontAwesomeIcon icon={faTasks} />&nbsp;&nbsp;Jobs
          </div>
        </div>
      </div>
      <div className='col-md-12'>
        {isPost ? <Posts /> : ""}
        {isJobs ? <Jobs /> : ""}
      </div>
    </>
  );
}

export default PostUser;
