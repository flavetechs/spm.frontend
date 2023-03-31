import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getAllResultList,
  getTermClasses,
} from "../../../store/actions/publish-actions";
import {
  getActiveSession,
  getAllSession,
} from "../../../store/actions/session-actions";
import { useHistory, useLocation } from "react-router-dom";
import { resultManagement } from "../../../router/spm-path-locations";

const PublishResult = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { termClasses } = state.publish;
  const { activeSession, sessionList } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  const locations = useLocation();
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQueryParam = queryParams.get("sessionClassId") || "";
  const sessionIdQueryParam = queryParams.get("sessionId") || "";
  const termIdQueryParam = queryParams.get("termId") || "";
  //VARIABLE DECLARATIONS

  //VALIDATION SCHEMA
  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
    sessionTermId: Yup.string().required("Term is required"),
    sessionId: Yup.string().required("Session is required"),
  });
  //VALIDATION SCHEMA

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllSession(1)(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if(sessionIdQueryParam != 'undefined'){
      getTermClasses(sessionIdQueryParam)(dispatch);
    }else{
      return
    }
  }, [sessionIdQueryParam, dispatch]);

  React.useEffect(() => {
    history.push(`${resultManagement.publishResult}?sessionId=${activeSession?.sessionId}&termId=${activeSession?.terms.find((term) => term.isActive === true)?.sessionTermId}`)
  }, [activeSession]);

  return (
    <>
      <div className="col-lg-6 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>
                  <b>PUBLISH RESULT</b>
                </h6>
                <div className="d-flex justify-content-end">
                  <Button
                    type="button"
                    className="btn-sm"
                    variant="btn btn-primary"
                    onClick={() => {
                      history.push(`${resultManagement.publishedClassList}`)
                    }}
                  >
                    Published Classes
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                {/* {!isPreviewMode ? ( */}
                <Formik
                  initialValues={{
                    sessionId: sessionIdQueryParam,
                    sessionTermId: termIdQueryParam,
                    sessionClassId: sessionClassIdQueryParam,
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    history.push(`${resultManagement.publishResultTable}?sessionClassId=${sessionClassIdQueryParam}&sessionTermId=${termIdQueryParam}&sessionId=${sessionIdQueryParam}`);

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
                        <Col md="10" className="form-group text-dark">
                          <label className="form-label h6">
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
                              history.push(`${resultManagement.publishResult}?sessionId=${e.target.value}`)
                              // setSelectedSession(
                              //   sessionList.find(
                              //     (s) =>
                              //       s.sessionId.toLowerCase() === e.target.value
                              //   )
                              // );
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
                        <Col md="10">
                          {touched.sessionTermId && errors.sessionTermId && (
                            <div className="text-danger">
                              {errors.sessionTermId}
                            </div>
                          )}
                        </Col>
                        <Col md="10" className="form-group text-dark">
                          <label className="form-label h6">
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
                              history.push(`${resultManagement.publishResult}?sessionId=${sessionIdQueryParam}&termId=${e.target.value}`)
                              // getTermClasses(
                              //   selectedSession?.sessionId,
                              //   e.target.value
                              // )(dispatch);
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
                                  // selected={term.sessionTermId === values.terms}
                                >
                                  {term.termName}
                                </option>
                              ))}
                          </Field>
                        </Col>
                        <Col md="10">
                          {touched.sessionClassId && errors.sessionClassId && (
                            <div className="text-danger ">
                              {errors.sessionClassId}
                            </div>
                          )}
                        </Col>
                        <Col md="10" className="form-group text-dark">
                          <label className="form-label h6">
                            <b>Classes:</b>
                          </label>
                          <Field
                            as="select"
                            name="sessionClassId"
                            className="form-select"
                            id="sessionClassId"
                            value={values.sessionClassId}
                            onChange={(e) => {
                              setFieldValue("sessionClassId", e.target.value);
                              history.push(`${resultManagement.publishResult}?sessionId=${sessionIdQueryParam}&termId=${termIdQueryParam}&sessionClassId=${e.target.value}`)
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

export default PublishResult;
