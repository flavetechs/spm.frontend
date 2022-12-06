import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  buildClassSubjectArray as buildSessionClassSubjectArray,
  getAllActiveClasses,
  getAllActiveSubjects,
  getAllActiveTeachers,
  createSessionClassSubject,
} from "../../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import { getActiveSession } from "../../../store/actions/session-actions";
import { showErrorToast } from "../../../store/actions/toaster-actions";

const SessionClassTableAdd = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    createSuccessful,
    message,
    activeTeachers,
    activeSubjects,
    activeClasses,
    classSubjects,
  } = state.class;

  const { activeSession } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const [examScore, setExamScore] = useState(70);
  const [assessmentScore, setAssessmentScore] = useState(30);
  const [initialValues, setInitialValues] = useState({
    sessionId: activeSession?.session,
    classId: "",
    formTeacherId: "",
    InSession: true,
    examScore: 70,
    assessmentScore: 30,
    passMark: 40,
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

  

  React.useEffect(() => {
    getAllActiveClasses()(dispatch);
    getAllActiveTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
    getActiveSession()(dispatch);
  }, [dispatch]);

 

  //HANDLER FUNCTIONS
  const getSubjectId = (event, subjectId,subject, subjectTeacherId,subjectTeacher) => {
    buildSessionClassSubjectArray(
      examScore,
      assessmentScore,
      subjectId,
      subject,
      subjectTeacherId || "",
      subjectTeacher || "",
      classSubjects,
      true
    )(dispatch);
  };

  const getExamScores = (subjectId,subject) => {
    buildSessionClassSubjectArray(
      initialValues.subjectExamScore,
      initialValues.subjectAssessmentScore,
      subjectId,
      subject,
      "",
      "",
      classSubjects,
      true
    )(dispatch);
  };

  const getAssessmentScores = (subjectId,subject,subjectTeacherId,subjectTeacher) => {
    buildSessionClassSubjectArray(
      initialValues.subjectExamScore,
      initialValues.subjectAssessmentScore,
      subjectId,
      subject,
      subjectTeacherId||"",
      subjectTeacher||"",
      classSubjects,
      true
    )(dispatch);
  };

  const getSubjectTeacherId = (subjectId,subject, subjectTeacherId,subjectTeacher) => {
    buildSessionClassSubjectArray(
      "",
      "",
      subjectId,
      subject,
      subjectTeacherId,
      subjectTeacher,
      classSubjects,
      true
    )(dispatch);
  };
  //HANDLER FUNCTIONS
  React.useEffect(() => {
    createSuccessful &&
    history.push(`${sessionLocations.sessionClassList}`);
  }, [createSuccessful]);

console.log("classSubjects",classSubjects);
  //HANDLER FUNCTIONS
  return (
    <>
      <div className="col-md-10 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={initialValues}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                     values.subjectList = classSubjects;
                    const score =
                      Number(values.examScore) + Number(values.assessmentScore);
                    if (score !== 100) {
                      showErrorToast(
                        "Examination and assessment must equal 100"
                      )(dispatch);
                      return;
                    }

                    for (let i = 0; i < classSubjects.length; i++) {
                      if (!classSubjects[i].assessment)
                        classSubjects[i].assessment = values.assessmentScore;
                      if (!classSubjects[i].examSCore)
                        classSubjects[i].examSCore = values.examScore;
                    }
                    values.classSubjects = classSubjects;

                    createSessionClassSubject(values)(dispatch);
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
                            <th>Subject</th>
                            <th>Exam</th>
                            <th>Assessment</th>
                            <th>Subject Teacher</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSubjects.map((subject, idx) => (
                            <tr key={idx}>
                              <td style={{ width: "50%" }} className='text-uppercase'>
                                {" "}
                                <Field
                                  type="checkbox"
                                  id="subjectId"
                                  name="subjectId"
                                  className="form-check-input"
                                  checked={classSubjects.find(
                                    (sub) => sub.subjectId === subject.lookupId
                                  )||false}
                                  onChange={(e) => {
                                    getSubjectId(e, subject.lookupId,subject.name);
                                  }}
                                />{" "}
                                {subject.name}
                              </td>

                              <td>
                                {" "}
                                {classSubjects.find(
                                  (sub) => sub.subjectId === subject.lookupId
                                ) ? (
                                  <Field
                                    type="number"
                                    className="form-control px-1"
                                    name={`${subject.lookupId}_subjectExamScore`}
                                    id={`${subject.lookupId}_subjectExamScore`}
                                    defaultValue={values.examScore}
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
                                      getExamScores(subject.lookupId,subject.name);
                                      getAssessmentScores(subject.lookupId,subject.name);
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

                              <td>
                                {classSubjects.find(
                                  (sub) => sub.subjectId === subject.lookupId
                                ) ? (
                                  <Field
                                    type="number"
                                    className="form-control px-1 w-50"
                                    name={`${subject.lookupId}_subjectAssessmentScore`}
                                    id={`${subject.lookupId}_subjectAssessmentScore`}
                                    defaultValue={values.assessmentScore}
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
                                  className="form-select text-capitalize"
                                  id="subjectTeacherId"
                                  onChange={(e) => {
                                    values.subjectId ?
                                      getSubjectTeacherId(
                                        subject.lookupId,
                                        subject.name,
                                        e.target.value,
                                        e.target.selectedOptions[0].dataset.fullname
                                      ) :
                                      getSubjectId(e, subject.lookupId,subject.name, e.target.value,e.target.selectedOptions[0].dataset.fullname);
                                  }}
                                >
                                  <option value="">Select Teacher</option>

                                  {activeTeachers.map((teacher, id) => (
                                    <option
                                      key={id}
                                      data-fullname={teacher.fullName}
                                      value={teacher.teacherAccountId}
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
                              history.push(`${sessionLocations.sessionClassList}`);
                          }}
                        >
                          Cancel
                        </Button>{" "}
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          onClick={() => {
                            handleSubmit();
                          }}
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

export default SessionClassTableAdd;
