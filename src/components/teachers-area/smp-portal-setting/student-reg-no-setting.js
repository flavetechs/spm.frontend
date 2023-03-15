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
  const [preview, setPreview] = useState("0001");
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

  React.useEffect(() => {
    studRegNoSettings && setPreview(studRegNoSettings?.studentRegNoFormat)
  }, [studRegNoSettings]);

  const handlePositionChange = (prefix,separator,suffix,position) => {
if(position == 1) {
 prefix && !suffix ? setPreview("0001" + separator + prefix) :
 !prefix && suffix ? setPreview("0001" + separator + suffix) :
 prefix && suffix ? setPreview("0001" + separator + prefix + separator + suffix) :
 setPreview("0001") 
} 
if(position == 2) {
  prefix && !suffix ? setPreview(prefix + separator + "0001") :
  !prefix && suffix ? setPreview("0001" + separator + suffix) :
  prefix && suffix ? setPreview(prefix + separator + "0001"+ separator + suffix) :
  setPreview("0001") 
 } 
 if(position == 3) {
  prefix && !suffix ? setPreview(prefix + separator + "0001") :
  !prefix && suffix ? setPreview(suffix + separator  +"0001") :
  prefix && suffix ? setPreview(prefix + separator +  suffix + separator  + "0001") :
  setPreview("0001") 
 } 
  }

const prefix =studRegNoSettings?.regNoPosition  == 1 ? studRegNoSettings?.studentRegNoFormat?.split(studRegNoSettings?.regNoSeperator)[1]:
studRegNoSettings?.studentRegNoFormat?.split(studRegNoSettings?.regNoSeperator)[0]


const suffix = studRegNoSettings?.regNoPosition  == 3 ? studRegNoSettings?.studentRegNoFormat?.split(studRegNoSettings?.regNoSeperator)[1]:
studRegNoSettings?.studentRegNoFormat?.split(studRegNoSettings?.regNoSeperator)[2]


  return (
    <>
      <Formik
        initialValues={{
          studentRegNoPrefix: prefix || "",
          studentRegNoSufix:  suffix ||"",
          teacherRegNoPrefix:"",
          teacherRegNoSufix: "",
          regNoPosition: studRegNoSettings?.regNoPosition||2,
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
          <Row className=""id="studregnoSetting">
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
                              onChange={(e)=>{
                                setFieldValue("studentRegNoPrefix",e.target.value)
                             handlePositionChange(e.target.value,values.regNoSeperator,values.studentRegNoSufix,values.regNoPosition)
                              }}
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
                                handlePositionChange(values.studentRegNoPrefix,e.target.value,values.studentRegNoSufix,values.regNoPosition)
                              }}
                            >
                              <option value="">
                                Select Separator
                              </option>
                              <option>/</option>
                              <option>\</option>
                              <option>-</option>
                              <option>_</option>
                              <option>.</option>
                            </Field>
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
                              onChange={(e) => {
                                setFieldValue("studentRegNoSufix", e.target.value);
                                handlePositionChange(values.studentRegNoPrefix,values.regNoSeperator,e.target.value,values.regNoPosition)
                              }}
                            />
                          </div>

                          <div className="col-md-12  form-group">
                            <label className="form-label">
                              <b>Position:</b>
                            </label>
                            <Field
                              disabled={disable}
                              as="select"
                              name="regNoPosition"
                              className="form-select"
                              id="regNoPosition"
                              onChange={(e) => {
                                setFieldValue("regNoPosition", e.target.value);
                                handlePositionChange(values.studentRegNoPrefix,values.regNoSeperator,values.studentRegNoSufix,e.target.value)
                              
                              }}
                            >
                            
                              <option value={1} selected={values.regNoPosition}>Left</option>
                              <option value={2} selected={values.regNoPosition}>Center</option>
                              <option value={3} selected={values.regNoPosition}>Right</option>
                            </Field>
                          </div>

                        </div>
                        <div className="col-md-6">
                          <div className="fw-bold">Preview</div>
                          <p>
                            Below is how student registration number for your
                            school will look like
                          </p>
                          <div className=" border rounded p-3">{preview?.replace("%VALUE%","0001")}</div>
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
