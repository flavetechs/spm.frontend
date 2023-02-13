import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";

const StudentRegNoSetting = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [editButton, setEditButton] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [disable, setDisable] = useState(true);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { schoolSetting } = state.portal;
  const { countries, states } = state.student;
  // ACCESSING STATE FROM REDUX STORE
  React.useEffect(() => {
    setSaveButton(true);
    setEditButton(false);
    setDisable(true);
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          studentRegNoPrefix: "",
          studentRegNoSufix: "",
          teacherRegNoPrefix: "",
          teacherRegNoSufix: "",
          regNoPosition: 0,
          regNoSeperator: "",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setSaveButton(!saveButton);
          setEditButton(!editButton);
          setDisable(true);
          //  updateSchoolSetting(values, params)(dispatch);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Row className="">
            <Card.Body>
              <div>
                <div className="">
                  <div className=" d-flex justify-content-between d-flex justify-content-between mb-4">
                    {" "}
                    <div className="header-title">
                      <h4 className="">
                        <b>Student Registration Number Setup</b>
                      </h4>
                    </div>{" "}
                  </div>{" "}
                  <div className="new-user-info">
                    <Form>
                      <div className="row ">
                        <div className="col-md-6">
                          <div className="col-md-12 form-group">
                            <label className="form-label">
                              <b>Prefix: </b>
                            </label>
                            <Field
                              disabled={disable}
                              placeholder="e.g MSSN"
                              type="text"
                              id="prefix"
                              name="prefix"
                              className="form-control"
                            />
                          </div>
                          <div className="col-md-12 form-group">
                            <label
                              className="form-label"
                              htmlFor="schoolAbbreviation"
                            >
                              <b>Suffix: </b>
                            </label>
                            <Field
                              disabled={disable}
                              placeholder="e.g ABC"
                              type="text"
                              id="suffix"
                              name="suffix"
                              className="form-control"
                            />
                          </div>

                          <div className="col-md-12  form-group">
                            <label className="form-label">
                              <b>Separator:</b>
                            </label>
                            <Field
                              disabled={disable}
                              as="select"
                              name="separator"
                              className="form-select"
                              id="separator"
                              onChange={(e) => {
                                setFieldValue("separator", e.target.value);
                              }}
                            >
                              <option value="Select Separator">
                                Select Separator
                              </option>
                              <option>/</option>
                              <option>\</option>
                              <option>-</option>
                              <option>_</option>
                              <option>.</option>
                            </Field>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="fw-bold">Preview</div>
                          <p>
                            Below is how student registration number for your
                            school will look like
                          </p>
                          <div className=" border rounded p-3">{values.prefix ? values.prefix + "/0001/ABC" : values.suffix ? "MSSN/0001/" + values.suffix :values.prefix && values.suffix ? values.prefix + "/0001/" + values.suffix:"MSSN/0001/ABC" }</div>
                        </div>
                      </div>

                      <div className="row"></div>
                      <div className="d-flex mt-4 justify-content-end">
                        {saveButton ? (
                          <Button
                            type="button"
                            variant="btn btn-primary mx-2"
                            onClick={() => {
                              setSaveButton(!saveButton);
                              setEditButton(!editButton);
                              setDisable(!disable);
                            }}
                          >
                            CLICK TO EDIT
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="btn btn-danger mx-2"
                            onClick={handleSubmit}
                          >
                            Save Changes
                          </Button>
                        )}
                      </div>
                    </Form>
                  </div>{" "}
                </div>
              </div>
            </Card.Body>{" "}
          </Row>
        )}
      </Formik>
    </>
  );
};

export default StudentRegNoSetting;
