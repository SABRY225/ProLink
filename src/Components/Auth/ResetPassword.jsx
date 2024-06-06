import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const email = useSelector((state) => state.auth.email);

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.put('http://localhost:5292/api/Authorization/reset-password', { otp, newPassword, email });
            setMessage('Password reset successfully.');
            navigate('/signin');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <div className="card text-center mx-auto" style={{ width: '320px' }}>
                <div className="card-header h5 text-white">Reset Password</div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Please enter the OTP sent to your email and your new password.
                    </p>
                    <form onSubmit={handleSubmit}>
                            <label className="form-label" htmlFor="otp">OTP</label>
                        <div className="form-outline">
                            <input
                                type="text"
                                id="otp"
                                className="form-control my-3"
                                value={otp}
                                onChange={handleOtpChange}
                                required
                            />
                        </div>
                        <div className="form-outline">
                            <label className="form-label" htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                className="form-control my-3"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                    </form>
                    {message && <p className="text-success mt-3">{message}</p>}
                    {error && <p className="text-danger mt-3">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
