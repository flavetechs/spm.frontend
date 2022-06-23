import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getAllClassScoreEntries,
  getAllStaffClasses,
  getStaffClassSubjects,
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
  const [indexRow, setIndexRow] = useState("");
  const [idsForPreview, setIdsForPreview] = useState({});
  const [showAdminScoresEntryTable, setShowAdminScoresEntryTable] =
    useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isPreviewMode, setPreviewMode] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffClasses, staffClassSubjects, scoreEntry } = state.results;
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
    if (scoreEntry) {
      setShowAdminScoresEntryTable(true);
    }
  }, [scoreEntry]);

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
                      sessionId: "",
                      terms: "",
                      sessionClassId: "",
                      subjectId: "",
                    }}
                    validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      getAllClassScoreEntries(
                        values.sessionClassId,
                        values.subjectId
                      )(dispatch);
                      //   getAllMasterListentries(
                      //     values.sessionClassId,
                      //     values.terms
                      //   )(dispatch);
                      setIdsForPreview({
                        sessionClassId: values.sessionClassId,
                        subjectId: values.subjectId,
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
                       <Row className="d-flex justify-content-center">
                          <Col md="10">
                            {touched.sessionId && errors.sessionId && (
                              <div className="text-danger">
                                {errors.sessionId}
                              </div>
                            )}
                          </Col>
                          <Col md="10" className="form-group">
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
                                getAllSessionClasses(e.target.value)(dispatch);
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
                          <Col md="10">
                            {touched.terms && errors.terms && (
                              <div className="text-danger">{errors.terms}</div>
                            )}
                          </Col>
                          <Col md="10" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="terms"
                            >
                              Terms:
                            </label>
                            <select
                              as="select"
                              name="terms"
                              className="form-select"
                              id="terms"
                              onChange={(e) => {
                                setFieldValue("terms", e.target.value);
                              }}
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
                            </select>
                          </Col>
                            <Col md="10">
                              {touched.sessionClassId &&
                                errors.sessionClassId && (
                                  <div className="text-danger">
                                    {errors.sessionClassId}
                                  </div>
                                )}
                            </Col>
                          <Col md="10" className="form-group">
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
                          <Col md="10">
                              {touched.subjectId && errors.subjectId && (
                                <div className="text-danger">
                                  {errors.subjectId}
                                </div>
                              )}
                            </Col>
                          <Col md="10" className="form-group">
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
                              onChange={(e) => {
                                setFieldValue("subjectId", e.target.value);
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
                ) : null}

                {showAdminScoresEntryTable && (
                  <div>
                    <AdminSmallTable scoreEntry={scoreEntry} />
                    {!isPreviewMode ? (
                      <AdminLargeTable
                        validation={validation}
                        scoreEntry={scoreEntry}
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
