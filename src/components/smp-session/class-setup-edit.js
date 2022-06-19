import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { updateClass } from "../../store/actions/class-actions";
import { getPreviousGrades } from "../../store/actions/grade-setting-actions";

const ClassSetupEdit = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedItem, isSuccessful, message } = state.class;
  const { prevGradesList } = state.grade;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const [isChecked, setIsChecked] = useState(selectedItem?.isActive);
  const history = useHistory();
  const locations = useLocation();
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

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const classId = queryParams.get("classId");
    if (!classId) return;
  }, []);

  if (isSuccessful || !selectedItem) {
    history.push(sessionLocations.classSetupList);
  }

  React.useEffect(() => {
    getPreviousGrades()(dispatch);
  }, []);

  return (
    <>
      <div className="col-6 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body>
                <Formik
                  initialValues={{
                    name: selectedItem?.name,
                    isActive: selectedItem?.isActive,
                    lookupId: selectedItem?.lookupId,
                    gradeLevelId: selectedItem?.gradeLevelId.toLowerCase(),
                  }}
                  enableReinitialize={true}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    values.isActive = isChecked;
                    updateClass(values)(dispatch);
                  }}
                >
                  {({
                    setFieldValue,
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
                            Name
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
                              type="select"
                              name="gradeLevelId"
                              className="form-select"
                              id="gradeLevelId"
                              value={values.gradeLevelId}
                            >

                              <option value="grade level">Select Grade Level</option>
                              {prevGradesList.map((list, idx) => (
                                <option
                                   key={idx}
                                  value={list.gradeGroupId}  
                                >
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
                        </Button>
                        {"  "}
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

export default ClassSetupEdit;
