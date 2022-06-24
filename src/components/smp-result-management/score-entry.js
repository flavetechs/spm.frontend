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
  nullifyScoreEntryOnExit,
} from "../../store/actions/results-actions";
import SmallTable from "./score-entry-small-table";
import LargeTable from "./score-entry-large-table";
import Preview from "./score-entry-preview";

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

    setIndexRow('');
    setIdsForPreview({});
    setShowScoresEntryTable(false);
    setEditMode(false);
    setPreviewMode(false);

  
  }, []);
  React.useEffect(() => {
    if (scoreEntry) {
      setShowScoresEntryTable(true);
    }
    return()=>{
      nullifyScoreEntryOnExit(scoreEntry)(dispatch)
      setShowScoresEntryTable(false);
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
                {
                  !isPreviewMode ? 
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
                            <Col md="6">
                              {touched.sessionClassId && errors.sessionClassId && (
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
                  : null
                }

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
