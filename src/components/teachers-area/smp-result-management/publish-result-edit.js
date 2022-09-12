import React, { useState } from "react";
import { Row,Button,Table, OverlayTrigger, Tooltip, Col } from "react-bootstrap";
import { Formik, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchSingleStudentResultEntries,
  setAssessmentScore,
  setExamScore,
} from "../../../store/actions/publish-actions";
import { useDispatch, useSelector } from "react-redux";
import PublishResultEditTable from "./publish-result-edit-table";
import Card from "../../Card";

const PublishResultEdit = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [indexRow, setIndexRow] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const history = useHistory();
  const locations = useLocation();
  const [selectedTerm, setTerm] = useState('');
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {publishSingleStudent, } = state.publish;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const studentContactId = queryParams.get("studentContactId");
    const sessionClassId = queryParams.get("sessionClassId");
    const termId = queryParams.get("termId");
    setTerm(termId);

    if (!studentContactId) return;
    fetchSingleStudentResultEntries(
      sessionClassId,
      termId,
      studentContactId
    )(dispatch);
  }, [dispatch,locations.search]);
  
  const handleFocus = (event) => event.target.select();

  //const studentSubjectEntriesOption = publishSingleStudent?.studentSubjectEntries === null ? [] : publishSingleStudent.studentSubjectEntries;
  return (
    <>
      <Row className="pt-3">
        <Col sm="12">
          <Card>
            <Card.Header>
            <div className="mx-2 mt-2">
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
            <span>back</span>
          </div>
              <h3>Double Click to edit</h3>
            </Card.Header>
            <Card.Body>
              <div>
                <PublishResultEditTable
                  publishSingleStudent={publishSingleStudent}
                />
              </div>
              <div className="d-flex justify-content-end">
              <Button
                  type="button"
                  className="btn-sm mx-2"
                  variant="btn btn-success"
                  onClick={() => {
                    const queryParams = new URLSearchParams(locations.search);
                    const studentContactId = queryParams.get("studentContactId");
                    const sessionClassId = queryParams.get("sessionClassId");
                    const termId = queryParams.get("termId");
                    fetchSingleStudentResultEntries(
                      sessionClassId,
                      termId,
                      studentContactId
                    )(dispatch);
                  }}
                >
                  Refresh
                </Button>
             
              </div>

              <Formik
                initialValues={{ examScore: 0, assessmentScore: 0 }}
                enableReinitialize={true}
                onSubmit={() => {}}
              >
                {({
                  setFieldValue,
                }) => (
                  <Table size="md" hover bordered responsive className="mt-2">
                    <thead>
                      <tr
                        className="text-center"
                        style={{ background: "#d8efd1" }}
                      >
                        <td className="text-uppercase h6">S/No</td>
                        <td className="text-uppercase h6 text-start">
                          Subject
                        </td>
                        <td className="text-uppercase h6 text-center">
                          Assessment Score
                        </td>
                        <td className="text-uppercase h6">Exam Score</td>
                        <td className="text-uppercase h6 px-2">Grade</td>
                        <td className="text-uppercase h6 px-2">Remark</td>
                      </tr>
                    </thead>
                    <tbody>
                      {publishSingleStudent?.studentSubjectEntries.map(
                        (item, index) => (
                          <OverlayTrigger
                            key={index}
                            placement="top"
                            overlay={
                              !isEditMode ? (
                                <Tooltip id="button-tooltip-2">
                                  double click to edit
                                </Tooltip>
                              ) : (
                                <Tooltip id="button-tooltip-2">
                                  double click to close edit
                                </Tooltip>
                              )
                            }
                          >
                            <tr
                              style={{ maxHeight: "30px" }}
                              key={index}
                              className="text-center"
                              onDoubleClick={() => {
                                setEditMode(!isEditMode);
                                setIndexRow(index);
                              }}
                            >
                              <td className="fw-bold">{index + 1}</td>
                              <td className="fw-bold text-start text-uppercase">
                                {item.sibjectName}
                              </td>
                              <td
                                className="fw-bold text-center"
                                style={{ maxWidth: "150px" }}
                              >
                                {!isEditMode ? (
                                  <span className="fw-bold">
                                    {item.assessmentScore}
                                  </span>
                                ) : indexRow === index ? (
                                  <Field
                                    style={{
                                      maxHeight: "25px",
                                      maxWidth: "120px",
                                      height: "25px",
                                      zIndex: 1000,
                                    }}
                                    className="fw-bold"
                                    type="text"
                                    name={`${item.subjectId}_assessmentScore`}
                                    defaultValue={item.assessmentScore}
                                    onFocus={handleFocus}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `${item.subjectId}_assessmentScore`,
                                        e.target.value
                                      );
                                    }}
                                    onBlur={(e) => {
                                      setAssessmentScore(
                                        item.subjectId,
                                        e.target.value,
                                        publishSingleStudent,
                                        selectedTerm
                                      )(dispatch);
                                    }}
                                  />
                                ) : (
                                  <span className="fw-bold">
                                    {item.examScore}
                                  </span>
                                )}
                              </td>
                              <td
                                className="fw-bold text-center"
                                style={{ maxWidth: "150px" }}
                              >
                                {!isEditMode ? (
                                  <span className="fw-bold">
                                    {item.examScore}
                                  </span>
                                ) : indexRow === index ? (
                                  <Field
                                    style={{
                                      maxHeight: "25px",
                                      maxWidth: "120px",
                                      height: "25px",
                                      zIndex: 1000,
                                    }}
                                    className=" fw-bold "
                                    type="text"
                                    name={`${item.subjectId}_examScore`}
                                    defaultValue={item.examScore}
                                    onFocus={handleFocus}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `${item.subjectId}_examScore`,
                                        e.target.value
                                      );
                                    }}
                                    onBlur={(e) => {
                                      setExamScore(
                                        item.subjectId,
                                        e.target.value,
                                        publishSingleStudent,
                                        selectedTerm
                                      )(dispatch);
                                    }}
                                  />
                                ) : (
                                  <span className="fw-bold">
                                    {item.examScore}
                                  </span>
                                )}
                              </td>
                              {item.isSaving ? (
                                <td style={{ maxWidth: "150px" }}>
                                  <span style={{ color: "green" }}>
                                    <svg
                                      width="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                  </span>
                                </td>
                              ) : (<td style={{ maxWidth: "150px" }} className="text-uppercase">{item.grade}</td>)}
                              {item.isSaving ? (
                                <td style={{ maxWidth: "150px" }}>
                                  <span style={{ color: "green" }}>
                                    <svg
                                      width="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                      <path
                                        d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                  </span>
                                </td>
                              ) : (<td style={{ maxWidth: "150px" }} className="text-uppercase">{item.remark}</td>)}
                            </tr>
                          </OverlayTrigger>
                        )
                      )}
                    </tbody>
                  </Table>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PublishResultEdit;
