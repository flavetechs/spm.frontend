import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import Preview from "./score-entry-preview";
import PublishResultTable from "./publish-result-table";
import { getAllResultList, getAllSchoolSessions, getAllTerms, getTermClasses, nullifyResultListOnExit } from "../../store/actions/publish-actions";

const PublishResult = () => {
    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [indexRow, setIndexRow] = useState("");
    const [idsForPreview, setIdsForPreview] = useState({});
    const [showPublishResultTable, SetShowPublishResultTable] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isPreviewMode, setPreviewMode] = useState(false);

    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);

    const { schoolSessions, sessionTerms, termClasses, printResult } = state.publish;
    const { activeSession } = state.session;
    console.log('activeSession ', activeSession);

    // ACCESSING STATE FROM REDUX STORE


    //VALIDATION SCHEMA

    const validation = Yup.object().shape({
        sessionClassId: Yup.string().required("Class is required"),
        sessionTermId: Yup.string().required("Term is required"),
        sessionId: Yup.string().required("Session is required"),
    });
    //VALIDATION SCHEMA


    React.useEffect(() => {
        getAllSchoolSessions()(dispatch)
        // window.onbeforeunload = () => {
        //   return "are you sure you want to leave?";
        // };

        setIndexRow('');
        setIdsForPreview({});
        SetShowPublishResultTable(false);
        setEditMode(false);
        setPreviewMode(false);

    }, []);

    React.useEffect(() => {
        if (printResult) {
            SetShowPublishResultTable(true);
        } 
        return () => {
            nullifyResultListOnExit(printResult)(dispatch)
            SetShowPublishResultTable(false);
        }
    },[printResult]);


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
                                            // initialValues={{
                                            //     sessionId: activeSession?.sessionId.toUpperCase(),
                                            //     terms: activeSession?.terms
                                            //         .filter((term) => term.isActive == true)
                                            //         .map((term) => term.sessionTermId)
                                            //         .toString(),
                                            //     sessionClassId: "",
                                            // }}
                                            initialValues={{
                                                sessionClassId: activeSession?.sessionId.toUpperCase(),
                                                sessionTermId: activeSession?.sessionTermId.toUpperCase(),
                                            }}
                                            validationSchema={validation}
                                            enableReinitialize={true}
                                            onSubmit={(values) => {
                                                console.log('here value', values);
                                                getAllResultList(
                                                    values.sessionClassId,
                                                    values.sessionTermId
                                                )(dispatch);
                                                setIdsForPreview({
                                                    sessionClassId: values.sessionClassId,
                                                    sessionTermId: values.sessionTermId,
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
                                                            {touched.sessionId && errors.sessionId && (
                                                                <div className="text-danger">
                                                                    {errors.sessionId}
                                                                </div>
                                                            )}
                                                        </Col>
                                                        <Col md="4">
                                                            {touched.sessionTermId && errors.sessionTermId && (
                                                                <div className="text-danger">
                                                                    {errors.sessionTermId}
                                                                </div>
                                                            )}
                                                        </Col>
                                                        <Col md="4">
                                                            {touched.sessionClassId && errors.sessionClassId && (
                                                                <div className="text-danger">
                                                                    {errors.sessionClassId}
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
                                                                <option value="">Select Session</option>
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
                                                                name="sessionTermId"
                                                                className="form-select"
                                                                id="sessionTermId"
                                                                onChange={(e) => {
                                                                    setFieldValue("sessionTermId", e.target.value);
                                                                    getTermClasses(values.sessionId, e.target.value)(dispatch);
                                                                }}
                                                            >
                                                                <option value="">Select Term</option>
                                                                {sessionTerms?.map((term, idx) => (
                                                                    <option
                                                                        key={idx}
                                                                        name={values.sessionTermId}
                                                                        value={term.sessionTermId}
                                                                    // data-tag={term.termName}
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
                                                                    // getTermClasses(e.target.value)(dispatch);
                                                                }}
                                                            >
                                                                <option value="">Select Class</option>
                                                                {termClasses?.map((termClass, idx) => (
                                                                    <option
                                                                        key={idx}
                                                                        name={values.sessionClassId}
                                                                        value={termClass.sessionClassId}
                                                                        data-tag={termClass.sessionClass}
                                                                    >
                                                                        {termClass.sessionClass}
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
                                {showPublishResultTable && (
                                    <div>
                                        {/* <SmallTable scoreEntry={scoreEntry} /> */}
                                        {!isPreviewMode ? (
                                            <PublishResultTable
                                                validation={validation}
                                                printResult={printResult}
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
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default PublishResult;
