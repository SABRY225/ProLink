import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './StyleAuth.css';
import axios from "axios";

export default function SignUp() {
    const navigate = useNavigate();
    console.log(process.env.REACT_APP_REGISTER);
    const handleOnSubmit = async (evt) => {
        evt.preventDefault();

        const fd = new FormData(evt.target);
        const formData = Object.fromEntries(fd.entries());
        console.log(formData);

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }    
        try {
          const jsonData = JSON.stringify(formData);
          console.log(jsonData);
            const response = await axios.post(
                process.env.REACT_APP_REGISTER,
                jsonData, // Pass JSON data here
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            alert(response.data);
            console.log(response);
            navigate("/");
        } catch (error) {
            console.log("Registration error:", error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className="header">
                        <h2>
                            Sign Up to your account
                        </h2>
                        <p>
                            Already have an account?
                            <Link to="/" style={{ margin: '0rem 0.2rem', fontSize: '0.9rem' }}>
                                Login Now
                            </Link>
                        </p>
                    </div>

                    <div className="form-container">
                        <form onSubmit={handleOnSubmit}>
                            <div className="form-group">
                                <label for="firstName">
                                    First Name
                                </label>
                                <div className="input-container">
                                    <input id="firstName" name="firstName" type="text" required  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="lastName">
                                    Last Name
                                </label>
                                <div className="input-container">
                                    <input id="lastName" name="lastName" type="text" required  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="phoneNumber">
                                    Phone
                                </label>
                                <div className="input-container">
                                    <input id="phoneNumber" name="phoneNumber" type="text" required  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="email">
                                    Email address
                                </label>
                                <div className="input-container">
                                    <input id="email" name="email" type="email" required  />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password">
                                    Password
                                </label>
                                <div className="input-container">
                                    <input id="password" name="password" type="password" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="input-container">
                                    <input id="confirmPassword" name="confirmPassword" type="password" required />
                                </div>
                            </div>
                            <div className="button-container">
                                <button type="submit">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
