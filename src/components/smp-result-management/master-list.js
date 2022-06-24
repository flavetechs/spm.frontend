import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { getAllMasterListentries, nullifyListEntryOnExit } from "../../store/actions/results-actions";
import {
  getActiveSession,
  getAllSession,
} from "../../store/actions/session-actions";
import MasterListSmallTable from "./master-list-small-table";
import MasterListLargeTable from "./master-list-large-table";
import { getAllSessionClasses } from "../../store/actions/class-actions";

const MasterList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showMasterListTable, setShowMasterListTable] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { itemList } = state.class;
  const { listEntry } = state.results;
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
  }, []);

  React.useEffect(() => {
    if (!sessionId) {
      getAllSessionClasses(activeSession?.sessionId)(dispatch);
      setSessionId(activeSession?.sessionId);
    } else {
      getAllSessionClasses(sessionId)(dispatch);
    }
  }, [activeSession]);

  React.useEffect(() => {
    if (listEntry) {
      setShowMasterListTable(true);
    }
    return()=>{
      nullifyListEntryOnExit(listEntry)(dispatch)
      setShowMasterListTable(false);
    }
  }, [listEntry]);
 
  
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>MASTER LIST</h6>
              </Card.Header>
              <Card.Body>
                {!showMasterListTable ? (
                  <Formik
                    initialValues={{
                      sessionId: activeSession?.sessionId.toUpperCase(),
                      terms: activeSession?.terms
                        .filter((term) => term.isActive == true)
                        .map((term) => term.sessionTermId)
                        .toString(),
                      sessionClassId: "",
                    }}
                    validationSchema={validation}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                      getAllMasterListentries(
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
                              {sessionList?.map((list, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionId}
                                  value={list.sessionId}
                                >
                                  {list.startDate} / {list.endDate}
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
                                ?.filter(
                                  (list, idx) =>
                                    list.sessionId.toUpperCase() ==
                                    values.sessionId
                                )
                                .map((list, id) =>
                                  list.terms.map((term, id) => (
                                    <option
                                      key={id}
                                      name={values.terms}
                                      value={term.sessionTermId}
                                      selected={
                                        term.sessionTermId == values.terms
                                      }
                                    >
                                      {term.termName}
                                    </option>
                                  ))
                                )}
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
                              {itemList.map((list, idx) => (
                                <option
                                  key={idx}
                                  name={values.sessionClassId}
                                  value={list.sessionClassId}
                                >
                                  {list.class}
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
                    <MasterListSmallTable
                      listEntry={listEntry}
                      setShowMasterListTable={setShowMasterListTable}
                      
                    />
                    <MasterListLargeTable
                      listEntry={listEntry}
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

export default MasterList;
