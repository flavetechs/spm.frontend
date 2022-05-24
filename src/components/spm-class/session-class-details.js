import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import { showErrorToast } from "../../store/actions/toaster-actions";
import { Formik, Field } from "formik";
import {
  buildClassSubjectArray,
  fetchSingleSessionClass,
  getAllActiveSubjects,
  getAllActiveTeachers,
  updateSessionClass,
} from "../../store/actions/class-actions";
import { getAllStudents } from "../../store/actions/student-actions";

const SessionClassDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  const [displayStudentsTable, setDisplayStudentsTable] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    message,
    selectedItem,
    activeSubjects,
    activeTeachers,
    classSubjects,
  } = state.class;
  const { studentList } = state.student;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const sessionClassId = queryParams.get("sessionClassId");
    if (!sessionClassId) return;
    fetchSingleSessionClass(sessionClassId)(dispatch);
    getAllStudents()(dispatch);
    getAllActiveSubjects()(dispatch);
    getAllActiveTeachers()(dispatch);
  }, []);

  const subjectInClass = activeSubjects.filter((activeSubject) => {
    return classSubjects.find((classSubject) => {
      return classSubject.subjectId === activeSubject.lookupId;
    });
  });

  //USE STATE DELCARATION EDIT BUTTON
const [toggleEditButton, setToggleEditButton] = useState( new Array(subjectInClass.length).fill(true))
//USE STATE DELCARATION EDIT BUTTON
  // //HANDLE DELCARATION EDIT BUTTON
  // const [toggleEditButton, setToggleEditButton] = useState=( new Array(subjectInClass.length).fill(true))
  // const handleEditButton = (position) => {
  //   const updatedEditState = toggleEditButton.map((item, index) =>
  //     index === position ? !item : item
  //   );
  
  //   setToggleEditButton(updatedEditState);
  // //HANDLE DELCARATION EDIT BUTTON
 if (selectedItem) {
    selectedItem.noOfStudents = 80;
    selectedItem.noOfsubjects = 40;
  }

  const getSubjectId = (event, subjectId) => {
    const checkBoxValue = event.target.checked;
    buildClassSubjectArray(
      subjectId,
      "",
      classSubjects,
      checkBoxValue
    )(dispatch);
  };

  const getSubjectTeacherId = (subjectId, subjectTeacherId) => {
    buildClassSubjectArray(
      subjectId,
      subjectTeacherId,
      classSubjects
    )(dispatch);
  };

  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionId: selectedItem?.sessionId,
                    classId: selectedItem?.classId,
                    formTeacherId: selectedItem?.formTeacherId,
                    InSession: true,
                    sessionClassId: selectedItem?.sessionClassId,
                    examScore: selectedItem?.examScore,
                    assessmentScore: selectedItem?.assessmentScore,
                    passMark: selectedItem?.passMark,
                  }}
                  enableReinitialize
                  onSubmit={(values) => {
                    values.classSubjects = classSubjects;
                    console.log("values", values);
                    //updateSessionClass(values)(dispatch);
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
                      <h4>Session Class Details</h4>
                      <div className="pt-3">
                        <h6 className="py-3">Class Details</h6>
                        <Table bordered size="sm">
                          <tbody>
                            <tr>
                              <th>Class</th>
                              <td>{selectedItem?.class}</td>
                            </tr>
                            <tr>
                              <th>Form Teacher</th>
                              <td>{selectedItem?.formTeacher}</td>
                            </tr>
                            <tr>
                              <th>No of Students</th>
                              <td>{selectedItem?.noOfStudents}</td>
                            </tr>
                            <tr>
                              <th>No of Subjects</th>
                              <td>{selectedItem?.noOfsubjects}</td>
                            </tr>
                            <tr>
                              <th>Assessment Score</th>
                              <td>{selectedItem?.assessmentScore}</td>
                            </tr>
                            <tr>
                              <th>Exam Score</th>
                              <td>{selectedItem?.examScore}</td>
                            </tr>
                            <tr>
                              <th>Pass Mark</th>
                              <td>{selectedItem?.passMark}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      <div className="d-flex pt-3">
                        <div className="py-3">
                          <h6
                            style={{ cursor: "pointer" }}
                            onClick={() => setDisplayStudentsTable(false)}
                          >
                            Subjects in class
                          </h6>
                          {!displayStudentsTable ? (
                            <div
                              className="border-primary"
                              style={{ border: "1px solid" }}
                            ></div>
                          ) : null}
                        </div>
                        <div className="py-3 mx-4">
                          <h6
                            style={{ cursor: "pointer" }}
                            onClick={() => setDisplayStudentsTable(true)}
                          >
                            Students in class
                          </h6>
                          {displayStudentsTable ? (
                            <div
                              className="border-primary"
                              style={{ border: "1px solid" }}
                            ></div>
                          ) : null}
                        </div>
                      </div>
                      {!displayStudentsTable ? (
                        <Table bordered size="sm">
                          <tbody>
                            <tr>
                              <th>Subject Name</th>
                              <th>Teacher</th>
                            </tr>
                            {/* {subjectName.map((subject, idx)=>
                      <tr key={idx}>
                        <td>{subject.name}</td>
                         {activeTeachers.map((teacher, id)=>
                        
                      
                      <td></td> )}
                      <td><button className="btn btn-success p-2">Edit</button></td>
                      </tr>
                       )} */}

                            {toggleEditButton ?
                            subjectInClass.map((subject, idx) => (
                              <tr key={idx}>
                                <td>
                                  {" "}
                                  <Field
                                    type="checkbox"
                                    id="subjectId"
                                    name="subjectId"
                                    className="form-check-input"
                                    checked={classSubjects.find(
                                      (sub) =>
                                        sub.subjectId === subject.lookupId
                                    )}
                                    onChange={(e) => {
                                      getSubjectId(e, subject.lookupId);
                                    }}
                                  />{" "}
                                  {subject.name}
                                </td>
                                <td>
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
                                <td>
                                  <button className="btn btn-success p-2" onClick="">
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))  : null}
                          </tbody>
                        </Table>
                      ) : (
                        <Table bordered size="sm">
                          <tbody>
                            <tr>
                              <th>Student(s) Name</th>
                              <th>Registration No</th>
                            </tr>
                            {studentList.map((student, idx) => (
                              <tr key={idx}>
                                <td>
                                  {student.firstName} {student.lastName}
                                </td>
                                <td>{student.registrationNumber}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}

                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          variant="btn btn-danger mx-2"
                          onClick={() => {
                            history.push(classLocations.sessionClassList);
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
                          Submit Edit
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

export default SessionClassDetails;
