import React, { useState } from "react";
import { Row, Col, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  fetchSingleSessionClass,
  getAllActiveSubjects,
  getAllActiveTeachers,
  getAllClassStudents,
} from "../../../store/actions/class-actions";
import { studentsLocations } from "../../../router/spm-path-locations";

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
  const { selectedItem, classSubjects, classStudents } = state.class;
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
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <h4>Class Details</h4>
                <div className="pt-3">
                  <Table responsive bordered size="sm">
                    <tbody>
                      <tr>
                        <th>
                          <span className="h6">Class</span>
                        </th>
                        <td>{selectedItem?.class}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Form Teacher</span>
                        </th>
                        <td>{selectedItem?.formTeacher}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">No of Students</span>
                        </th>
                        <td>
                          <span className="badge bg-primary">
                            {selectedItem?.studentCount}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">No of Subjects</span>
                        </th>
                        <td>
                          <span className="badge bg-primary">
                            {selectedItem?.subjectCount}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Assessment Score</span>
                        </th>
                        <td>
                          <span className="badge bg-primary">
                            {selectedItem?.assessmentScore}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Exam Score</span>
                        </th>
                        <td>
                          <span className="badge bg-primary">
                            {selectedItem?.examScore}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Pass Mark</span>
                        </th>
                        <td>
                          <span className="badge bg-primary">
                            {selectedItem?.passMark}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <ul
                  className="nav nav-pills mt-4 mb-2"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={
                        !displayStudentsTable ? "nav-link active" : "nav-link"
                      }
                      type="button"
                      role="tab"
                      onClick={() => {
                        setDisplaySubjectsTable(true);
                        setDisplayStudentsTable(false);
                      }}
                    >
                      Subjects
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={
                        displayStudentsTable ? "nav-link active" : "nav-link"
                      }
                      type="button"
                      role="tab"
                      onClick={() => {
                        setDisplayStudentsTable(false);
                        setDisplayStudentsTable(true);
                      }}
                    >
                      Students
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className={
                      !displayStudentsTable
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    role="tabpanel"
                  >
                    <Table responsive bordered size="sm">
                      <tbody>
                        <tr>
                          <th>
                            <span className="h6">Subject Name</span>
                          </th>
                          <th>
                            <span className="h6">Teacher</span>
                          </th>
                          <th>
                            <span className="h6">Exam Score</span>
                          </th>
                          <th>
                            <span className="h6">Assessment</span>
                          </th>
                        </tr>
                        {classSubjects?.map((classSubject, id) => (
                          <tr key={id}>
                            <td className="text-capitalize">
                              {classSubject.subjectName}
                            </td>
                            <td className="text-capitalize">
                              {classSubject.subjectTeacherName}
                            </td>
                            <td>
                              <span className="badge bg-primary">
                                {classSubject.examSCore}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-primary">
                                {classSubject.assessment}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <div
                    className={
                      displayStudentsTable
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    role="tabpanel"
                  >
                    <Table responsive bordered size="sm">
                      <tbody>
                        <tr>
                          <th>
                            <span className="h6">Student(s) Name</span>
                          </th>
                          <th>
                            <span className="h6">Registration No</span>
                          </th>
                          <th>
                            <span className="h6">Action</span>
                          </th>
                        </tr>
                        {classStudents?.map((student, idx) => (
                          <tr key={idx}>
                            <td className="text-capitalize">
                              {student.firstName} {student.lastName}
                            </td>
                            <td>
                              <span className="badge bg-primary">
                                {student.registrationNumber}
                              </span>
                            </td>
                            <td>
                              
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    details
                                  </Tooltip>
                                }
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${studentsLocations.studentDetails}?studentAccountId=${student.studentAccountId}`}
                                 >
                                  <span className="btn-inner">
                                    <svg
                                      width="32"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M11.9946 16V12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M11.9896 8.2041H11.9996"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                  </span>
                                </Link>
                              </OverlayTrigger>
                            </td>
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
                      history.goBack();
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
