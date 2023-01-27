import { Field, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authLocations } from "../../../router/spm-path-locations";
import { loginUser } from "../../../store/actions/auth-actions";
import SmpLoader from "../../loader/smp-loader";
import Logo from "../../partials/components/logo";
import "./login-template-3.css";

const LoginTemplate3 = () => {
  return (
    <section className="login-content">
      <SmpLoader />
      <Row className="m-0 align-items-center container3 vh-100">
        <div className="">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-3 d-flex justify-content-center">
            <div style={{ width: "15%" }}>
              <Logo color={true} />
            </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="login-wrap p-0 ">
                <h3 className="mb-4 text-center  text-white">Log In</h3>
                <form action="#" className="signin-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control inputBg"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="password-field"
                      type="password"
                      className="form-control inputBg"
                      placeholder="Password"
                      required=""
                    />
                    <span
                      toggle="#password-field"
                      className="fa fa-fw field-icon toggle-password fa-eye"
                    ></span>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-primary roundedDiv submit  px-3"
                    >
                      Sign In
                    </button>
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
              <Link className="text-white" to={authLocations.forgottenPassword}>Forgot Password?</Link>
            </Col>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </section>
  );
};

export default LoginTemplate3;
