import React, { useEffect, useMemo, useRef, useState } from "react";
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
// import "react-quill/dist/quill.snow.css";
import { Field, Formik } from "formik";
import { getSingleStudentHomeAssessment, submitStudentAssessment } from "../../../store/actions/class-actions";
import { closeFullscreen, openFullscreen } from "../../../utils/export-csv";
import { showErrorToast } from "../../../store/actions/toaster-actions";
import { TextEditorToolBar } from "../../../utils/tools";

const ParentAssessmentDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [filesArray, setFilesArray] = useState(null);
  const state = useSelector((state) => state);
  const [content, setContent] = useState("");
  const {
    studentSingleHomeAssessment,
    singleHomeAssessment,
  } = state.class;
  //VARIABLE DECLARATIONS
  const queryParams = new URLSearchParams(location.search);
  const homeAssessmentFeedBackIdQuery = queryParams.get("homeAssessmentFeedBackId");
  const homeAssessmentIdQuery = queryParams.get("homeAssessmentId");
  useEffect(() => {
    if (homeAssessmentFeedBackIdQuery !== "null") {
      getSingleStudentHomeAssessment(homeAssessmentFeedBackIdQuery)(dispatch);
    } 
  }, [homeAssessmentFeedBackIdQuery, dispatch]);

  React.useEffect(() => {
    setContent(
      homeAssessmentFeedBackIdQuery !== "null" &&
        studentSingleHomeAssessment?.content
    );
  }, [studentSingleHomeAssessment, homeAssessmentFeedBackIdQuery]);

