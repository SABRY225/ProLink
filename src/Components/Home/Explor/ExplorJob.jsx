import React, { useState } from 'react';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ExplorJob({ post }) {
    const UID = useSelector((state) => state.profile.id);
    const tok = useSelector((state) => state.auth.token);
    const [isRequestSent, setIsRequestSent] = useState(post.isRequestSent);

    const handleApplyJob = async (jobId) => {
        try {
            await axios.post(`http://localhost:5292/api/JobReques/send?jobId=${jobId}`, null, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    'Content-Type': 'application/json'
                }
            });
            setIsRequestSent(true);
            toast.success("Job Request sent successfully!");
        } catch (error) {
            toast.error("Please try again");
            console.error(error);
        }
    };

    const handleCancelJobRequest = async (requestId) => {
        try {
            console.log("Request ID for cancellation: ", requestId); // Debugging line
            await axios.delete(`http://localhost:5292/api/JobReques/delete-jobRequest?requestId=${requestId}`, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    'Content-Type': 'application/json'
                }
            });
            setIsRequestSent(false);
            toast.success("Job request cancelled successfully!");
        } catch (error) {
            toast.error("Error cancelling job request.");
            console.error(error);
        }
    };

    return (
        <div className="instagram-card mb-4">
            <div className="instagram-card-header">
                <img src={post.user.profilePicture} alt="Profile" className="instagram-card-user-image" />
                <div className='justify-content-start mx-2'>
                    <a className="instagram-card-link" href="#">
                        <div className="instagram-card-user-name">{post.user.firstName} {post.user.lastName}</div>
                        <div className="instagram-card-job-title">{post.user.jobTitle}</div>
                    </a>
                </div>
            </div>
            <div className="instagram-card-content">
                <div className="instagram-card-content-job-title">{post.title}</div>
                <p className='text-start'>{post.description}</p>
                {post.postImage && <img src={post.postImage} className="post-image" alt="Post" />}
                {!post.isAvailable && <p className='text-danger'>This job is not available</p>}
            </div>
            <div className="instagram-card-footer">
                {UID !== post.user.id && post.isAvailable && (
                    <button 
                        className={`btnApplyJob mb-2 ${isRequestSent ? 'cancel' : 'apply'}`} 
                        onClick={() => isRequestSent ? handleCancelJobRequest(post.requestId) : handleApplyJob(post.id)}
                    >
                        {isRequestSent ? 'Cancel Job Request' : 'Apply Job'} 
                        <FontAwesomeIcon icon={faBriefcase} />
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default ExplorJob;
