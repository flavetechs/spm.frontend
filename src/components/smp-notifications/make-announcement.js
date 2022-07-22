import { Field, Formik } from "formik";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const MakeAnnouncement = () => {
    const history = useHistory();
  //VALIDATION
  const validation = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    body: Yup.string().required("Body is required"),
    sendTo: Yup.string().required("Please enter who to send"),
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
                    subject: "",
                    body: "",
                    sendTo: "",
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {}}
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
                          {touched.subject && errors.subject && (
                            <div className="text-danger">{errors.subject}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-dark">
                          <label className="form-label" htmlFor="subject">
                            <b>Subject:</b>
                          </label>
                          <Field
                            type="text"
                            name="subject"
                            className="form-control"
                            id="subject"
                            placeholder="Enter subject..."
                          />
                        </Col>
                        <Col md="11">
                          {touched.body && errors.body && (
                            <div className="text-danger">{errors.body}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-dark">
                          <label className="form-label" htmlFor="body">
                            <b>Announcement:</b>
                          </label>
                          <Field
                          as="textarea"
                            type="text"
                            name="body"
                            className="form-control h-75"
                            id="body"
                            placeholder="Enter Announcement..."
                          />
                        </Col>
                        <Col md="11">
                          {touched.sendTo && errors.sendTo && (
                            <div className="text-danger">{errors.sendTo}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-dark">
                          <label className="form-label" htmlFor="sendTo">
                            <b>Send To:</b>
                          </label>
                          <Field
                            as="select"
                            name="sendTo"
                            className="form-select"
                            id="sendTo"
                            onChange={(e) => {setFieldValue("sendTo", e.target.value)}}
                          >
                            <option value="">Select Send Option</option>
                            <option value="printSingle">Staff</option>
                            <option value="batchPrinting">Parents</option>
                            <option value="batchPrinting">Students</option>
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
