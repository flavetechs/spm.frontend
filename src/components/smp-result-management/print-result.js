import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getActiveSession,
  getAllSession,
} from "../../store/actions/session-actions";
import {
  getAllResultList,
  getTermClasses,
} from "../../store/actions/publish-actions";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { resultManagement } from "../../router/spm-path-locations";
import { useHistory } from "react-router-dom";
import { getAllStudentResult } from "../../store/actions/results-actions";

const PrintResult = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { termClasses, publishResults } =
    state.publish;
  const { activeSession, sessionList } = state.session;
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialValues, setInitialValues] = useState({
    sessionId: '',
    sessionTermId: '',
    sessionClassId: "",
    studentContactId:"",
  })
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
  }, []);

  React.useEffect(() => {
      setSelectedSession(activeSession);
      initialValues.sessionId = activeSession?.sessionId;
      initialValues.sessionTermId =  activeSession?.terms.find(term => term.isActive == true)?.sessionTermId;
      setInitialValues(initialValues);
      getTermClasses(activeSession?.sessionId, activeSession?.sessionTermId)(dispatch)
  }, [activeSession]);

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
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                   history.push(resultManagement.resultTemplate);
                  getAllStudentResult(values.sessionClassId,values.sessionTermId,values.studentContactId)(dispatch)
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
                              values={values.sessionId}
                              onChange={(e) => {
                                setFieldValue("sessionId", e.target.value);
                                setSelectedSession(sessionList.find(s => s.sessionId.toLowerCase() == e.target.value));
                              }}
                            >
                              <option value="">Select Session</option>
                              {sessionList.map((item, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionId}
                                  value={item.sessionId.toLowerCase()}
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
                              value={values.sessionTermId}
                              onChange={(e) => {
                                setFieldValue("sessionTermId", e.target.value);
                                getTermClasses(selectedSession?.sessionId, e.target.value)(dispatch)
                              }}
                            >
                              <option value="">Select Term</option>
                              {selectedSession?.terms?.map((term, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionTermId}
                                  value={term.sessionTermId}
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
                              onChange={(e)=>{
                                setFieldValue("sessionClassId", e.target.value);
                                getAllResultList(e.target.value, values.sessionTermId)(dispatch);
                              }}
                            >
                              <option value="">Select Class</option>
                              {termClasses?.map((termClass, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionClassId}
                                  value={termClass.sessionClassId}
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
                            onClick={()=>{handleSubmit()}}
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

export default PrintResult;