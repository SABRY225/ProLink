import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import user_image from "../../../assets/user_image.png";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { setBackImage } from '../../../Redux/profileSlice';

function BackImage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditShow, setIsEditShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDoneFile, setIsDoneFile] = useState(false);
    const tok = useSelector((state) => state.auth.token);
    const BackImage = useSelector((state) => state.profile.backImage);
    const [data, setData] = useState([]);
    // console.log(BackImage);
    const dispatch = useDispatch();
    const handleEditClick = () => {
        setIsEditing(true);
        setIsEditShow(true);
    };
    const handleDeleteClick = async () => {
        const handleDelete = window.confirm("Are you sure you want to delete the image?");
        if (handleDelete) {
            try {
                // Make a request to delete the image using your delete endpoint
                await axios.delete('http://localhost:5292/api/User/delete-BackImage', {
                    headers: {
                        'Authorization': 'Bearer ' + tok,
                    }
                });
                setSelectedFile(null);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setIsEditShow(false);
    };

    const handleFileChange = (e) => {
        if (e.target && e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            setIsDoneFile(true);
        }
    };
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `files/${selectedFile.name}`);
        console.log(storageRef);
        try {
            const snapshot = await uploadBytes(storageRef, selectedFile);
            const downloadURL = await getDownloadURL(snapshot.ref);
            await axios.put(`http://localhost:5292/api/User/Update-BackImage`, null, {
                params: { file: downloadURL },
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    'Content-Type': 'application/json'
                }
            });
            setIsEditing(false);
            setIsEditShow(false);
            
            
        } catch (err) {
            console.log(err);
        }
    };
    const getDataUser = async () => {
        try {
            const { data } = await axios.get('http://localhost:5292/api/User/get-BackImage', {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    "Content-Type": "application/json"
                }
            });
            setData(data);
            // console.log(data);
        } catch (error) {
            if (error.message === "Request failed with status code 401") {
                dispatch(loginSuccess(""))
            }
        }
    };
     
    useEffect(() => {
        getDataUser();
    },[getDataUser,handleDeleteClick,handleSaveChanges]);

    return (
        <div className='container formUserInfo '>
            <div className='row '>
                <div className='col-12'>
                    {isDoneFile  && selectedFile ? (
                        <img src={URL.createObjectURL(selectedFile)} alt="User Profile" className='UserBackImageProfile' />
                    ) : (
                        <img src={data} alt="Default User" className='UserBackImageProfile' />
                    )}
                    {isEditing && (
                        <div className='row d-flex text-center'>
                            <div className='col-12 m-1'>
                                <input type="file" className='Uplode_Image' id="fileInput" onChange={handleFileChange} />
                                <label htmlFor="fileInput" className="UploadButton">
                                    <span className="UploadButtonLabel">Upload Background Profile</span>
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
                        <button type="button" onClick={handleEditClick}><FontAwesomeIcon icon={faEdit} /> Edit Background Profile</button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" onClick={handleDeleteClick} className='Delete'><FontAwesomeIcon icon={faTrash} /> Delete Background Profile</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BackImage;
