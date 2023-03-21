import { Row, Col } from "react-bootstrap";
import Card from "../Card";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// img
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SmpLoader from "../loader/smp-loader";
import { userEmailLogin } from "../../store/actions/candidate-admission-actions";
import { getAppLayout } from "../../store/actions/portal-setting-action";
import { TestUrls } from "../../utils/other";
import { studentparentGuarndianRelationship } from "../../utils/tools";

const RegistrationSignUp = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { message, parentGuardianFirstTimeLogin, token } = state.candidate;

  useEffect(() => {
    if (token && parentGuardianFirstTimeLogin === false) {
      window.location.href = "/candidates";
    } else if (parentGuardianFirstTimeLogin === true) {
      window.location.href = "/candidates/registration-email";
    }
  }, [token, parentGuardianFirstTimeLogin]);

  const validation = Yup.object().shape({
    parentEmail: Yup.string()
      .email("Must be a valid email")
      .required("Email is required to login"),
      ParentName: Yup.string()
      .min(2, "Name Too Short!")
      .required("Parent/Guardian Name is required"),
  ParentRelationship: Yup.string().required(
      "Parent/Guardian relationship is required"
  ),
  ParentPhoneNumber: Yup.string()
      .min(2, "Number Too Short!")
      .required("Parent/Guardian phone number is required"),
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
                    <h4 className="mb-2 text-center">
                      Sign Up to Register a Candidate
                    </h4>
                    {/* <p className="text-center">Login to stay connected.</p> */}

                    <Formik
                      initialValues={{
                        parentEmail: "",
                        ParentName: "",
                        ParentRelationship: "",
                        ParentPhoneNumber: "", 
                        schoolUrl: schoolUrl,
                      }}
                      validationSchema={validation}
                      onSubmit={(values) => {
                        userEmailLogin(values)(dispatch);
                      }}
                    >
                      {({ handleSubmit, touched, errors,setFieldValue }) => (
                        <Form className="mt-4">
                          <Row>
                            {message && (
                              <div className="text-danger">{message}</div>
                            )}
                            <Row>
                              <div className="col-md-6">
                                {touched.ParentName && errors.ParentName && (
                                  <div className="text-danger">
                                    {errors.ParentName}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6">
                                {touched.ParentEmail && errors.ParentEmail && (
                                  <div className="text-danger">
                                    {errors.ParentEmail}
                                  </div>
                                )}
                              </div>
                            </Row>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="ParentName"
                              >
                                <b>Name:</b>
                              </label>
                              <Field
                                placeholder="Full Name"
                                type="text"
                                name="ParentName"
                                id="ParentName"
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="ParentEmail"
                              >
                                <b>Parent Email:</b>
                              </label>
                              <Field
                                type="email"
                                className="form-control border-1"
                                name="parentEmail"
                                id="parentEmail"
                                aria-describedby="parentEmail"
                                required
                                placeholder="Enter email here...."
                              />
                            </div>
                            <Row>
                              <div className="col-md-6">
                                {touched.ParentRelationship &&
                                  errors.ParentRelationship && (
                                    <div className="text-danger">
                                      {errors.ParentRelationship}
                                    </div>
                                  )}
                              </div>
                              <div className="col-md-6">
                                {touched.ParentPhoneNumber &&
                                  errors.ParentPhoneNumber && (
                                    <div className="text-danger">
                                      {errors.ParentPhoneNumber}
                                    </div>
                                  )}
                              </div>
                            </Row>
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="ParentRelationship"
                              >
                                <b>Relationship:</b>
                              </label>
                              <Field
                                as="select"
                                name="ParentRelationship"
                                className="form-select"
                                id="ParentRelationship"
                                onChange={(e) => {
                                  setFieldValue(
                                    "ParentRelationship",
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
                            <div className="col-md-6 form-group">
                              <label
                                className="form-label"
                                htmlFor="ParentPhoneNumber"
                              >
                                <b>Phone Number:</b>
                              </label>
                              <Field
                                placeholder="Phone Number"
                                type="number"
                                name="ParentPhoneNumber"
                                id="ParentPhoneNumber"
                                className="form-control"
                              />
                            </div>
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

export default RegistrationSignUp;
