import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
  createSessionClass,
  classSubjectsIds,
  getAllActiveClasses,
  getAllActiveSubjects,
  getAllTeachers,
  getAllSessionClasses,
} from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";

const SessionClassAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
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
    teacherList,
    activeSubjects,
    activeClasses,
    classSubjects,
  } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  //USE STATE VARIABLE DECLARATION
  const [disableSubjectSelect, setDisableSubjectSelect] = useState(
    new Array(activeSubjects.length).fill(false)
  );
  //USE STATE VARIABLE  DECLARATION
  React.useEffect(() => {
    getAllSessionClasses()(dispatch);
    getAllActiveClasses()(dispatch);
    getAllTeachers()(dispatch);
    getAllActiveSubjects()(dispatch);
  }, []);

  React.useLayoutEffect(() => {
    setDisableSubjectSelect(new Array(activeSubjects.length).fill(false));
  }, [activeSubjects]);

  console.log("active:", activeSubjects);
  console.log("activity:", disableSubjectSelect);
  if (isSuccessful) {
    history.push(classLocations.sessionClassList);
  }

  const checkSingleSubject = (position) => {
    const updatedCheckedState = disableSubjectSelect.map((item, index) =>
      index === position ? !item : item
    );
    setDisableSubjectSelect(updatedCheckedState);
  };
  const getSubjectId = (subjectId,classSubjects) => {
    const subjectTeacherId = "";
    classSubjectsIds(subjectId,subjectTeacherId,classSubjects)(dispatch);
    console.log("subjectid",subjectTeacherId, subjectId);
  };
  const getSubjectTeacherId = (subjectId, subjectTeacherId, classSubjects) => {
classSubjects.find(item => {
  if (item.subjectId === subjectId) {
    item.subjectTeacherId = subjectTeacherId;
  }
});
    classSubjectsIds(subjectId, subjectTeacherId, classSubjects)(dispatch);
    console.log("classSubjectidd", subjectId, subjectTeacherId, classSubjects);
  };

  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionId: "",
                    classId: "",
                    formTeacherId: "",
                    /*  classSubjects: [
                      {
                        subjectId: '',
                    subjectTeacherId:''
                     }
                   ]*/
                  }}
                  // validationSchema={validation}
                  onSubmit={(values) => {
                    console.log("values", values);
                    values.classSubjects = classSubjects;
                    // createSessionClass(values)(dispatch);
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
                          <label htmlFor="sessionId" className="form-label">
                            {" "}
                            Session{" "}
                          </label>
                          {itemList.map((item, idx) => (
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
                              <option defaultValue="Select Class">
                                Select Class
                              </option>
                              {activeClasses.map((item, idx) => (
                                <option key={idx} value={item.lookupId}>
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
                              <option defaultValue="Select Teacher">
                                Select Teacher
                              </option>
                              {teacherList.map((item, idx) => (
                                <option
                                  id={item.userAccountId}
                                  key={idx}
                                  value={item.userAccountId}
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
                          {activeSubjects.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                {" "}
                                <Field
                                  type="checkbox"
                                  id="subjectId"
                                  name="subjectId"
                                  className="form-check-input"
                                  checked={disableSubjectSelect[idx]}
                                  onChange={() => {
                                    checkSingleSubject(idx);
                                    getSubjectId(item.lookupId,classSubjects);
                                  }}
                                />{" "}
                                {item.name}
                              </td>
                              <td>
                                <select
                                  name="subjectTeacherId"
                                  className="form-select"
                                  id="subjectTeacherId"
                                  disabled={
                                    disableSubjectSelect[idx] ? false : true
                                  }
                                >
                                  <option value="Select Teacher">
                                    Select Teacher
                                  </option>
                                  {teacherList.map((i, id) => (
                                    <option
                                      key={id}
                                      id={i.userAccountId}
                                      value={i.userAccountId}
                                      selected={
                                        disableSubjectSelect[idx]
                                          ? i.userName
                                          : null
                                      }
                                      onChange={() => {
                                        getSubjectTeacherId(
                                          item.lookupId,
                                          i.userAccountId,
                                          classSubjects
                                        );
                                        console.log(
                                          "checkSubjectIds",
                                          item.lookupId,
                                          i.userAccountId,
                                          classSubjects
                                        );
                                      }}
                                    >
                                      {i.userName}
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
                            alert("ok");
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

export default SessionClassAdd;
