import React from 'react';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ExplorJob({ post }) {
    const UID = useSelector((state) => state.profile.id);
    const tok = useSelector((state) => state.auth.token);
    const handleApplyJob = async (jobId) => {
        try {
            await axios.post(`http://localhost:5292/api/JobReques/send`, {
                params: { jobId: jobId },
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    "Content-Type": "application/json"
                }
            });
            alert("Application submitted successfully!");
        } catch (error) {
            alert("Error submitting application.");
            console.error(error);
        }
    };

    return (
        <div className="instagram-card mb-4">
            <div className="instagram-card-header">
                <img src={post.user.profilePicture} alt="Profile" className="instagram-card-user-image" />
                <div className='justify-content-start mx-2'> <a className="instagram-card-link" href="#">
                    <div className="instagram-card-user-name"></div>{post.user.firstName} {post.user.lastName}
                    <div className="instagram-card-job-title">{post.user.jopTitle}</div></a>
                </div>
            </div>
            <div className="instagram-card-content">
                <div className="instagram-card-content-job-title">{post.title}</div>
                <p className='text-start'>{post.description}</p>
                {post.postImage && <img src={post.postImage} className="post-image"/>}
            </div>
            <div className="instagram-card-footer">
                {UID !== post.user.id && (
                    <button className="btnApplyJob mb-2" onClick={() => handleApplyJob(post.id)}>
                        Apply Job <FontAwesomeIcon icon={faBriefcase} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default ExplorJob;
