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
  const [printSingle, setPrintSingle] = useState(false);
  const [batchPrint, setBatchPrint] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { termClasses } = state.publish;
  const { activeSession, sessionList } = state.session;
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialValues, setInitialValues] = useState({
    sessionId: "",
    sessionTermId: "",
    sessionClassId: "",
    printOption: "",
    studentRegNo: "",
    ePin: "",
  });
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA
  let validation;
  if (printSingle) {
    validation = Yup.object().shape({
      sessionTermId: Yup.string().required("Term is required"),
      sessionId: Yup.string().required("Session is required"),
      printOption: Yup.string().required("Print Option is required"),
      studentRegNo: Yup.string().required("Registration Number is required"),
      ePin: Yup.string().required("E-pin is required"),
    });
  } else if (batchPrint) {
    validation = Yup.object().shape({
      sessionTermId: Yup.string().required("Term is required"),
      sessionId: Yup.string().required("Session is required"),
      printOption: Yup.string().required("Print Option is required"),
      sessionClassId: Yup.string().required("Class is required"),
    });
  } else {
    validation = Yup.object().shape({
      sessionTermId: Yup.string().required("Term is required"),
      sessionId: Yup.string().required("Session is required"),
      printOption: Yup.string().required("Print Option is required"),
    });
  }

  //VALIDATION SCHEMA

  React.useEffect(() => {
    getAllSession()(dispatch);
    getActiveSession()(dispatch);
  }, []);

  React.useEffect(() => {
    setSelectedSession(activeSession);
    initialValues.sessionId = activeSession?.sessionId;
    initialValues.sessionTermId = activeSession?.terms.find(
      (term) => term.isActive == true
    )?.sessionTermId;
    setInitialValues(initialValues);
    getTermClasses(
      activeSession?.sessionId,
      activeSession?.sessionTermId
    )(dispatch);
  }, [activeSession]);

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
                  history.push(resultManagement.resultTemplate);
                  getAllStudentResult(
                    values.sessionClassId,
                    values.sessionTermId,
                    values.studentContactId
                  )(dispatch);
                }}
              >
                {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                  <Form className="mx-auto">
                    <Col md="11">
                      {touched.sessionId && errors.sessionId && (
                        <div className="text-danger">{errors.sessionId}</div>
                      )}
                    </Col>
                    <Col md="11" className="form-group text-dark">
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
                              (s) => s.sessionId.toLowerCase() == e.target.value
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
                    <Col md="11" className="form-group text-dark">
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
                      {touched.printOption && errors.printOption && (
                        <div className="text-danger">{errors.printOption}</div>
                      )}
                    </Col>
                    <Col md="11" className="form-group text-dark">
                      <label className="form-label" htmlFor="printOption">
                        <b>Print Option:</b>
                      </label>
                      <Field
                        as="select"
                        name="printOption"
                        className="form-select"
                        id="printOption"
                        onChange={(e) => {
                          setFieldValue("printOption", e.target.value);
                          if (e.target.value == "printSingle") {
                            setPrintSingle(true);
                            setBatchPrint(false);
                          } else if (e.target.value == "batchPrinting") {
                            setBatchPrint(true);
                            setPrintSingle(false);
                          }
                        }}
                      >
                        <option value="">Select Print Option</option>
                        <option value="printSingle">Print single</option>
                        <option value="batchPrinting">Batch Printing</option>
                      </Field>
                    </Col>
                    {printSingle && (
                      <div>
                        <Col md="11">
                          {touched.studentRegNo && errors.studentRegNo && (
                            <div className="text-danger">
                              {errors.studentRegNo}
                            </div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-dark">
                          <label className="form-label" htmlFor="studentRegNo">
                            <b>Student Registration No:</b>
                          </label>
                          <Field
                            type="text"
                            name="studentRegNo"
                            className="form-control"
                            id="studentRegNo"
                            placeholder="Enter student reg no..."
                          />
                        </Col>
                        <Col md="11">
                          {touched.ePin && errors.ePin && (
                            <div className="text-danger">{errors.ePin}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-dark">
                          <label className="form-label" htmlFor="ePin">
                            <b>E-pin:</b>
                          </label>
                          <Field
                            type="text"
                            name="ePin"
                            className="form-control"
                            id="ePin"
                            placeholder="Enter e-pin..."
                          />
                        </Col>
                      </div>
                    )}
                    {batchPrint && (
                      <div>
                        <Col md="11">
                          {touched.sessionClassId && errors.sessionClassId && (
                            <div className="text-danger">
                              {errors.sessionClassId}
                            </div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-dark">
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
                            onChange={(e) => {
                              setFieldValue("sessionClassId", e.target.value);
                              // getAllResultList(
                              //   e.target.value,
                              //   values.sessionTermId
                              // )(dispatch);
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
                      </div>
                    )}
                    <div className="d-flex justify-content-end">
                      <Button
                        type="button"
                        className="btn-sm mx-2 mt-4"
                        variant="btn btn-primary"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Print
                      </Button>
                    </div>
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

export default PrintResult;
