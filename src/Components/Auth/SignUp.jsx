import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import img from "../../assets/logo-img-1.webp";
import { loginSuccess, setEmail } from "../../Redux/authSlice";
import "./StyleAuth.css";

const Form = () => {
  const [activeTab, setActiveTab] = useState("sign_in");
  console.log(activeTab);
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
    if (!activeTab) {
      setActiveTab("sign_in");
      const contCentrar = document.querySelector(".cont_centrar");
      if (contCentrar) {
        contCentrar.classList.add("cent_active");
        handleTabChange("sign_in"); // Ensure that "sign_in" is always selected on initial load
      }
    }
  }, [activeTab]);

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
    console.log(inputs);
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
      <section className="bg-light p-3 p-md-4 pt-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                  <div className="col-12 col-md-6">
                    <img
                      className="img-fluid rounded-start w-100 h-100 object-fit-cover"
                      loading="lazy"
                      src={img}
                      alt="Welcome back you've been missed!"
                    />
                  </div>
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <div className="col-12 col-lg-11 col-xl-10">
                      <div className="card-body p-3 p-md-4 px-xl-5">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-0">
                              <div className="text-center mb-0">
                                {/* <a href="#!">
                                  <img src={img} alt="BootstrapBrain Logo" width={175} height={57} />
                                </a> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cont_tabs_login">
                          <ul className="ul_tabs">
                            <li
                              className={
                                activeTab === "sign_in" ? "active" : ""
                              }
                            >
                              <a
                                href="#signin"
                                onClick={() => handleTabChange("sign_in")}
                              >
                                SIGN IN
                              </a>
                              <span className="linea_bajo_nom"></span>
                            </li>
                            <li
                              className={
                                activeTab === "sign_up" ? "active" : ""
                              }
                            >
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
                        <form
                          onSubmit={
                            activeTab === "sign_in"
                              ? handleSignInSubmit
                              : handleSignUpSubmit
                          }
                        >
                          <div className="row gy-3 overflow-hidden">
                            {activeTab === "sign_up" && (
                              <>
                                <div className="col-12">
                                  <div className="form-floating mb-0">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="firstName"
                                      name="firstName"
                                      value={inputs.firstName}
                                      onChange={handleChange}
                                      placeholder="First Name"
                                      required
                                    />
                                    <label
                                      htmlFor="firstName"
                                      className="form-label"
                                    >
                                      First Name
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-floating mb-0">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="lastName"
                                      name="lastName"
                                      value={inputs.lastName}
                                      onChange={handleChange}
                                      placeholder="Last Name"
                                      required
                                    />
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Last Name
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-floating mb-0">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="phoneNumber"
                                      name="phoneNumber"
                                      value={inputs.phoneNumber}
                                      onChange={handleChange}
                                      placeholder="Phone Number"
                                      required
                                    />
                                    <label
                                      htmlFor="phoneNumber"
                                      className="form-label"
                                    >
                                      Phone Number
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-floating mb-0">
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      name="email"
                                      value={inputs.email}
                                      onChange={handleChange}
                                      placeholder="Enter Email"
                                      required
                                    />
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className ="form-floating mb-0">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      name="password"
                                      value={inputs.password}
                                      onChange={handleChange}
                                      placeholder="Password"
                                      required
                                    />
                                    <label
                                      htmlFor="password"
                                      className="form-label"
                                    >
                                      Password
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-floating mb-0">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="confirmPassword"
                                      name="confirmPassword"
                                      value={inputs.confirmPassword}
                                      onChange={handleChange}
                                      placeholder="Confirm Password"
                                      required
                                    />
                                    <label
                                      htmlFor="confirmPassword"
                                      className="form-label"
                                    >
                                      Confirm Password
                                    </label>
                                  </div>
                                </div>
                              </>
                            )}
                            {activeTab === "sign_in" && (
                              <>
                                <div className="col-12">
                                  <div className="form-floating mb-0">
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      name="email"
                                      value={inputs.email}
                                      onChange={handleChange}
                                      placeholder="Enter Email"
                                      required
                                    />
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-floating mb-0">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      name="password"
                                      value={inputs.password}
                                      onChange={handleChange}
                                      placeholder="Password"
                                      required
                                    />
                                    <label
                                      htmlFor="password"
                                      className="form-label"
                                    >
                                      Password
                                    </label>
                                  </div>
                                </div>
                              </>
                            )}
                            <div className="col-12">
                              <div className="d-grid">
                                <button
                                  className="btn btn-dark btn-lg"
                                  type="submit"
                                >
                                  {activeTab === "sign_in"
                                    ? "Sign In"
                                    : "Sign Up"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div className="col-12">
                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-0">
                              {activeTab === "sign_in" ? (
                                <Link
                                  to="/forgot-password"
                                  className="link-secondary text-decoration-none link_forgot_pass"
                                >
                                  Forgot Password?
                                </Link>
                              ):""}
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
      <ToastContainer />
    </>
  );
};

export default Form;
