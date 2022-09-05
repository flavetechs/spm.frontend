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
import { createHomeAssessment, getAllClassGroup, getAssessmentScore, getClassSubjects } from "../../../../store/actions/class-actions";
import { openFullscreen } from "../../../../utils/export-csv";
import { getAllStaffClasses } from "../../../../store/actions/results-actions";

const CreateHomeAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const elementRef = useRef(null);
  const state = useSelector((state) => state);
  const { createSuccessful, groupList, assessmentScore, classSubjects } = state.class;
  const { staffClasses } = state.results;
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const sessionClassSubjectIdQuery = queryParams.get("sessionClassSubjectId");
  const sessionClassGroupIdQuery = queryParams.get("sessionClassGroupId");
  const typeQuery = queryParams.get("type");

  //HOOKS
  React.useEffect(() => {
    getAllClassGroup(sessionClassIdQuery,sessionClassSubjectIdQuery)(dispatch);
    getAssessmentScore(sessionClassSubjectIdQuery, sessionClassIdQuery)(dispatch);
    getClassSubjects(sessionClassIdQuery)(dispatch);
    getAllStaffClasses()(dispatch);
  }, []);

  React.useEffect(() => {
    createSuccessful &&
      history.goBack();
  }, [createSuccessful]);

  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const [assessmentScoreMax, setAssessmentScoreMax] = useState(false);
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
      .min(0, "Assessment score must not be below 0"),
     deadline: Yup.string().required("Please enter a deadline"),
    sessionClassGroupId: Yup.string().required("Please select group"),
  });
  //VALIDATION

  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    title: "",
                    content: "",
                    assessmentScore: "",
                    sessionClassId: sessionClassIdQuery || '',
                    sessionClassSubjectId: sessionClassSubjectIdQuery || '',
                    sessionClassGroupId: sessionClassGroupIdQuery != "null" ? sessionClassGroupIdQuery : 'all-students',
                    shouldSendToStudents: false,
                    deadline: "",
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    if (!content) {
                      showErrorToast("Assessment is required")(dispatch);
                      return;
                    }
                    values.content = content;
                    values.comment = comment;
                    createHomeAssessment(values)(dispatch);
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
                      <h6 className="mb-3 d-flex justify-content-end">{staffClasses?.find(i=>i.sessionClassId == sessionClassIdQuery)?.sessionClass}</h6>
                      <Row className="d-flex justify-content-center">
                        <Col md="11">
                          {touched.title && errors.title && (
                            <div className="text-danger">{errors.title}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label">
                            <b>Title:</b>
                          </label>
                          <Field
                            type="text"
                            name="title"
                            className="form-control border-secondary h6"
                            id="title"
                            placeholder="Enter assessment topic..."
                          />
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label">
                            <b>Subject:</b>
                          </label>
                          <Field
                            as="select"
                            name="sessionClassSubjectId"
                            className="form-select"
                            id="sessionClassSubjectId"
                          >
                            <option value="">Select Subject</option>
                            {classSubjects?.map((item, idx) => (
                              <option
                                key={idx}
                                value={item?.sessionClassSubjectId || ''}
                              >
                                {item.subjectName}
                              </option>
                            ))}
                          </Field>
                        </Col>
                        <Col md="11">
                        {touched.sessionClassGroupId &&
                          errors.sessionClassGroupId && (
                            <div className="text-danger">
                              {errors.sessionClassGroupId}
                            </div>
                          )}
                          </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label">
                            <b>Group:</b>
                          </label>
                          <Field
                            as="select"
                            name="sessionClassGroupId"
                            className="form-select h6"
                            id=" sessionClassGroupId"
                          >
                           <option value="">Select Group</option>
                            <option value="all-students">All Students</option>
                            {groupList?.map((item, idx) => (
                              <option key={idx} value={item.groupId}>
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
                          <label className="form-label d-flex justify-content-between">
                            <b>Assessment:</b>
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
                            style={{ height: "300px", background: "white" }}
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
                        <Col md="11" className="mt-5">
                          {touched.deadline && errors.deadline && (
                            <div className="text-danger">{errors.deadline}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label" htmlFor="deadline">
                            <b>Deadline:</b>
                          </label>
                          <Field
                            type="date"
                            name="deadline"
                            className="form-control h6 border-secondary"
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

                  
                        
                          <Col md="11">
                            {
                              errors.assessmentScore && (
                                <div className="text-danger">
                                  {errors.assessmentScore}
                                </div>
                              )}
                              {assessmentScoreMax > assessmentScore?.unused &&
                               <div className="text-danger">
                              {`Assessment score must not be above ${assessmentScore?.unused}`}
                              </div>
                              }
                          </Col>
                        
                          <Col md="11">
                        <div className="d-flex">
                          <Col md="2" className="form-group">
                            <label className="form-label">
                              <h6>total</h6>
                            </label>
                            <Field
                              type="readonly"
                              name="total"
                              readOnly
                              value={assessmentScore?.totalAssessment}
                              className="form-control h6 py-0 px-1"
                            />
                          </Col>
                          <Col md="2" className="form-group mx-2">
                            <label className="form-label">
                              <h6>used</h6>
                            </label>
                            <Field
                              type="text"
                              name="used"
                              readOnly
                              value={assessmentScore?.used}
                              className="form-control h6 py-0 px-1"
                            />
                          </Col>

                          <Col md="2" className="form-group">
                            <label className="form-label">
                              <h6>assessment</h6>
                            </label>
                            <Field
                              type="number"
                              name="assessmentScore"
                              className="form-control h6 py-0 px-1"
                              onChange={(e)=>{setAssessmentScoreMax(e.target.value); setFieldValue("assessmentScore",e.target.value)}}
                            />
                          </Col>
                        </div>
                        </Col>
                      
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

export default CreateHomeAssessment;
