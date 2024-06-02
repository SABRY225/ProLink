import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setChangePassword } from '../../../Redux/profileSlice';
import ChangePassword from './ChangePassword';
const EnterOTP = () => {
    const [otp, setOtp] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const email = useSelector((state) => state.profile.email);
    console.log(email);
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(`http://localhost:5292/api/Authorization/send-otp?email=${encodeURIComponent(email)}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(setChangePassword(true))
            setMessage(response.data.message);
            setOtp(true)
            console.log(dispatch(setChangePassword(true)));
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
        {
            otp ? (<ChangePassword />):(<div className="enter-otp-container">
            <h3>Do you want to change the password?</h3>
            <form onSubmit={handleSubmit}>
                <button type="submit">Send OTP</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>)
        }
        </>
    );
};

export default EnterOTP;
