import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getAllStaffClasses,
  getStaffClassSubjects,
} from "../../../store/actions/results-actions";
import { Link, useHistory, useLocation } from "react-router-dom";
import { hasAccess, NavPermissions } from "../../../utils/permissions";
import { scoreEntryManagement } from "../../../router/spm-path-locations";

const ScoreEntry = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const history = useHistory();
  const state = useSelector((state) => state);
  const { staffClasses, staffClassSubjects } = state.results;
  const locations = useLocation();
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQueryParam = queryParams.get("sessionClassId") || "";
  const subjectIdQueryParam = queryParams.get("subjectId") || "";

  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA

  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
    subjectId: Yup.string().required("Subject is required"),
  });
  //VALIDATION SCHEMA

  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    sessionClassIdQueryParam && getStaffClassSubjects(sessionClassIdQueryParam)(dispatch);
  }, [dispatch, sessionClassIdQueryParam]);

  return (
    <>
      <div className="col-lg-6 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6 className="mx-3 mt-3"><b>SCORE ENTRY</b></h6>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionClassId: sessionClassIdQueryParam,
                    subjectId: subjectIdQueryParam,
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    history.push(`${scoreEntryManagement.scoreEntryTable}?sessionClassId=${values.sessionClassId}&subjectId=${values.subjectId}`);
                  }}
                >
                  {({
                    handleSubmit,
                    values,
                    setFieldValue,
                    touched,
                    errors,
                  }) => (
                    <Form>
                      <Row className="d-flex justify-content-center">
                        <div className="d-flex justify-content-end">
                          {hasAccess(NavPermissions.previousTermsScores) && (
                            <Link to={scoreEntryManagement.adminScoreEntry}>
                              <button
                                type="button"
                                className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                              >
                                <svg
                                  width="25"
                                  height="25"
                                  viewBox="0 0 24 24"
                                  className="pb-1"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  ></path>
                                </svg>{" "}
                                Update Previous Terms Scores
                              </button>
                            </Link>
                          )}
                        </div>
                        <Col md="10">
                          {touched.sessionClassId && errors.sessionClassId && (
                            <div className="text-danger">
                              {errors.sessionClassId}
                            </div>
                          )}
                        </Col>

                        <Col md="10" className="form-group h6">
                          <label className="form-label fw-bold">Class:</label>
                          <Field
                            as="select"
                            name="sessionClassId"
                            className="form-select"
                            id="sessionClassId"
                            onChange={(e) => {
                              setFieldValue("sessionClassId", e.target.value);
                              history.push(`${scoreEntryManagement.scoreEntry}?sessionClassId=${e.target.value}`)
                            }}
                          >
                            <option value="">Select Class</option>
                            {staffClasses?.map((classes, idx) => (
                              <option
                                key={idx}
                                name={values.sessionClassId}
                                value={classes.sessionClassId}
                                data-tag={classes.sessionClass}
                              >
                                {classes.sessionClass}
                              </option>
                            ))}
                          </Field>
                        </Col>
                        <Col md="10">
                          {touched.subjectId && errors.subjectId && (
                            <div className="text-danger">
                              {errors.subjectId}
                            </div>
                          )}
                        </Col>
                        <Col md="10" className="form-group h6">
                          <label className="form-label fw-bold">Subject:</label>
                          <Field
                            as="select"
                            disabled={values.sessionClassId ? false : true}
                            name="subjectId"
                            className="form-select"
                            id="subjectId"
                            onChange={(e) => {
                              setFieldValue("subjectId", e.target.value);
                              history.push(`${scoreEntryManagement.scoreEntry}?sessionClassId=${sessionClassIdQueryParam}&subjectId=${e.target.value}`)
                            }}
                          >
                            <option value="">Select Subject</option>
                            {staffClassSubjects?.map((subject, idx) => (
                              <option
                                key={idx}
                                name={values.subjectId}
                                value={subject.subjectId}
                              >
                                {subject.subjectName}
                              </option>
                            ))}
                          </Field>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          className="btn-sm"
                          variant="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          View
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ScoreEntry;
