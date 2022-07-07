import { Field, Formik } from "formik";
import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../router/spm-path-locations";
import {
  continueClassRegister,
  getAllClassRegister,
  updateAttendance,
  updateRegisterLabel,
} from "../../store/actions/class-actions";

const Attendance = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  //VARIABLE DECLARATIONS
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { singleClassRegister, registerLabelUpdateSuccessful } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const classRegisterId = queryParams.get("classRegisterId");
    if (classRegisterId) {
    continueClassRegister(classRegisterId)(dispatch);
    }
  }, [registerLabelUpdateSuccessful]);

console.log("singleClassRegister",singleClassRegister);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-center">
                  <Formik
                    initialValues={{
                      classRegisterLabel: singleClassRegister?.classRegisterLabel,
                    }}
                    // validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {}}
                  >
                    {({
                      handleSubmit,
                      values,
                      setFieldValue,
                      touched,
                      errors,
                    }) => (
                      <div>
                        <Table size="md" responsive striped style={{ width: "60vw" }}>
                          <thead>
                          <tr>
                              <td colSpan={4}>
                                <h5
                                  className="text-center"
                                  style={{ color: "#2d2d2d" }}
                                >
                                  TITLE
                                  <Field
                                    type="text"
                                    className="form-control text-center"
                                    name="classRegisterLabel"
                                    id="classRegisterLabel"
                                    onBlur={(e) => {
                                      updateRegisterLabel(
                                        singleClassRegister?.classRegisterId,
                                        e.target.value
                                      )(dispatch);
                                    }}
                                    onKeyUp={(e) => {
                                      e &&
                                        e.keyCode == 13 &&
                                        updateRegisterLabel(
                                          singleClassRegister?.classRegisterId,
                                          e.target.value
                                        )(dispatch);
                                    }}
                                  />
                                </h5>
                              </td>
                            </tr>
                            <tr>
                              <th className="text-center">S/No</th>
                              <th>Name</th>
                              <th>
                                Registration No.
                              </th>
                              <th className="text-center">Is Present</th>
                            </tr>
                          </thead>
                          <tbody>
                            {singleClassRegister?.attendanceList?.map((student, idx) => (
                                <tr key={idx} className="text-uppercase">
                                  <td className="text-center">{idx + 1}</td>
                                  <td>{student.studentName}</td>
                                  <td>{student.registrationNumber}</td>
                                  <td className="text-center">
                                    <input
                                      type="checkbox"
                                      id=""
                                      defaultChecked={student.isPresent}
                                      onChange={(e) => {
                                        updateAttendance(
                                          singleClassRegister?.classRegisterId,
                                          student.studentContactId,
                                          e.target.checked,
                                          singleClassRegister
                                        )(dispatch);
                                      }}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Formik>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => {
                      const queryParams = new URLSearchParams(locations.search);
                      const sessionClassId = queryParams.get("sessionClassId");
                      history.push(
                          `${classLocations.classAttendanceBoard}?sessionClassId=${sessionClassId}`
                        );
                    }}
                    className="btn btn-success mx-3"
                  >
                    <span>Done</span>
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

export default Attendance;
