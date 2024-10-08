import { Field, Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { notificationManagement } from "../../../router/spm-path-locations";
import { updateAnnouncement } from "../../../store/actions/notification-actions";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { showErrorToast } from "../../../store/actions/toaster-actions";

const AnnouncementEdit = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { announcementDetails, announcementSuccessful } = state.notification;

    //VALIDATION
    const validation = Yup.object().shape({
        header: Yup.string().required("Announcement Title is required"),
        // content: Yup.string().required("Announcement Content is required"),
        assignedTo: Yup.string().required("Please enter who to send"),
    });
    //VALIDATION

    useEffect(() => {
        announcementSuccessful && history.push(notificationManagement.announcement);
    }, [announcementSuccessful]);



    const [content, setContent] = useState(announcementDetails?.content);
    const textEditorModules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', "strike"],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['image', "link",],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
            ],
            //   handlers: {
            //     image: imageHandler
            //   }
        },
    }), []);

    return (
        <>
            <div className="col-md-12 mx-auto">
                <Row>
                    <Col sm="12">
                        <Card className="">
                            <Card.Header className="ms-4">
                                <h4>Edit Announcement Information</h4>
                                <hr />
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
                                        values.assignedTo = values.assignedTo;

                                        if(!content){
                                            showErrorToast('Body is required')(dispatch);
                                            return;
                                          }
                                          values.content = content;
                                        updateAnnouncement(values)(dispatch);
                                    }}
                                >
                                    {({
                                        handleSubmit,
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
                                                <Col md="11" className="form-group text-dark ">
                                                    <label className="form-label h6">
                                                        <b>Title:</b>
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="header"
                                                        className="form-control border-secondary"
                                                        id="header"
                                                        placeholder="Enter subject..."
                                                    />
                                                </Col>
                                                <Col md="11">
                                                    {touched.content && errors.content && (
                                                        <div className="text-danger">{errors.content}</div>
                                                    )}
                                                </Col>
                                                <Col md="11" className="form-group text-dark">
                                                    <label className="form-label h6 ">
                                                        <b>Announcement:</b>
                                                    </label>
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={content}
                                                        onChange={setContent}
                                                        modules={textEditorModules}
                                                        style={{ height: '300px',maxHeight:"300px" }}
                                                        className="h6 mb-5"
                                                    />
                                                </Col>
                                                <Col md="11" className="mt-5 mt-md-0">
                                                    {touched.assignedTo && errors.assignedTo && (
                                                        <div className="text-danger">
                                                            {errors.assignedTo}
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col md="11" className="form-group text-dark mt-5 mt-md-0">
                                                    <label className="form-label h6">
                                                        <b>Send To:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="assignedTo"
                                                        className="form-select border-secondary"
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

export default AnnouncementEdit;
