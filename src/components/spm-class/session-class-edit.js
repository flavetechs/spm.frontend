import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  updateSessionClass,
  buildClassSubjectArray,
  getAllActiveClasses,
  getAllActiveSubjects,
  getAllTeachers,
  getAllSessionClasses,
} from "../../store/actions/class-actions";

const SessionClassEdit = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    classId: Yup.string().required("Class is required"),
    // subjectId: Yup.string()
    // .required('Subject is required'),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    isSuccessful,
    message,
    itemList,
    selectedItem,
    teacherList,
    activeSubjects,
    activeClasses,
    classSubjects,
    fetchSingleSessionClass,
  } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  //USE STATE VARIABLE DECLARATION
  const [disableSubjectSelect, setDisableSubjectSelect] = React.useState(
    new Array(activeSubjects.length).fill(false)
  );
  //USE STATE VARIABLE  DECLARATION

  console.log("classSubjects", classSubjects);
  console.log("select", selectedItem);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const sessionClassId = queryParams.get("sessionClassId");
    if (!sessionClassId) return;
  }, []);

  React.useEffect(() => {
    getAllSessionClasses()(dispatch);
    getAllActiveClasses()(dispatch);
    getAllTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
  }, []);

  React.useLayoutEffect(() => {
    setDisableSubjectSelect(new Array(activeSubjects.length).fill(false));
  }, [activeSubjects]);

  if (isSuccessful) {
    history.push(classLocations.sessionClassList);
  }

  //HANDLER FUNCTIONS
  const handleSubjectCheckAndTeacherSelect = (position) => {
    const updatedCheckedState = disableSubjectSelect.map((item, index) =>
      index === position ? !item : item
    );
    setDisableSubjectSelect(updatedCheckedState);
  };
  const getSubjectId = (event, subjectId) => {
    const checkBoxValue = event.target.checked;
    buildClassSubjectArray(
      subjectId,
      "",
      classSubjects,
      checkBoxValue
    )(dispatch);
  };

  const getSubjectTeacherId = (subjectId, subjectTeacherId) => {
    buildClassSubjectArray(
      subjectId,
      subjectTeacherId,
      classSubjects
    )(dispatch);
  };

  //HANDLER FUNCTIONS

  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionId: selectedItem?.sessionId,
                    classId: selectedItem?.classId,
                    formTeacherId: selectedItem?.formTeacherId,
                  }}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    values.classSubjects = classSubjects;
                    console.log("values", values);
                    // updateSessionClass(values)(dispatch);
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    setFieldValue,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      <Col lg="12">
                        <div className="form-group">
                          <label htmlFor="sessionId" className="form-label">
                            {" "}
                            Session{" "}
                          </label>
                          {itemList.map((session, idx) => (
                            <Field
                              type="text"
                              className="form-control"
                              name="sessionId"
                              id="sessionId"
                              aria-describedby="sessionId"
                              value="2021/2022"
                              readOnly
                            />
                          ))}
                        </div>
                      </Col>

                      <div className="d-flex row justify-content-between">
                        <Col lg="6">
                          <div className="form-group">
                            {touched.classId && errors.classId && (
                              <div className="text-danger">
                                {errors.classId}
                              </div>
                            )}
                            <label htmlFor="classId" className="form-label">
                              {" "}
                              Class
                            </label>
                            <Field
                              as="select"
                              name="classId"
                              className="form-select"
                              id="classId"
                            >
                              <option defaultValue="Select Teacher">
                                Select Class
                              </option>
                              {activeClasses.map((item, idx) => (
                                <option
                                  key={idx}
                                  name={values.classId}
                                  selected={selectedItem?.classId}
                                  value={item.lookupId}
                                  id={item.lookupId}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>

                        <Col lg="6">
                          <div className="form-group">
                            <label
                              htmlFor="formTeacherId"
                              className="form-label"
                            >
                              {" "}
                              Form Teacher
                            </label>
                            <Field
                              as="select"
                              name="formTeacherId"
                              className="form-select"
                              id="formTeacherId"
                            >
                              <option defaultValue="">
                                Select Form Teacher
                              </option>
                              {teacherList.map((item, idx) => (
                                <option
                                  id={item.userAccountId}
                                  key={idx}
                                  name={values.formTeacherId}
                                  value={item.userAccountId}
                                  selected={selectedItem?.formTeacherId}
                                >
                                  {item.userName}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </Col>
                      </div>

                      {touched.classId && errors.subjectId && (
                        <div className="text-danger">{errors.subjectId}</div>
                      )}
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Subject Teacher</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeSubjects.map((subject, idx) => (
                            <tr key={idx}>
                              <td>
                                {" "}
                                <Field
                                  type="checkbox"
                                  id="subjectId"
                                  name="subjectId"
                                  className="form-check-input"
                                  checked={disableSubjectSelect[idx]}
                                  onChange={(e) => {
                                    handleSubjectCheckAndTeacherSelect(idx);
                                    getSubjectId(e, subject.lookupId);
                                  }}
                                />{" "}
                                {subject.name}
                              </td>
                              <td>
                                <select
                                  name="subjectTeacherId"
                                  className="form-select"
                                  id="subjectTeacherId"
                                  disabled={
                                    disableSubjectSelect[idx] ? false : true
                                  }
                                  onChange={(e) => {
                                    getSubjectTeacherId(
                                      subject.lookupId,
                                      e.target.value
                                    );
                                  }}
                                >
                                  <option value="Select Teacher">
                                    Select Teacher
                                  </option>

                                  {teacherList.map((teacher, id) => (
                                    <option
                                      key={id}
                                      id={teacher.userAccountId}
                                      value={teacher.userAccountId}
                                      selected={
                                        disableSubjectSelect[idx]
                                          ? teacher.userName
                                          : null
                                      }
                                    >
                                      {teacher.userName}
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
                          onClick={() => {
                            handleSubmit();
                          }}
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

export default SessionClassEdit;
