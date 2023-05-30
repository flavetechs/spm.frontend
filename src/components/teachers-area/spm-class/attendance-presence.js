import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { attendanceLocations, classLocations } from "../../../router/spm-path-locations";
import {
  getAllStudentsAbsent,
  getAllStudentsPresent,
} from "../../../store/actions/class-actions";

const AttendancePresence = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  //VARIABLE DECLARATIONS
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentsPresence } = state.class;
  // ACCESSING STATE FROM REDUX STORE
  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const classRegisterIdForPresent = queryParams.get(
      "classRegisterIdForPresent"
    );
    const classRegisterIdForAbsent = queryParams.get(
      "classRegisterIdForAbsent"
    );
    if (classRegisterIdForPresent){
    getAllStudentsPresent(classRegisterIdForPresent)(dispatch);
    }else{
    getAllStudentsAbsent(classRegisterIdForAbsent)(dispatch);
    }
  }, [locations.search,dispatch]);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h4>{studentsPresence?.find(s=>s)?.isPresent === false ? "Absent" : studentsPresence?.find(s=>s)?.isPresent=== true ? "Present" : ""}</h4>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <div>
                    <Table size="md" responsive striped style={{ width: "60vw" }}>
                      <thead>
                        <tr>
                          <th className="text-center" style={{ width: "20%" }}>
                            S/No
                          </th>
                          <th style={{ width: "20%" }}>
                            Name
                          </th>
                          <th style={{ width: "20%" }}>
                            Registration No.
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsPresence?.map((student, idx) => (
                          <tr key={idx} className="text-uppercase">
                            <td className="text-center">{idx + 1}</td>
                            <td>{student.studentName}</td>
                            <td>
                              {student.registrationNumber}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                     onClick={() => {
                      const queryParams = new URLSearchParams(locations.search);
                      const sessionClassId = queryParams.get("sessionClassId");
                      history.push(`${attendanceLocations.classAttendanceBoard}?sessionClassId=${sessionClassId}`);
                    }}
                    className="btn btn-danger mx-3"
                  >
                    <span>Back</span>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AttendancePresence;
