import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Link, useLocation } from 'react-router-dom'
import {
    getAllClassScoreEntries,
    getAllStaffClasses,
    getStaffClassSubjects,
} from "../../store/actions/results-actions";
import SmallTable from "./score-entry-small-table";
import Preview from "./score-entry-preview";
import PublishResultTable from "./publish-result-table";
import { fetchSingleSession, getActiveSession, getAllSession } from "../../store/actions/session-actions";
import { getAllSchoolSessions, getAllTerms, getTermClasses } from "../../store/actions/publish-actions";

const PublishResult = () => {
    //VARIABLE DECLARATIONS
    const locations = useLocation();
    const dispatch = useDispatch();
    const [indexRow, setIndexRow] = useState("");
    const [idsForPreview, setIdsForPreview] = useState({});
    const [showScoresEntryTable, setShowScoresEntryTable] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isPreviewMode, setPreviewMode] = useState(false);
    const [terms, setTerms] = useState([
        {termName: "1st Term", id: 1},
        {termName: "2st Term", id: 2},
        {termName: "3st Term", id: 3},
    ])
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    // const { sessionList, selectedItem, activeSession } = state.session;
    const { schoolSessions, sessionTerms, termClasses } = state.publish;
    console.log('schoolSessions ', schoolSessions);
    console.log('sessionTerms ', sessionTerms);
    console.log('termClasses ', termClasses);
    const { staffClasses, staffClassSubjects, scoreEntry } = state.results;

    // ACCESSING STATE FROM REDUX STORE


    //VALIDATION SCHEMA

    const validation = Yup.object().shape({
        sessionClassId: Yup.string().required("Session is required"),
        subjectId: Yup.string().required("class is required"),
    });
    //VALIDATION SCHEMA


    React.useEffect(() => {
        // getAllStaffClasses()(dispatch);
        // getAllSession()(dispatch);
        // getActiveSession()(dispatch);
        getAllSchoolSessions()(dispatch)



        // window.onbeforeunload = () => {
        //     return "are you sure you want to leave?";
        // };
    }, []);

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const sessionId = queryParams.get("sessionId");
        if (!sessionId) return;
        fetchSingleSession(sessionId)(dispatch)
    }, []);


    return (
        <>
            <div className="col-md-12 mx-auto">
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header>
                                <h6><b>PUBLISH RESULT</b></h6>
                            </Card.Header>
                            <Card.Body>
                                {
                                    !isPreviewMode ?
                                        <Formik
                                            initialValues={{
                                                sessionClassId: "",
                                                subjectId: "",
                                            }}
                                            validationSchema={validation}
                                            enableReinitialize={true}
                                            onSubmit={(values) => {
                                                getAllClassScoreEntries(
                                                    values.sessionClassId,
                                                    values.subjectId
                                                )(dispatch);
                                                setIdsForPreview({
                                                    sessionClassId: values.sessionClassId,
                                                    subjectId: values.subjectId,
                                                });
                                            }}
                                        >
                                            {({
                                                handleSubmit,
                                                values,
                                                setFieldValue,
                                                touched,
                                                errors,
                                            }) => (
                                                <Form>
                                                    <Row>
                                                        <Col md="4">
                                                            {touched.sessionClassId && errors.sessionClassId && (
                                                                <div className="text-danger">
                                                                    {errors.sessionClassId}
                                                                </div>
                                                            )}
                                                        </Col>
                                                        <Col md="4">
                                                            {touched.subjectId && errors.subjectId && (
                                                                <div className="text-danger">
                                                                    {errors.subjectId}
                                                                </div>
                                                            )}
                                                        </Col>
                                                        <Col md="4">
                                                            {touched.subjectId && errors.subjectId && (
                                                                <div className="text-danger">
                                                                    {errors.subjectId}
                                                                </div>
                                                            )}
                                                        </Col>
                                                        <Col md="4" className="form-group text-dark">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="sessionId"
                                                            >
                                                                <b>Session:</b>
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                name="sessionId"
                                                                className="form-select"
                                                                id="sessionId"
                                                                onChange={(e) => {
                                                                    setFieldValue("sessionId", e.target.value);
                                                                    getAllTerms(e.target.value)(dispatch);
                                                                }}
                                                            >
                                                                {/* <option value="">Select Class</option> */}
                                                                {schoolSessions.map((item, idx) => (
                                                                    <option
                                                                        key={idx}
                                                                        name={values.sessionId}
                                                                        value={item.sessionId}
                                                                        // data-tag={item.sessionClass}
                                                                    >
                                                                        {item.startDate}/{item.endDate}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        </Col>
                                                        <Col md="4" className="form-group text-dark">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="sessionClassId"
                                                            >
                                                                <b>Terms:</b>
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                name="sessionClassId"
                                                                className="form-select"
                                                                id="sessionClassId"
                                                                onChange={(e) => {
                                                                    setFieldValue("sessionTermId", e.target.value);
                                                                    getTermClasses(e.target.value)(dispatch);
                                                                }}
                                                            >
                                                                <option value="">Select Term</option>
                                                                {sessionTerms?.map((term, idx) => (
                                                                    <option
                                                                        key={idx}
                                                                        name={values.sessionTermId}
                                                                        value={term.sessionTermId}
                                                                        data-tag={term.sessionTermId}
                                                                    >
                                                                        {term.termName}
                                                                    </option>
                                                                ))}
                                                            </Field>
                                                        </Col>
                                                        <Col md="4" className="form-group text-dark">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="sessionClassId"
                                                            >
                                                                <b>Classes:</b>
                                                            </label>
                                                            <Field
                                                                as="select"
                                                                name="sessionClassId"
                                                                className="form-select"
                                                                id="sessionClassId"
                                                                onChange={(e) => {
                                                                    setFieldValue("sessionClassId", e.target.value);
                                                                    getStaffClassSubjects(e.target.value)(dispatch);
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
                                                    </Row>
                                                    <div className="d-flex justify-content-end">
                                                        <Button
                                                            type="button"
                                                            className="btn-sm"
                                                            variant="btn btn-primary"
                                                            onClick={handleSubmit}
                                                        >
                                                            View
                                                        </Button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                        : null
                                }
                                {
                                    <PublishResultTable
                                        validation={validation}
                                        scoreEntry={scoreEntry}
                                        isEditMode={isEditMode}
                                        setEditMode={setEditMode}
                                        setIndexRow={setIndexRow}
                                        setPreviewMode={setPreviewMode}
                                        indexRow={indexRow}
                                        isPreviewMode={isPreviewMode}
                                        idsForPreview={idsForPreview}
                                    />
                                }

                                {/* {showScoresEntryTable && (
                  <div>
                    <SmallTable scoreEntry={scoreEntry} />
                    {!isPreviewMode ? (
                      <PublishResultTable
                        validation={validation}
                        scoreEntry={scoreEntry}
                        isEditMode={isEditMode}
                        setEditMode={setEditMode}
                        setIndexRow={setIndexRow}
                        setPreviewMode={setPreviewMode}
                        indexRow={indexRow}
                        isPreviewMode={isPreviewMode}
                        idsForPreview={idsForPreview}
                      />
                    ) : (
                      <Preview
                        setPreviewMode={setPreviewMode}
                        isPreviewMode={isPreviewMode}
                      />
                    )}
                  </div>
                )} */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default PublishResult;
