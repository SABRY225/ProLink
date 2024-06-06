import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img from "../../assets/logo-img-1.webp"
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
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div className="card border-light-subtle shadow-sm">
              <div className="row g-0">
                <div className="col-12 col-md-6">
                  <img className="img-fluid rounded-start w-100 h-100 object-fit-cover" loading="lazy" src={img} alt="Welcome back you've been missed!" />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <div className="col-12 col-lg-11 col-xl-10">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-5">
                            <div className="text-center mb-4">
                              {/* <a href="#!">
                                <img src={img} alt="BootstrapBrain Logo" width={175} height={57} />
                              </a> */}
                            </div>
                            <h2 className="h4 text-center">Password Reset</h2>
                            <h3 className="fs-6 fw-normal text-secondary text-center m-0">Please enter the OTP sent to your email and your new password.</h3>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="row gy-3 overflow-hidden">
                          <div className="col-12">
                            <div className="form-floating mb-3">
                              <input type="text" className="form-control" id="otp" value={otp} onChange={handleOtpChange} placeholder="Enter OTP" required />
                              <label htmlFor="otp" className="form-label">OTP</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-floating mb-3">
                              <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} placeholder="New Password" required />
                              <label htmlFor="newPassword" className="form-label">New Password</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-grid">
                              <button className="btn btn-dark btn-lg" type="submit">Reset Password</button>
                            </div>
                          </div>
                        </div>
                      </form>
                      {message && <p className="text-success mt-3">{message}</p>}
                      {error && <p className="text-danger mt-3">{error}</p>}
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-5">
                            <Link to="/signin" className="link-secondary text-decoration-none">Login or Register</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
