import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostList = () => {
    const [data, setData] = useState([]);
    const tok = useSelector((state) => state.auth.token);
    const UID = useSelector((state) => state.profile.id);
    const dispatch = useDispatch();

    const getJobs = async () => {
        try {
            const { data } = await axios.get('http://localhost:5292/api/Job/get-all', {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    "Content-Type": "application/json"
                }
            });
            setData(data);
            console.log(data);
        } catch (error) {
            if (error.message === "Request failed with status code 401") {
                dispatch(loginSuccess(""))
            }
        }
    };

    const handleApplyJob = async (jobId) => {
        try {
            await axios.post(`http://localhost:5292/api/JobReques/send?jobId=${jobId}`, null, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    "Content-Type": "application/json"
                }
            });
            toast.success("Job Request sent successfully!");
            getJobs(); // Refresh the job list to update the request status
        } catch (error) {
            toast.error("Please try again");
            console.error(error);
        }
    };

    const handleCancelJobRequest = async (requestId) => {
        try {
            await axios.delete(`http://localhost:5292/api/JobReques/delete-jobRequest?jobId=${requestId}`, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    "Content-Type": "application/json"
                }
            });
            toast.success("Job request cancelled successfully!");
            getJobs(); // Refresh the job list to update the request status
        } catch (error) {
            toast.error("Error cancelling job request.");
            console.error(error);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

    return (
        <div className="post-list">
            {data.map((post, index) => (
                <div key={index} className="col-12 post">
                    <div className="col-md-12">
                        <div className="col-md-6 d-flex">
                            <div className="col-md-3">
                                <img src={post.user.profilePicture} alt="profilePicture" style={{ width: '55px', height: '55px', borderRadius: '50%' }} />
                            </div>
                            <div className="col-md-5 m-1 text-start" style={{ marginTop: "1rem" }}>
                                <div style={{ marginLeft: "0px" }}>{post.user.firstName + " " + post.user.lastName}</div>
                                <div style={{ marginLeft: "0px", fontSize: "10px", color: "#5DADE2" }}>{post.user.jopTitle}</div>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12 d-flex text-center">
                            <p className='text-center' style={{ marginLeft: "1rem", marginTop: "1rem", fontSize: "18px", color: "#212F3D " }}>{post.description}</p>
                        </div>
                        <div className="col-md-12">
                            {post.postImage ? <img src={post.postImage} alt="Post" className="post__image" /> : " "}
                        </div>
                        <div className="col-md-12">
                            {!post.isAvailable && <p className='text-danger'>This job is not available</p>}
                            {UID !== post.user.id && post.isAvailable && (
                                <button
                                    className='btnApplyJob'
                                    onClick={() => post.isRequestSent ? handleCancelJobRequest(post.id) : handleApplyJob(post.id)}
                                    style={{ backgroundColor: post.isRequestSent ? 'red' : '#007bff' }}
                                >
                                    {post.isRequestSent ? 'Cancel Job Request' : 'Apply Job'}
                                    <FontAwesomeIcon icon={faBriefcase} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default PostList;
