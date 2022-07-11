import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getAllCumulativeMasterList,
  resetCumulativeListEntryOnExit,
} from "../../store/actions/results-actions";
import {
  getActiveSession,
  getAllSession,
} from "../../store/actions/session-actions";
import { getAllSessionClasses } from "../../store/actions/class-actions";
import CumulativeMasterListLargeTable from "./cumulative-master-list-large-table";
import CumulativeMasterListSmallTable from "./cumulative-master-list-small-table";

const CumulativeMasterList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showCumulativeMasterListTable, setShowCumulativeMasterListTable] =
    useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { itemList: classList } = state.class;
  const { cumulativeEntry } = state.results;
  const { activeSession, sessionList } = state.session;
  const [sessionId, setSessionId] = useState("");
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION SCHEMA

  const validation = Yup.object().shape({
    sessionId: Yup.string().required("Session is required"),
    terms: Yup.string().required("Term is required"),
    sessionClassId: Yup.string().required("Class is required"),
  });
  //VALIDATION SCHEMA

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllSession()(dispatch);
    return () => {
      resetCumulativeListEntryOnExit(cumulativeEntry)(dispatch);
      setShowCumulativeMasterListTable(false);
    };
  }, []);

  React.useEffect(() => {
    if (!sessionId) {
      getAllSessionClasses(activeSession?.sessionId)(dispatch);
    } else {
      getAllSessionClasses(sessionId)(dispatch);
    }
  }, [sessionId, activeSession]);

  React.useEffect(() => {
    if (cumulativeEntry) {
      setShowCumulativeMasterListTable(true);
    } else if (!cumulativeEntry) {
      setShowCumulativeMasterListTable(false);
    }
  }, [cumulativeEntry]);

  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>CUMULATIVE RESULT</h6>
              </Card.Header>
              <Card.Body>
                {!showCumulativeMasterListTable ? (
                  <Formik
                    initialValues={{
                      sessionId: activeSession?.sessionId,
                      terms: activeSession?.terms.find(
                        (term) => term.isActive == true
                      )?.sessionTermId,
                      sessionClassId: "",
                    }}
                    validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      getAllCumulativeMasterList(
                        values.sessionClassId,
                        values.terms
                      )(dispatch);
                    }}
                  >
                    {({
                      handleSubmit,
                      values,
                      touched,
                      errors,
                      setFieldValue,
                    }) => (
                      <Form>
                        <Row className="d-flex justify-content-center">
                          <Col md="10">
                            {touched.sessionId && errors.sessionId && (
                              <div className="text-danger">
                                {errors.sessionId}
                              </div>
                            )}
                          </Col>
                          <Col md="10" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="sessionId"
                            >
                              Session:
                            </label>
                            <Field
                              as="select"
                              name="sessionId"
                              className="form-select"
                              id="sessionId"
                              onChange={(e) => {
                                setFieldValue("sessionId", e.target.value);
                                setSessionId(e.target.value);
                              }}
                            >
                              <option value="">Select Session</option>
                              {sessionList?.map((session, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionId}
                                  value={session.sessionId.toLowerCase()}
                                >
                                  {session.startDate} / {session.endDate}
                                </option>
                              ))}
                            </Field>
                          </Col>
                          <Col md="10">
                            {touched.terms && errors.terms && (
                              <div className="text-danger">{errors.terms}</div>
                            )}
                          </Col>
                          <Col md="10" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="terms"
                            >
                              Terms:
                            </label>
                            <Field
                              as="select"
                              name="terms"
                              className="form-select"
                              id="terms"
                            >
                              <option value="">Select Terms</option>
                              {sessionList
                                ?.find(
                                  (session, idx) =>
                                    session.sessionId.toLowerCase() ==
                                    values.sessionId
                                )?.terms.map((term, id) => (
                                  <option
                                    key={id}
                                    name={values.terms}
                                    value={term.sessionTermId.toLowerCase()}
                                    selected={
                                      term.sessionTermId == values.terms
                                    }
                                  >
                                    {term.termName}
                                  </option>
                                ))}
                            </Field>
                          </Col>
                          <Col md="10">
                            {touched.sessionClassId &&
                              errors.sessionClassId && (
                                <div className="text-danger">
                                  {errors.sessionClassId}
                                </div>
                              )}
                          </Col>
                          <Col md="10" className="form-group">
                            <label
                              className="form-label fw-bold"
                              htmlFor="sessionClassId"
                            >
                              Class:
                            </label>
                            <Field
                              as="select"
                              name="sessionClassId"
                              className="form-select"
                              id="sessionClassId"
                            >
                              <option value="">Select Class</option>
                              {classList.map((item, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionClassId}
                                  value={item.sessionClassId}
                                >
                                  {item.class}
                                </option>
                              ))}
                            </Field>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                          <Button
                            type="button"
                            variant="btn btn-primary btn-sm"
                            onClick={handleSubmit}
                          >
                            View
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <div>
                    <CumulativeMasterListSmallTable
                      cumulativeEntry={cumulativeEntry}
                      setShowCumulativeMasterListTable={
                        setShowCumulativeMasterListTable
                      }
                    />
                    <CumulativeMasterListLargeTable
                      cumulativeEntry={cumulativeEntry}
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

export default CumulativeMasterList;
