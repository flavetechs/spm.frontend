import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getActiveSession,
  getAllSession,
} from "../../../store/actions/session-actions";
import { getTermClasses } from "../../../store/actions/publish-actions";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getSinglePrintResult } from "../../../store/actions/results-actions";
import { printResultLocations } from "../../../router/students-path-locations";

const PrintStudentResult = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { showSuccessToast } = state.alert;
  const { activeSession, sessionList } = state.session;
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialValues, setInitialValues] = useState({
    sessionId: "",
    sessionTermId: "",
    sessionClassId: "",
    studentRegNo: "",
  });
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA
  let validation;
    validation = Yup.object().shape({
      sessionTermId: Yup.string().required("Term is required"),
      sessionId: Yup.string().required("Session is required"),
      studentRegNo: Yup.string().required("Registration Number is required"),
    });

  //VALIDATION SCHEMA

  React.useEffect(() => {
    getAllSession(1)(dispatch);
    getActiveSession()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    setSelectedSession(activeSession);
    initialValues.sessionId = activeSession?.sessionId;
    initialValues.sessionTermId = activeSession?.terms.find(
      (term) => term.isActive === true
    )?.sessionTermId;
    setInitialValues(initialValues);;
  }, [activeSession, dispatch]);

  React.useEffect(() => {
    showSuccessToast&&
    history.push(printResultLocations.resultTemplate);
   
  }, [showSuccessToast, history]);

  return (
    <>
      <div className="col-md-12 mx-auto d-flex justify-content-center">
        <Col sm="6">
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
                    getSinglePrintResult(
                      values.sessionTermId,
                      values.studentRegNo
                    )(dispatch);
                   
                }}
              >
                {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                  <Form className="mx-auto">
                    <Row className="d-flex justify-content-center">
                      <Col md="11">
                        {touched.sessionId && errors.sessionId && (
                          <div className="text-danger">{errors.sessionId}</div>
                        )}
                      </Col>
                      <Col md="11" className="form-group h6">
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
                            setSelectedSession(
                              sessionList.find(
                                (s) =>
                                  s.sessionId.toLowerCase() === e.target.value
                              )
                            );
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
                      <Col md="11">
                        {touched.sessionTermId && errors.sessionTermId && (
                          <div className="text-danger">
                            {errors.sessionTermId}
                          </div>
                        )}
                      </Col>
                      <Col md="11" className="form-group h6">
                        <label className="form-label" htmlFor="sessionClassId">
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
                            getTermClasses(
                              selectedSession?.sessionId,
                              e.target.value
                            )(dispatch);
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
                 
                          <Col md="11">
                            {touched.studentRegNo && errors.studentRegNo && (
                              <div className="text-danger">
                                {errors.studentRegNo}
                              </div>
                            )}
                          </Col>
                          <Col md="11" className="form-group h6">
                            <label className="form-label">
                              <b>Student Registration No:</b>
                            </label>
                            <Field
                              type="text"
                              name="studentRegNo"
                              className="form-control"
                              autoComplete="off"
                              id="studentRegNo"
                              placeholder="Enter student reg no..."
                            />
                          </Col>
                          {/* <Col md="11">
                            {touched.ePin && errors.ePin && (
                              <div className="text-danger">{errors.ePin}</div>
                            )}
                          </Col>
                          <Col md="11" className="form-group h6">
                            <label className="form-label">
                              <b>E-pin:</b>
                            </label>
                            <Field
                              type="text"
                              name="ePin"
                              className="form-control"
                              autoComplete="off"
                              id="ePin"
                              placeholder="Enter e-pin..."
                            />
                          </Col> */}
                      
                     
                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          className="btn-sm mx-2 mt-4"
                          variant="btn btn-primary"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default PrintStudentResult;
