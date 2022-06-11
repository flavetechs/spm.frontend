import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { getActiveSession } from "../../store/actions/session-actions";
import {
  fetchSingleSessionClass,
  getAllActiveSubjects,
  getAllClassStudents,
  getAllSessionClasses,
} from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import { getAllStudents } from "../../store/actions/student-actions";
import StudentList from "../smp-students/student-list";

const ScoreEntry = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const [item, setItem] = useState({ sessionClassId: "", sessionClass: "" });
  const [subjectId, setSubjectId] = useState("");
  const [viewTable, setViewTable] = useState(false);
  const [editButtonClick, setEditButtonClick] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { itemList, activeSubjects, classSubjects, classStudents } =state.class;
  const { activeSession } = state.session;
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA
  Yup.addMethod(Yup.string, "classUnavailable", function (errorMessage) {
    return this.test(`test-class-availability`, errorMessage, function (value) {
      const { path, createError } = this;

      return (
        singleClassSubject.length !== 0 ||
        createError({ path, message: errorMessage })
      );
    });
  });
  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
    subjectId: Yup.string()
      .required("Subject is required")
      .classUnavailable("Class selected does not offer this subject"),
  });
  //VALIDATION SCHEMA
  const singleClassSubject = classSubjects.filter(
    (item) => item.subjectId === subjectId
  );

  React.useEffect(() => {
    fetchSingleSessionClass(item.sessionClassId)(dispatch);
    getActiveSession()(dispatch);
    getAllActiveSubjects()(dispatch);
    getAllClassStudents(item.sessionClassId)(dispatch);
  }, [item.sessionClassId]);

  React.useEffect(() => {
    getAllSessionClasses(activeSession?.sessionId)(dispatch);
  }, [activeSession]);

  console.log("classSubjects", classStudents);
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
             <Card.Header>
                 <h6>SCORE ENTRY</h6>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionClassId: "",
                    subjectId: "",
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    setViewTable(true);
                  }}
                >
                  {({
                    handleSubmit,
                    values,
                    setFieldValue,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <Form>
                      <Row>
                        <Col md="6">
                          {touched.sessionClassId && errors.sessionClassId && (
                            <div className="text-danger">
                              {errors.sessionClassId}
                            </div>
                          )}
                        </Col>
                        <Col md="6">
                          {touched.subjectId && errors.subjectId && (
                            <div className="text-danger">
                              {errors.subjectId}
                            </div>
                          )}
                        </Col>
                        <Col md="6" className="form-group">
                          <label
                            className="form-label"
                            htmlFor="sessionClassId"
                          >
                            Class:
                          </label>
                          <Field
                            as="select"
                            name="sessionClassId"
                            className="form-select"
                            id="sessionClassId"
                            onChange={(e) => {
                              setFieldValue("sessionClassId", e.target.value);
                              setItem({
                                sessionClassId: e.target.value,
                                sessionClass:
                                  e.target.selectedOptions[0].getAttribute(
                                    "data-tag"
                                  )
                              });
                              setViewTable(false);
                            }}
                          >
                            <option value="">Select Class</option>
                            {itemList.map((list, idx) => (
                              <option
                                key={idx}
                                name={values.sessionClassId}
                                value={list.sessionClassId}
                                data-tag={list.class}
                              >
                                {list.class}
                              </option>
                            ))}
                          </Field>
                        </Col>
                        <Col md="6" className="form-group">
                          <label className="form-label" htmlFor="subjectId">
                            Subject:
                          </label>
                          <Field
                            as="select"
                            name="subjectId"
                            className="form-select"
                            id="subjectId"
                            onChange={(e) => {
                              setFieldValue("subjectId", e.target.value);
                              setSubjectId(e.target.value);
                              setViewTable(false);
                            }}
                          >
                            <option value="">Select Subject</option>
                            {activeSubjects.map((subject, idx) => (
                              <option
                                key={idx}
                                name={values.subjectId}
                                value={subject.lookupId}
                              >
                                {subject.name}
                              </option>
                            ))}
                          </Field>
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          className="btn-sm"
                          variant="btn btn-primary"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          View
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
                {viewTable && (
                  <div>
                    <Row className="pt-3">
                      {singleClassSubject.length === 0 ? (
                        <div className="h6">
                          Class selected does not offer this subject
                        </div>
                      ) : (
                        <Table responsive bordered size="sm" className="w-50">
                          {singleClassSubject.map((subject, idx) => (
                            <tbody key={idx}>
                              <tr>
                                <th className="h6">Class Name</th>
                                <td>{item.sessionClass}</td>
                              </tr>
                              <tr>
                                <th className="h6">Subject Name</th>
                                <td>{subject.subjectName}</td>
                              </tr>
                              <tr>
                                <th className="h6">Subject Teacher</th>
                                <td>{subject.subjectTeacherName}</td>
                              </tr>
                              <tr>
                                <th className="h6">Test Score</th>
                                <td>{subject.assessment}</td>
                              </tr>
                              <tr>
                                <th className="h6">Exam Score</th>
                                <td>{subject.examSCore}</td>
                              </tr>
                            </tbody>
                          ))}
                        </Table>
                      )}
                    </Row>

                    <Row className="pt-3">
                    <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          className="btn-sm mx-2"
                          variant="btn btn-success"
                          onClick={() => {
                            setEditButtonClick(!editButtonClick)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          className="btn-sm"
                          variant="btn btn-primary"
                          onClick={() => {
                            
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          className="btn-sm mx-2"
                          variant="btn btn-warning"
                          onClick={() => {
                            
                          }}
                        >
                          Preview
                        </Button>
                      </div>

                      <Formik
                  initialValues={{
                    examScore: "",
                    asessment: "",
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    setViewTable(true);
                  }}
                >
                  {({
                    handleSubmit,
                    values,
                    setFieldValue,
                    touched,
                    errors,
                    isValid,
                  }) => (
                      <Table size="md" bordered responsive className="mt-2">
                        <thead>
                          <tr className="text-center">
                            <td className="text-uppercase h6">S/No</td>
                            <td className="text-uppercase h6">Students Full Name</td>
                            <td className="text-uppercase h6">Student Registration No</td>
                            <td className="text-uppercase h6">Assessment score</td>
                            <td className="text-uppercase h6">Exam score</td>
                          </tr>
                        </thead>
                        <tbody>
                          {!editButtonClick ? classStudents?.map((student, index) => (
                            <tr key={index} className="text-center">
                              <td className="">{index + 1}</td>
                              <td className="fw-bold">{student.firstName} {student.lastName}</td>
                              <td className="fw-bold">{student.registrationNumber}</td>
                              <td className="fw-bold">{student.assessment}</td>
                              <td className="fw-bold">{student.examScore}</td>
                            </tr>
                          )):
                          classStudents?.map((student, index) => (
                          <tr key={index} className="text-center">
                          <td className="">{index + 1}</td>
                          <td className="" ><input type="text" defaultValue={`${student.firstName} ${student.lastName}`}/></td>
                          <td className=""><input type="text" defaultValue={student.registrationNumber}/></td>
                          <td className=""><Field className="w-50" type="number" name="assessment"
                           defaultValue={student.assessment} onChange={(e)=>{setFieldValue("examScore",100 - e.target.value)}}/></td>
                          <td className=""><Field className="w-50"  type="number"  name="examScore"
                          defaultValue={student.examScore} onChange={(e)=>{setFieldValue("assessment",100 - e.target.value)}}/></td>
                        </tr>
                          ))}
                        </tbody>
                      </Table>
                       )}
                       </Formik>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ScoreEntry;
