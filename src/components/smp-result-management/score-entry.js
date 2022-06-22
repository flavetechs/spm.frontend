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
import SmallTable from "./score-entry-small-table";
import LargeTable from "./score-entry-large-table";
import Preview from "./score-entry-preview";
import { Link } from "react-router-dom";
import { resultManagement } from "../../router/spm-path-locations";

const ScoreEntry = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [indexRow, setIndexRow] = useState("");
  const [idsForPreview, setIdsForPreview] = useState({});
  const [showScoresEntryTable, setShowScoresEntryTable] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isPreviewMode, setPreviewMode] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffClasses, staffClassSubjects, scoreEntry } = state.results;

  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA

  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
    subjectId: Yup.string().required("Subject is required"),
  });
  //VALIDATION SCHEMA

  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
    // window.onbeforeunload = () => {
    //   return "are you sure you want to leave?";
    // };

    setIndexRow("");
    setIdsForPreview({});
    setShowScoresEntryTable(false);
    setEditMode(false);
    setPreviewMode(false);
  }, []);
  React.useEffect(() => {
    if (scoreEntry) {
      setShowScoresEntryTable(true);
    }
  }, [scoreEntry]);

  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>SCORE ENTRY</h6>
              </Card.Header>
              <Card.Body>
                {!isPreviewMode ? (
                  <Formik
                    initialValues={{
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
                        <Row>
                          <Link
                            to={resultManagement.adminScoreEntry}
                            className="d-flex justify-content-end"
                          >
                            <button
                              type="button"
                              className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                            >
                              <svg
                                width="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
                                  stroke="currentColor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11.998 19.355C15.806 19.355 19.289 16.617 21.25 12.053C19.289 7.48898 15.806 4.75098 11.998 4.75098H12.002C8.194 4.75098 4.711 7.48898 2.75 12.053C4.711 16.617 8.194 19.355 12.002 19.355H11.998Z"
                                  stroke="currentColor"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>{" "}
                              View Previous Score Entries
                            </button>
                          </Link>
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
                          <Col md="6" className="form-group">
                            <label
                              className="form-label"
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
                              {staffClasses.map((list, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionClassId}
                                  value={list.sessionClassId}
                                  data-tag={list.sessionClass}
                                >
                                  {list.sessionClass}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="6" className="form-group">
                            <label className="form-label" htmlFor="subjectId">
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

                {showScoresEntryTable && (
                  <div>
                    <SmallTable scoreEntry={scoreEntry} />
                    {!isPreviewMode ? (
                      <LargeTable
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

export default ScoreEntry;
