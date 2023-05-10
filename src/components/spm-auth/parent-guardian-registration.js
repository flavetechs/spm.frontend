import { Row, Col } from "react-bootstrap";
import Card from "../Card";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// img
import { connect } from "react-redux";
import { useEffect } from "react";
import SmpLoader from "../loader/smp-loader";
import { userRegistration } from "../../store/actions/candidate-admission-actions";
import { getAppLayout } from "../../store/actions/portal-setting-action";
import { ServiceURLs } from "../../utils/other";
import { studentparentGuarndianRelationship } from "../../utils/tools";
import { useHistory } from "react-router-dom";
import { candidateAuthLocation } from "../../router/candidate-path-location";

const RegistrationSignUp = (props) => {
  const history = useHistory();
  const { message } = props.state.candidate;


  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required to login"),
    firstname: Yup.string()
      .min(2, "Name Too Short!")
      .required("First Name is required"),
    lastname: Yup.string()
      .min(2, "Name Too Short!")
      .required("Last Name is required"),
    relationship: Yup.string().required(
      " Relationship is required"
    ),
    phoneNumber: Yup.string()
      .min(2, "Number Too Short!")
      .required("Phone number is required"),
  });

  const schoolUrl = ServiceURLs.GetAppUrl();
  useEffect(() => {
    props.getAppLayout(schoolUrl).then(res => {
      return res;
    })
  }, [schoolUrl])

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
                    <h4 className="mb-2 text-center">
                      Sign Up to Register a Candidate
                    </h4>
                    {/* <p className="text-center">Login to stay connected.</p> */}

                    <Formik
                      initialValues={{
                        email: "",
                        firstname: "",
                        lastname: "",
                        relationship: "",
                        phoneNumber: "",
                        schoolUrl: schoolUrl,
                      }}
                      validationSchema={validation}
                      onSubmit={(values) => {
                        values.phoneNumber = values.phoneNumber.toString()
                        props.userRegistration(values, history)
                      }}
                    >
                      {({ handleSubmit, touched, errors, setFieldValue }) => (
                        <Form className="mt-4">
                          <Row>
                            {message && (
                              <div className="text-danger">{message}</div>
                            )}
                            <Row>
                              <div className="col-md-6">
                                {touched.firstname && errors.firstname && (
                                  <div className="text-danger">
                                    {errors.firstname}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6">
                                {touched.lastname && errors.lastname && (
                                  <div className="text-danger">
                                    {errors.lastname}
                                  </div>
                                )}
                              </div>
                            </Row>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="firstname"
                              >
                                <b> First Name:</b>
                              </label>
                              <Field
                                placeholder="First Name"
                                type="text"
                                name="firstname"
                                id="firstname"
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="lastname"
                              >
                                <b> First Name:</b>
                              </label>
                              <Field
                                placeholder="Last Name"
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="form-control"
                              />
                            </div>


                            <Row>
                              <div className="col-md-6">
                                {touched.email && errors.email && (
                                  <div className="text-danger">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6">
                                {touched.relationship &&
                                  errors.relationship && (
                                    <div className="text-danger">
                                      {errors.relationship}
                                    </div>
                                  )}
                              </div>
                            </Row>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="email"
                              >
                                <b>Email:</b>
                              </label>
                              <Field
                                type="email"
                                className="form-control border-1"
                                name="email"
                                id="email"
                                placeholder="Email"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="relationship"
                              >
                                <b>Relationship:</b>
                              </label>
                              <Field
                                as="select"
                                name="relationship"
                                className="form-select"
                                id="relationship"
                                onChange={(e) => {
                                  setFieldValue(
                                    "relationship",
                                    e.target.value
                                  );
                                }}
                              >
                                <option value="">Select Relationship</option>
                                {studentparentGuarndianRelationship?.map(
                                  (relationship, idx) => (
                                    <option key={idx} value={relationship}>
                                      {relationship}
                                    </option>
                                  )
                                )}
                              </Field>
                            </div>
                            <Row>

                              <div className="col-md-6">
                                {touched.phoneNumber &&
                                  errors.phoneNumber && (
                                    <div className="text-danger">
                                      {errors.phoneNumber}
                                    </div>
                                  )}
                              </div>
                            </Row>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="phoneNumber"
                              >
                                <b>Phone Number:</b>
                              </label>
                              <Field
                                placeholder="Phone Number"
                                type="number"
                                name="phoneNumber"
                                id="phoneNumber"
                                className="form-control"
                              />
                            </div>
                            <div className="text-center mb-3">Already have an account?<a href={candidateAuthLocation.signIn}> Login</a> </div>
                          </Row>

                          <div className="d-flex justify-content-center">
                            <button
                              onSubmit={() => {
                                handleSubmit();
                              }}
                              type="submit"
                              variant="btn btn-primary"
                              className="btn btn-primary mt-2"
                            >
                              Sign Up
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

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAppLayout: (schoolUrl) => getAppLayout(schoolUrl)(dispatch),
    userRegistration: (values, history) => userRegistration(values, history)(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationSignUp);