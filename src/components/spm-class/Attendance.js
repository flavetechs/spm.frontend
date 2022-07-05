import { Formik } from "formik";
import React from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllStudents } from "../../store/actions/student-actions";

const Attendance = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentList } = state.student;
  // ACCESSING STATE FROM REDUX STORE
  React.useEffect(() => {
    getAllStudents()(dispatch);
  }, []);
  console.log(studentList);
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
                      checked: "",
                      title: "",
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
                        <Table
                          size="md"
                          responsive
                          bordered
                          className="w-50 border-secondary"
                        >
                          <tbody>
                            <tr>
                              <td colSpan={4} style={{ background: "#d8efd1"}}>
                                <h5 className="text-center" style={{ color: "#2d2d2d" }}>
                                  Title: <input type="text" />
                                </h5>
                              </td>
                            </tr>
                            <tr style={{ background: "#d8efd1" }}>
                              <td style={{ color: "#2d2d2d" }}>S/No</td>
                              <td style={{ color: "#2d2d2d" }}>Name</td>
                              <td style={{ color: "#2d2d2d" }}>
                                Registration No.
                              </td>
                              <td style={{ color: "#2d2d2d" }}>Is Present</td>
                            </tr>
                            {studentList.map((student, idx) => (
                              <tr className="text-uppercase">
                                <td className="text-center">{idx + 1}</td>
                                <td>
                                  {student.firstName} {student.lastName}
                                </td>
                                <td>{student.registrationNumber}</td>
                                <td className="text-center">
                                  <input type="checkbox" name="checked" id="" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Formik>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => {
                      history.goBack();
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

export default Attendance;
