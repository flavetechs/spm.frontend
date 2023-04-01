import { Field, Formik } from "formik";
import React, { useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { showErrorToast } from "../../../../store/actions/toaster-actions";
import {
  createHomeAssessment,
  getAllClassGroup,
  getAssessmentScore,
  getClassSubjects,
} from "../../../../store/actions/class-actions";
import { openFullscreen } from "../../../../utils/export-csv";
import { getAllStaffClasses } from "../../../../store/actions/results-actions";
import { TextEditorToolBar } from "../../../../utils/tools";

const CreateHomeAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  // const elementRef = useRef(null);
  const state = useSelector((state) => state);
  const { createSuccessful, groupList, assessmentScore, classSubjects } =
    state.class;
  const { staffClasses } = state.results;
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQueryParam = queryParams.get("sessionClassId");
  const sessionClassSubjectIdQueryParam = queryParams.get(
    "sessionClassSubjectId"
  );
  const sessionClassGroupIdQueryParam = queryParams.get("sessionClassGroupId");

  //HOOKS
  React.useEffect(() => {
    getAllClassGroup(
      sessionClassIdQueryParam,
      sessionClassSubjectIdQueryParam
    )(dispatch);
    getAssessmentScore(
      sessionClassSubjectIdQueryParam,
      sessionClassIdQueryParam
    )(dispatch);
    getClassSubjects(sessionClassIdQueryParam)(dispatch);
    getAllStaffClasses()(dispatch);
  }, [dispatch, sessionClassSubjectIdQueryParam, sessionClassIdQueryParam]);

  React.useEffect(() => {
    createSuccessful && history.goBack();
  }, [createSuccessful, history]);

  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");
  // const [fullScreen, setFullScreen] = useState(false);
  const [assessmentScoreMax, setAssessmentScoreMax] = useState(false);
  const textEditorModules = useMemo(() => ({ toolbar: TextEditorToolBar }), []);
  //HOOKS

  //VALIDATION
  const validation = Yup.object().shape({
    title: Yup.string().required("Subject is required"),
    assessmentScore: Yup.number()
      .required("Score is required")
      .min(0, "Assessment score must not be below 0"),
    timeDeadLine: Yup.string().required("Please enter a deadline time"),
    dateDeadLine: Yup.string().required("Please enter a deadline date"),
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
                    assessmentScore:
                      0 ||
                      assessmentScore?.totalAssessment - assessmentScore?.used,
                    sessionClassId: sessionClassIdQueryParam,
                    sessionClassSubjectId: sessionClassSubjectIdQueryParam,
                    sessionClassGroupId: sessionClassGroupIdQueryParam,
                    shouldSendToStudents: false,
                    timeDeadLine: "",
                    dateDeadLine: "",
                    total: assessmentScore?.totalAssessment || "",
                    used: assessmentScore?.used || "",
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
                      <Row className="d-flex justify-content-center">
                        <Col md="11">
                          <h5 className="mb-3">
                            {
                              staffClasses?.find(
                                (i) =>
                                  i.sessionClassId === sessionClassIdQueryParam
                              )?.sessionClass
                            }
                          </h5>
                        </Col>
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
                            onChange={(e) => {
                              setFieldValue("title", e.target.value);
                            }}
                          />
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label">
                            <b>Subject:</b>
                          </label>
                          <Field
                            as="select"
                            disabled={true}
                            name="sessionClassSubjectId"
                            className="form-select"
                            id="sessionClassSubjectId"
                            onChange={(e) => {
                              setFieldValue(
                                "sessionClassSubjectId",
                                e.target.value
                              );
                            }}
                          >
                            <option value="">Select Subject</option>
                            {classSubjects?.map((item, idx) => (
                              <option
                                key={idx}
                                value={item?.sessionClassSubjectId || ""}
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
                            disabled={true}
                            onChange={(e) => {
                              setFieldValue(
                                "sessionClassGroupId",
                                e.target.value
                              );
                            }}
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
                            {/* <div className="">
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
                                    // openFullscreen("assessment-editor");
                                    // setFullScreen(true);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
                                </svg>
                              </OverlayTrigger>
                            </div> */}
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={textEditorModules}
                            // ref={elementRef}
                            id="assessment-editor"
                            style={{ height: "300px",maxHeight:'300px', background: "white" }}
                          />
                        </Col>
                       
                        <Col md="11" className="form-group h6"style={{marginTop:'85px'}}>
                          <label className="form-label" htmlFor="comment">
                            <b>Comment:</b>
                          </label>
                          <ReactQuill
                            theme="snow"
                            value={comment}
                            onChange={setComment}
                            modules={textEditorModules}
                            style={{ height: "100px",maxHeight:'100px' }}
                          />
                        </Col>
                      
                       
                        <Row className=" " style={{marginTop:'85px'}}>
                          <Col md="6" className="form-group h6 mx-0 mx-md-4">
                            {touched.dateDeadLine && errors.dateDeadLine && (
                              <div className="text-danger">
                                {errors.dateDeadLine}
                              </div>
                            )}
                            <label className="form-label">
                              <b>Deadline Date:</b>
                            </label>
                            <Field
                              type="date"
                              name="dateDeadLine"
                              className="form-control border-secondary h6"
                              id="dateDeadLine"
                              onChange={(e) => {
                                setFieldValue("dateDeadLine", e.target.value);
                              }}
                            />
                          </Col>

                          <Col md="5" className="form-group h6">
                            {touched.timeDeadLine && errors.timeDeadLine && (
                              <div className="text-danger">
                                {errors.timeDeadLine}
                              </div>
                            )}
                            <label className="form-label">
                              <b>Deadline Time:</b>
                            </label>
                            <Field
                              type="time"
                              name="timeDeadLine"
                              className="form-control border-secondary h6"
                              id="timeDeadLine"
                              onChange={(e) => {
                                setFieldValue("timeDeadLine", e.target.value);
                              }}
                            />
                          </Col>
                        </Row>
                       
                        <Col md="11" className="form-group ">
                          <Field
                            type="checkbox"
                            name="shouldSendToStudents"
                            className="form-check-input "
                            id="shouldSendToStudents"
                            onClick={(e) => {
                              setFieldValue(
                                "shouldSendToStudents",
                                e.target.value
                              );
                            }}
                          />
                          <label className="form-label mx-1">
                            <h6>Send to Students</h6>
                          </label>
                        </Col>

                        <Col md="11">
                          {errors.assessmentScore && (
                            <div className="text-danger">
                              {errors.assessmentScore}
                            </div>
                          )}
                          {assessmentScoreMax > assessmentScore?.unused && (
                            <div className="text-danger">
                              {`Assessment score must not be above ${assessmentScore?.unused}`}
                            </div>
                          )}
                        </Col>

                        <Col md="11">
                          <div className="d-flex">
                            <Col md="4" className="form-group">
                              <label className="form-label">
                                <h6>total</h6>
                              </label>
                              <Field
                                type="readonly"
                                name="total"
                                readOnly
                                className="form-control h6 py-0 px-1"
                                onChange={(e) => {
                                  setFieldValue("total", e.target.value);
                                }}
                              />
                            </Col>
                            <Col md="4" className="form-group mx-2">
                              <label className="form-label">
                                <h6>
                                  used out of {assessmentScore?.totalAssessment}{" "}
                                  marks
                                </h6>
                              </label>
                              <Field
                                type="text"
                                name="used"
                                readOnly
                                className="form-control h6 py-0 px-1"
                                onChange={(e) => {
                                  setFieldValue("used", e.target.value);
                                }}
                              />
                            </Col>

                            <Col md="4" className="form-group">
                              <label className="form-label">
                                <h6>assessment mark</h6>
                              </label>
                              <Field
                                type="number"
                                name="assessmentScore"
                                className="form-control h6 py-0 px-1"
                                onChange={(e) => {
                                  setAssessmentScoreMax(e.target.value);
                                  setFieldValue(
                                    "assessmentScore",
                                    e.target.value
                                  );
                                }}
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
                              history.goBack();
                            }}
                          >
                            Cancel
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
