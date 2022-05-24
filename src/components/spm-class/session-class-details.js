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
  getAllClassStudents,
} from "../../store/actions/class-actions";

const SessionClassDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  const [displaySubjectsTable, setDisplaySubjectsTable] = useState(true);
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
    classStudents,
  } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const sessionClassId = queryParams.get("sessionClassId");
    if (!sessionClassId) return;
    fetchSingleSessionClass(sessionClassId)(dispatch);
    getAllActiveSubjects()(dispatch);
    getAllActiveTeachers()(dispatch);
    getAllClassStudents(sessionClassId)(dispatch);
  }, []);

  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
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
                        <td>{selectedItem?.studentCount}</td>
                      </tr>
                      <tr>
                        <th>No of Subjects</th>
                        <td>{selectedItem?.subjectCount}</td>
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
                {/* <div className="d-flex pt-3">
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
                      {!displayStudentsTable ? ( */}
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={!displayStudentsTable ? "nav-link active" : "nav-link"}
                      type="button"
                      role="tab"
                      onClick={() => {setDisplaySubjectsTable(true); setDisplayStudentsTable(false); }}
                    >
                      Subjects in class
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                     className={displayStudentsTable  ? "nav-link active" : "nav-link"}
                      type="button"
                      role="tab"
                      onClick={() => {setDisplayStudentsTable(false); setDisplayStudentsTable(true);}}
                    >
                      Students in class
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className={!displayStudentsTable  ? "tab-pane fade show active" : "tab-pane fade"}
                    role="tabpanel"
                  >
                    <Table bordered size="sm">
                          <tbody>
                            <tr>
                              <th>Subject Name</th>
                              <th>Teacher</th>
                              <th>Exam Score</th>
                              <th>Assessment</th>
                            </tr>
                             {classSubjects?.map((classSubject, id)=>
                              <tr key={id}>
                                 
                                <td>{classSubject.subjectName}</td>
                                <td>{classSubject.subjectTeacherName}</td>
                                <td>{classSubject.examSCore}</td>
                                <td>{classSubject.assessment}</td>
                              </tr>
                              )}
                          </tbody>
                        </Table>
                  </div>
                  <div
                    className={displayStudentsTable  ? "tab-pane fade show active" : "tab-pane fade"}
                    role="tabpanel"
                   
                  >
                     <Table bordered size="sm">
                    <tbody>
                      <tr>
                        <th>Student(s) Name</th>
                        <th>Registration No</th>
                      </tr>
                      {classStudents?.map((student, idx) => (
                        <tr key={idx}>
                          <td>
                            {student.firstName} {student.lastName}
                          </td>
                          <td>{student.registrationNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  </div>

                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    type="button"
                    variant="btn btn-danger mx-2"
                    onClick={() => {
                      history.push(classLocations.sessionClassList);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SessionClassDetails;
