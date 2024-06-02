import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import { login } from "../../Api/LoginAndRegister";
import './StyleAuth.css';
import { useDispatch } from "react-redux";
import { loginSuccess } from '../../Redux/authSlice';
import axios from "axios";
export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (event) => {
    event.preventDefault();

    // Convert form data to JSON
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    console.log(formData);

    try {
      const jsonData = JSON.stringify(formData);
      console.log(jsonData);

      const response = await axios.post(
        process.env.REACT_APP_LOGIN,
        jsonData, // Pass JSON data here
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Login successful:", response.data);
      dispatch(loginSuccess(response.data.token));
      navigate('/home');
    } catch (error) {
      alert("يرجي اعادة المحاولة ")
    }
  };
  return (
    <>
      <div className="container">
        <div className="inner-container">
          <div className="header">
            <h2 >
              Sign in to your account
            </h2>
            <p>
              Or 
              <Link to="./signup" style={{margin:"0rem 0.5rem",fontSize:"1.2rem"}}>
                create a new account
              </Link>
            </p>
          </div>

          <div className="form-container">
            <form onSubmit={onSubmit}>
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
                  <input id="password" type="password" name="password" required />
                </div>
              </div>

              <div className="checkbox-container">
                <Link to="/forgot-password">
                  Forgot your password?
                </Link>
              </div>

              <div className="button-container">
                <button type="submit">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );
}