//   React.useEffect(() => {
//     createSuccessful &&
//       history.push(`${assessmentLocations.assessment}?status=${3}`);
//     setFilesArray([]);
//   }, [createSuccessful, history, studentSingleHomeAssessment?.status]);

  const textEditorModules = useMemo(() => ({ toolbar: TextEditorToolBar }), []);

  console.log("homeAssessmentFeedBackIdQuery", homeAssessmentFeedBackIdQuery);
  console.log("studentSingleHomeAssessment", studentSingleHomeAssessment);
 
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
                 
                </div>
                <Row>
                  <Col md="8">
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
                          {homeAssessmentFeedBackIdQuery !== "null"
                            ? studentSingleHomeAssessment?.assessment?.title
                            : singleHomeAssessment?.title}
                        </span>
                        <br />
                      </div>
                    </div>
                    <div
                      className="mx-5"
                      style={{ minHeight: "25vh" }}
                      dangerouslySetInnerHTML={{
                        __html:
                          homeAssessmentFeedBackIdQuery !== "null"
                            ? studentSingleHomeAssessment?.assessment?.content
                            : singleHomeAssessment?.content,
                      }}
                    ></div>
                  </Col>
                  <Col md="4">
                    <div className="table-responsive">
                      <table
                        id="role-list-table"
                        className="table  table-borderless table-sm"
                        role="grid"
                        data-toggle="data-table"
                      >
                        <tbody>
                          <tr>
                            <td className="">Subject</td>
                            <td className="text-uppercase">
                              {homeAssessmentFeedBackIdQuery !== "null"
                                ? studentSingleHomeAssessment?.assessment
                                    .sessionClassSubjectName
                                : singleHomeAssessment?.sessionClassSubjectName}
                            </td>
                          </tr>
                          <tr>
                            <td className="">Teacher's name</td>
                            <td>
                              {homeAssessmentFeedBackIdQuery !== "null"
                                ? studentSingleHomeAssessment?.teacherName
                                : singleHomeAssessment?.teacherName}
                            </td>
                          </tr>
                          <tr>
                            <td className=""> Deadline</td>
                            <td>
                              {homeAssessmentFeedBackIdQuery !== "null"
                                ? `${
                                    studentSingleHomeAssessment?.assessment
                                      .dateDeadLine
                                  }${" "}
                             ${
                               studentSingleHomeAssessment?.assessment
                                 .timeDeadLine
                             }`
                                : `${
                                    singleHomeAssessment?.dateDeadLine
                                  }${" "}
                           ${singleHomeAssessment?.timeDeadLine}`}
                            </td>
                          </tr>
                          <tr>
                            <td>Status</td>
                            <td>
                              <div
                                className={
                                  homeAssessmentFeedBackIdQuery !== "null"
                                    ? (studentSingleHomeAssessment?.assessment
                                        .status === "submitted"
                                      ? "badge bg-success"
                                      : studentSingleHomeAssessment?.assessment.status === "open"
                                      ? "badge bg-warning"
                                      : "badge bg-danger")
                                    : (singleHomeAssessment?.status === "submitted"
                                    ? "badge bg-success"
                                    : singleHomeAssessment?.status === "open"
                                    ? "badge bg-warning"
                                    : "badge bg-danger")
                                }
                              >
                                {homeAssessmentFeedBackIdQuery !== "null"
                                  ? studentSingleHomeAssessment?.assessment
                                      .status
                                  : singleHomeAssessment?.status}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Score</td>
                            <td>{homeAssessmentFeedBackIdQuery !== "null"
                                  ? studentSingleHomeAssessment?.score
                                  : singleHomeAssessment?.score}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>
                </Row>
                <hr />
                <div className="h5 text-secondary fw-bold mb-2 mx-5">
                  {" "}
                  Comment
                </div>
                <div
                  className="mx-5"
                  style={{ minHeight: "25vh" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      homeAssessmentFeedBackIdQuery !== "null"
                        ? studentSingleHomeAssessment?.assessment?.comment
                        : singleHomeAssessment?.comment,
                  }}
                ></div>
                <hr />
                <Formik
                  initialValues={{
                    files:
                      homeAssessmentFeedBackIdQuery !== "null" &&
                      studentSingleHomeAssessment?.files,
                    content: "",
                    shouldSubmit:
                      studentSingleHomeAssessment?.status === 3 ? true : false,
                    homeAssessmentId:
                      homeAssessmentFeedBackIdQuery !== "null"
                        ? studentSingleHomeAssessment?.homeAssessmentId
                        : singleHomeAssessment?.homeAssessmentId,
                    homeAssessmentFeedBackId:
                      homeAssessmentFeedBackIdQuery !== "null"
                        ? homeAssessmentFeedBackIdQuery
                        : "",
                  }}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    if (!content) {
                      showErrorToast("Body is required")(dispatch);
                      return;
                    }
                    values.content = content;
                    values.files = filesArray;
                    const params = new FormData();
                    params.append("files", values.files);
                    params.append("content", values.content);
                    params.append("shouldSubmit", values.shouldSubmit);
                    params.append("homeAssessmentId", values.homeAssessmentId);
                    params.append(
                      "homeAssessmentFeedBackId",
                      values.homeAssessmentFeedBackId
                    );
                    submitStudentAssessment(params, 3)(dispatch);
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
                      <div className="h5 text-secondary fw-bold mb-2 mx-5">
                        {" "}
                        Answer(s)
                      </div>
                      <Row className="d-flex justify-content-center">
                        <Col md="11" className="form-group h6">
                          <label className="form-label h6">
                            <b>Attachments:</b>
                          </label>
                          <Row>
                            <Col md="3">
                              {studentSingleHomeAssessment?.files.map(
                                (file) => (
                                  <div className="card iq-file-manager">
                                    <div className="card-body card-thumbnail shadow">
                                      <span
                                        href="#"
                                        data-title="PDF"
                                        data-load-file="file"
                                        data-load-target="#resolte-contaniner"
                                        data-url="../file-manager/assets/images/doc-files/demo.pdf"
                                        data-bs-toggle="modal"
                                        data-bs-target="#file-documents"
                                      >
                                        <a
                                          href={file}
                                          target={"_blank"}
                                          rel="noopener noreferrer"
                                          className="p-2 d-flex justify-content-center align-items-center iq-document rounded bg-body"
                                        >
                                          {file.slice(file.length - 3) ===
                                          "pdf" ? (
                                            <svg
                                              width="100"
                                              viewBox="0 0 113 146"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M110.667 47.9166L64.5833 1.83333C63.4124 0.660896 61.8237 0.00145877 60.1667 0H22.9167C16.8388 0 11.0098 2.41443 6.71213 6.71213C2.41443 11.0098 0 16.8388 0 22.9167V122.917C0 128.994 2.41443 134.823 6.71213 139.121C11.0098 143.419 16.8388 145.833 22.9167 145.833H89.5833C95.6612 145.833 101.49 143.419 105.788 139.121C110.086 134.823 112.5 128.994 112.5 122.917V52.0833C112.434 50.5133 111.78 49.0257 110.667 47.9166ZM66.6667 16.6822L95.8178 45.8333H66.6667V16.6822ZM89.5833 137.984H22.9167C20.154 137.984 14.0175 133.01 12.064 131.056C10.1104 129.103 7.84884 125.679 7.84884 122.917V22.9167C7.84884 20.154 10.1104 14.405 12.064 12.4515C14.0175 10.4979 20.154 7.84883 22.9167 7.84883H58.8178V47.4322C58.8394 49.083 59.7337 50.8189 60.9012 51.9863C62.0686 53.1538 63.4169 53.6606 65.0678 53.6822H104.651V122.917C104.651 125.679 102.39 131.428 100.436 133.382C98.4825 135.335 92.346 137.984 89.5833 137.984Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M68.6653 96.6666C63.5411 93.4512 59.6848 88.5645 57.7486 82.8333C59.5429 77.4717 60.0845 71.7702 59.332 66.1666C59.0917 64.7549 58.4032 63.4581 57.3684 62.4681C56.3337 61.4782 55.0077 60.8478 53.5867 60.6701C52.1658 60.4925 50.7254 60.7772 49.4788 61.4819C48.2322 62.1867 47.2457 63.2742 46.6653 64.5833C45.7166 71.32 46.4318 78.1867 48.7486 84.5833C45.5836 91.9771 42.0514 99.2083 38.1653 106.25C32.2486 109.583 24.1653 114.583 22.9153 120.333C21.9153 125 30.6653 137 45.582 111C52.2147 108.538 59.0084 106.533 65.9153 105C71.021 107.919 76.7162 109.656 82.582 110.083C83.9288 110.118 85.2559 109.754 86.3965 109.037C87.537 108.32 88.4401 107.282 88.9923 106.053C89.5444 104.824 89.721 103.459 89.4997 102.13C89.2784 100.801 88.6692 99.567 87.7486 98.5833C84.2486 94.9999 73.832 95.9999 68.6653 96.6666ZM28.832 121.667C31.1673 117.67 34.2514 114.162 37.9153 111.333C32.2486 120.333 28.832 121.917 28.832 121.75V121.667ZM53.1653 64.9166C55.332 64.9166 55.1653 74.4999 53.6653 77.0833C52.5353 73.1533 52.3639 69.0098 53.1653 64.9999V64.9166ZM45.9153 105.583C48.7387 100.432 51.1894 95.0849 53.2486 89.5833C55.4563 93.6914 58.5265 97.2733 62.2486 100.083C56.6575 101.484 51.1938 103.351 45.9153 105.667V105.583ZM85.082 104.083C85.082 104.083 83.582 105.917 73.9986 101.75C84.4153 101.083 86.1653 103.5 85.082 104.167V104.083Z"
                                                fill="#F91D0A"
                                                fill-opacity="0.7"
                                              />
                                            </svg>
                                          ) : file.slice(file.length - 3) ===
                                            "doc" ? (
                                            <svg
                                              width="100"
                                              viewBox="0 0 113 146"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M110.667 47.9166L64.5833 1.83333C63.4124 0.660896 61.8237 0.00145877 60.1667 0H22.9167C16.8388 0 11.0098 2.41443 6.71213 6.71213C2.41443 11.0098 0 16.8388 0 22.9167V122.917C0 128.995 2.41443 134.823 6.71213 139.121C11.0098 143.419 16.8388 145.833 22.9167 145.833H89.5833C95.6612 145.833 101.49 143.419 105.788 139.121C110.086 134.823 112.5 128.995 112.5 122.917V52.0833C112.434 50.5133 111.78 49.0257 110.667 47.9166ZM66.6667 16.6822L95.8178 45.8333H66.6667V16.6822ZM89.5833 137.984H22.9167C20.154 137.984 14.0175 133.01 12.064 131.056C10.1104 129.103 7.84884 125.679 7.84884 122.917V22.9167C7.84884 20.154 10.1104 14.405 12.064 12.4515C14.0175 10.4979 20.154 7.84883 22.9167 7.84883H58.8178V47.4322C58.8394 49.083 59.7337 50.8189 60.9012 51.9863C62.0686 53.1538 63.4169 53.6606 65.0678 53.6822H104.651V122.917C104.651 125.679 102.39 131.428 100.436 133.382C98.4825 135.335 92.346 137.984 89.5833 137.984Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M34.9912 119.603L24.25 78.9857V78.2934C24.25 77.6459 24.4595 77.0158 24.8472 76.4971L25.8764 75.1204C26.4428 74.3628 27.3333 73.9167 28.2792 73.9167H33.1098C33.9071 73.9167 34.6716 74.2341 35.2345 74.7988L36.2531 75.8207C36.6632 76.2321 36.9451 76.7538 37.0644 77.3224L43.6184 108.555L50.9481 77.5069C51.1092 76.8247 51.504 76.2204 52.0642 75.799L53.7647 74.5195C54.2846 74.1283 54.9177 73.9167 55.5684 73.9167H58.3729C59.1703 73.9167 59.9348 74.2341 60.4977 74.7988L61.5449 75.8494C61.9371 76.2429 62.2123 76.7374 62.3399 77.278L69.7237 108.555L76.2777 77.3224C76.397 76.7538 76.6789 76.2321 77.089 75.8207L78.1076 74.7988C78.6705 74.2341 79.435 73.9167 80.2323 73.9167H84.0223C85.0776 73.9167 86.0553 74.4712 86.597 75.3769L87.61 77.0707C88.0197 77.7557 88.1395 78.5757 87.9429 79.3493L77.6401 119.899C77.4258 120.742 76.8556 121.451 76.0776 121.842L74.5691 122.598C74.1516 122.808 73.691 122.917 73.224 122.917H66.4239C65.8301 122.917 65.2497 122.74 64.7561 122.41L63.9601 121.878C63.3342 121.459 62.8887 120.821 62.7118 120.089L56.25 93.3477L49.7882 120.089C49.6113 120.821 49.1658 121.459 48.5399 121.878L47.7439 122.41C47.2503 122.74 46.6699 122.917 46.0761 122.917H38.9692C38.1718 122.917 37.4073 122.599 36.8444 122.035L35.7667 120.953C35.3938 120.579 35.1262 120.113 34.9912 119.603Z"
                                                fill="#096BEE"
                                              />
                                            </svg>
                                          ) : file.slice(file.length - 4) ===
                                            "docx" ? (
                                            <svg
                                              width="100"
                                              viewBox="0 0 113 146"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M110.667 47.9166L64.5833 1.83333C63.4124 0.660896 61.8237 0.00145877 60.1667 0H22.9167C16.8388 0 11.0098 2.41443 6.71213 6.71213C2.41443 11.0098 0 16.8388 0 22.9167V122.917C0 128.995 2.41443 134.823 6.71213 139.121C11.0098 143.419 16.8388 145.833 22.9167 145.833H89.5833C95.6612 145.833 101.49 143.419 105.788 139.121C110.086 134.823 112.5 128.995 112.5 122.917V52.0833C112.434 50.5133 111.78 49.0257 110.667 47.9166ZM66.6667 16.6822L95.8178 45.8333H66.6667V16.6822ZM89.5833 137.984H22.9167C20.154 137.984 14.0175 133.01 12.064 131.056C10.1104 129.103 7.84884 125.679 7.84884 122.917V22.9167C7.84884 20.154 10.1104 14.405 12.064 12.4515C14.0175 10.4979 20.154 7.84883 22.9167 7.84883H58.8178V47.4322C58.8394 49.083 59.7337 50.8189 60.9012 51.9863C62.0686 53.1538 63.4169 53.6606 65.0678 53.6822H104.651V122.917C104.651 125.679 102.39 131.428 100.436 133.382C98.4825 135.335 92.346 137.984 89.5833 137.984Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M34.9912 119.603L24.25 78.9857V78.2934C24.25 77.6459 24.4595 77.0158 24.8472 76.4971L25.8764 75.1204C26.4428 74.3628 27.3333 73.9167 28.2792 73.9167H33.1098C33.9071 73.9167 34.6716 74.2341 35.2345 74.7988L36.2531 75.8207C36.6632 76.2321 36.9451 76.7538 37.0644 77.3224L43.6184 108.555L50.9481 77.5069C51.1092 76.8247 51.504 76.2204 52.0642 75.799L53.7647 74.5195C54.2846 74.1283 54.9177 73.9167 55.5684 73.9167H58.3729C59.1703 73.9167 59.9348 74.2341 60.4977 74.7988L61.5449 75.8494C61.9371 76.2429 62.2123 76.7374 62.3399 77.278L69.7237 108.555L76.2777 77.3224C76.397 76.7538 76.6789 76.2321 77.089 75.8207L78.1076 74.7988C78.6705 74.2341 79.435 73.9167 80.2323 73.9167H84.0223C85.0776 73.9167 86.0553 74.4712 86.597 75.3769L87.61 77.0707C88.0197 77.7557 88.1395 78.5757 87.9429 79.3493L77.6401 119.899C77.4258 120.742 76.8556 121.451 76.0776 121.842L74.5691 122.598C74.1516 122.808 73.691 122.917 73.224 122.917H66.4239C65.8301 122.917 65.2497 122.74 64.7561 122.41L63.9601 121.878C63.3342 121.459 62.8887 120.821 62.7118 120.089L56.25 93.3477L49.7882 120.089C49.6113 120.821 49.1658 121.459 48.5399 121.878L47.7439 122.41C47.2503 122.74 46.6699 122.917 46.0761 122.917H38.9692C38.1718 122.917 37.4073 122.599 36.8444 122.035L35.7667 120.953C35.3938 120.579 35.1262 120.113 34.9912 119.603Z"
                                                fill="#096BEE"
                                              />
                                            </svg>
                                          ) : file.slice(file.length - 4) ===
                                            "xlsx" ? (
                                            <svg
                                              width="100"
                                              viewBox="0 0 113 146"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M110.667 47.9166L64.5833 1.83333C63.4124 0.660896 61.8237 0.00145877 60.1667 0H22.9167C16.8388 0 11.0098 2.41443 6.71213 6.71213C2.41443 11.0098 0 16.8388 0 22.9167V122.917C0 128.995 2.41443 134.823 6.71213 139.121C11.0098 143.419 16.8388 145.833 22.9167 145.833H89.5833C95.6612 145.833 101.49 143.419 105.788 139.121C110.086 134.823 112.5 128.995 112.5 122.917V52.0833C112.434 50.5133 111.78 49.0257 110.667 47.9166ZM66.6667 16.6822L95.8178 45.8333H66.6667V16.6822ZM89.5833 137.984H22.9167C20.154 137.984 14.0175 133.01 12.064 131.056C10.1104 129.103 7.84884 125.679 7.84884 122.917V22.9167C7.84884 20.154 10.1104 14.405 12.064 12.4515C14.0175 10.4979 20.154 7.84883 22.9167 7.84883H58.8178V47.4322C58.8394 49.083 59.7337 50.8189 60.9012 51.9863C62.0686 53.1538 63.4169 53.6606 65.0678 53.6822H104.651V122.917C104.651 125.679 102.39 131.428 100.436 133.382C98.4825 135.335 92.346 137.984 89.5833 137.984Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M76.8256 72.1666C75.509 71.1605 73.8542 70.7027 72.2077 70.8891C70.5612 71.0755 69.0507 71.8916 67.9923 73.1666L56.2423 87.9166L44.4923 72.9166C43.9451 72.271 43.2761 71.7394 42.5235 71.3523C41.7709 70.9651 40.9494 70.7301 40.1059 70.6604C39.2625 70.5908 38.4135 70.6879 37.6076 70.9464C36.8017 71.2048 36.0546 71.6195 35.4089 72.1666C34.7633 72.7138 34.2317 73.3828 33.8446 74.1354C33.4575 74.888 33.2224 75.7095 33.1527 76.553C33.0831 77.3964 33.1802 78.2453 33.4387 79.0513C33.6971 79.8572 34.1118 80.6043 34.6589 81.25L47.9089 97.9166L34.6589 114.583C33.6202 115.887 33.142 117.55 33.3295 119.207C33.517 120.864 34.355 122.378 35.6589 123.417C36.9629 124.455 38.6261 124.934 40.2827 124.746C41.9393 124.559 43.4535 123.721 44.4923 122.417L56.2423 107.917L67.9923 122.917C68.5907 123.642 69.3414 124.227 70.191 124.63C71.0406 125.034 71.9685 125.245 72.9089 125.25C74.187 125.356 75.4666 125.066 76.5743 124.42C77.682 123.774 78.5641 122.802 79.1009 121.638C79.6377 120.473 79.8033 119.171 79.5752 117.909C79.347 116.647 78.7362 115.486 77.8256 114.583L64.5756 97.9166L78.159 81.25C78.6776 80.5698 79.0549 79.7927 79.2689 78.9646C79.4829 78.1364 79.5291 77.2738 79.4049 76.4275C79.2807 75.5813 78.9885 74.7683 78.5455 74.0366C78.1026 73.3049 77.5178 72.6691 76.8256 72.1666V72.1666Z"
                                                fill="#56AA76"
                                              />
                                            </svg>
                                          ) : file.slice(file.length - 3) ===
                                            "xls" ? (
                                            <svg
                                              width="100"
                                              viewBox="0 0 113 146"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M110.667 47.9166L64.5833 1.83333C63.4124 0.660896 61.8237 0.00145877 60.1667 0H22.9167C16.8388 0 11.0098 2.41443 6.71213 6.71213C2.41443 11.0098 0 16.8388 0 22.9167V122.917C0 128.995 2.41443 134.823 6.71213 139.121C11.0098 143.419 16.8388 145.833 22.9167 145.833H89.5833C95.6612 145.833 101.49 143.419 105.788 139.121C110.086 134.823 112.5 128.995 112.5 122.917V52.0833C112.434 50.5133 111.78 49.0257 110.667 47.9166ZM66.6667 16.6822L95.8178 45.8333H66.6667V16.6822ZM89.5833 137.984H22.9167C20.154 137.984 14.0175 133.01 12.064 131.056C10.1104 129.103 7.84884 125.679 7.84884 122.917V22.9167C7.84884 20.154 10.1104 14.405 12.064 12.4515C14.0175 10.4979 20.154 7.84883 22.9167 7.84883H58.8178V47.4322C58.8394 49.083 59.7337 50.8189 60.9012 51.9863C62.0686 53.1538 63.4169 53.6606 65.0678 53.6822H104.651V122.917C104.651 125.679 102.39 131.428 100.436 133.382C98.4825 135.335 92.346 137.984 89.5833 137.984Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M76.8256 72.1666C75.509 71.1605 73.8542 70.7027 72.2077 70.8891C70.5612 71.0755 69.0507 71.8916 67.9923 73.1666L56.2423 87.9166L44.4923 72.9166C43.9451 72.271 43.2761 71.7394 42.5235 71.3523C41.7709 70.9651 40.9494 70.7301 40.1059 70.6604C39.2625 70.5908 38.4135 70.6879 37.6076 70.9464C36.8017 71.2048 36.0546 71.6195 35.4089 72.1666C34.7633 72.7138 34.2317 73.3828 33.8446 74.1354C33.4575 74.888 33.2224 75.7095 33.1527 76.553C33.0831 77.3964 33.1802 78.2453 33.4387 79.0513C33.6971 79.8572 34.1118 80.6043 34.6589 81.25L47.9089 97.9166L34.6589 114.583C33.6202 115.887 33.142 117.55 33.3295 119.207C33.517 120.864 34.355 122.378 35.6589 123.417C36.9629 124.455 38.6261 124.934 40.2827 124.746C41.9393 124.559 43.4535 123.721 44.4923 122.417L56.2423 107.917L67.9923 122.917C68.5907 123.642 69.3414 124.227 70.191 124.63C71.0406 125.034 71.9685 125.245 72.9089 125.25C74.187 125.356 75.4666 125.066 76.5743 124.42C77.682 123.774 78.5641 122.802 79.1009 121.638C79.6377 120.473 79.8033 119.171 79.5752 117.909C79.347 116.647 78.7362 115.486 77.8256 114.583L64.5756 97.9166L78.159 81.25C78.6776 80.5698 79.0549 79.7927 79.2689 78.9646C79.4829 78.1364 79.5291 77.2738 79.4049 76.4275C79.2807 75.5813 78.9885 74.7683 78.5455 74.0366C78.1026 73.3049 77.5178 72.6691 76.8256 72.1666V72.1666Z"
                                                fill="#56AA76"
                                              />
                                            </svg>
                                          ) : file.slice(file.length - 3) ===
                                            "txt" ? (
                                            <svg
                                              width="100"
                                              viewBox="0 0 113 146"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M110.667 47.9166L64.5833 1.83333C63.4124 0.660896 61.8237 0.00145877 60.1667 0H22.9167C16.8388 0 11.0098 2.41443 6.71213 6.71213C2.41443 11.0098 0 16.8388 0 22.9167V122.917C0 128.995 2.41443 134.823 6.71213 139.121C11.0098 143.419 16.8388 145.833 22.9167 145.833H89.5833C95.6612 145.833 101.49 143.419 105.788 139.121C110.086 134.823 112.5 128.995 112.5 122.917V52.0833C112.434 50.5133 111.78 49.0257 110.667 47.9166ZM66.6667 16.6822L95.8178 45.8333H66.6667V16.6822ZM89.5833 137.984H22.9167C20.154 137.984 14.0175 133.01 12.064 131.056C10.1104 129.103 7.84884 125.679 7.84884 122.917V22.9167C7.84884 20.154 10.1104 14.405 12.064 12.4515C14.0175 10.4979 20.154 7.84883 22.9167 7.84883H58.8178V47.4322C58.8394 49.083 59.7337 50.8189 60.9012 51.9863C62.0686 53.1538 63.4169 53.6606 65.0678 53.6822H104.651V122.917C104.651 125.679 102.39 131.428 100.436 133.382C98.4825 135.335 92.346 137.984 89.5833 137.984Z"
                                                fill="white"
                                              />
                                            </svg>
                                          ) : (
                                            ""
                                          )}
                                        </a>
                                      </span>
                                      <div className="mt-2">
                                        <div>
                                          <span href="">
                                            <svg
                                              onClick={() => {}}
                                              style={{ cursor: "pointer" }}
                                              className="mx-1 "
                                              width="24"
                                              height="24"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="#4c67ff"
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                            >
                                              <path d="M23 24v-20h-8v2h6v16h-18v-16h6v-2h-8v20h22zm-12-13h-4l5 6 5-6h-4v-11h-2v11z" />
                                            </svg>
                                            Download
                                          </span>
                                        </div>
                                        <div className="d-flex align-items-center mb-2 text-primary gap-2">
                                          <svg
                                            className="icon-24"
                                            width="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              opacity="0.4"
                                              d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z"
                                              fill="currentColor"
                                            ></path>
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z"
                                              fill="currentColor"
                                            ></path>
                                          </svg>
                                          <p className=" mb-0 text-dark">
                                            {file.split("/")[4]}
                                          </p>
                                        </div>
                                        {/* <div className="d-flex justify-content-end">5mb</div> */}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </Col>
                          </Row>
                          {/* <Col md="6" sm="11">
                            <input
                              type="file"
                              name="files"
                              accept=".doc,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,.txt,.pdf,application/pdf,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel ,.xls"
                              className="form-control border-secondary mt-2"
                              id="files"
                              value={"2a6bc22f-5ee1-46f4-b79d-56184c5f5b05.pdf"}
                              multiple
                              onChange={(event) => {
                                setFilesArray(event.target.files[0]);
                                setFieldValue("files", event.target.files[0]);
                              }}
                            />
                          </Col> */}
                        </Col>
                        {/* <Col md="11">
                          {touched.content && errors.content && (
                            <div className="text-danger">{errors.content}</div>
                          )}
                        </Col> */}
                        {/* <Col md="11" className="form-group h6 ">
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
                            style={{ height: "300px" }}
                          />
                        </Col> */}

                        {/* <Col md="11" className="form-group text-dark mt-5">
                          <Field
                            type="checkbox"
                            name="shouldSubmit"
                            className="form-check-input"
                            id="shouldSubmit"
                          />
                          <label className="form-label mx-1 h6">
                            <b>Submit Assessment</b>
                          </label>
                        </Col> */}

                        {/* <div className="d-flex justify-content-end">
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
                        </div> */}
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

export default ParentAssessmentDetails;
