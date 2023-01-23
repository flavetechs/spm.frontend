import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  createSessionClass,
  getAllActiveClasses,
  getAllActiveSubjects,
  getAllActiveTeachers,
} from "../../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import { getActiveSession } from "../../../store/actions/session-actions";
import { showErrorToast } from "../../../store/actions/toaster-actions";

const SessionClassAdd = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    submitSuccessful,
    activeTeachers,
    selectedItem,
    activeClasses,
  } = state.class;

  const { activeSession } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const [classId, setClassId] = useState("");
  const [formTeacherId, setFormTeacherId] = useState("");
  const [save, setSave] = useState(false);
  const [examScore, setExamScore] = useState(70);
  const [assessmentScore, setAssessmentScore] = useState(30);
  const [passMark, setPassMark] = useState(40);
 
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    classId: Yup.string().required("Class is required"),
    formTeacherId: Yup.string().required("Form teacher is required"),
    examScore: Yup.number()
      .required("Examination score is required")
      .min(0, "Examination score must not be below 0")
      .max(100, "Examination score must not be above 100"),
    assessmentScore: Yup.number()
      .required("Assessment score is required")
      .min(0, "Assessment score must not be below 0")
      .max(100, "Assessment score must not be above 100"),
    passMark: Yup.number()
      .required("Pass Mark is required")
      .min(0, "Pass Mark score must not be below 0")
      .max(100, "Pass Mark score must not be above 100"),
  });



  React.useEffect(() => {
    getAllActiveClasses()(dispatch);
    getAllActiveTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
    getActiveSession()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if (submitSuccessful && !save) {
      history.push(
        `${sessionLocations.sessionClassTableAdd}?classId=${classId}&formTeacherId=${formTeacherId}&sessionClassId=${selectedItem?.sessionClassId}&exam=${examScore}&assessment=${assessmentScore}`
      );
    } 
    else if (submitSuccessful && save) {
      history.goBack();
    }
  }, [submitSuccessful, save]);
  //HANDLER FUNCTIONS
  return (
    <>
      <div className="col-md-10 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    classId,
                    formTeacherId,
                    InSession: true,
                    examScore,
                    assessmentScore,
                    passMark: 40,
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    values.sessionId = activeSession?.sessionId;
                    const score =
                      Number(values.examScore) + Number(values.assessmentScore);
                    if (score !== 100) {
                      showErrorToast(
                        "Examination and assessment must equal 100"
                      )(dispatch);
                      return;
                    }
                     
                    createSessionClass(values)(dispatch);
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    values,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <Form>
                      <Row>
                     
                    
                      </Row>
                    
                      <Field
                        type="text"
                        className="form-control"
                        name="sessionClassId"
                        id="sessionClassId"
                        aria-describedby="sessionClassId"
                        hidden
                      />

                      <Row>
                        <Col md="6">
                          <div className="form-group">
                            <label htmlFor="sessionId" className="form-label">
                              Session
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              name="sessionId"
                              id="sessionId"
                              aria-describedby="sessionId"
                              value={activeSession?.session}
                              readOnly
                            />
                          </div>
                        </Col>

                        <Col md="6">
                          {touched.classId && errors.classId && (
                            <div className="text-danger">{errors.classId}</div>
                          )}
                          <div className="form-group">
                            <label  className="form-label">
                              {" "}
                              Class{" "}
                            </label>
                            <Field
                              as="select"
                              name="classId"
                              className="form-select"
                              id="classId"
                              onChange={(event) => {
                                setFieldValue("classId", event.target.value);
                                setClassId(event.target.value);
                              }}
                            >
                              <option value={""}>Select Class</option>
                              {activeClasses.map((classLookup, idx) => (
                                <option key={idx} value={classLookup.lookupId}>
                                  {classLookup.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </Row>

                      <div className="d-flex row justify-content-between">
                        <Col md="6">
                          {touched.examScore && errors.examScore && (
                            <div className="text-danger">
                              {errors.examScore}
                            </div>
                          )}

                          <div className="form-group">
                            <label  className="form-label">
                              {" "}
                              Exam Score
                            </label>
                            <Field
                              type="number"
                              value={examScore}
                              onChange={(e) => {
                                setExamScore(e.target.value);
                                setAssessmentScore(100 - e.target.value);
                                setFieldValue("examScore",  Number(e.target.value));
                                setFieldValue(
                                  "assessmentScore",
                                  Number(100 - e.target.value)
                                );
                               
                              }}
                              className="form-control p-sm-1 p-lg-2"
                              name="examScore"
                              id="examScore"
                              aria-describedby="examScore"
                              required
                              placeholder=" "
                            />
                          </div>
                        </Col>

                        <Col md="6">
                          {touched.assessmentScore &&
                            errors.assessmentScore && (
                              <div className="text-danger">
                                {errors.assessmentScore}
                              </div>
                            )}

                          <div className="form-group">
                            <label
                              htmlFor="assessmentScore"
                              className="form-label"
                            >
                              {" "}
                              Assesment{" "}
                            </label>
                            <Field
                              type="number"
                              value={assessmentScore}
                              onChange={(e) => {
                                setAssessmentScore(e.target.value);
                                setExamScore(100 - e.target.value);
                                setFieldValue(
                                  "assessmentScore",
                                  Number(e.target.value)
                                );
                                setFieldValue(
                                  "examScore",
                                 Number(100 - e.target.value)
                                );
                               
                              
                              }}
                              className="form-control p-sm-1 p-lg-2"
                              name="assessmentScore"
                              id="assessmentScore"
                              aria-describedby="assessmentScore"
                              required
                              placeholder=" "
                            />
                          </div>
                        </Col>

                        <Col md="6">
                          {touched.passMark && errors.passMark && (
                            <div className="text-danger">{errors.passMark}</div>
                          )}
                          <div className="form-group">
                            <label htmlFor="passMark" className="form-label">
                              {" "}
                              Pass Mark{" "}
                            </label>

                            <Field
                             name="passMark"
                              id="passMark"
                              type="number"
                              value={passMark}
                              onChange={(e) => {
                                setFieldValue("passMark", e.target.value);
                                setPassMark(Number(e.target.value))
                              }}
                              className="form-control p-sm-1 p-lg-2"
                             
                              aria-describedby="passMark"
                              required
                              
                            />
                          </div>
                        </Col>

                        <Col md="6">
                          {touched.formTeacherId && errors.formTeacherId && (
                            <div className="text-danger">
                              {errors.formTeacherId}
                            </div>
                          )}

                          <div className="form-group">
                            <label
                              htmlFor="formTeacherId"
                              className="form-label"
                            >
                              Form Teacher
                            </label>
                            <Field
                              as="select"
                              type="select"
                              name="formTeacherId"
                              className="form-select text-capitalize"
                              id="formTeacherId"
                              onChange={(event) =>{
                                setFormTeacherId(event.target.value)
                                setFieldValue(
                                  "formTeacherId",
                                  event.target.value
                                )
                              }}
                            >
                              <option value={""}>Select Form Teacher</option>
                              {activeTeachers.map((teacher, idx) => (
                                <option
                                  selected={
                                    selectedItem?.formTeacherId ===
                                    teacher.teacherAccountId
                                      ? true
                                      : false
                                  }
                                  key={idx}
                                  value={teacher.teacherAccountId}
                                >
                                  {teacher.fullName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </div>

                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          variant="btn btn-danger  btn-sm"
                          onClick={() => {
                            history.goBack();
                          }}
                        >
                          Cancel
                        </Button>{" "}
                        <Button
                          type="button"
                          variant="btn btn-primary mx-2 btn-sm"
                          onClick={() => {
                            handleSubmit();
                            setSave(true);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          variant="btn btn-primary btn-sm"
                          onClick={() => {
                            handleSubmit();
                            setSave(false);
                          }}
                        >
                          Set up subjects
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

export default SessionClassAdd;
