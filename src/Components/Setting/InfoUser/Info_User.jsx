// src/UserForm.js

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { allSkills } from "../../Data/Skills/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faPhone, faTasks, faComment, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../../Redux/authSlice';

const InfoUser = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tok = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const getDataUser = async () => {
        try {
            const { data } = await axios.get('http://localhost:5292/api/User/user-info', {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    "Content-Type": "application/json"
                }
            });
            setData(data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(loginSuccess(""));
            } else {
                setError('Failed to fetch user data.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDataUser();
    }, [tok]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jopTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [skills, setSkills] = useState([]);
    console.log(data);
    useEffect(() => {
        if (data) {
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setJobTitle(data.jopTitle || '');
            setDescription(data.description || '');
            setPhoneNumber(data.phoneNumber || '');
            setSkills(data.skills ? data.skills.map(skill => ({ label: skill, value: skill })) : []);
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'jopTitle':
                setJobTitle(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            default:
                break;
        }
    };

    const handleSkillChange = (selectedOptions) => {
        setSkills(selectedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            firstName,
            lastName,
            jopTitle,
            description,
            phoneNumber,
            skills: skills.map(skill => skill.value)
        };

        try {
            const res = await axios.put(`http://localhost:5292/api/User/update-info`, JSON.stringify(formData), {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    'Content-Type': 'application/json'
                }
            });
            alert(res.data);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <form onSubmit={handleSubmit} className='formUserInfo container'>
            <div className='row justify-content-center'>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faUser} style={{ color: '#5DADE2' }} /> First Name: </span>
                    <input type="text" name="firstName" value={firstName} onChange={handleChange} />
                </label>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faUser} style={{ color: '#5DADE2' }} /> Last Name:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" name="lastName" value={lastName} onChange={handleChange} />
                </label>
            </div>
            <div className='row justify-content-center'>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faBriefcase} style={{ color: '#5DADE2' }} /> Job Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" name="jopTitle" value={jopTitle} onChange={handleChange} />
                </label>
                <label className='col-6'>
                    <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faPhone} style={{ color: '#5DADE2' }} />&nbsp; Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange} />
                </label>
            </div>
            <div className='row'>
                <label className='col-md-12'>
                    <div>
                        <span style={{ width: "12rem" }}><FontAwesomeIcon icon={faComment} style={{ color: '#5DADE2' }} />&nbsp;Description :</span>
                    </div>
                    <textarea name="description" value={description} onChange={handleChange} rows="5" cols="100"></textarea>
                </label>
            </div>
            <div className='row text-center'>
                <div className='col-md-12'>
                    <label><FontAwesomeIcon icon={faTasks} style={{ color: '#5DADE2' }} /> Skills :</label>
                    <Select
                        isMulti
                        name="skills"
                        options={allSkills}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={skills}
                        onChange={handleSkillChange}
                    />
                </div>
            </div>
            <div className="row d-flex text-center">
                <div className="col-md-12">
                    <button type="submit"><FontAwesomeIcon icon={faEdit} /> Edit</button>
                </div>
            </div>
        </form>
    );
};

export default InfoUser;
