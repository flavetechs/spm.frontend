import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  createSessionClass,
  getAllClasses,
  getAllSubjects,
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
  const { isSuccessful, message, itemList, teacherList } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllClasses()(dispatch);
  }, []);

  if (isSuccessful) {
    history.push(classLocations.sessionClassList);
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
                    endDate: itemList.lookupId,
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
                          <select
                            className="form-select"
                            id="exampleFormControlSelect1"
                          >
                            <option disabled selected>
                              Select Class
                            </option>
                            {itemList.map((item) => (
                              <option>{item.name}</option>
                            ))}
                          </select>
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
                          <select
                            className="form-select"
                            id="exampleFormControlSelect1"
                          ><option disabled selected>
                          Select Teacher
                        </option>
                        {teacherList.map((item) => (
                              <option>{item.firstName} {item.lastName}</option>
                            ))}
                          </select>
                        </div>
                      </Col>

                      <Col lg="12">
                        <div className="form-group">
                          {touched.name && errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                          <label htmlFor="name" className="form-label">
                            {" "}
                            Subject
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            aria-describedby="name"
                            required
                            placeholder=" "
                          />
                        </div>
                      </Col>

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
