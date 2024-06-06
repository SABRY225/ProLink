import React, { useState } from 'react';
import "./StyleCV.css"
import { storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import axios from 'axios';
import { useSelector } from 'react-redux';

const CVComponent = ({ cvData, onUpdate, onDelete }) => {
  const tok = useSelector((state) => state.auth.token);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUpdate = async () => {
    const storageRef = ref(storage, `cvs/${selectedFile.name}`);
    console.log(storageRef);
    try {
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await axios.put(`http://localhost:5292/api/User/Update-CV`, null, {
        params: { file: downloadURL },
        headers: {
          'Authorization': 'Bearer ' + tok,
          'Content-Type': 'application/json'
        }
      });
      // take Url
      onUpdate(downloadURL);
      setIsEditing(false);
      console.log(downloadURL);

    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleInputChange = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <div className="cv-container">
      {isEditing ? (
        <div>
          <input
            type="file"
            name="cv"
            onChange={handleInputChange}
            className="input-field"
          />
          <button onClick={handleUpdate} className="action-button">Save</button>
        </div>
      ) : (
        <div>

          {cvData ?<h2 className="cv-name">
            <a href={cvData} target="_blank" rel="noopener noreferrer">View CV</a>
          </h2>:" " }

          <button onClick={() => setIsEditing(true)} className="action-button">{cvData ? (<span>Edite</span>) : (<span>Add CV</span>)}</button>
          {cvData ?<button onClick={handleDelete} className="action-button" style={{background:"red"}}>Delete</button>:" "}
        </div>
      )}
    </div>
  );
};

export default CVComponent;
