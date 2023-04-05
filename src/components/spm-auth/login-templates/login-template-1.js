import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authLocations } from "../../../router/spm-path-locations";
import "./login-template-1.css";

const LoginTemplate1 = ({ message, auth1, ...form }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Row className="m-0 align-items-center container1 vh-100">
      <div className="col-lg-3 col-md-2"></div>
      <div className="col-lg-6 col-md-8 login-box">
        <div className="p-3 login-key d-flex justify-content-center">
        
          <div className="text-center">
                    <img src={form.schoolLogo} alt='school logo'height="100px"/>
                  <h6 >{form.schoolName}</h6>
                  </div>
       
        </div>
        <div className="col-lg-12 login-title ">Sign In</div>
        <div className="col-lg-12 login-form">
          <div className="col-lg-12 login-form">
            <form>
              {message && <div className="text-danger">{message}</div>}
              <div className="form-group">
                {((form.touched.userName && form.errors.userName) ||
                  message) && (
                  <div className="text-danger">{form.errors.userName}</div>
                )}
                <label className="form-control-label">USERNAME</label>
                <input
                  onBlur={form.handleBlur("userName")}
                  value={form.values.userName}
                  onChange={(e) => {
                    form.handleChange("userName");
                    form.setFieldValue("userName", e.target.value);
                  }}
                  type="text"
                  className="form-control text1"
                />
              </div>
              <div className="form-group">
                {form.touched.password && form.errors.password && (
                  <div className="text-danger">{form.errors.password}</div>
                )}
                <label className="form-control-label">PASSWORD</label>
                <div className="d-flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control password1"
                    onBlur={form.handleBlur("password")}
                    value={form.values.password}
                    onChange={(e) => {
                      form.handleChange("password");
                      form.setFieldValue("password", e.target.value);
                    }}
                  />
                  {showPassword ? (
                    <svg
                      onClick={() => setShowPassword(false)}
                      className="mx-n4 mb-4 eyeIcon"
                      width="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setShowPassword(true)}
                      className="mx-n4 mb-4 eyeIcon"
                      width="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.76045 14.3667C9.18545 13.7927 8.83545 13.0127 8.83545 12.1377C8.83545 10.3847 10.2474 8.97168 11.9994 8.97168C12.8664 8.97168 13.6644 9.32268 14.2294 9.89668"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15.1049 12.6987C14.8729 13.9887 13.8569 15.0067 12.5679 15.2407"
                        stroke="black"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.65451 17.4722C5.06751 16.2262 3.72351 14.4062 2.74951 12.1372C3.73351 9.85823 5.08651 8.02823 6.68351 6.77223C8.27051 5.51623 10.1015 4.83423 11.9995 4.83423C13.9085 4.83423 15.7385 5.52623 17.3355 6.79123"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M19.4473 8.99072C20.1353 9.90472 20.7403 10.9597 21.2493 12.1367C19.2823 16.6937 15.8063 19.4387 11.9993 19.4387C11.1363 19.4387 10.2853 19.2987 9.46729 19.0257"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M19.8868 4.24951L4.11279 20.0235"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  )}
                </div>
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
              <div className="col-lg-12 loginbttm d-flex justify-content-center">
                <div className=" login-btm login-button ">
                  <button
                   onClick={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                    className="btn btn-outline-primary"
                  >
                    SIGN IN
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
    </Row>
  );
};

export default LoginTemplate1;
