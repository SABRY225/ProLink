import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './ResetPassword.css'; // لإضافة التنسيقات الخاصة بالمكون

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
            const response = await axios.put('http://localhost:5292/api/Authorization/reset-password', { otp, newPassword,email});
            setMessage('Password reset successfully.');
            navigate('/signin'); // توجيه المستخدم إلى صفحة تسجيل الدخول بعد إعادة تعيين كلمة المرور بنجاح
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="otp">OTP :</label>
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
                    <label htmlFor="newPassword">New Password :</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ResetPassword;
