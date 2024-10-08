import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getActiveSession,
  getAllSession,
} from "../../../store/actions/session-actions";
import { getTermClasses } from "../../../store/actions/publish-actions";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { getSinglePrintResult } from "../../../store/actions/results-actions";
import { printResultManagement, resultManagement, scoreEntryManagement } from "../../../router/spm-path-locations";

const PrintResult = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  const [printSingle, setPrintSingle] = useState(false);
  const [batchPrint, setBatchPrint] = useState(false);
  const locations = useLocation();
  const queryParams = new URLSearchParams(locations.search);
  const sessionIdQueryParam = queryParams.get("sessionId") || "";
  const sessionClassIdQueryParam = queryParams.get("sessionClassId") || "";
  const termIdQueryParam = queryParams.get("termId") || "";
  const printOptionQueryParam = queryParams.get("printOption") || "";
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { termClasses } = state.publish;
  const { studentResult } = state.results;
  const { activeSession, sessionList } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA
  let validation;
  if (printSingle) {
    validation = Yup.object().shape({
      sessionTermId: Yup.string().required("Term is required"),
      sessionId: Yup.string().required("Session is required"),
      printOption: Yup.string().required("Print Option is required"),
      studentRegNo: Yup.string().required("Registration Number is required"),
      // ePin: Yup.string().required("E-pin is required"),
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
    getActiveSession()(dispatch);
    getAllSession(1)(dispatch);
  }, []);

  React.useEffect(() => {
    sessionIdQueryParam && getTermClasses(sessionIdQueryParam)(dispatch);
  }, [sessionIdQueryParam, dispatch]);

  React.useEffect(() => {
    activeSession && history.push(`${printResultManagement.printResult}?sessionId=${activeSession?.sessionId}&termId=${activeSession?.terms.find((term) => term.isActive === true)?.sessionTermId}`)
  }, [activeSession]);


  useEffect(() => {
    if (printOptionQueryParam === "printSingle") {
      setPrintSingle(true);
      setBatchPrint(false);
    } else if (printOptionQueryParam === "batchPrinting") {
      setBatchPrint(true);
      setPrintSingle(false);
    }
  }, [printOptionQueryParam])


  useEffect(() => {
    if (printSingle && studentResult) {
      history.push(resultManagement.resultTemplate);
    }
  }, [studentResult]);

  return (
    <>
      <div className="col-lg-6 mx-auto">
        <Col sm="12">
          <Card>
            <Card.Header>
              <h6>
                <b>PRINT RESULT</b>
              </h6>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={{
                  sessionId: sessionIdQueryParam,
                  sessionTermId: termIdQueryParam,
                  sessionClassId: sessionClassIdQueryParam,
                  printOption: printOptionQueryParam,
                  studentRegNo: "",
                  // ePin: "",
                }}
                validationSchema={validation}
                enableReinitialize={true}
                onSubmit={(values) => {
                  if (printSingle) {
                    getSinglePrintResult(
                      values.sessionTermId,
                      values.studentRegNo
                    )(dispatch);
                  } else if (batchPrint) {
                    history.push(
                      `${printResultManagement.batchPrintPreview}?sessionClassId=${values.sessionClassId}&sessionTermId=${values.sessionTermId}`
                    );
                  }
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
                            history.push(`${printResultManagement.printResult}?sessionId=${e.target.value}&termId=${e.target.value}&printOption=${printOptionQueryParam}&sessionClassId=${sessionClassIdQueryParam}`)
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
                            history.push(`${printResultManagement.printResult}?sessionId=${sessionIdQueryParam}&termId=${e.target.value}&printOption=${printOptionQueryParam}&sessionClassId=${sessionClassIdQueryParam}`)

                          }}
                        >
                          <option value="">Select Term</option>
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
                      <Col md="11">
                        {touched.printOption && errors.printOption && (
                          <div className="text-danger">
                            {errors.printOption}
                          </div>
                        )}
                      </Col>
                      <Col md="11" className="form-group h6">
                        <label className="form-label">
                          <b>Print Option:</b>
                        </label>
                        <Field
                          as="select"
                          name="printOption"
                          className="form-select"
                          id="printOption"
                          onChange={(e) => {
                            setFieldValue("printOption", e.target.value);
                            history.push(`${printResultManagement.printResult}?sessionId=${sessionIdQueryParam}&termId=${termIdQueryParam}&printOption=${e.target.value}&sessionClassId=${sessionClassIdQueryParam}`)
                            if (e.target.value === "printSingle") {
                              setPrintSingle(true);
                              setBatchPrint(false);
                            } else if (e.target.value === "batchPrinting") {
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
                        <Row className="d-flex justify-content-center">
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
                          </Col> */}
                          {/* <Col md="11" className="form-group h6">
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
                        </Row>
                      )}
                      {batchPrint && (
                        <Row className="d-flex justify-content-center">
                          <Col md="11">
                            {touched.sessionClassId &&
                              errors.sessionClassId && (
                                <div className="text-danger">
                                  {errors.sessionClassId}
                                </div>
                              )}
                          </Col>
                          <Col md="11" className="form-group h6">
                            <label className="form-label">
                              <b>Classes:</b>
                            </label>
                            <Field
                              as="select"
                              name="sessionClassId"
                              className="form-select"
                              id="sessionClassId"
                              onChange={(e) => {
                                setFieldValue("sessionClassId", e.target.value);
                                history.push(`${printResultManagement.printResult}?sessionId=${sessionIdQueryParam}&termId=${termIdQueryParam}&printOption=${printOptionQueryParam}&sessionClassId=${e.target.value}`)

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
                        </Row>
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

export default PrintResult;
