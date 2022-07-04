import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getAllPreviousClassScoreEntries,
  getStaffClassSubjects,
  nullifyPreviousScoreEntryOnExit,
} from "../../store/actions/results-actions";
import AdminLargeTable from "./admin-score-entry-large-table";
import AdminSmallTable from "./admin-score-entry-small-table";
import AdminPreview from "./admin-score-entry-preview";
import {
  getActiveSession,
  getAllSession,
} from "../../store/actions/session-actions";
import { getAllSessionClasses } from "../../store/actions/class-actions";

const AdminScoreEntry = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState("");
  const [indexRow, setIndexRow] = useState("");
  const [idsForPreview, setIdsForPreview] = useState({});
  const [showAdminScoresEntryTable, setShowAdminScoresEntryTable] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isPreviewMode, setPreviewMode] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffClassSubjects, previousScoreEntry } = state.results;
  const { itemList } = state.class;
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
    setIndexRow("");
    setIdsForPreview({});
    setShowAdminScoresEntryTable(false);
    setEditMode(false);
    setPreviewMode(false);
  }, []);

  React.useEffect(() => {
    if (!sessionId) {
      getAllSessionClasses(activeSession?.sessionId)(dispatch);
    } else {
      getAllSessionClasses(sessionId)(dispatch);
    }
  }, [sessionId, activeSession]);

  React.useEffect(() => {
    if (previousScoreEntry) {
      setShowAdminScoresEntryTable(true);
    }
    return()=>{
      nullifyPreviousScoreEntryOnExit(previousScoreEntry)(dispatch);
      setShowAdminScoresEntryTable(false);
    }
  }, [previousScoreEntry]);

  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>ADMIN SCORE ENTRY</h6>
              </Card.Header>
              <Card.Body>
                {!isPreviewMode ? (
                  <Formik
                    initialValues={{
                      sessionId: activeSession?.sessionId.toUpperCase(),
                      terms: activeSession?.terms
                        .filter((term) => term.isActive == true)
                        .map((term) => term.sessionTermId)
                        .toString(),
                      sessionClassId: "",
                      subjectId: "",
                    }}
                    validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      getAllPreviousClassScoreEntries(
                        values.sessionClassId,
                        values.subjectId,
                        values.terms
                      )(dispatch);
                      setIdsForPreview({
                        sessionClassId: values.sessionClassId,
                        subjectId: values.subjectId,
                        terms:values.terms
                      });
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
                            {touched.terms && errors.terms && (
                              <div className="text-danger">{errors.terms}</div>
                            )}
                          </Col>

                          <Col md="6" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="sessionId"
                            >
                              Session:
                            </label>
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
                              {sessionList?.map((list, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionId}
                                  value={list.sessionId}
                                >
                                  {list.startDate} / {list.endDate}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="6" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="terms"
                            >
                              Terms:
                            </label>
                            <Field
                              as="select"
                              name="terms"
                              className="form-select"
                              id="terms"
                            >
                              <option value="">Select Terms</option>
                              {sessionList
                                ?.filter(
                                  (list, idx) =>
                                    list.sessionId.toUpperCase() ==
                                    values.sessionId
                                )
                                .map((list, id) =>
                                  list.terms.map((term, id) => (
                                    <option
                                      key={id}
                                      name={values.terms}
                                      value={term.sessionTermId}
                                      selected={
                                        term.sessionTermId == values.terms
                                      }
                                    >
                                      {term.termName}
                                    </option>
                                  ))
                                )}
                            </Field>
                          </Col>
                          <Row>
                            {" "}
                            <Col md="6">
                              {touched.sessionClassId &&
                                errors.sessionClassId && (
                                  <div className="text-danger">
                                    {errors.sessionClassId}
                                  </div>
                                )}
                            </Col>
                            <Col md="6">
                              {touched.subjectId && errors.subjectId && (
                                <div className="text-danger">
                                  {errors.subjectId}
                                </div>
                              )}
                            </Col>
                          </Row>
                          <Col md="6" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="sessionClassId"
                            >
                              Class:
                            </label>
                            <Field
                              as="select"
                              name="sessionClassId"
                              className="form-select"
                              id="sessionClassId"
                              onChange={(e) => {
                                setFieldValue("sessionClassId", e.target.value);
                                getStaffClassSubjects(e.target.value)(dispatch);
                              }}
                            >
                              <option value="">Select Class</option>
                              {itemList.map((list, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionClassId}
                                  value={list.sessionClassId}
                                >
                                  {list.class}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="6" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="subjectId"
                            >
                              Subject:
                            </label>
                            <Field
                              as="select"
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
                ) : null}

                {showAdminScoresEntryTable && (
                  <div>
                    <AdminSmallTable previousScoreEntry={previousScoreEntry} />
                    {!isPreviewMode ? (
                      <AdminLargeTable
                        validation={validation}
                        previousScoreEntry={previousScoreEntry}
                        isEditMode={isEditMode}
                        setEditMode={setEditMode}
                        setIndexRow={setIndexRow}
                        setPreviewMode={setPreviewMode}
                        indexRow={indexRow}
                        isPreviewMode={isPreviewMode}
                        idsForPreview={idsForPreview}
                      />
                    ) : (
                      <AdminPreview
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

export default AdminScoreEntry;
