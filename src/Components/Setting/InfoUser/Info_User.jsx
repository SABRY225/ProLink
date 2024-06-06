// src/UserForm.js

import React, { useState } from 'react';
import Select from 'react-select';
import {allSkills} from "../../Data/Skills/data"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faPhone, faTasks, faComment, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
const InfoUser = () => {
    // const tok = useSelector((state) => state.auth.token);
    // const firstName=
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        jopTitle: '',
        description: '',
        phoneNumber: '',
        skill: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSkillChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            skill: selectedOptions.map(option => option.value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send formData to a server
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className='formUserInfo container'>
            <div className='row justifiy-content-center'>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faUser} style={{ color: '#5DADE2'}}/> First Name: </span>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                </label>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faUser} style={{ color: '#5DADE2'}} /> Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </label>
            </div>
            <div className='row justifiy-content-center'>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faBriefcase} style={{ color: '#5DADE2'}} /> Job Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" name="jopTitle" value={formData.jopTitle} onChange={handleChange} />
                </label>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faPhone} style={{ color: '#5DADE2'}}/>&nbsp; Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </label>
            </div>
            <div className='row '>
                <label className='col-md-12'>
                    <div>
                        <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faComment} style={{ color: '#5DADE2'}}/>&nbsp;Description :</span>
                    </div>
                    <textarea type="text" name="description" value={formData.description} onChange={handleChange} rows="5" cols="100"></textarea>
                </label>
            </div>
            <div className='row text-center'>
                <div className='col-md-12'>
                <label><FontAwesomeIcon icon={faTasks} style={{ color: '#5DADE2'}}/> Skills :</label>
                <Select
                    isMulti
                    name="skills"
                    options={allSkills}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleSkillChange}
                />
                {/* <div>
                    {formData.skill.map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill}
                        </span>
                    ))}
                </div> */}
                </div>
            </div>
            <div className="row d-flex">
                <div className="col-md-6">
                <button type="submit"><FontAwesomeIcon icon={faEdit} /> Edite</button>
                </div>
                <div className="col-md-6 ">
                <button type="submit" className='Delete'><FontAwesomeIcon icon={faTrash} /> Delete Account</button>

                </div>

            </div>
        </form>
    );
};

export default InfoUser;
