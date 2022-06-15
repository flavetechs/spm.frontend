import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
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
import SmallTable from "./score-entry-small-table";
import LargeTable from "./score-entry-large-table";

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
                    <SmallTable
                      scoreEntries={scoreEntries}
                      subjectId={subjectId}
                    />
                    <LargeTable
                      validation={validation}
                      scoreEntries={scoreEntries}
                      subjectId={subjectId}
                      editClick={editClick}
                      setEditClick={setEditClick}
                      setIdentifier={setIdentifier}
                      identifier={identifier}
                    />
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
