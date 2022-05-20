import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import {
    createSessionClass,
    buildClassSubjectArray,
    getAllActiveClasses,
    getAllActiveSubjects,
    getAllActiveTeachers,
} from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import { getActiveSession } from "../../store/actions/session-actions";
import { showErrorToast } from "../../store/actions/toaster-actions";

const SessionClassAdd = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const dispatch = useDispatch();
    //VARIABLE DECLARATIONS

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        classId: Yup.string().required("Class is required"),
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
        activeTeachers,
        activeSubjects,
        activeClasses,
        classSubjects,
    } = state.class;

    const { activeSession } = state.session;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        getAllActiveClasses()(dispatch);
        getAllActiveTeachers()(dispatch);
        getAllActiveSubjects()(dispatch);
        getActiveSession()(dispatch);
    }, []);


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
            <div className="col-8 mx-auto">
                <Row>
                    <Col sm="12">
                        <Card className="">
                            <Card.Body>
                                <Formik
                                    initialValues={{
                                        sessionId: activeSession?.session,
                                        classId: "",
                                        formTeacherId: "",
                                        InSession: true,
                                        examScore: 70,
                                        assessmentScore: 30,
                                        passMark: 40
                                    }}
                                    validationSchema={validation}
                                    onSubmit={(values) => {
                                        values.classSubjects = classSubjects;
                                        values.sessionId = activeSession?.sessionId;

                                        const score = Number(values.examScore) + Number(values.assessmentScore);
                                        if (score !== 100) {
                                            showErrorToast('Examination and assessment must equal 100')(dispatch)
                                            return
                                        }

                                        createSessionClass(values)(dispatch);
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
                                                {touched.classId && errors.classId && (
                                                    <div className="text-danger">
                                                        {errors.classId}
                                                    </div>
                                                )}
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
                                                hidden
                                            />

                                            <Row>

                                                <Col lg="6">
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
                                                <Col lg="6">
                                                    <div className="form-group">
                                                        <label htmlFor="classId" className="form-label"> Class </label>
                                                        <Field
                                                            as="select"
                                                            name="classId"
                                                            className="form-select"
                                                            id="classId"
                                                            defaultValue={values.classId}
                                                            onChange={(event) => setFieldValue('classId', event.target.value)}

                                                        >
                                                            <option value={''}>
                                                                Select Class
                                                            </option>
                                                            {activeClasses.map((classLookup, idx) => (
                                                                <option
                                                                    key={idx}
                                                                    value={classLookup.lookupId}
                                                                >
                                                                    {classLookup.name}
                                                                </option>
                                                            ))}
                                                        </Field>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <div className="d-flex row justify-content-between">

                                                <Col lg="2">
                                                    <div className="form-group">
                                                        <label htmlFor="examScore" className="form-label"> Exam Score</label>
                                                        <Field type="number" onChange={(e) => {
                                                            setFieldValue('examScore', e.target.value);
                                                            setFieldValue('assessmentScore', 100 - e.target.value)
                                                        }}

                                                            className="form-control" name="examScore" id="examScore" aria-describedby="examScore" required placeholder=" " />
                                                    </div>
                                                </Col>

                                                <Col lg="2">
                                                    <div className="form-group">
                                                        <label htmlFor="assessmentScore" className="form-label"> Assesment </label>
                                                        <Field type="number" onChange={(e) => {
                                                            setFieldValue('examScore', 100 - e.target.value)
                                                            setFieldValue('assessmentScore', e.target.value)
                                                        }} className="form-control" name="assessmentScore" id="assessmentScore" aria-describedby="assessmentScore" required placeholder=" " />
                                                    </div>
                                                </Col>

                                                <Col lg="2">
                                                    <div className="form-group">
                                                        <label htmlFor="passMark" className="form-label"> Pass Mark </label>
                                                        <Field type="number" className="form-control" name="passMark" id="passMark" aria-describedby="passMark" required placeholder=" " />
                                                    </div>
                                                </Col>

                                                <Col lg="6">
                                                    <div className="form-group">
                                                        <label
                                                            htmlFor="formTeacherId"
                                                            className="form-label"
                                                        >
                                                            Form Teacher
                                                        </label>
                                                        <Field
                                                            as="select"
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

export default SessionClassAdd;