import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { getStudentRegNo, updateStudentRegNo } from "../../../store/actions/portal-setting-action";

const StudentRegNoSetting = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [editButton, setEditButton] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [disable, setDisable] = useState(true);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studRegNoSettings } = state.portal;
  // ACCESSING STATE FROM REDUX STORE
  React.useEffect(() => {
    getStudentRegNo()(dispatch)
    setSaveButton(true);
    setEditButton(false);
    setDisable(true);
  }, [dispatch]);
console.log("StudRegNoSettings",studRegNoSettings);
  return (
    <>
      <Formik
        initialValues={{
          studentRegNoPrefix: studRegNoSettings?.studentRegNoFormat?.split(studRegNoSettings?.regNoSeperator)[0] || "",
          studentRegNoSufix: studRegNoSettings?.studentRegNoFormat?.split(studRegNoSettings?.regNoSeperator)[1] ||"",
          teacherRegNoPrefix:"",
          teacherRegNoSufix: "",
          regNoPosition: 0,
          regNoSeperator: studRegNoSettings?.regNoSeperator||"",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          setSaveButton(!saveButton);
          setEditButton(!editButton);
          setDisable(true);
          updateStudentRegNo(values)(dispatch);
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
                              id="studentRegNoPrefix"
                              name="studentRegNoPrefix"
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
                              id="studentRegNoSufix"
                              name="studentRegNoSufix"
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
                              name="regNoSeperator"
                              className="form-select"
                              id="regNoSeperator"
                              onChange={(e) => {
                                setFieldValue("regNoSeperator", e.target.value);
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
                          <div className=" border rounded p-3">{values.studentRegNoPrefix + values.regNoSeperator + "0001"+ values.regNoSeperator + values.studentRegNoSufix}</div>
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
