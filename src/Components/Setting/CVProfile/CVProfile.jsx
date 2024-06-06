import React, { useState, useEffect } from 'react';
import CVComponent from './CVComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CVProfile = () => {
    const tok = useSelector((state) => state.auth.token);
    const [data,setData]=useState([]);
    const getDataUser = async () => {
        try {
            const { data } = await axios.get('http://localhost:5292/api/User/get-CV', {
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
    console.log(data);
    const [isDonee, setIsDone] = useState(true);


    const UploadCV = () => {
        setIsDone(false);
    };


    const handleDeleteCV = async () => {
        const handleDelete = window.confirm("Are you sure you want to delete the CV?");
        if (handleDelete) {
            try {
                // Make a request to delete the image using your delete endpoint
                await axios.delete('http://localhost:5292/api/User/delete-CV', {
                    headers: {
                        'Authorization': 'Bearer ' + tok,
                    },
                });
                setIsDone(false);
                // Handle successful deletion if needed
            } catch (error) {
                console.error('Error deleting CV:', error);
            }
        }
    };
    useEffect(() => {
        getDataUser();
    }, [tok,handleDeleteCV]);
    console.log(data);

    return (
        <div>
            <h1 style={{ marginTop: "1rem" }}>
                <FontAwesomeIcon icon={faUser} style={{ color: '#5DADE2' }} /> CV Profile
            </h1>
            {data!=null ? (
                <CVComponent
                    cvData={data}
                    onDelete={handleDeleteCV}
                    onUpdate={UploadCV} // Assuming you need an update function as well
                />
            ) : (
                !isDonee ?  (
                    <CVComponent
                        cvData={data}
                        onDelete={handleDeleteCV}
                        onUpdate={UploadCV} // Assuming you need an update function as well
                    />
                ):(
                    <button onClick={UploadCV} className='action-button' style={{ marginTop: "5rem" }}>Upload CV</button>
                )
            )}
        </div>
    );
};

export default CVProfile;
