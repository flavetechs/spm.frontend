import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  updateSessionClass,
  buildClassSubjectArray,
  getAllActiveClasses,
  getAllActiveSubjects,
  getAllActiveTeachers,
  getAllSessionClasses,
  fetchSingleSessionClass,
  updateClassSubjects,
} from "../../store/actions/class-actions";
import { getActiveSession } from "../../store/actions/session-actions";
import { showErrorToast } from "../../store/actions/toaster-actions";

const SessionClassEdit = () => {
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
    subjectExamScore: Yup.number()
      .required("Subject Examination score is required")
      .min(0, "Subject Examination score must not be below 0")
      .max(100, "Subject Examination score must not be above 100"),
    subjectAssessmentScore: Yup.number()
      .required("Subject Assessment score is required")
      .min(0, "Subject Assessment score must not be below 0")
      .max(100, "Subject Assessment score must not be above 100"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    isSuccessful,
    message,
    selectedItem,
    activeTeachers,
    activeSubjects,
    activeClasses,
    classSubjects,
  } = state.class;
  const { activeSession } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const [examScore, setExamScore] = useState(70);
  const [assessmentScore, setAssessmentScore] = useState(30);
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({
    sessionId: selectedItem?.sessionId,
    classId: selectedItem?.classId,
    formTeacherId: selectedItem?.formTeacherId,
    InSession: true,
    sessionClassId: selectedItem?.sessionClassId,
    examScore: examScore,
    assessmentScore: assessmentScore,
    passMark: selectedItem?.passMark,
    subjectExamScore: 70,
    subjectAssessmentScore: 30,
  });

  //VARIABLE DECLARATIONS

  const setCurrentSubjectScores1 = (
    subjectExamScore,
    subjectAssessmentScore,
    subjectId
  ) => {
    initialValues[`${subjectId}_subjectExamScore`] = subjectExamScore;
    initialValues[`${subjectId}_subjectAssessmentScore`] =
      subjectAssessmentScore;

    initialValues.subjectExamScore = subjectExamScore;
    initialValues.subjectAssessmentScore = subjectAssessmentScore;
    setInitialValues(initialValues);
  };

  const setCurrentSubjectScores2 = (
    subjectExamScore,
    subjectAssessmentScore
  ) => {
    classSubjects.map((subject, idx) => {
      initialValues[`${subject.subjectId}_subjectExamScore`] = subjectExamScore;
      initialValues[`${subject.subjectId}_subjectAssessmentScore`] =
        subjectAssessmentScore;
      updateClassSubjects(
        subjectExamScore,
        subjectAssessmentScore,
        classSubjects
      )(dispatch);
    });

    initialValues.subjectExamScore = subjectExamScore;
    initialValues.subjectAssessmentScore = subjectAssessmentScore;
    setInitialValues(initialValues);
  };

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const sessionClassId = queryParams.get("sessionClassId");
    if (!sessionClassId) return;
    fetchSingleSessionClass(sessionClassId)(dispatch);
    getAllSessionClasses()(dispatch);
    getAllActiveClasses()(dispatch);
    getAllActiveTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
    getActiveSession()(dispatch);
  }, []);

  React.useEffect(() => {
    setExamScore(selectedItem?.examScore);
    setAssessmentScore(selectedItem?.assessmentScore);
  }, [selectedItem]);

  if (isSuccessful) {
    history.push(sessionLocations.sessionClassList);
  }

  //HANDLER FUNCTIONS
  const getSubjectId = (event, subjectId) => {
    const checkBoxValue = event.target.checked;
    buildClassSubjectArray(
      "",
      "",
      subjectId,
      "",
      classSubjects,
      checkBoxValue
    )(dispatch);
  };

  const getExamScores = (subjectId) => {
    buildClassSubjectArray(
      initialValues.subjectExamScore,
      initialValues.subjectAssessmentScore,
      subjectId,
      "",
      classSubjects,
      true
    )(dispatch);
  };

  const getAssessmentScores = (subjectId) => {
    buildClassSubjectArray(
      initialValues.subjectExamScore,
      initialValues.subjectAssessmentScore,
      subjectId,
      "",
      classSubjects,
      true
    )(dispatch);
  };

  const getSubjectTeacherId = (subjectId, subjectTeacherId) => {
    buildClassSubjectArray(
      "",
      "",
      subjectId,
      subjectTeacherId,
      classSubjects,
      true
    )(dispatch);
  };
  //HANDLER FUNCTIONS
  console.log("classSubjects", classSubjects);
  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    values.sessionId = selectedItem?.sessionId;
                    values.classSubjects = classSubjects;
                    const score =
                      Number(values.examScore) + Number(values.assessmentScore);
                    if (score !== 100) {
                      showErrorToast(
                        "Examination and assessment must equal 100"
                      )(dispatch);
                      return;
                    }
                    console.log("values",values)
                    updateSessionClass(values)(dispatch);
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
                        <Col md={6}>
                          <Field
                            type="text"
                            style={{ visibility: "hidden" }}
                            className="form-control"
                            name="subjectExamScore"
                            id="subjectExamScore"
                            values={values.subjectExamScore}
                          />
                        </Col>
                        <Col md={6}>
                          <Field
                            type="text"
                            style={{ visibility: "hidden" }}
                            className="form-control"
                            name="subjectAssessmentScore"
                            id="subjectAssessmentScore"
                            values={values.subjectAssessmentScore}
                          />
                        </Col>
                      </Row>
                      <Row>
                        {message && (
                          <div className="text-danger">{message}</div>
                        )}
                        {touched.formTeacherId && errors.formTeacherId && (
                          <div className="text-danger">
                            {errors.formTeacherId}
                          </div>
                        )}
                        {touched.examScore && errors.examScore && (
                          <div className="text-danger">{errors.examScore}</div>
                        )}
                        {touched.assessmentScore && errors.assessmentScore && (
                          <div className="text-danger">
                            {errors.assessmentScore}
                          </div>
                        )}
                        {touched.passMark && errors.passMark && (
                          <div className="text-danger">{errors.passMark}</div>
                        )}
                      </Row>
                      <Field
                        type="text"
                        className="form-control"
                        name="sessionClassId"
                        id="sessionClassId"
                        aria-describedby="sessionClassId"
                        defaultValue={selectedItem?.sessionClassId}
                        hidden
                      />

                      <Row>
                        <Col>
                          <div className="form-group">
                            <label htmlFor="sessionId" className="form-label">
                              {" "}
                              Session{" "}
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
                        <Col >
                          <div className="form-group">
                            <label htmlFor="classId" className="form-label">
                              {" "}
                              Class{" "}
                            </label>
                            <Field
                              as="select"
                              type="select"
                              name="classId"
                              className="form-select"
                              id="classId"
                              disabled={true}
                              onChange={(event) =>
                                setFieldValue("classId", event.target.value)
                              }
                            >
                              <option value={""}>Select Class</option>
                              {activeClasses.map((classLookup, idx) => (
                                <option
                                  key={idx}
                                  value={classLookup.lookupId}
                                  selected={
                                    selectedItem?.classId ==
                                    classLookup.lookupId
                                  }
                                >
                                  {classLookup.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </Row>

                      <div className="d-flex row justify-content-between">
                        <Col sm="6" lg="2">
                          <div className="form-group">
                            <label htmlFor="examScore" className="form-label">
                              {" "}
                              Exam Score
                            </label>
                            <Field
                              type="number"
                              onChange={(e) => {
                                setExamScore(e.target.value);
                                setAssessmentScore(100 - e.target.value);
                                setFieldValue("examScore", e.target.value);
                                setFieldValue(
                                  "assessmentScore",
                                  100 - e.target.value
                                );
                                setFieldValue(
                                  "subjectExamScore",
                                  Number(e.target.value)
                                );
                                setCurrentSubjectScores2(
                                  Number(e.target.value),
                                  Number(100 - e.target.value)
                                );
                                classSubjects.map((subject, idx) => {
                                  setFieldValue(
                                    `${subject.subjectId}_subjectExamScore`,
                                    Number(e.target.value)
                                  );
                                  setFieldValue(
                                    `${subject.subjectId}_subjectAssessmentScore`,
                                    Number(100 - e.target.value)
                                  );
                                });
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

                        <Col sm="6" lg="2">
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
                              onChange={(e) => {
                                setAssessmentScore(e.target.value);
                                setExamScore(100 - e.target.value);
                                setFieldValue(
                                  "assessmentScore",
                                  e.target.value
                                );
                                setFieldValue(
                                  "examScore",
                                  100 - e.target.value
                                );
                                setFieldValue(
                                  "subjectAssessmentScore",
                                  Number(e.target.value)
                                );
                                setCurrentSubjectScores2(
                                  Number(100 - e.target.value),
                                  Number(e.target.value)
                                );
                                classSubjects.map((subject, idx) => {
                                  setFieldValue(
                                    `${subject.subjectId}_subjectAssessmentScore`,
                                    Number(e.target.value)
                                  );
                                  setFieldValue(
                                    `${subject.subjectId}_subjectExamScore`,
                                    Number(100 - e.target.value)
                                  );
                                });
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

                        <Col sm="6" lg="2">
                          <div className="form-group">
                            <label htmlFor="passMark" className="form-label">
                              {" "}
                              Pass Mark{" "}
                            </label>
                            <Field
                              type="number"
                              className="form-control p-sm-1 p-lg-2"
                              name="passMark"
                              id="passMark"
                              aria-describedby="passMark"
                              required
                              placeholder=" "
                            />
                          </div>
                        </Col>

                        <Col sm="6" lg="6">
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
                              className="form-select"
                              id="formTeacherId"
                              onChange={(event) =>
                                setFieldValue(
                                  "formTeacherId",
                                  event.target.value
                                )
                              }
                            >
                              <option value={""} defaultValue={""}>
                                Select Form Teacher
                              </option>
                              {activeTeachers.map((teacher, idx) => (
                                <option
                                  key={idx}
                                  value={teacher.teacherAccountId}
                                  selected={
                                    selectedItem?.formTeacherId ==
                                    teacher.teacherAccountId
                                  }
                                >
                                  {teacher.fullName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </div>

                      {touched.subjectExamScore && errors.subjectExamScore && (
                        <div className="text-danger">
                          {errors.subjectExamScore}
                        </div>
                      )}
                      {touched.subjectAssessmentScore &&
                        errors.subjectAssessmentScore && (
                          <div className="text-danger">
                            {errors.subjectAssessmentScore}
                          </div>
                        )}

                      <Table bordered responsive>
                        <thead>
                          <tr>
                            <th style={{ width: "50%" }}>Subject</th>
                            <th style={{ width: "10%" }}>Exam</th>
                            <th style={{ width: "10%" }}>Assessment</th>
                            <th style={{ width: "30%" }}>Subject Teacher</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSubjects.map((subject, idx) => (
                            <tr key={idx}>
                              <td style={{ width: "50%" }}>
                                {" "}
                                <Field
                                  type="checkbox"
                                  id="subjectId"
                                  name="subjectId"
                                  className="form-check-input"
                                  checked={
                                    classSubjects.find(
                                      (sub) =>
                                        sub.subjectId === subject.lookupId
                                    ) || false
                                  }
                                  onChange={(e) => {
                                    getSubjectId(e, subject.lookupId);
                                  }}
                                />{" "}
                                {subject.name}
                              </td>

                              <td style={{ width: "25%" }}>
                                {" "}
                                {classSubjects.find(
                                  (sub) => sub.subjectId === subject.lookupId
                                ) ? (
                                  <Field
                                    type="number"
                                    className="form-control px-1"
                                    name={`${subject.lookupId}_subjectExamScore`}
                                    id={`${subject.lookupId}_subjectExamScore`}
                                    aria-describedby={`${subject.lookupId}_subjectExamScore`}
                                    required
                                    placeholder=" "
                                    onChange={(e) => {
                                      setCurrentSubjectScores1(
                                        Number(e.target.value),
                                        Number(100 - e.target.value),
                                        subject.lookupId
                                      );
                                      setFieldValue(
                                        "subjectExamScore",
                                        Number(e.target.value)
                                      );
                                      getExamScores(subject.lookupId);
                                      getAssessmentScores(subject.lookupId);
                                      setFieldValue(
                                        `${subject.lookupId}_subjectExamScore`,
                                        Number(e.target.value)
                                      );
                                      setFieldValue(
                                        `${subject.lookupId}_subjectAssessmentScore`,
                                        Number(100 - e.target.value)
                                      );
                                    }}
                                  />
                                ) : null}
                              </td>

                              <td style={{ width: "15%" }}>
                                {classSubjects.find(
                                  (sub) => sub.subjectId === subject.lookupId
                                ) ? (
                                  <Field
                                    type="number"
                                    className="form-control px-1"
                                    name={`${subject.lookupId}_subjectAssessmentScore`}
                                    id={`${subject.lookupId}_subjectAssessmentScore`}
                                    aria-describedby={`${subject.lookupId}_subjectAssessmentScore`}
                                    required
                                    placeholder=" "
                                    onChange={(e) => {
                                      setCurrentSubjectScores1(
                                        Number(100 - e.target.value),
                                        Number(e.target.value),
                                        subject.lookupId
                                      );
                                      setFieldValue(
                                        "subjectAssessmentScore",
                                        Number(e.target.value)
                                      );
                                      setFieldValue(
                                        `${subject.lookupId}_subjectAssessmentScore`,
                                        Number(e.target.value)
                                      );
                                      setFieldValue(
                                        `${subject.lookupId}_subjectExamScore`,
                                        Number(100 - e.target.value)
                                      );
                                    }}
                                  />
                                ) : null}
                              </td>

                              <td style={{ width: "30%" }}>
                                <select
                                  name="subjectTeacherId"
                                  className="form-select"
                                  id="subjectTeacherId"
                                  onChange={(e) => {
                                    getSubjectTeacherId(
                                      subject.lookupId,
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option value="">Select Teacher</option>

                                  {activeTeachers.map((teacher, id) => (
                                    <option
                                      key={id}
                                      defaultValue={teacher.teacherAccountId}
                                      selected={
                                        classSubjects.find(
                                          (sub) =>
                                            sub.subjectTeacherId ===
                                              teacher.teacherAccountId &&
                                            sub.subjectId === subject.lookupId
                                        )
                                          ? true
                                          : false
                                      }
                                    >
                                      {teacher.fullName}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          variant="btn btn-danger mx-2"
                          onClick={() => {
                            history.push(sessionLocations.sessionClassList);
                          }}
                        >
                          Cancel
                        </Button>{" "}
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Submit
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

export default SessionClassEdit;
