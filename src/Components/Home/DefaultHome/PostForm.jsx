import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSignsPost } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const PostForm = ({ addPost }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const Name = useSelector((state) => state.profile.Name);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim() || image) {
            addPost(content, selectedFile);
            setContent('');
            setSelectedFile(null);
            setImage(false);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImage(true);
    };

    return (
        <div className="post-form">
            <div className='post-form-info'>
                <div className="imgInfoUserPost">
                    <img style={{ width: "5rem" }} src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" alt="User" />
                </div>
                <div className="InfoUserPost">{Name}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="post-form__textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind ....?"
                    rows="4"
                    cols="50"
                />
                {image && (
                    <div className="image-preview">
                        <img className="displayImgPost" style={{width:"35vw",height:"100vh"}}  src={URL.createObjectURL(selectedFile)} alt="Post" />
                    </div>
                )}
                <input type="file" className='Uplode_Image' id="fileInput" onChange={handleFileChange} />
                <label htmlFor="fileInput" className="UploadButton">
                    <span className="UploadButtonLabel"><FontAwesomeIcon icon={faImage} /></span>
                </label>
                <button className="post-form__button" type="submit">
                    <FontAwesomeIcon icon={faSignsPost} /> Send
                </button>
            </form>
        </div>
    );
};

export default PostForm;
