import { Field, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authLocations } from "../../../router/spm-path-locations";
import { loginUser } from "../../../store/actions/auth-actions";
import SmpLoader from "../../loader/smp-loader";
import Logo from "../../partials/components/logo";
 import "./login-template-2.css";

const LoginTemplate2 = () => {
  return (
    <section className="login-content">
      <SmpLoader />
      <Row className="m-0 align-items-center vh-100">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-26 fw-bold">Welcome</span>
              <span className="login100-form-title p-b-48 d-flex justify-content-center">
              <div style={{ width: "50%" }}>
              <Logo color={true} />
            </div>
              </span>
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input className="input100" type="text" name="email" />
                <span
                  className="focus-input100"
                  data-placeholder="Email"
                ></span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye"></i>
                </span>
                <input className="input100" type="password" name="pass" />
                <span
                  className="focus-input100"
                  data-placeholder="Password"
                ></span>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn">Login</button>
                </div>
              </div>

              <Col lg="12" className="mt-4 d-flex justify-content-between">
              <div className="form-check mb-3 form-Check">
                <input
                  type="checkbox"
                  id="customCheck1"
                  className="form-check-input"
                />
                <label style={{fontSize:'13px'}} className="check-label">
                  Remember Me{" "}
                </label>
              </div>
              <Link  className="mt-1"style={{fontSize:'13px'}} to={authLocations.forgottenPassword}>Forgot Password?</Link>
            </Col>
            </form>
          </div>
        </div>
      </Row>
    </section>
  );
};

export default LoginTemplate2;
