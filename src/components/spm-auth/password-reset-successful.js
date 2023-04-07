import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Card";

// img
import auth1 from "../../assets/images/auth/04.png";
import Logo from "../partials/components/logo";
import { authLocations } from "../../router/spm-path-locations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAppLayout } from "../../store/actions/portal-setting-action";
import { TestUrls } from "../../utils/other";

const PasswordResetSuccessful = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { message } = state.auth;
  const { appSetting } = state.portal;

  const clearForgotPasswordMessage = () => {
    sessionStorage.removeItem("forgotPasswordMessage");
  };
  const schoolUrl =
    process.env.NODE_ENV === "development"
      ? TestUrls.Development()
      : window.location.origin;
  useEffect(() => {
    getAppLayout(schoolUrl)(dispatch);
  }, [schoolUrl]);

  return (
    <>
      <section className="login-content">
        <Row className="m-0 align-items-center bg-white vh-100">
          
            <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <Card.Body>
                <div className="text-center mb-3">
                  <img
                    src={appSetting?.schoolLogo}
                    alt="school logo"
                    height="120px"
                  />
                  <h4>{appSetting?.schoolName}</h4>
                </div>
               
                <div>
               
                    <div className="d-flex justify-content-center">
               
                      <div class="alert alert-success" role="alert">
                           {message && (  <h4 class="alert-heading"> {message}</h4>)}
                        <p>
                          Didn't get an Email? return to Forgot Password
                          &#x2193;
                        </p>
                        <p className="alert alert-success rounded-3">
                          Our school management system is designed specifically
                          to manage students, parents and teachers
                        </p>
                        <hr />
                        <p class="mb-0">
                          Please{' '}
                          <Link
                            onClick={clearForgotPasswordMessage}
                            to={authLocations.forgottenPassword}
                            className="text-center mb-3"
                          >
                            click here
                          </Link>{" "}
                          to return to Forgot Password
                        </p>
                      </div>
                    </div>
                 
                </div>
              </Card.Body>
            </Card>
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
                  ></rect>
                  <rect
                    x="7.46875"
                    y="358.327"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(-45 7.46875 358.327)"
                    fill="#3B8AFF"
                  ></rect>
                  <rect
                    x="61.9355"
                    y="138.545"
                    width="310.286"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 61.9355 138.545)"
                    fill="#3B8AFF"
                  ></rect>
                  <rect
                    x="62.3154"
                    y="-190.173"
                    width="543"
                    height="77.5714"
                    rx="38.7857"
                    transform="rotate(45 62.3154 -190.173)"
                    fill="#3B8AFF"
                  ></rect>
                </g>
              </svg>
            </div>
        
        </Row>
      </section>
    </>
  );
};

export default PasswordResetSuccessful;
