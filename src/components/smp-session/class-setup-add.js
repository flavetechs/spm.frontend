import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import "./class-setup.scss"

import { createClass } from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { getPreviousGrades } from "../../store/actions/grade-setting-actions";

const ClassSetupAdd = () => {
  //VARIABLE DECLARATIONS
  const [isChecked, setIsChecked] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(2, "Class Name Too Short!")
      .required("Class is required"),
    gradeLevelId: Yup.string()
      .min(2, "Grade Level Too Short!")
      .required("Grade Level is required"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message } = state.class;
  const { prevGradesList } = state.grade;
  // ACCESSING STATE FROM REDUX STORE

  if (isSuccessful) {
    history.push(sessionLocations.classSetupList);
  }

  React.useEffect(() => {
    getPreviousGrades()(dispatch);
  }, []);

  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Add New Class</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    name: "",
                    isActive: true,
                    gradeLevelId: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    values.isActive = isChecked;
                    values.name = values.name.toUpperCase();
                    createClass(values)(dispatch);
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
                          {touched.name && errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                          <label htmlFor="name" className="form-label">
                            {" "}
                            <b>Name</b>
                          </label>
                          <Field
                            type="text"
                            className="form-control text-dark"
                            name="name"
                            id="name"
                            aria-describedby="name"
                            required
                            placeholder=" Enter class name e.g SS1"
                          />
                        </div>
                      </Col>

                      <Col lg="12">
                        <div className="form-group">
                          {touched.gradeLevelId && errors.gradeLevelId && (
                            <div className="text-danger">
                              {errors.gradeLevelId}
                            </div>
                          )}
                          <label htmlFor="gradeLevelId" className="form-label">
                            {" "}
                            <b>Grade Level</b>
                          </label>
                          <Field
                            as="select"
                            className="form-select text-dark"
                            name="gradeLevelId"
                            id="gradeLevelId"
                            aria-describedby="gradeLevelId"
                          >
                            <option value="">Select Grade Level</option>
                            {prevGradesList.map((list, id) => (
                              <option key={id} value={list.gradeGroupId}>
                                {list.gradeGroupName}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </Col>

                      <Col lg="6" className="d-flex justify-content-between">
                        <div className="form-check mb-3 form-Check">
                          <Field
                            type="checkbox"
                            id="customCheck1"
                            className="form-check-input"
                            checked={isChecked}
                            onChange={(e) => {
                              setIsChecked(!isChecked);
                            }}
                          />
                          <label htmlFor="customCheck1" className="check-label">
                            isActive{" "}
                          </label>
                        </div>
                      </Col>
                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          variant="btn btn-danger mx-2"
                          onClick={() => {
                            history.push(sessionLocations.classSetupList);
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

export default ClassSetupAdd;
