import { Row, Col } from "react-bootstrap";
import Card from "../Card";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// img
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SmpLoader from "../loader/smp-loader";
import { userEmailLogin } from "../../store/actions/candidate-admission-actions";
import { getAppLayout } from "../../store/actions/portal-setting-action";
import { TestUrls } from "../../utils/other";
import { loginOutUser, loginUser } from "../../store/actions/auth-actions";
import { candidateAuthLocation } from "../../router/candidate-path-location";
import { useHistory } from "react-router-dom";

const RegistrationSignIn = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let history = useHistory();
  
  const { message ,loggedOut} = state.auth;
  const { appSetting } = state.portal;
  var token = localStorage.getItem("token");
  var userDetail = localStorage.getItem("userDetail");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    dispatch(loginOutUser());
  }, []);
  
  useEffect(() => {
   if(loggedOut)  {
    if (token) {
      window.location.href = "/candidates";
    }  
   }
  }, [token, history]);

  const validation = Yup.object().shape({
    userName: Yup.string()
      .email("Must be a valid email")
      .required("Email is required to login"),
    password: Yup.string()
      .required("Password Required")
      .min(4, "Password must be a minimum of 4 characters"),
  });

  const schoolUrl =
    process.env.NODE_ENV === "development"
      ? TestUrls.Development()
      : window.location.origin;
    console.log("schoolUrl", schoolUrl);


  useEffect(() => {
    getAppLayout(schoolUrl)(dispatch);
  }, [schoolUrl]);

  return (
    <>
      <section className="login-content">
        <SmpLoader />
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="12">
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <h4 className="mb-2 text-center">Sign in</h4>
                    {/* <p className="text-center">{message}</p> */}

                    <Formik
                      initialValues={{
                        userName: "",
                        password: "",
                        schoolUrl: schoolUrl,
                      }}
                      validationSchema={validation}
                      onSubmit={(values) => {
                        loginUser(values)(dispatch);
                      }}
                    >
                      {({ handleSubmit, touched, errors }) => (
                        <Form>
                          <Row className="d-flex justify-content-center">
                            {message && (
                              <div className="text-danger text-center">
                                {message}
                              </div>
                            )}
                            <Col lg="9">
                              <label>Email</label>
                              <div className="form-group">
                                {((touched.userName && errors.userName) ||
                                  message) && (
                                  <div className="text-danger">
                                    {errors.userName}
                                  </div>
                                )}
                                {/* <label htmlFor="userName" className="form-label">User Email</label> */}
                                <Field
                                  type="email"
                                  className="form-control border-1"
                                  name="userName"
                                  id="userName"
                                  aria-describedby="userName"
                                  required
                                  placeholder="Enter email here...."
                                />
                              </div>
                            </Col>
                            <Col lg="9">
                              <label>Password</label>
                              <div className="form-group">
                                {((touched.password && errors.password) ||
                                  message) && (
                                  <div className="text-danger">
                                    {errors.password}
                                  </div>
                                )}
                              <div className="d-flex">
                                <Field
                                  type={showPassword ? "text" : "password"}
                                  className="form-control border-1"
                                  name="password"
                                  id="password"
                                  aria-describedby="password"
                                  required
                                  placeholder="Enter password here...."
                                />
                                {showPassword ? (
                                  <svg
                                    onClick={() => setShowPassword(false)}
                                    className="mx-n4 mt-1 eyeIcon"
                                    width="18"
                                    viewBox="0 0 24 24"
                                    fill="grey"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12ZM17.7366 6.04606C19.4439 7.36485 20.8976 9.29455 21.9415 11.7091C22.0195 11.8933 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8933 2.05854 11.7091C4.14634 6.88 7.86341 4 11.9902 4H12C14.0683 4 16.0293 4.71758 17.7366 6.04606ZM12.0012 14.4124C13.3378 14.4124 14.4304 13.3264 14.4304 11.9979C14.4304 10.6597 13.3378 9.57362 12.0012 9.57362C11.8841 9.57362 11.767 9.58332 11.6597 9.60272C11.6207 10.6694 10.7426 11.5227 9.65971 11.5227H9.61093C9.58166 11.6779 9.56215 11.833 9.56215 11.9979C9.56215 13.3264 10.6548 14.4124 12.0012 14.4124Z"
                                      fill="grey"
                                    ></path>
                                  </svg>
                                ) : (
                                  <svg
                                    onClick={() => setShowPassword(true)}
                                    className="mx-n4 mt-1 eyeIcon"
                                    width="18"
                                    viewBox="0 0 24 24"
                                    fill="grey"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M9.80327 15.2526C10.4277 15.6759 11.1888 15.9319 11.9987 15.9319C14.1453 15.9319 15.8919 14.1696 15.8919 12.0037C15.8919 11.1866 15.6382 10.4186 15.2186 9.78855L14.1551 10.8617C14.3307 11.1964 14.4283 11.5902 14.4283 12.0037C14.4283 13.3525 13.3354 14.4551 11.9987 14.4551C11.5889 14.4551 11.1986 14.3567 10.8668 14.1795L9.80327 15.2526ZM18.4288 6.54952C19.8436 7.84907 21.0438 9.60149 21.9415 11.7083C22.0195 11.8954 22.0195 12.112 21.9415 12.2892C19.8534 17.1921 16.1358 20.1259 11.9987 20.1259H11.9889C10.1058 20.1259 8.30063 19.5056 6.71018 18.3735L4.81725 20.2834C4.67089 20.4311 4.4855 20.5 4.30011 20.5C4.11472 20.5 3.91957 20.4311 3.78297 20.2834C3.53903 20.0373 3.5 19.6435 3.69515 19.358L3.72442 19.3186L18.1556 4.75771C18.1751 4.73802 18.1946 4.71833 18.2044 4.69864L18.2044 4.69863C18.2239 4.67894 18.2434 4.65925 18.2532 4.63957L19.1704 3.71413C19.4631 3.42862 19.9217 3.42862 20.2046 3.71413C20.4974 3.99964 20.4974 4.4722 20.2046 4.75771L18.4288 6.54952ZM8.09836 12.0075C8.09836 12.2635 8.12764 12.5195 8.16667 12.7558L4.55643 16.3984C3.5807 15.2564 2.7318 13.8781 2.05854 12.293C1.98049 12.1158 1.98049 11.8992 2.05854 11.7122C4.14662 6.80933 7.86419 3.88534 11.9916 3.88534H12.0013C13.3966 3.88534 14.7529 4.22007 16.0018 4.85015L12.7429 8.13841C12.5087 8.09903 12.255 8.0695 12.0013 8.0695C9.84494 8.0695 8.09836 9.83177 8.09836 12.0075Z"
                                      fill="grey"
                                    ></path>
                                  </svg>
                                )}
                              </div>
                              </div>
                            </Col>
                          </Row>
                          <div className="d-flex justify-content-center">
                            <button
                              onSubmit={() => {
                                handleSubmit();
                              }}
                              type="submit"
                              variant="btn btn-primary"
                              className="btn btn-primary"
                            >
                              Sign In
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="sign-bg">
              <svg
                width="280"
                height="230"
                viewBox="0 0 431 398"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.05">
                  <rect
                    x="-157.085"
                    y="193.773"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 -157.085 193.773)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="7.46875"
                    y="358.327"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 7.46875 358.327)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="61.9355"
                    y="138.545"
                    width="310.286"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 61.9355 138.545)"
                    fill="#3B8AFF"
                  />
                  <rect
                    x="62.3154"
                    y="-190.173"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 62.3154 -190.173)"
                    fill="#3B8AFF"
                  />
                </g>
              </svg>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default RegistrationSignIn;
