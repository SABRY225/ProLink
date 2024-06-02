// src/components/SendOtp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
    const email = useSelector((state) => state.auth.email);
    console.log(email);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formData = Object.fromEntries(fd.entries());

        try {
            console.log(email);
            console.log(formData.otp);
            const response = await axios.post('http://localhost:5292/api/Authorization/verify-otp', {
                email,
                otp: formData.otp
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage('OTP sent successfully!');
            navigate("/");

        } catch (error) {
            setMessage('Failed to send OTP. Please try again.');
        }
    };

    return (
        <div className="send-otp">
            <h2>Enter your Code OTP</h2>
            <form onSubmit={handleSendOtp}>
                <input type="text" name='otp' placeholder='Enter OTP' required />
                <button type="submit">Send</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Otp;
