import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getSingleHomeAssessment, getSingleStudentHomeAssessment, submitStudentAssessment } from "../../../store/actions/class-actions";
import { closeFullscreen, openFullscreen } from "../../../utils/export-csv";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Field, Formik } from "formik";
import { showErrorToast } from "../../../store/actions/toaster-actions";
import { assessmentLocations } from "../../../router/students-path-locations";

const StudentAssessmentDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [filesArray, setFilesArray] = useState([]);
  const state = useSelector((state) => state);
  const { studentSingleHomeAssessmentList, singleHomeAssessmentList, createSuccessful } = state.class;
  //VARIABLE DECLARATIONS
  const queryParams = new URLSearchParams(location.search);
  const homeAssessmentFeedBackIdQuery = queryParams.get("homeAssessmentFeedBackId");
  const homeAssessmentIdQuery = queryParams.get("homeAssessmentId");
  useEffect(() => {
    if (homeAssessmentFeedBackIdQuery != "null") {
   getSingleStudentHomeAssessment(
    homeAssessmentFeedBackIdQuery
  )(dispatch);
    } else {
      getSingleHomeAssessment(homeAssessmentIdQuery,"")(dispatch)
    }
    setFilesArray([]);
  }, []);

  React.useEffect(() => {
    setContent(homeAssessmentFeedBackIdQuery !="null" && studentSingleHomeAssessmentList?.content);
  }, [studentSingleHomeAssessmentList]);

  React.useEffect(() => {
    createSuccessful &&  history.push(
      `${assessmentLocations.assessment}?status=${studentSingleHomeAssessmentList?.status}`
    );
  }, [createSuccessful]);
  
  const [content, setContent] = useState('');
  const textEditorModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', "strike"],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['image', "link",],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
      ],
      //   handlers: {
      //     image: imageHandler
      //   }
    },
  }), []);

  const createFileArray = (event) => {
const newFiles = event.target.files[0];
const previousFiles = filesArray.filter(i=>i != newFiles);
const files = [...previousFiles,newFiles]
setFilesArray(files);
  }

  return (
    <>
      <div>
        <Row className="d-md-flex justify-content-center">
          <Col sm="12">
            <Card
              id="details"
              ref={elementRef}
              style={{ overflow: fullScreen && "scroll" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between mt-3 flex-wrap">
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mx-2"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      Back
                    </button>
                    {!fullScreen ? (
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
                            openFullscreen("details");
                            setFullScreen(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
                        </svg>
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            exit full screen
                          </Tooltip>
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            closeFullscreen("details");
                            setFullScreen(false);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M16.586 19.414l-2.586 2.586v-8h8l-2.586 2.586 4.586 4.586-2.828 2.828-4.586-4.586zm-13.758-19.414l-2.828 2.828 4.586 4.586-2.586 2.586h8v-8l-2.586 2.586-4.586-4.586zm16.586 7.414l2.586 2.586h-8v-8l2.586 2.586 4.586-4.586 2.828 2.828-4.586 4.586zm-19.414 13.758l2.828 2.828 4.586-4.586 2.586 2.586v-8h-8l2.586 2.586-4.586 4.586z" />
                        </svg>
                      </OverlayTrigger>
                    )}
                  </div>
                  <div>
                    Created:
                    <span className="text-end text-primary">
                      {/* {singleHomeAssessmentList?.find(i=>i)?.title} */}
                    </span>
                  </div>
                  <div>
                    Deadline:
                    <span className="text-end text-primary">
                      {/* {singleHomeAssessmentList?.find(i=>i)?.title} */}
                    </span>
                  </div>
                </div>
              <div className="d-flex justify-content-start my-4">
                  <div>
                    <button
                      type="button"
                      className="btn btn-soft-secondary btn-icon rounded-circle avatar-50 d-flex align-items-center justify-content-center"
                    >
                      <span>
                        <svg
                          className="icon-32"
                          width="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.7379 2.76175H8.08493C6.00493 2.75375 4.29993 4.41175 4.25093 6.49075V17.2037C4.20493 19.3167 5.87993 21.0677 7.99293 21.1147C8.02393 21.1147 8.05393 21.1157 8.08493 21.1147H16.0739C18.1679 21.0297 19.8179 19.2997 19.8029 17.2037V8.03775L14.7379 2.76175Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14.4751 2.75V5.659C14.4751 7.079 15.6231 8.23 17.0431 8.234H19.7981"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14.2882 15.3584H8.88818"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.2432 11.606H8.88721"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="ms-2 mt-2 ">
                    <span className="h5 text-secondary fw-bold">
                      {homeAssessmentFeedBackIdQuery !="null" ? studentSingleHomeAssessmentList?.assessment?.title : singleHomeAssessmentList?.title}
                    </span>
                    <br />
                  </div>
                </div>
                <div
                  style={{ minHeight: "25vh" }}
                  dangerouslySetInnerHTML={{
                    __html: homeAssessmentFeedBackIdQuery !="null" ? studentSingleHomeAssessmentList?.assessment?.content : singleHomeAssessmentList?.content,
                  }}
                ></div>
                <hr />
                <div className="h5 text-secondary fw-bold mb-2"> Comment</div>
                <div
                 style={{ minHeight: "25vh" }}
                  dangerouslySetInnerHTML={{
                    __html: homeAssessmentFeedBackIdQuery !="null" ? studentSingleHomeAssessmentList?.assessment?.comment : singleHomeAssessmentList?.comment,
                  }}
                ></div>
                <hr />
                <Formik
                      initialValues={{
                        files:homeAssessmentFeedBackIdQuery !="null" && studentSingleHomeAssessmentList?.files,
                        content: "",
                        shouldSubmit: studentSingleHomeAssessmentList?.status == 3 ?true : false,
                        homeAssessmentId:homeAssessmentFeedBackIdQuery !="null" ? studentSingleHomeAssessmentList?.homeAssessmentId : singleHomeAssessmentList?.homeAssessmentId ,
                        homeAssessmentFeedBackId:homeAssessmentFeedBackIdQuery !="null" ? homeAssessmentFeedBackIdQuery: "" ,
                      }}
                      enableReinitialize={true}
                      onSubmit={(values) => {
                        if(!content){
                          showErrorToast('Body is required')(dispatch);
                          return;
                        }
                        values.content = content;
                        values.files = filesArray;
                        const params = new FormData();
                        params.append("files",values.files);
                        params.append("content",values.content);
                        params.append("shouldSubmit",values.shouldSubmit);
                        params.append("homeAssessmentId",values.homeAssessmentId);
                        params.append("homeAssessmentFeedBackId",values.homeAssessmentFeedBackId);
                        submitStudentAssessment(params)(dispatch);
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
                        <div className="h5 text-secondary fw-bold mb-2"> Answer(s)</div>
                          <Row className="d-flex justify-content-center">  
                            <Col md="11" className="form-group text-dark">
                              <label className="form-label h6" >
                                <b>Upload file:</b>
                              </label>
                              <input
                                type="file"
                                name="files"
                                className="form-control border-secondary "
                                id="files"
                                multiple
                                onChange={(event)=>{ createFileArray(event) }}
                              />
                            </Col>
                            <Col md="11">
                              {touched.content && errors.content && (
                                <div className="text-danger">{errors.content}</div>
                              )}
                            </Col>
                            <Col md="11" className="form-group text-dark ">
                              <label className="form-label d-flex justify-content-end h6">
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
                                      openFullscreen("note-editor");
                                     // setFullScreen(true);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
                                  </svg>
                                </OverlayTrigger>
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={textEditorModules}
                                id="note-editor"
                                ref={elementRef}
                                className="bg-white"
                                style={{height: '300px'}}
                              />
                            </Col>
    
                        
                            <Col md="11" className="form-group text-dark mt-5">
                              <Field
                                type="checkbox"
                                name="shouldSubmit"
                                className="form-check-input"
                                id="shouldSubmit"
                              />
                                 <label className="form-label mx-1 h6">
                                <b>Submit Assessment</b>
                              </label>
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
                                Submit
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

export default StudentAssessmentDetails;
