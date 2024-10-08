import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import "./class-setup.scss"
import { updateSubject } from "../../../store/actions/class-actions";

const SubjectSetupEdit = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedItem, isSuccessful, message } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(selectedItem?.isActive);
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(2, "Subject Name Too Short!")
      .required("Subject is required"),
  });
  //VALIDATIONS SCHEMA

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const subjectId = queryParams.get("subjectId");
    if (!subjectId) return;
  }, [locations.search]);

  if (isSuccessful || !selectedItem) {
    history.push(sessionLocations.subjectSetupList);
  }

  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body>
                <Formik
                  initialValues={{
                    name: selectedItem?.name,
                    isActive: selectedItem?.isActive,
                    lookupId: selectedItem?.lookupId,
                  }}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    values.name = values.name.toUpperCase();
                    values.isActive = isChecked;
                    updateSubject(values)(dispatch);
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

                      <Col lg="12" className="d-flex justify-content-between">
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
                          onClick={() => history.goBack()}
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

export default SubjectSetupEdit;
