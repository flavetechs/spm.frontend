import { Field, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { showErrorToast } from "../../../../store/actions/toaster-actions";

const CreateAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { announcementSuccessful } = state.notification;
  //VALIDATION
  const validation = Yup.object().shape({
    header: Yup.string().required("Subject is required"),
    deadline: Yup.string().required("Please enter who to send"),
    group:Yup.string().required("Please select group"),
  });
  //VALIDATION
  // useEffect(() => {
  //   announcementSuccessful && history.push(notificationManagement.announcement);
  // }, [announcementSuccessful]);

  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const textEditorModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link"],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
      ],
        //   handlers: {
        //     image: imageHandler
        //   }
      },
    }),
    []
  );

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
                    deadline: "",
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    if (!content) {
                      showErrorToast("Body is required")(dispatch);
                      return;
                    }
                    values.content = content;
                    values.comment = comment;
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
                        <Col md="11" className="form-group h6">
                          <label className="form-label">
                            <b>Title:</b>
                          </label>
                          <Field
                            type="text"
                            name="header"
                            className="form-control border-secondary"
                            id="header"
                            placeholder="Enter assessment topic..."
                          />
                        </Col>
                        {touched.group && errors.group && (
                            <div className="text-danger">{errors.group}</div>
                          )}
                        <Col md="11" className="form-group h6">
                        <label className="form-label" htmlFor="content">
                            <b>Group:</b>
                          </label>
                            <select
                              as="select"
                              name="group"
                              className="form-select"
                              id="group"
                              onChange={(e) => {}}
                            >
                              <option value="">Select Group</option>
                              {[]?.map((item, idx) => (
                                <option key={idx} value={item.sessionClassId}>
                                  {item.sessionClass}
                                </option>
                              ))}
                            </select>
                        </Col>
                        <Col md="11">
                          {touched.content && errors.content && (
                            <div className="text-danger">{errors.content}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6 ">
                          <label className="form-label">
                            <b>Description:</b>
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={textEditorModules}
                            style={{ height: "300px" }}
                          />
                        </Col>

                        <Col md="11" className="form-group h6 mt-5">
                          <label className="form-label" htmlFor="comment">
                            <b>Comment:</b>
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={comment}
                            onChange={setComment}
                            modules={textEditorModules}
                            style={{ height: "100px" }}
                          />
                          {/* <Field
                            as="textarea"
                            name="comment"
                            className="form-control border-secondary"
                            id="comment"
                            onChange={(e) => {
                              setFieldValue("comment", e.target.value);
                            }}
                          /> */}
                        </Col>
                        <Col md="11">
                          {touched.deadline && errors.deadline && (
                            <div className="text-danger">{errors.deadline}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6 mt-5">
                          <label className="form-label" htmlFor="deadline">
                            <b>Deadline:</b>
                          </label>
                          <Field
                            type="date"
                            name="deadline"
                            className="form-control border-secondary"
                            id="deadline"
                            placeholder="Enter date of submission..."
                          />
                        </Col>

                        <Col md="11" className="form-group ">
                            <Field
                              type="checkbox"
                              name="shouldSendForApproval"
                              className="form-check-input "
                              id="shouldSendForApproval"
                            />
                            <label
                              className="form-label mx-1"
                            >
                              <h6>Send to group</h6>
                            </label>
                          </Col>

                          <Row className="d-flex">
                          <Col md="2" className="form-group">
                            <label
                              className="form-label"
                            >
                              <h6>assessment</h6>
                            </label>
                            <Field
                            type="readonly"
                            name="assessment"
                            readOnly
                            className="form-control  py-0"
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label
                              className="form-label"
                            >
                              <h6>remaining</h6>
                            </label>
                            <Field
                            type="text"
                            name="remaining"
                            readOnly
                            className="form-control  py-0"
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label
                              className="form-label"
                            >
                              <h6>type</h6>
                            </label>
                            <Field
                            type="text"
                            name="type"
                            className="form-control border-dark py-0"
                            />
                          </Col>
                          </Row>
                    
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

export default CreateAssessment;
