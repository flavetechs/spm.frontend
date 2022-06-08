import React, { useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
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
    getAllActiveTeachers,
    getAllSessionClasses,
    fetchSingleSessionClass,
} from "../../store/actions/class-actions";
import { getActiveSession } from "../../store/actions/session-actions";
import { showErrorToast } from "../../store/actions/toaster-actions";

const SessionClassEdit = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const locations = useLocation();
    const dispatch = useDispatch();
    //VARIABLE DECLARATIONS

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        formTeacherId: Yup.string().required("Form teacher is required"),
        examScore: Yup.number()
            .required("Exmination score is required")
            .min(0, 'Exmination score must not be below 0')
            .max(100, 'Exmination score must not be above 100'),
        assessmentScore: Yup.number()
            .required("Assessment score is required")
            .min(0, 'Assessment score must not be below 0')
            .max(100, 'Assessment score must not be above 100'),
        passMark: Yup.number()
            .required("Pass Mark is required")
            .min(0, 'Pass Mark score must not be below 0')
            .max(100, 'Pass Mark score must not be above 100'),
    });
    //VALIDATIONS SCHEMA

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const {
        isSuccessful,
        message,
        selectedItem,
        activeTeachers,
        activeSubjects,
        activeClasses,
        classSubjects,
    } = state.class;
    const { activeSession } = state.session;
    // ACCESSING STATE FROM REDUX STORE

    //USE STATE VARIABLE DECLARATION
    const [examScore, setExamScore] = useState(70);
    const [assessmentScore, setAssessmentScore] = useState(30);
    //USE STATE VARIABLE  DECLARATION

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const sessionClassId = queryParams.get("sessionClassId");
        if (!sessionClassId) return;
        fetchSingleSessionClass(sessionClassId)(dispatch);
        getAllSessionClasses()(dispatch);
        getAllActiveClasses()(dispatch);
        getAllActiveTeachers()(dispatch);
        getAllActiveSubjects()(dispatch);
        getActiveSession()(dispatch);
    }, []);

    React.useEffect(() => {
        setExamScore(selectedItem?.examScore);
        setAssessmentScore(selectedItem?.assessmentScore);
    }, [selectedItem]);


    if (isSuccessful) {
        history.push(classLocations.sessionClassList);
    }


    //HANDLER FUNCTIONS
    
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
            <div className="col-md-8 mx-auto">

                <Row>
                    <Col sm="12">
                        <Card className="">
                            <Card.Body>
                                <Formik
                                    initialValues={{
                                        sessionId: selectedItem?.sessionId,
                                        classId: selectedItem?.selectedItem,
                                        formTeacherId: selectedItem?.formTeacherId,
                                        InSession: true,
                                        sessionClassId: selectedItem?.sessionClassId,
                                        examScore: examScore,
                                        assessmentScore: assessmentScore,
                                        passMark: selectedItem?.passMark
                                    }}
                                    enableReinitialize
                                    validationSchema={validation}
                                    onSubmit={(values) => {
                                        values.classSubjects = classSubjects;
                                        values.sessionId = selectedItem.sessionId;
                                        values.classId = selectedItem?.classId;

                                        const score = Number(values.examScore) + Number(values.assessmentScore);
                                        if(score !== 100){
                                            showErrorToast('Examination and assessment must equal 100')(dispatch)
                                            return
                                        }
                                        updateSessionClass(values)(dispatch);
                                    }}
                                >
                                    {({
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        setFieldValue,
                                        values,
                                        touched,
                                        errors,
                                        isValid,
                                    }) => (
                                        <Form>

                                            <Row>
                                                {message && <div className="text-danger">{message}</div>}
                                                {touched.formTeacherId && errors.formTeacherId && (
                                                    <div className="text-danger">
                                                        {errors.formTeacherId}
                                                    </div>
                                                )}
                                                {touched.examScore && errors.examScore && (
                                                    <div className="text-danger">
                                                        {errors.examScore}
                                                    </div>
                                                )}
                                                {touched.assessmentScore && errors.assessmentScore && (
                                                    <div className="text-danger">
                                                        {errors.assessmentScore}
                                                    </div>
                                                )}
                                                {touched.passMark && errors.passMark && (
                                                    <div className="text-danger">
                                                        {errors.passMark}
                                                    </div>
                                                )}
                                            </Row>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="sessionClassId"
                                                id="sessionClassId"
                                                aria-describedby="sessionClassId"
                                                defaultValue={selectedItem?.sessionClassId}
                                                hidden
                                            />

                                            <Row>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="sessionId" className="form-label">
                                                            {" "}
                                                            Session{" "}
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            className="form-control"
                                                            name="sessionId"
                                                            id="sessionId"
                                                            aria-describedby="sessionId"
                                                            value={activeSession?.session}
                                                            readOnly
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="classId" className="form-label"> Class </label>
                                                        <Field
                                                            as="select"
                                                            type="select"
                                                            name="classId"
                                                            className="form-select"
                                                            id="classId"
                                                            defaultValue={values?.classId}
                                                            disabled={true}
                                                            onChange={(event) => setFieldValue('classId', event.target.value)}

                                                        >
                                                            <option value={''}>
                                                                Select Class
                                                            </option>
                                                            {activeClasses.map((classLookup, idx) => (
                                                                <option
                                                                    key={idx}
                                                                    value={classLookup.lookupId}
                                                                    selected={selectedItem?.classId == classLookup.lookupId}
                                                                >
                                                                    {classLookup.name}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className="d-flex  justify-content-between">
                                                 <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="examScore" className="form-label"> Exam Score</label>
                                                        <Field type="number" onChange={(e) => {
                                                            setExamScore(e.target.value);
                                                            setAssessmentScore(100 - e.target.value);
                                                            setFieldValue('examScore', e.target.value)
                                                        }} 
                                                        
                                                        className="form-control p-sm-1 p-lg-2" name="examScore" id="examScore" aria-describedby="examScore" required placeholder=" " />
                                                    </div>
                                                </Col>

                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="assessmentScore" className="form-label"> Assesment </label>
                                                        <Field type="number" onChange={(e) => {
                                                            setAssessmentScore(e.target.value);
                                                            setExamScore(100 - e.target.value);
                                                            setFieldValue('assessmentScore', e.target.value)
                                                        }} className="form-control p-sm-1 p-lg-2" name="assessmentScore" id="assessmentScore" aria-describedby="assessmentScore" required placeholder=" " />
                                                    </div>
                                                </Col>
                                                <Col sm="2">
                                                    <div className="form-group">
                                                        <label htmlFor="passMark" className="form-label"> Pass Mark </label>
                                                        <Field type="number" className="form-control p-sm-1 p-lg-2" name="passMark" id="passMark" aria-describedby="passMark" required placeholder=" " />
                                                    </div>
                                                </Col>

                                                <Col sm="6">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="formTeacherId"
                                                            className="form-label"
                                                        >
                                                            Form Teacher
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            type="select"
                                                            name="formTeacherId"
                                                            className="form-select"
                                                            id="formTeacherId"
                                                            onChange={(event) => setFieldValue('formTeacherId', event.target.value)}
                                                        >
                                                            <option value={''} defaultValue={''}>
                                                                Select Form Teacher
                                                            </option>
                                                            {activeTeachers.map((teacher, idx) => (
                                                                <option
                                                                    key={idx}
                                                                    value={teacher.teacherAccountId}
                                                                    selected={values?.formTeacherId == teacher.teacherAccountId}
                                                                >
                                                                    {teacher.fullName}
                                                                </option>
                                                            ))}

                                                        </Field>
                                                    </div>
                                                </Col>
                                            </Row>

                                          
                                            <Table size="md" bordered responsive>
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
                                                                    checked={classSubjects.find(sub => sub.subjectId === subject.lookupId)}
                                                                    onChange={(e) => {
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
                                                                    onChange={(e) => {
                                                                        getSubjectTeacherId(
                                                                            subject.lookupId,
                                                                            e.target.value
                                                                        );
                                                                    }}
                                                                >
                                                                    <option
                                                                        value="">
                                                                        Select Teacher
                                                                    </option>

                                                                    {activeTeachers.map((teacher, id) => (
                                                                        <option
                                                                            key={id}
                                                                            value={teacher.teacherAccountId}
                                                                            selected={classSubjects.find(sub => sub.subjectTeacherId === teacher.teacherAccountId && sub.subjectId === subject.lookupId) ? true : false}
                                                                        >
                                                                            {teacher.fullName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>

                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    type="button"
                                                    variant="btn btn-danger mx-2"
                                                    onClick={() => {
                                                        history.goBack();
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