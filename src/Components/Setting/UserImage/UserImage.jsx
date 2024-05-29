import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import user_image from "../../../assets/user_image.png";

function UserImage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditShow, setIsEditShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDoneFile, setIsDoneFile] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
        setIsEditShow(true);

    };

    const handleDeleteClick = () => {
        const handleDelete = window.confirm("Are you sure you want to delete the image?");
        if (handleDelete) {
            // Implement logic to delete the image
            setSelectedFile(null);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setIsEditShow(false);
    };

    const handleSaveChanges = () => {
        // Implement logic to save changes
        setIsEditing(false);
        setIsEditShow(false);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsDoneFile(true)
    };
console.log(isDoneFile);
    return (
        <div className='formUserInfo container'>
            <div className='row justify-content-center'>
                <div className='col-12'>
                    {isDoneFile ? (
                        <img src={URL.createObjectURL(selectedFile)} alt="User Profile" className='UserImageProfile' />
                    ) : (
                        <img src={user_image} alt="Default User" className='UserImageProfile' />
                    )}
                    {isEditing && (
                        <div className='row d-flex text-center'>
                            <div className='col-12 m-1'>
                                <input type="file" className='Uplode_Image' id="fileInput" onChange={handleFileChange} />
                                <label htmlFor="fileInput" className="UploadButton">
                                    <span className="UploadButtonLabel">Upload Image</span>
                                </label>
                            </div>
                            <div className="col-12 d-flex">
                                <div className="col-6">
                                    <button type="button" className='SaveChanges' onClick={handleSaveChanges}>Save Changes</button>
                                </div>
                                <div className="col-6">
                                    <button type="button" className='Cancel' onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {!isEditShow && (
                <div className="row d-flex">
                    <div className="col-md-6">
                        <button type="button" onClick={handleEditClick}><FontAwesomeIcon icon={faEdit} /> Edit Image</button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" onClick={handleDeleteClick} className='Delete'><FontAwesomeIcon icon={faTrash} /> Delete Image</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserImage;
