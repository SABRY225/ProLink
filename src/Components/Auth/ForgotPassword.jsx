import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail as setEmailRedux } from "../../Redux/authSlice";

const ForgotPassword = () => {
    const [email, setEmailInput] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
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
            dispatch(setEmailRedux(email));
            navigate('/new-password');
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.log(err);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="card text-center mx-auto" style={{ width: '320px' }}>
                <div className="card-header h5 text-white">Password Reset</div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Enter your email address and we'll send you an email with instructions to reset your password.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline">
                            <input
                                type="email"
                                id="typeEmail"
                                className="form-control my-3"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                            {/* <label className="form-label" htmlFor="typeEmail">Email input</label> */}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Send Email</button>
                    </form>
                    {message && <p className="text-success mt-3">{message}</p>}
                    {error && <p className="text-danger mt-3">{error}</p>}

                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
