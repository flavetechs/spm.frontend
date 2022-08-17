import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Preview from "./score-entry-preview";
import PublishResultTable from "./publish-result-table";
import {
  getAllResultList,
  getAllSchoolSessions,
  getTermClasses,
  setSessionClassIdAndTermId,
  resetPublishPage,
} from "../../../store/actions/publish-actions";
import { getActiveSession } from "../../../store/actions/session-actions";


const PublishResult = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { schoolSessions, termClasses, publishResults, idsObj } = state.publish;
  const { activeSession } = state.session;
  const [selectedSession, setSelectedSession] = useState(null);
  const [initialValues, setInitialValues] = useState({
    sessionId: '',
    sessionTermId: '',
    sessionClassId: "",
  })
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [indexRow, setIndexRow] = useState("");
  const [idsForPreview, setIdsForPreview] = useState({});
  const [showPublishResultTable, SetShowPublishResultTable] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isPreviewMode, setPreviewMode] = useState(false);
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
    getAllSchoolSessions()(dispatch);
  }, []);

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllSchoolSessions()(dispatch);
    setIndexRow("");
    setIdsForPreview({});
    SetShowPublishResultTable(false);
    setEditMode(false);
    setPreviewMode(false);
    return () => {
      resetPublishPage()(dispatch);
       SetShowPublishResultTable(false);
    };
  }, []);

  React.useEffect(() => {
    if (activeSession) {
      setSelectedSession(activeSession);
      initialValues.sessionId = selectedSession?.sessionId.toUpperCase();
      initialValues.sessionTermId =  selectedSession?.terms.find(term => term.isActive == true)?.sessionTermId;
      setInitialValues(initialValues);
      getTermClasses(selectedSession?.sessionId, selectedSession?.sessionTermId)(dispatch)
    }
  }, [activeSession]);

  React.useEffect(() => {
    if (publishResults) {
      SetShowPublishResultTable(true);
    } else if (!publishResults) {
      SetShowPublishResultTable(false);
    }
  }, [publishResults]);


  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>
                  <b>PUBLISH RESULT</b>
                </h6>
              </Card.Header>
              <Card.Body>
                {!isPreviewMode ? (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      getAllResultList(values.sessionClassId, values.sessionTermId)(dispatch);
                      setSessionClassIdAndTermId(values.sessionClassId, values.sessionTermId)(dispatch);
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
                          <Col md="4">
                            {touched.sessionId && errors.sessionId && (
                              <div className="text-danger">
                                {errors.sessionId}
                              </div>
                            )}
                          </Col>
                          <Col md="4">
                            {touched.sessionTermId && errors.sessionTermId && (
                              <div className="text-danger">
                                {errors.sessionTermId}
                              </div>
                            )}
                          </Col>
                          <Col md="4">
                            {touched.sessionClassId &&
                              errors.sessionClassId && (
                                <div className="text-danger">
                                  {errors.sessionClassId}
                                </div>
                              )}


                          </Col>
                          <Col md="4" className="form-group text-dark">
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
                                setSelectedSession(schoolSessions.find(s => s.sessionId == e.target.value));
                              }}
                            >
                              <option value="">Select Session</option>
                              {schoolSessions.map((item, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionId}
                                  value={item.sessionId}
                                >
                                  {item.startDate}/{item.endDate}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="4" className="form-group text-dark">
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
                                getTermClasses(selectedSession?.sessionId, selectedSession?.sessionTermId)(dispatch)
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
                          <Col md="4" className="form-group text-dark">
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
                ) : null}
                {showPublishResultTable && (
                  <div>
                    {!isPreviewMode ? (
                      <PublishResultTable
                        validation={validation}
                        idsObj={idsObj}
                        isEditMode={isEditMode}
                        setEditMode={setEditMode}
                        setIndexRow={setIndexRow}
                        setPreviewMode={setPreviewMode}
                        indexRow={indexRow}
                        isPreviewMode={isPreviewMode}
                        idsForPreview={idsForPreview}
                        selectedSession={selectedSession}
                      />
                    ) : (
                      <Preview
                        setPreviewMode={setPreviewMode}
                        isPreviewMode={isPreviewMode}
                      />
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PublishResult;