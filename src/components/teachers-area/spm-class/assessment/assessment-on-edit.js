import { Field, Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { showErrorToast } from "../../../../store/actions/toaster-actions";
import { classLocations } from "../../../../router/spm-path-locations";
import {
  getAllClassGroup,
  getAssessmentScore,
  getSingleHomeAssessment,
  sendAssesmentToStudents,
  updateHomeAssessment,
} from "../../../../store/actions/class-actions";
import { openFullscreen } from "../../../../utils/export-csv";

const EditAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const elementRef = useRef(null);
  const state = useSelector((state) => state);
  const { createSuccessful, groupList, singleHomeAssessmentList,assessmentScore } = state.class;
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const sessionClassSubjectIdQuery = queryParams.get("sessionClassSubjectId");
  const homeAssessmentIdQuery = queryParams.get("homeAssessmentId");
  const typeQuery = queryParams.get("type");

//HOOKS
  useEffect(() => {
    getSingleHomeAssessment(
      homeAssessmentIdQuery,
      sessionClassIdQuery
    )(dispatch);
    getAllClassGroup(sessionClassIdQuery)(dispatch);
  }, []);

  useEffect(() => {
    if(singleHomeAssessmentList?.sessionClassSubjectId){
    getAssessmentScore(singleHomeAssessmentList?.sessionClassSubjectId,sessionClassIdQuery)(dispatch);
    }
  }, [singleHomeAssessmentList]);

  useEffect(() => {
    createSuccessful &&
      history.push(
        `${classLocations.assessment}?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${sessionClassSubjectIdQuery}&type=${typeQuery}`
      );
  }, [createSuccessful]);

  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    setContent(singleHomeAssessmentList?.content);
  }, [singleHomeAssessmentList]);

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
//HOOKS

//VALIDATION
     const validation = Yup.object().shape({
      title: Yup.string().required("Subject is required"),
      assessmentScore: Yup.number().required("Score is required")
      .min(0, "Assessment score must not be below 0")
      .max(assessmentScore?.unused, `Assessment score must not be above ${assessmentScore?.unused}`),
      // deadline: Yup.string().required("Please enter who to send"),
      sessionClassGroupId: Yup.string().required("Please select group"),
    });
 //VALIDATION
console.log("hi",sessionClassSubjectIdQuery);
  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    homeAssessmentId: homeAssessmentIdQuery,
                    title: singleHomeAssessmentList?.title,
                    assessmentScore: singleHomeAssessmentList?.assessmentScore,
                    sessionClassId: sessionClassIdQuery,
                    sessionClassSubjectId: singleHomeAssessmentList?.sessionClassSubjectId,
                    sessionClassGroupId: singleHomeAssessmentList?.sessionClassGroupId,
                    shouldSendToStudents:singleHomeAssessmentList?.status !== "saved",
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
                    values.shouldSendToStudents == true && sendAssesmentToStudents(homeAssessmentIdQuery,values.shouldSendToStudents)(dispatch);
                    updateHomeAssessment(values)(dispatch);
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
                      <div className="d-flex justify-content-end h6 mb-3">{singleHomeAssessmentList?.sessionClassSubjectName}</div>
                      <Row className="d-flex justify-content-center">
                        <Col md="11">
                          {touched.title && errors.title && (
                            <div className="text-danger">{errors.title}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label" htmlFor="title">
                            <b>Topic:</b>
                          </label>
                          <Field
                            type="text"
                            name="title"
                            className="form-control border-secondary h6"
                            id="title"
                          />
                        </Col>
                        {touched.sessionClassGroupId &&
                          errors.sessionClassGroupId && (
                            <div className="text-danger">
                              {errors.sessionClassGroupId}
                            </div>
                          )}
                        <Col md="11" className="form-group h6">
                          <label className="form-label" htmlFor="content">
                            <b>Group:</b>
                          </label>
                          <Field
                            as="select"
                            name="sessionClassGroupId"
                            className="form-select h6"
                            id=" sessionClassGroupId"
                          >
                            <option value="all-students">All Students</option>
                            {groupList?.map((item, idx) => (
                              <option
                                key={idx}
                                value={item.groupId}
                                selected={
                                  singleHomeAssessmentList?.sessionClassGroupId == item.groupId
                                }
                              >
                                {item.groupName}
                              </option>
                            ))}
                          </Field>
                        </Col>
                        <Col md="11">
                          {touched.content && errors.content && (
                            <div className="text-danger">{errors.content}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6 ">
                          <label  className="form-label d-flex justify-content-between" htmlFor="content">
                            <b>Description:</b>
                            <div className="">
                              {/* {!fullScreen ? ( */}
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      view full screen
                                    </Tooltip>
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="mx-2"
                                    onClick={() => {
                                      openFullscreen("assessment-editor");
                                      setFullScreen(true);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
                                  </svg>
                                </OverlayTrigger>
                            </div>
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={textEditorModules}
                            ref={elementRef}
                            id="assessment-editor"
                            style={{ height: "300px", background:"white"}}
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
                        </Col>
                        <Col md="11">
                          {touched.deadline && errors.deadline && (
                            <div className="text-danger">{errors.deadline}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label mt-5" htmlFor="deadline">
                            <b>Deadline:</b>
                          </label>
                          <Field
                            type="date"
                            name="deadline"
                            className="form-control border-secondary h6"
                            id="deadline"
                            placeholder="Enter date of submission..."
                          />
                        </Col>
                        <Col md="11" className="form-group ">
                          <Field
                            type="checkbox"
                            name="shouldSendToStudents"
                            className="form-check-input "
                            id="shouldSendToStudents"
                       
                          />
                          <label className="form-label mx-1">
                            <h6>Send to Students</h6>
                          </label>
                        </Col>
                        <Row>
                           <div>
                              {touched.assessmentScore &&
                                errors.assessmentScore && (
                                  <div className="text-danger">
                                    {errors.assessmentScore}
                                  </div>
                                )}
                            </div>
                          </Row>
                        <Row className="d-flex">
                          <Col md="2" className="form-group">
                            <label className="form-label">
                              <h6>total</h6>
                            </label>
                            <Field
                              type="readonly"
                              name="total"
                              readOnly
                              value={assessmentScore?.totalAssessment}
                              className="form-control h6 py-0"
                            />
                          </Col>
                          <Col md="2" className="form-group">
                            <label className="form-label">
                              <h6>used</h6>
                            </label>
                            <Field
                              type="text"
                              name="used"
                              readOnly
                              value={assessmentScore?.used}
                              className="form-control h6 py-0"
                            />
                          </Col>
                        
                          <Col md="2" className="form-group">
                            <label className="form-label">
                              <h6>assessment</h6>
                            </label>
                            <Field
                              type="number"
                              name="assessmentScore"
                              className="form-control border-dark h6 py-0 px-1"
                            />
                          </Col>
                        </Row>

                        <div className="d-flex justify-content-end">
                          <Button
                            type="button"
                            className="btn-sm mt-4"
                            variant="btn btn-danger"
                            onClick={() => {
                              history.goBack()
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

export default EditAssessment;
