import { Field, Formik } from "formik";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { createAnnouncement } from "../../store/actions/notification-actions";

const MakeAnnouncement = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  //VALIDATION
  const validation = Yup.object().shape({
    header: Yup.string().required("Subject is required"),
    content: Yup.string().required("Body is required"),
    assignedTo: Yup.string().required("Please enter who to send"),
  });
  //VALIDATION
  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    header: "",
                    content: "",
                    assignedTo: "",
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    createAnnouncement(values)(dispatch);
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
                          <label className="form-label" htmlFor="header">
                            <b>Subject:</b>
                          </label>
                          <Field
                            type="text"
                            name="header"
                            className="form-control"
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
                          <label className="form-label" htmlFor="content">
                            <b>Announcement:</b>
                          </label>
                          <Field
                            as="textarea"
                            type="text"
                            name="content"
                            className="form-control h-75"
                            id="content"
                            placeholder="Enter Announcement..."
                          />
                        </Col>
                        <Col md="11">
                          {touched.assignedTo && errors.assignedTo && (
                            <div className="text-danger">
                              {errors.assignedTo}
                            </div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-dark">
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
                            Send
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

export default MakeAnnouncement;
