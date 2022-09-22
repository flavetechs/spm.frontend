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
  const statusQuery = queryParams.get("status");
  useEffect(() => {
    if (homeAssessmentFeedBackIdQuery !== "null") {
   getSingleStudentHomeAssessment(
    homeAssessmentFeedBackIdQuery
  )(dispatch);
    } else {
      getSingleHomeAssessment(homeAssessmentIdQuery,"")(dispatch)
    }
  }, [ homeAssessmentFeedBackIdQuery,homeAssessmentIdQuery,dispatch]);

  React.useEffect(() => {
    setContent(homeAssessmentFeedBackIdQuery !=="null" && studentSingleHomeAssessmentList?.content);
  }, [studentSingleHomeAssessmentList,homeAssessmentFeedBackIdQuery]);

  React.useEffect(() => {
    createSuccessful &&  history.push(
      `${assessmentLocations.assessment}?status=${studentSingleHomeAssessmentList?.status}`
    );
    setFilesArray([]);
  }, [createSuccessful,history,studentSingleHomeAssessmentList?.status]);
  
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
const previousFiles = filesArray.filter(i=>i !== newFiles);
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
                  <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                    >
                      <svg
                        onClick={() => {
                          history.goBack();
                        }}
                        style={{ cursor: "pointer" }}
                        className=" text-primary"
                        width="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </OverlayTrigger>
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
                  {/* <div>
                    Created:
                    <span className="text-end text-primary">
                    </span>
                  </div> */}
                  <div>
                    Deadline:
                    <span className="text-end text-primary">
                    {studentSingleHomeAssessmentList?.assessment.dateDeadLine}{' '}{studentSingleHomeAssessmentList?.assessment.timeDeadLine}
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
                      {homeAssessmentFeedBackIdQuery !=="null" ? studentSingleHomeAssessmentList?.assessment?.title : singleHomeAssessmentList?.title}
                    </span>
                    <br />
                  </div>
                </div>
                <div
                  style={{ minHeight: "25vh" }}
                  dangerouslySetInnerHTML={{
                    __html: homeAssessmentFeedBackIdQuery !=="null" ? studentSingleHomeAssessmentList?.assessment?.content : singleHomeAssessmentList?.content,
                  }}
                ></div>
                <hr />
                <div className="h5 text-secondary fw-bold mb-2"> Comment</div>
                <div
                 style={{ minHeight: "25vh" }}
                  dangerouslySetInnerHTML={{
                    __html: homeAssessmentFeedBackIdQuery !=="null" ? studentSingleHomeAssessmentList?.assessment?.comment : singleHomeAssessmentList?.comment,
                  }}
                ></div>
                <hr />
                <Formik
                      initialValues={{
                        files:homeAssessmentFeedBackIdQuery !=="null" && studentSingleHomeAssessmentList?.files,
                        content: "",
                        shouldSubmit: studentSingleHomeAssessmentList?.status === 3 ?true : false,
                        homeAssessmentId:homeAssessmentFeedBackIdQuery !=="null" ? studentSingleHomeAssessmentList?.homeAssessmentId : singleHomeAssessmentList?.homeAssessmentId ,
                        homeAssessmentFeedBackId:homeAssessmentFeedBackIdQuery !=="null" ? homeAssessmentFeedBackIdQuery: "" ,
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
                        submitStudentAssessment(params,statusQuery)(dispatch);
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
