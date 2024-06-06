import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StyleAuth.css'; // Import the CSS file for styling

const Otp = () => {
    const email = useSelector((state) => state.auth.email);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formData = Object.fromEntries(fd.entries());

        try {
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
        <>
            <section className="bg-light p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xxl-11">
                            <div className="card border-light-subtle shadow-sm">
                                <div className="row g-0">
                                    <div className="col-12 col-md-6">
                                        <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src={require("../../assets/logo-img-1.webp")} alt="Welcome back you've been missed!" />
                                    </div>
                                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                        <div className="col-12 col-lg-11 col-xl-10">
                                            <div className="card-body px-3 px-md-4 px-xl-5">
                                                <h2>Enter your OTP Code</h2>
                                                <form onSubmit={handleSendOtp}>
                                                    <div className="form-floating mb-3">
                                                        <input type="text" name='otp' className="form-control" id="otp" placeholder="Enter OTP" required />
                                                        <label htmlFor="otp">Enter OTP</label>
                                                    </div>
                                                    <button type="submit" className="btn btn-dark">Send</button>
                                                </form>
                                                {message && <p>{message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Otp;
