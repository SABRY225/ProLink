import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StyleAuth.css";
import { loginSuccess, setEmail } from "../../Redux/authSlice";

const Form = () => {
  const [activeTab, setActiveTab] = useState("sign_in");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector(".cont_centrar").classList.add("cent_active");
    handleTabChange(activeTab);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    document.querySelectorAll(".input_form_sign").forEach((input) => {
      input.classList.remove("active_inp");
    });

    setTimeout(() => {
      document.querySelectorAll(".input_form_sign").forEach((input) => {
        input.classList.add("active_inp");
      });

      document.querySelectorAll(".link_forgot_pass").forEach((elem) => {
        elem.classList.remove("d_block");
      });

      if (tab === "sign_in") {
        document.querySelector(".link_forgot_pass").classList.add("d_block");
      }
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_LOGIN,
        JSON.stringify({ email: inputs.email, password: inputs.password }),
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(loginSuccess(response.data.token));
      navigate("/home");
    } catch (error) {
      toast.error("Please try again");
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_REGISTER,
        JSON.stringify(inputs),
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(setEmail(inputs.email));
      navigate("/verify-otp");
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration error");
    }
  };

  return (
    <>
      <div className="cont_principal">
        <div className="cont_centrar">
          <div className="cont_login">
            <form
              onSubmit={
                activeTab === "sign_in"
                  ? handleSignInSubmit
                  : handleSignUpSubmit
              }
            >
              <div className="cont_tabs_login">
                <ul className="ul_tabs">
                  <li className={activeTab === "sign_in" ? "active" : ""}>
                    <a
                      href="#signin"
                      onClick={() => handleTabChange("sign_in")}
                    >
                      SIGN IN
                    </a>
                    <span className="linea_bajo_nom"></span>
                  </li>
                  <li className={activeTab === "sign_up" ? "active" : ""}>
                    <a
                      href="#signup"
                      onClick={() => handleTabChange("sign_up")}
                    >
                      SIGN UP
                    </a>
                    <span className="linea_bajo_nom"></span>
                  </li>
                </ul>
              </div>
              <div className="cont_text_inputs">
                {activeTab === "sign_up" && (
                  <>
                    <input
                      type="text"
                      className="input_form_sign d_block"
                      placeholder="First Name"
                      name="firstName"
                      value={inputs.firstName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="input_form_sign d_block"
                      placeholder="Last Name"
                      name="lastName"
                      value={inputs.lastName}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="input_form_sign d_block"
                      placeholder="Phone"
                      name="phoneNumber"
                      value={inputs.phoneNumber}
                      onChange={handleChange}
                    />

                    <input
                      type="email"
                      className="input_form_sign d_block"
                      placeholder="Email"
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      className="input_form_sign d_block"
                      placeholder="Password"
                      name="password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                  </>
                )}

                {activeTab === "sign_up" && (
                  <input
                    type="password"
                    className="input_form_sign d_block"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={inputs.confirmPassword}
                    onChange={handleChange}
                  />
                )}
                {activeTab === "sign_in" && (
                  <>
                    <input
                      type="email"
                      className="input_form_sign d_block"
                      placeholder="Email"
                      name="email"
                      value={inputs.email}
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      className="input_form_sign d_block"
                      placeholder="Password"
                      name="password"
                      value={inputs.password}
                      onChange={handleChange}
                    />
                    <Link
                      to="/forgot-password"
                      className="link_forgot_pass d_block"
                    >
                      Forgot Password?
                    </Link>
                  </>
                )}
              </div>
              <div className="cont_btn">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 0.95 }}
                  className="btn_sign"
                >
                  {activeTab === "sign_in" ? "SIGN IN" : "SIGN UP"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Form;
