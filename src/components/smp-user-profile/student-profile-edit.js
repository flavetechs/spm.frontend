import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { updateAnnouncement } from "../../store/actions/notification-actions";
import { updateStudentProfile } from "../../store/actions/student-actions";
import './profilePage.scss';

const StudentProfileEdit = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const state = useSelector((state) => state);
    const { announcementDetails } = state.notification;
    const [field, setField] = useState([]);

    //VALIDATION
    const validation = Yup.object().shape({
        // header: Yup.string().required("Announcement Title is required"),
        // content: Yup.string().required("Announcement Content is required"),
        // assignedTo: Yup.string().required("Please enter who to send"),
    });
    //VALIDATION

    const [tags, setTags] = useState([])
    // console.log('tags :', tags);


    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <>
            <div className="col-md-8 mx-auto">
                <Row>
                    <Col sm="12">
                        <Card className="">
                            <Card.Header className="ms-4">
                                <h4>Edit Student Profile Information</h4>
                                <hr />
                            </Card.Header>

                            <Card.Body>
                                <Formik
                                    initialValues={{
                                        StudentContactId: announcementDetails?.announcementsId,
                                        Hobbies: announcementDetails?.header,
                                        BestSubjectIds: announcementDetails?.content,
                                    }}
                                    validationSchema={validation}
                                    enableReinitialize={true}
                                    onSubmit={(values) => {
                                        values.StudentContactId = values.StudentContactId;
                                        values.Hobbies = tags;
                                        values.BestSubjectIds = values.BestSubjectIds;
                                        updateStudentProfile(values)(dispatch);
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        values,
                                        setFieldValue,
                                        touched,
                                        errors,
                                    }) => (
                                        <Form className="mx-auto" onSubmit={e => { e.preventDefault(); }} >
                                            <Row className="d-flex justify-content-center">
                                                <Col md="11">
                                                    {touched.header && errors.header && (
                                                        <div className="text-danger">{errors.header}</div>
                                                    )}
                                                </Col>
                                                <Col md="11" className="form-group text-dark">
                                                    <label className="form-label mb-0" htmlFor="Hobbies">
                                                        <b>Hobbies:</b>
                                                    </label>
                                                    <div className="tags-input-container">
                                                        {tags.map((tag, index) => (
                                                            <div className="tag-item" key={index}>
                                                                <span className="text">{tag}</span>
                                                                <span className="close text-danger" onClick={() => removeTag(index)}>&times;</span>
                                                            </div>
                                                        ))}
                                                        <input
                                                            name="Hobbies"
                                                            onKeyDown={handleKeyDown}
                                                            type="text" className="tags-input"
                                                            placeholder="Enter Hobbies"
                                                            onChange={() => setTags(tags)}
                                                        />
                                                    </div>
                                                    <p>Press Enter to Add Hobbies</p>
                                                </Col>
                                                <Col md="11" className="form-group text-dark">
                                                    <label className="form-label" htmlFor="BestSubjectIds">
                                                        <b>Best Sujects:</b>
                                                    </label>
                                                    <Field
                                                        multiple={true}
                                                        as="select"
                                                        name="BestSubjectIds"
                                                        className="form-select text-dark"
                                                        id="BestSubjectIds"
                                                    // onChange={(e) => {
                                                    //     setFieldValue("BestSubjectIds", e.target.value);
                                                    // }}
                                                    >
                                                        <option value="English Language">English Language</option>
                                                        <option value="admin">Agricultural Science</option>
                                                        <option value="teacher">Chemistry</option>
                                                        <option value="parent">Physics</option>
                                                        <option value="student">Geography</option>
                                                    </Field>
                                                </Col>
                                                <div className="d-flex justify-content-end">
                                                    <Button
                                                        type="button"
                                                        className="btn-sm mt-4"
                                                        variant="btn btn-danger"
                                                        onClick={() => {
                                                            history.goBack();
                                                        }}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        className="btn-sm mx-2 mt-4"
                                                        variant="btn btn-success"
                                                        onClick={() => {
                                                            handleSubmit();
                                                        }}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </Row>
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

export default StudentProfileEdit;
