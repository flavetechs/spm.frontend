import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getActiveSession,
  getAllSession,
} from "../../store/actions/session-actions";
import {
  fetchSingleStudentResultEntries,
  getAllResultList,
  getAllTerms,
  getTermClasses,
} from "../../store/actions/publish-actions";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PrintResult from "./print-result";
import PrintResultTwo from "./print-result-two";

const PrintResultInput = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showPrintResultTable, SetShowPrintResultTable] = useState(false);
  const [view, setView] = useState(true);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { sessionTerms, termClasses, publishResults, publishSingleStudent } =
    state.publish;
  const { activeSession, sessionList } = state.session;
  const [sessionId, setSessionId] = useState("");
  const [session, setSession] = useState("");
  const [term, setTerm] = useState("");
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA
  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
    sessionTermId: Yup.string().required("Term is required"),
    sessionId: Yup.string().required("Session is required"),
  });
  //VALIDATION SCHEMA

  React.useEffect(() => {
    getAllSession()(dispatch);
    getActiveSession()(dispatch);
    SetShowPrintResultTable(false);
  }, []);

  React.useEffect(() => {
    setSession(activeSession?.session);
    setTerm(activeSession?.sessionTerm);
    if (!sessionId && activeSession) {
      getAllTerms(activeSession?.sessionId)(dispatch);
    } else if (sessionId && activeSession) {
      getAllTerms(sessionId)(dispatch);
    }
  }, [activeSession, sessionId, term]);

  React.useEffect(() => {
    if (publishSingleStudent) {
      SetShowPrintResultTable(true);
    } else if (!publishSingleStudent) {
      SetShowPrintResultTable(false);
    }
    return () => {
      // nullifyResultListOnExit(publishResults)(dispatch);
      SetShowPrintResultTable(false);
    };
  }, [publishSingleStudent]);

 
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>
                  <b>PRINT RESULT</b>
                </h6>
              </Card.Header>
              <Card.Body>
                {!showPrintResultTable ? (
                  <Formik
                    initialValues={{
                      sessionId: activeSession?.sessionId.toUpperCase(),
                      sessionTermId: activeSession?.sessionTermId,
                      sessionClassId: "",
                    }}
                    validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      fetchSingleStudentResultEntries(
                        values.sessionClassId,
                        values.sessionTermId,
                        values.studentContactId
                      )(dispatch);
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
                        <Row>
                          <Col md="6">
                            {touched.sessionId && errors.sessionId && (
                              <div className="text-danger">
                                {errors.sessionId}
                              </div>
                            )}
                          </Col>
                          <Col md="6">
                            {touched.sessionTermId && errors.sessionTermId && (
                              <div className="text-danger">
                                {errors.sessionTermId}
                              </div>
                            )}
                          </Col>
                          <Col md="6" className="form-group text-dark">
                            <label className="form-label" htmlFor="sessionId">
                              <b>Session:</b>
                            </label>
                            <Field
                              as="select"
                              name="sessionId"
                              className="form-select"
                              id="sessionId"
                              onChange={(e) => {
                                setFieldValue("sessionId", e.target.value);
                                setSessionId(e.target.value);
                                setSession(
                                  e.target.selectedOptions[0].dataset.session
                                );
                              }}
                            >
                              <option value="">Select Session</option>
                              {sessionList.map((item, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionId}
                                  value={item.sessionId}
                                  data-session={`${item.startDate}/${item.endDate}`}
                                >
                                  {item.startDate}/{item.endDate}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="6" className="form-group text-dark">
                            <label
                              className="form-label"
                              htmlFor="sessionClassId"
                            >
                              <b>Terms:</b>
                            </label>
                            <Field
                              as="select"
                              name="sessionTermId"
                              className="form-select"
                              id="sessionTermId"
                              onChange={(e) => {
                                setFieldValue("sessionTermId", e.target.value);
                                setTerm(
                                  e.target.selectedOptions[0].dataset.term
                                );
                              }}
                            >
                              <option value="">Select Term</option>
                              {sessionTerms?.map((term, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionTermId}
                                  value={term.sessionTermId}
                                  data-term={term.termName}
                                >
                                  {term.termName}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="6">
                            {touched.sessionClassId &&
                              errors.sessionClassId && (
                                <div className="text-danger">
                                  {errors.sessionClassId}
                                </div>
                              )}
                          </Col>
                          <Col md="6">
                            {touched.studentContactId &&
                              errors.studentContactId && (
                                <div className="text-danger">
                                  {errors.studentContactId}
                                </div>
                              )}
                          </Col>
                          <Col md="6" className="form-group text-dark">
                            <label
                              className="form-label"
                              htmlFor="sessionClassId"
                            >
                              <b>Classes:</b>
                            </label>
                            <Field
                              as="select"
                              name="sessionClassId"
                              className="form-select"
                              id="sessionClassId"
                              onFocus={() => {
                                getTermClasses(
                                  values.sessionId,
                                  values.sessionTermId
                                )(dispatch);
                              }}
                            >
                              <option value="">Select Class</option>
                              {termClasses?.map((termClass, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionClassId}
                                  value={termClass.sessionClassId}
                                  data-tag={termClass.sessionClass}
                                >
                                  {termClass.sessionClass}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="6" className="form-group text-dark">
                            <label
                              className="form-label"
                              htmlFor="studentContactId"
                            >
                              <b>Student:</b>
                            </label>
                            <Field
                              as="select"
                              name="studentContactId"
                              className="form-select text-capitalize"
                              id="studentContactId"
                              onFocus={() => {
                                getAllResultList(
                                  values.sessionClassId,
                                  values.sessionTermId
                                )(dispatch);
                              }}
                            >
                              <option value="">Select Student</option>
                              {publishResults?.publishResult.map(
                                (result, idx) => (
                                  <option
                                    key={idx}
                                    name={values.sessionClassId}
                                    value={result.studentContactId}
                                  >
                                    {result.studentName}
                                  </option>
                                )
                              )}
                            </Field>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                          <Button
                            type="button"
                            className="btn-sm mx-2"
                            variant="btn btn-primary"
                            onClick={()=>{handleSubmit(); setView(true)}}
                          >
                            View
                          </Button>

                          <Button
                            type="button"
                            className="btn-sm "
                            variant="btn btn-primary"
                            onClick={()=>{handleSubmit(); setView(false)}}
                          >
                            View2
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                    view ?
                  <PrintResult
                    publishSingleStudent={publishSingleStudent}
                    session={session}
                    term={term}
                  />
                  :
                  <PrintResultTwo
                  publishSingleStudent={publishSingleStudent}
                  session={session}
                  term={term}
                />

                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PrintResultInput;
