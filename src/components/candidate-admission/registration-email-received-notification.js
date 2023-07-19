import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SmpLoader from "../loader/smp-loader";
import { candidateAuthLocation } from "../../router/candidate-path-location";
import Card from "../Card";
import { resendEmail } from "../../store/actions/candidate-admission-actions";
import { connect, useDispatch } from "react-redux";
import { ServiceURLs } from "../../utils/other";

const RegistrationEmailReceived = (props) => {
  let history = useHistory();
  const email = sessionStorage.getItem("parentEmail");
  const firstname = sessionStorage.getItem("parentFirstName");
  const schoolUrl = ServiceURLs.GetAppUrl();
  return (
    <>
      <section className="login-content">
        <SmpLoader />
        <Row className="m-0 align-items-center bg-white vh-100">
          <Col md="12">
            <Row className="justify-content-center">
              <Col md="6">
                <Card className="card d-flex bg-light p-4 justify-content-center mb-0 auth-card">
                  <Card.Body>
                    <Row>
                      {props.message && <div className="text-danger">{props.message}</div>}
                    </Row>
                    <div className="d-flex justify-content-center">
                      <div className="bg-white  mb-3 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="104"
                          viewBox="0 0 24 24"
                          fill="orange"
                        >
                          <path d="M.026 24l11.974-11.607 11.974 11.607h-23.948zm11.964-23.961l-11.99 8.725v12.476l7.352-7.127-5.653-4.113 10.291-7.488 10.309 7.488-5.655 4.108 7.356 7.132v-12.476l-12.01-8.725z" />
                        </svg>
                      </div>
                    </div>
                    <h5 className="mb-2 text-center">
                      <div className="fw-bold text-success">
                        You have successfully registered!
                      </div>
                      <div>
                        Please check your mail for <br />
                        confirmation and login details
                      </div>
                    </h5>
                    {/* <p className='text-center'>Thank you for choosing our services</p> */}
                    <div className="d-flex justify-content-between mt-4">
                      <Button
                        type="button"
                        variant="btn btn-danger mx-2 text-center btn-sm mx-auto"
                        onClick={() => {
                          history.push(candidateAuthLocation.signUp);
                        }}
                      >
                        Go Back
                      </Button>{" "}
                      <Button
                        type="button"
                        variant="btn btn-primary btn-sm mx-2 text-center mx-auto"
                        onClick={() => {
                          props.resendEmail({ email, schoolUrl, firstname })
                        }}
                      >
                        Resend mail
                      </Button>{" "}
                    </div>
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

function mapStateToProps(state) {
    return {
        message: state.candidate.message
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resendEmail: (values) => resendEmail(values)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationEmailReceived);
