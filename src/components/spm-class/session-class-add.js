import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  createSessionClass,
  getAllClasses,
  getAllActiveSubjects,
  getAllTeachers,
} from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";

const SessionClassAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(2, "Input is Too Short!")
      .required("Input is required"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message, itemList, teacherList, activeSubjects } =
    state.class;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllClasses()(dispatch);
    getAllTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
  }, []);

  if (isSuccessful) {
    history.push(classLocations.sessionClassList);
  }

  const [disableSubjectSelect, setDisableSubjectSelect] = useState( new Array(activeSubjects.length).fill(false));

  const checkSingleSubject = (position) => {
    const updatedCheckedState = disableSubjectSelect.map((item, index) =>
      index === position ? !item : item
    );
    setDisableSubjectSelect(updatedCheckedState)
  }
 
    

  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    startDate: itemList.name,
                    endDate: teacherList.lastName,
                  }}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    console.log(values);
                    createSessionClass(values)(dispatch);
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      <Col lg="12">
                        <div className="form-group">
                          {touched.startDate && errors.startDate && (
                            <div className="text-danger">
                              {errors.startDate}
                            </div>
                          )}
                          <label htmlFor="name" className="form-label">
                            {" "}
                            Class
                          </label>
                          <Form.Control as="select" id="formControlSelect2">
                            <option selected value="">
                              Select Class
                            </option>
                            {itemList.map((item, idx) => (
                              <option key={idx} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                      </Col>

                      <Col lg="12">
                        <div className="form-group">
                          {touched.endDate && errors.endDate && (
                            <div className="text-danger">{errors.endDate}</div>
                          )}
                          <label htmlFor="name" className="form-label">
                            {" "}
                            Form Teacher
                          </label>
                          <Form.Control as="select" id="formControlSelect2">
                            <option selected value="">
                              Select Teacher
                            </option>
                            {teacherList.map((item, idx) => (
                              <option
                                key={idx}
                                value={`${item.firstName} ${item.lastName}`}
                              >
                                {item.firstName} {item.lastName}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                      </Col>
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Subject Teacher</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSubjects.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                {" "}
                                <input
                                  type="checkbox"
                                  id="customCheck1"
                                  className="form-check-input"
                                  checked={disableSubjectSelect[idx]}
                                  onChange={() => {
                                    checkSingleSubject(idx)
                                  }}
                                />
                                {" "}{item.name}
                              </td>
                              <td><select className="form-select" id={item.lookupId} disabled={disableSubjectSelect[idx]?false : true}>
                              <option selected value="">
                                Select Teacher
                              </option>
                              {teacherList.map((i, idx) => (
                                <option
                                  key={idx}
                                  value={`${i.firstName} ${i.lastName}`}
                                >
                                  {i.firstName} {i.lastName}
                                </option>
                                ))}
                                  </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

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

export default SessionClassAdd;
