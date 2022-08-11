import { Field, Formik } from "formik";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { updateAnnouncement } from "../../../store/actions/notification-actions";

const StaffProfileEdit = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const state = useSelector((state) => state);
    const { announcementDetails } = state.notification;

    //VALIDATION
    const validation = Yup.object().shape({
        // header: Yup.string().required("Announcement Title is required"),
        // content: Yup.string().required("Announcement Content is required"),
        // assignedTo: Yup.string().required("Please enter who to send"),
    });
    //VALIDATION
    return (
        <>
            <div className="col-md-8 mx-auto">
                <Row>
                    <Col sm="12">
                        <Card className="">
                            <Card.Header className="ms-4">
                                <h4>Edit Staff Profile Information</h4>
                                <hr/>
                            </Card.Header>
                          
                            <Card.Body>
                                <Formik
                                    initialValues={{
                                        announcementsId: announcementDetails?.announcementsId,
                                        header: announcementDetails?.header,
                                        content: announcementDetails?.content,
                                        assignedTo: announcementDetails?.assignedTo,
                                    }}
                                    validationSchema={validation}
                                    enableReinitialize={true}
                                    onSubmit={(values) => {
                                        values.header = values.header;
                                        values.content = values.content;
                                        values.assignedTo = values.assignedTo;
                                        updateAnnouncement(values)(dispatch);
                                    }}
                                >
                                    {({
                                        handleSubmit,
                                        values,
                                        setFieldValue,
                                        touched,
                                        errors,
                                    }) => (
                                        <Form className="mx-auto">
                                            <Row className="d-flex justify-content-center">
                                                <Col md="11">
                                                    {touched.header && errors.header && (
                                                        <div className="text-danger">{errors.header}</div>
                                                    )}
                                                </Col>
                                                <Col md="11" className="form-group text-dark">
                                                    <label className="form-label" htmlFor="Hobbies">
                                                        <b>Hobbies:</b>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="Hobbies"
                                                        className="form-control"
                                                        id="Hobbies"
                                                        placeholder="Enter Hobbies..."
                                                    />
                                                </Col>
                                                <Col md="11">
                                                    {touched.header && errors.header && (
                                                        <div className="text-danger">{errors.header}</div>
                                                    )}
                                                </Col>
                                                {/* <Col md="11" className="form-group text-dark">
                                                    <label className="form-label" htmlFor="bestSubjects">
                                                        <b>Best Subjects:</b>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="bestSubjects"
                                                        className="form-control"
                                                        id="bestSubjects"
                                                        placeholder="Enter Best Subjects..."
                                                    />
                                                </Col> */}
                                                {/* <Col md="11">
                                                    {touched.content && errors.content && (
                                                        <div className="text-danger">{errors.content}</div>
                                                    )}
                                                </Col>
                                                <Col md="11" className="form-group text-dark">
                                                    <label className="form-label" htmlFor="content">
                                                        <b>Best Subjects:</b>
                                                    </label>
                                                    <Field
                                                        as="textarea"
                                                        type="text"
                                                        name="content"
                                                        className="form-control h-75"
                                                        id="content"
                                                        placeholder="Enter Announcement..."
                                                    />
                                                </Col> */}
                                                {/* <Col md="11">
                                                    {touched.assignedTo && errors.assignedTo && (
                                                        <div className="text-danger">
                                                            {errors.assignedTo}
                                                        </div>
                                                    )}
                                                </Col> */}
                                                {/* <Col md="11" className="form-group text-dark">
                                                    <label className="form-label" htmlFor="assignedTo">
                                                        <b>Send To:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="assignedTo"
                                                        className="form-select"
                                                        id="assignedTo"
                                                        onChange={(e) => {
                                                            setFieldValue("assignedTo", e.target.value);
                                                        }}
                                                    >
                                                        <option value="">Select Send Option</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="teacher">Teachers</option>
                                                        <option value="parent">Parents</option>
                                                        <option value="student">Students</option>
                                                    </Field>
                                                </Col> */}
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
                                                        // onClick={() => {
                                                        //     handleSubmit();
                                                        // }}
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

export default StaffProfileEdit;
