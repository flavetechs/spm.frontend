import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getAllPreviousClassScore,
  getStaffClassSubjects,
} from "../../../store/actions/results-actions";
import {
  getActiveSession,
  getAllSession,
} from "../../../store/actions/session-actions";
import { getAllSessionClasses } from "../../../store/actions/class-actions";
import { resultManagement } from "../../../router/spm-path-locations";
import { useHistory } from "react-router-dom";

const AdminScoreEntry = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const history = useHistory();
  const state = useSelector((state) => state);
  const { staffClassSubjects } = state.results;
  const { itemList: classList } = state.class;
  const { activeSession, sessionList } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA
  const validation = Yup.object().shape({
    sessionId: Yup.string().required("Session is required"),
    terms: Yup.string().required("Term is required"),
    sessionClassId: Yup.string().required("Class is required"),
    subjectId: Yup.string().required("Subject is required"),
  });
  //VALIDATION SCHEMA

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllSession()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if (!sessionId) {
      getAllSessionClasses(activeSession?.sessionId)(dispatch);
    } else {
      getAllSessionClasses(sessionId)(dispatch);
    }
  }, [sessionId, activeSession,dispatch]);

  return (
    <>
      <div className="col-lg-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <div >
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                  >
                    <svg
                      onClick={() => {
                        history.goBack();
                      }}
                      style={{ cursor: "pointer" }}
                      className=" text-primary"
                      width="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </OverlayTrigger>
                  
                </div>
                <h6>ADMIN SCORE ENTRY</h6>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionId: activeSession?.sessionId,
                    terms: activeSession?.terms.find(
                      (term) => term.isActive === true
                    )?.sessionTermId,
                    sessionClassId: "",
                    subjectId: "",
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    getAllPreviousClassScore(
                      values.sessionClassId,
                      values.subjectId,
                      values.terms
                    )(dispatch);
                    history.push(
                      `${resultManagement.adminScoreEntryTable}?sessionClassId=${values.sessionClassId}&subjectId=${values.subjectId}&term=${values.terms}`
                    );
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
                        <Col md="10">
                          {touched.sessionId && errors.sessionId && (
                            <div className="text-danger">
                              {errors.sessionId}
                            </div>
                          )}
                        </Col>

                        <Col md="10" className="form-group">
                          <label className="form-label fw-bold">Session:</label>
                          <Field
                            as="select"
                            name="sessionId"
                            className="form-select"
                            id="sessionId"
                            onChange={(e) => {
                              setFieldValue("sessionId", e.target.value);
                              setSessionId(e.target.value);
                            }}
                          >
                            <option value="">Select Session</option>
                            {sessionList?.map((session, idx) => (
                              <option
                                key={idx}
                                name={values.sessionId}
                                value={session.sessionId.toLowerCase()}
                              >
                                {session.startDate} / {session.endDate}
                              </option>
                            ))}
                          </Field>
                          <Col md="10">
                            {touched.terms && errors.terms && (
                              <div className="text-danger">{errors.terms}</div>
                            )}
                          </Col>
                        </Col>
                        <Col md="10" className="form-group">
                          <label className="form-label fw-bold">Terms:</label>
                          <Field
                            as="select"
                            name="terms"
                            className="form-select"
                            id="terms"
                          >
                            <option value="">Select Terms</option>
                            {sessionList
                              ?.find(
                                (session, idx) =>
                                  session.sessionId.toLowerCase() ===
                                  values.sessionId
                              )
                              ?.terms.map((term, id) => (
                                <option
                                  key={id}
                                  name={values.terms}
                                  value={term.sessionTermId.toLowerCase()}
                                  selected={term.sessionTermId === values.terms}
                                >
                                  {term.termName}
                                </option>
                              ))}
                          </Field>
                        </Col>

                        <Col md="10">
                          {touched.sessionClassId && errors.sessionClassId && (
                            <div className="text-danger">
                              {errors.sessionClassId}
                            </div>
                          )}
                        </Col>

                        <Col md="10" className="form-group">
                          <label className="form-label fw-bold">Class:</label>
                          <Field
                            as="select"
                            name="sessionClassId"
                            className="form-select"
                            id="sessionClassId"
                            onChange={(e) => {
                              setFieldValue("sessionClassId", e.target.value);
                              e.target.value !== ""&&
                              getStaffClassSubjects(e.target.value)(dispatch);
                            }}
                          >
                            <option value="">Select Class</option>
                            {classList.map((item, idx) => (
                              <option
                                key={idx}
                                name={values.sessionClassId}
                                value={item.sessionClassId}
                              >
                                {item.class}
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
                        <Col md="10" className="form-group">
                          <label className="form-label fw-bold">Subject:</label>
                          <Field
                            as="select"
                            disabled={values.sessionClassId ? false : true}
                            name="subjectId"
                            className="form-select"
                            id="subjectId"
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

export default AdminScoreEntry;
