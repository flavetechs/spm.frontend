import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authLocations } from "../../../router/spm-path-locations";
import { loginUser } from "../../../store/actions/auth-actions";
import SmpLoader from "../../loader/smp-loader";
import Logo from "../../partials/components/logo";
import "./login-template-4.css";

const LoginTemplate4 = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="login-content">
      <SmpLoader />
      <Row className="m-0 align-items-center container4 vh-100">
        <div className="container4 mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div className="card px-5 pt-5 pb-4" id="form1">
                <div className="form-data">
                  <div className="forms-inputs mb-4">
                    {" "}
                    <span>Email</span>{" "}
                    <input
                      //autocomplete="off"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="forms-inputs mb-4 d-flex">
                    {" "}
                    <span>Password</span>{" "}
                    <input
                      autocomplete="off"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                    />
                    {showPassword ? (
                      <svg
                      onClick={()=>setShowPassword(false)}
                        className="mx-n4 eyeIcon"
                        width="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                      onClick={()=>setShowPassword(true)}
                      className="mx-n4  eyeIcon"
                        width="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.76045 14.3667C9.18545 13.7927 8.83545 13.0127 8.83545 12.1377C8.83545 10.3847 10.2474 8.97168 11.9994 8.97168C12.8664 8.97168 13.6644 9.32268 14.2294 9.89668"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M15.1049 12.6987C14.8729 13.9887 13.8569 15.0067 12.5679 15.2407"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M6.65451 17.4722C5.06751 16.2262 3.72351 14.4062 2.74951 12.1372C3.73351 9.85823 5.08651 8.02823 6.68351 6.77223C8.27051 5.51623 10.1015 4.83423 11.9995 4.83423C13.9085 4.83423 15.7385 5.52623 17.3355 6.79123"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M19.4473 8.99072C20.1353 9.90472 20.7403 10.9597 21.2493 12.1367C19.2823 16.6937 15.8063 19.4387 11.9993 19.4387C11.1363 19.4387 10.2853 19.2987 9.46729 19.0257"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M19.8868 4.24951L4.11279 20.0235"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    )}
                  </div>

                  <Col lg="12" className="d-flex justify-content-between">
                    <div className="form-check mb-3 form-Check">
                      <input
                        type="checkbox"
                        id="customCheck1"
                        className="form-check-input"
                      />
                      <label htmlFor="customCheck1" className="check-label">
                        Remember Me{" "}
                      </label>
                    </div>
                    <Link to={authLocations.forgottenPassword}>
                      Forgot Password?
                    </Link>
                  </Col>
                  <div className="mb-3">
                    {" "}
                    <button className="btn1 btn btn-dark w-100">Login</button>{" "}
                  </div>
                </div>
                <div className="success-data" v-else>
                  <div className="text-center d-flex flex-column">
                    {" "}
                    <i className="bx bxs-badge-check"></i>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </section>
  );
};

export default LoginTemplate4;
