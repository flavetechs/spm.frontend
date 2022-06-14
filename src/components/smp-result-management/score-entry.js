import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  getAllClassScoreEntries,
  getAllStaffClasses,
  getStaffClassSubjects,
} from "../../store/actions/results-actions";

const ScoreEntry = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const [item, setItem] = useState({ sessionClassId: "", sessionClass: "" });
  const [subjectId, setSubjectId] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [viewTable, setViewTable] = useState(false);
  const [editClick, setEditClick] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffClasses, staffClassSubjects, scoreEntries } = state.results;
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA
  Yup.addMethod(Yup.string, "classUnavailable", function (errorMessage) {
    return this.test(`test-class-availability`, errorMessage, function (value) {
      const { path, createError } = this;

      return (
        item.sessionClassId != "" ||
        createError({ path, message: errorMessage })
      );
    });
  });
  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
    subjectId: Yup.string()
      .classUnavailable("Kindly select class first")
      .required("Subject is required"),
  });
  //VALIDATION SCHEMA
  React.useEffect(() => {
    //fetchSingleSessionClass(item.sessionClassId)(dispatch);
    getAllStaffClasses()(dispatch);
    getStaffClassSubjects(item.sessionClassId)(dispatch);
    getAllClassScoreEntries(item.sessionClassId)(dispatch);
  }, [item.sessionClassId]);

  console.log("classSubjects", scoreEntries);
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
                                  ),
                              });
                              setViewTable(false);
                            }}
                          >
                            <option value="">Select Class</option>
                            {staffClasses.map((list, idx) => (
                              <option
                                key={idx}
                                name={values.sessionClassId}
                                value={list.sessionClassId}
                                data-tag={list.sessionClass}
                              >
                                {list.sessionClass}
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
                            {staffClassSubjects?.map((subject, idx) => (
                              <option
                                key={idx}
                                name={values.subjectId}
                                value={subject.subjectId}
                              >
                                {subject.subjectName}
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
                      <Table responsive bordered size="sm" className="w-50">
                        {scoreEntries?.filter(entry => entry.subjectId == subjectId).map((subject, idx) => (
                          <tbody key={idx}>
                            <tr>
                              <th className="h6">Class Name</th>
                              <td>{subject.sessionClassName}</td>
                            </tr>
                            <tr>
                              <th className="h6">Subject Name</th>
                              <td>{subject.subjectName}</td>
                            </tr>
                            <tr>
                              <th className="h6">Subject Teacher</th>
                              <td>{subject.subjectTeacher}</td>
                            </tr>
                            <tr>
                              <th className="h6">Test Score</th>
                              <td>{subject.assessmentScore}</td>
                            </tr>
                            <tr>
                              <th className="h6">Exam Score</th>
                              <td>{subject.examsScore}</td>
                            </tr>
                          </tbody>
                        ))}
                      </Table>
                    </Row>

                    <Row className="pt-3">
                      <div className="d-flex justify-content-end">
                    
                        <Button
                          type="button"
                          className="btn-sm"
                          variant="btn btn-primary"
                          onClick={() => {}}
                        >
                          Save
                        </Button>
                        <Button
                          type="button"
                          className="btn-sm mx-2"
                          variant="btn btn-success"
                          onClick={() => {}}
                        >
                          Preview
                        </Button>
                      </div>

                      <Formik
                        initialValues={{ examScore: 0, assessment: 0 }}
                        validationSchema={validation}
                        enableReinitialize={true}
                        onSubmit={(values) => {}}
                      >
                        {({
                          handleSubmit,
                          values,
                          setFieldValue,
                          touched,
                          errors,
                          isValid,
                        }) => (
                          <Table
                            size="md"
                            hover
                            bordered
                            responsive
                            className="mt-2"
                          >
                            <thead>
                              <tr className="text-center">
                                <td className="text-uppercase h6">S/No</td>
                                <td className="text-uppercase h6">
                                  Students Full Name
                                </td>
                                <td className="text-uppercase h6">
                                  Student Registration No
                                </td>
                                <td className="text-uppercase h6">
                                  Assessment score
                                </td>
                                <td className="text-uppercase h6">
                                  Exam score
                                </td>
                                <td className="text-uppercase h6">
                                  Is Offered
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {!editClick
                                ? scoreEntries?.filter(entry => entry.subjectId == subjectId)
                                .map((entry, idx)=>(
                                  entry.classScoreEntries.map((list, index) => (
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id="button-tooltip-2">
                                          double click to edit
                                        </Tooltip>
                                      }
                                    >
                                      <tr
                                        key={index}
                                        className="text-center"
                                        onDoubleClick={() => {
                                          setEditClick(!editClick);
                                          setIdentifier(index);
                                        }}
                                      >
                                        <td className="fw-bold">{index + 1}</td>
                                        <td className="fw-bold">{list.studentName}</td>
                                        <td className="fw-bold">{list.registrationNumber}</td>
                                        <td className="fw-bold">{list.assessmentScore}</td>
                                        <td className="fw-bold">{list.examsScore}</td>
                                        <td></td>
                                      </tr>
                                    </OverlayTrigger>
                                  ))))
                                : scoreEntries?.filter(entry => entry.subjectId == subjectId)
                                .map((entry, idx)=>(
                                  entry.classScoreEntries.map((list, index) => (
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id="button-tooltip-2">
                                          double click to close edit
                                        </Tooltip>
                                      }
                                    >
                                      <tr
                                        key={index}
                                        className="text-center"
                                        onDoubleClick={() => {
                                          setEditClick(!editClick);
                                        }}
                                      >
                                        <td className="fw-bold">{index + 1}</td>
                                        <td className="fw-bold">{list.studentName}</td>
                                        <td className="fw-bold">{list.registrationNumber}</td>
                                        <td className="fw-bold">
                                          {identifier == index && (
                                            <Field
                                              className="w-50 text-center"
                                              type="number"
                                              name="assessment"
                                              onChange={(e) => {
                                                setFieldValue(
                                                  "assessment",
                                                  e.target.value
                                                );
                                              }}
                                            />
                                          )}
                                        </td>
                                        <td
                                          className="fw-bold text-center"
                                          onDoubleClick={() => {
                                            setEditClick(!editClick);
                                          }}
                                        >
                                          {identifier == index && (
                                            <Field
                                              className="w-50 text-center"
                                              type="number"
                                              name="examScore"
                                              onChange={(e) => {
                                                setFieldValue(
                                                  "examScore",
                                                  e.target.value
                                                );
                                              }}
                                            />
                                          )}
                                        </td>
                                        <td>
                                          {identifier == index && (
                                            <Field
                                              type="checkbox"
                                              className="form-check-input"
                                              checked={
                                                values.assessment > 0 ||
                                                values.examScore > 0
                                              }
                                            />
                                          )}
                                        </td>
                                      </tr>
                                    </OverlayTrigger>
                                  ))))}
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
