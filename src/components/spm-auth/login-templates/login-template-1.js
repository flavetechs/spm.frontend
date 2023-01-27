import { Field, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authLocations } from "../../../router/spm-path-locations";
import { loginUser } from "../../../store/actions/auth-actions";
import SmpLoader from "../../loader/smp-loader";
import Logo from "../../partials/components/logo";
import "./login-template-1.css";

const LoginTemplate1 = () => {
  return (
    <section className="login-content">
      <SmpLoader />
      <Row className="m-0 align-items-center container1 vh-100">
        <div className="col-lg-3 col-md-2"></div>
        <div className="col-lg-6 col-md-8 login-box">
          <div className="p-3 login-key d-flex justify-content-center">
            <div style={{ width: "10%" }}>
              <Logo color={true} />
            </div>
          </div>
          <div className="col-lg-12 login-title ">Sign In</div>
          <Formik
            initialValues={{
              userName: "",
              password: "",
            }}
            // validationSchema={validation}
            // onSubmit={(values) => {
            //   loginUser(values)(dispatch);
            // }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isValid,
            }) => (
              <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                  <form>
                    {/* {message && <div className="text-success">{message}</div>} */}
                    <div className="form-group">
                      <label className="form-control-label">USERNAME</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">PASSWORD</label>
                      <input type="password" className="form-control" />
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
              <Link to={authLocations.forgottenPassword}>Forgot Password?</Link>
            </Col>
                    <div className="col-lg-12 loginbttm d-flex justify-content-center">
                      <div className=" login-btm login-button ">
                        <button
                          onSubmit={() => {
                            handleSubmit();
                          }}
                          type="submit"
                          className="btn btn-outline-primary"
                        >
                          LOGIN
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Formik>
          <div className="col-lg-3 col-md-2">
           
          </div>
        </div>
      </Row>
    </section>
  );
};

export default LoginTemplate1;
