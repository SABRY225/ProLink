import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setChangePassword } from '../../../Redux/profileSlice';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const tok = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.put('http://localhost:5292/api/Authorization/change-password', { newPassword, otp, currentPassword }, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    'Content-Type': 'application/json'
                }
            });
            setMessage('Password changed successfully.');
            // Clear form fields after successful submission
            setNewPassword('');
            setCurrentPassword('');
            setOtp('');
            dispatch(setChangePassword(false))
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.log(err);
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password:</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ChangePassword;
