import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faImage, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from 'axios';
const PostForm = ({ addPost, data }) => {
    const tok = useSelector((state) => state.auth.token);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const profilePicture = useSelector((state) => state.profile.profilePicture);
    const handleFileChange = (e) => {
        if (e.target && e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setImage(true);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (content.trim() || image) {
            setContent('');
            setSelectedFile(null);
            setImage(false);
        }
        console.log(selectedFile);
        const storageRef = ref(storage, `imagespost/${selectedFile.name}`);
        console.log(storageRef);
        const snapshot = await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(isDone);
        if (isDone) {
            console.log('User wants to post');
            try {
                    await axios.post(`http://localhost:5292/api/Post`,{
                        description: content,
                        postImage: downloadURL
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + tok,
                            'Content-Type': 'application/json'
                        }
                    });
                    alert("post");
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('User wants to apply for a job');
            try {
                    await axios.post(`http://localhost:5292/api/Job`, {
                        title: "string",
                        description: content,
                        postImage: downloadURL
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + tok,
                            'Content-Type': 'application/json'
                        }
                    });
                    alert("job");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="post-form">
            <div className='post-form-info'>
                <div className="imgInfoUserPost">
                    <img style={{ width: "3rem", borderRadius: "50%", height: "3rem" }} src={profilePicture ? profilePicture : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} alt="User" />
                </div>
                <div className="InfoUserPost"> {data.firstName + " " + data.lastName}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="post-form__textarea TextAreaFiled"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind ....?"
                    rows="1"
                    cols="50"
                />
                {image && (
                    <div className="image-preview">
                        <img className="displayImgPost" style={{ width: "10vw", height: "20vh" }} src={URL.createObjectURL(selectedFile)} alt="Post" />
                    </div>
                )}
                <input type="file" className='Uplode_Image' name='description' id="fileInput" onChange={handleFileChange} />
                <label htmlFor="fileInput" className="UploadButton">
                    <span className="UploadButtonLabel"><FontAwesomeIcon icon={faImage} /></span>
                </label>
                <button className="post-form__button_Post" type='submit' onClick={()=>{setIsDone(true)}}>
                    Post <FontAwesomeIcon icon={faSignsPost} /> 
                </button>
                <button className="post-form__button_Jobs" type='submit'>
                    Job <FontAwesomeIcon icon={faBriefcase} onClick={()=>{setIsDone(false)}}/>
                </button>
            </form>
        </div>
    );
};

export default PostForm;
