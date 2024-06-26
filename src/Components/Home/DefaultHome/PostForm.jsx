import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faImage, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from 'axios';

const PostForm = ({ setData }) => {
    const tok = useSelector((state) => state.auth.token);
    const [content, setContent] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [image, setImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isJobPost, setIsJobPost] = useState(false);
    const profilePicture = useSelector((state) => state.profile.profilePicture);

    const handleFileChange = (e) => {
        if (e.target && e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setImage(true);
        }
    };

    const handleSubmit = async (e, isJob) => {
        e.preventDefault();

        if (!content.trim() && !image) {
            return;
        }

        let downloadURL = '';
        if (image && selectedFile) {
            const storageRef = ref(storage, `imagespost/${selectedFile.name}`);
            const snapshot = await uploadBytes(storageRef, selectedFile);
            downloadURL = await getDownloadURL(snapshot.ref);
        }

        const postData = {
            description: content,
            postImage: downloadURL,
        };

        if (isJob) {
            postData.title = jobTitle;
        }

        try {
            const url = isJob ? `http://localhost:5292/api/Job` : `http://localhost:5292/api/Post`;
            const response = await axios.post(url, postData, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    'Content-Type': 'application/json'
                }
            });

            setContent('');
            setSelectedFile(null);
            setImage(false);
            setJobTitle('');
            setIsJobPost(false);

            // Update the list of jobs with the new job
            setData(prevData => [response.data, ...prevData]);

        } catch (err) {
            console.error(err);
        }
    };
    return (
        <form className="post-form" onSubmit={(e) => handleSubmit(e, isJobPost)}>
            <div className="post-form-info">
                <div className="imgInfoUserPost">
                    <img
                        style={{ width: "3rem", borderRadius: "50%", height: "3rem", marginTop: "-10px" }}
                        src={profilePicture ? profilePicture : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"}
                        alt="User"
                    />
                </div>
                <div className="post-form-input-group">
                    <textarea
                        className="post-form__textarea TextAreaFiled"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind ....?"
                        rows="1"
                        cols="50"
                    />
                    {isJobPost && (
                        <input
                            type="text"
                            className="post-form__input"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="Job Title"
                        />
                    )}
                </div>
            </div>
            {image && (
                <div className="image-preview">
                    <img className="displayImgPost" style={{ width: "10vw", height: "20vh" }} src={URL.createObjectURL(selectedFile)} alt="Post" />
                </div>
            )}
            <div className="button-group">
                <label htmlFor="fileInput" className="UploadButton">
                    <FontAwesomeIcon icon={faImage} />
                </label>
                <input type="file" className='Uplode_Image' name='description' id="fileInput" onChange={handleFileChange} />
                <button
                    className="post-form__button_Post"
                    type='button'
                    onClick={(e) => {
                        setIsJobPost(false);
                        handleSubmit(e, false);
                    }}
                >
                    Post <FontAwesomeIcon icon={faSignsPost} />
                </button>
                <button
                    className="post-form__button_Jobs"
                    type='button'
                    onClick={(e) => {
                        setIsJobPost(true);
                        handleSubmit(e, true);
                    }}
                >
                    Job <FontAwesomeIcon icon={faBriefcase} />
                </button>
            </div>
        </form>
    );
};

export default PostForm;
