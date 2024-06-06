import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios";
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StyleAuth.css';
import { loginSuccess } from '../../Redux/authSlice';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const jsonData = JSON.stringify(formData);
      const response = await axios.post(
        process.env.REACT_APP_LOGIN,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(loginSuccess(response.data.token));
      navigate('/home');
    } catch (error) {
      toast.error("يرجي اعادة المحاولة ");
    }
  };

  return (
    <>
      <div className="container">
        <motion.div 
          className="inner-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header">
            <h2>Sign in to your account</h2>
            <p>Or 
              <Link to="./signup" style={{ margin: "0rem 0.5rem", fontSize: "1.2rem" }}>
                create a new account
              </Link>
            </p>
          </div>

          <div className="form-container">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <div className="input-container">
                  <input id="email" name="email" type="email" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <input id="password" type="password" name="password" required />
                </div>
              </div>

              <div className="checkbox-container">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>

              <div className="button-container">
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign in
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </>
  );
}
