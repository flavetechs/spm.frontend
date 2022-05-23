import React, { useState } from "react";
import { Row, Col, Form, Button, Table, Fade } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import { showErrorToast } from "../../store/actions/toaster-actions";
import { fetchSingleSessionClass } from "../../store/actions/class-actions";
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
  const { message, selectedItem } = state.class;
  const { studentList } = state.student;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const sessionClassId = queryParams.get("sessionClassId");
    if (!sessionClassId) return;
    fetchSingleSessionClass(sessionClassId)(dispatch);
    getAllStudents()(dispatch);
  }, []);

  console.log("selectedItem", studentList);
  if (selectedItem) {
    selectedItem.noOfStudents = 80;
    selectedItem.noOfsubjects = 40;
  }
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
                    <h6 style={{ cursor: "pointer" }} onClick={()=>setDisplayStudentsTable(false)}>
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
                    <h6 style={{ cursor: "pointer" }} onClick={()=>setDisplayStudentsTable(true)}>
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
                      <tr>
                        <td>classing</td>
                        <td>yre</td>
                      </tr>
                    </tbody>
                  </Table>
                ) : (
                  <Table bordered size="sm">
                    <tbody>
                      <tr>
                        <th>Student(s) Name</th>
                        <th>Registration No</th>
                        </tr>
                        {studentList.map((student, idx)=>
                      <tr key={idx}>
                        <td>{student.firstName}{" "}{student.lastName}</td>
                        <td>yre</td>
                      </tr>
                      )}
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
