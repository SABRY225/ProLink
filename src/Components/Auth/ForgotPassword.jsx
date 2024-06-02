import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './ForgotPassword.css'; // لإضافة التنسيقات الخاصة بالمكون
import { setEmail } from "../../Redux/authSlice";
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
    const [email, setEmailInput] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // استخدام useNavigate بدلاً من navigator
    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            console.log(email);
            const response = await axios.post(`http://localhost:5292/api/Authorization/forget-password?email=${encodeURIComponent(email)}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(response.data.message);
            dispatch(setEmail(email))
            navigate('/new-password'); // استخدام navigate بدلاً من navigator
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.log(err);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default ForgotPassword;
