import { Field, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authLocations } from "../../../router/spm-path-locations";
import { loginUser } from "../../../store/actions/auth-actions";
import SmpLoader from "../../loader/smp-loader";
import Logo from "../../partials/components/logo";
import "./login-template-4.css";

const LoginTemplate4 = () => {
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
                    <span>Email or username</span>{" "}
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
                      type="password"
                      className="form-control"
                    />
                      <svg className="mx-n4 mb-4" width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  
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
              <Link  to={authLocations.forgottenPassword}>Forgot Password?</Link>
            </Col>
                  <div className="mb-3">
                    {" "}
                    <button className="btn btn-dark w-100">Login</button>{" "}
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
