import React, { useState } from "react";
import {
  Row,
  Button,
  Table,
  OverlayTrigger,
  Tooltip,
  Col,
  Badge,
} from "react-bootstrap";
import { Formik, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchSingleStudentResultEntries,
  getAllResultList,
  getValueIds,
  setpublishAssessmentScore,
  setpublishExamScore,
} from "../../store/actions/publish-actions";
import { useDispatch, useSelector } from "react-redux";
import { getAllClassScoreEntryPreview } from "../../store/actions/results-actions";
import PublishResultEditTable from "./publish-result-edit-table";
import Card from "../Card";


const PublishResultEdit = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [indexRow, setIndexRow] = useState("");
  const [idsForPreview, setIdsForPreview] = useState({});
  const [showScoresEntryTable, setShowScoresEntryTable] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isPreviewMode, setPreviewMode] = useState(false);
  const history = useHistory();
  const locations = useLocation();
  // const [studentEntry, setStudentEntry] = useState([
  //   {
  //     classScoreEntryId: "1",
  //     studentSubject: "Geography",
  //     registrationNumber: "ABC/0000017/xyz",
  //     assessmentScore: 30,
  //     examScore: 55,
  //     isOffered: true,
  //     remark: "PASSED",
  //     Grade: "A",
  //   },
  //   {
  //     classScoreEntryId: "2",
  //     studentSubject: "Agriculture",
  //     registrationNumber: "ABC/0000063/xyz",
  //     assessmentScore: 20,
  //     examScore: 45,
  //     isOffered: false,
  //     remark: "FAILED",
  //     Grade: "C",
  //   },
  //   {
  //     classScoreEntryId: "3",
  //     studentSubject: "Physics",
  //     registrationNumber: "ABC/0000098/xyz",
  //     assessmentScore: 40,
  //     examScore: 35,
  //     isOffered: false,
  //     remark: "PASSED",
  //     Grade: "AB",
  //   },
  //   {
  //     classScoreEntryId: "4",
  //     studentSubject: "Chemistry",
  //     registrationNumber: "ABC/0000092/xyz",
  //     assessmentScore: 33,
  //     examScore: 45,
  //     isOffered: true,
  //     remark: "PASSED",
  //     Grade: "BC",
  //   },
  // ]);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffClasses, staffClassSubjects, publishResults, publishSingleStudent, idsObj } = state.publish;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
      const queryParams = new URLSearchParams(locations.search);
      const studentContactId = queryParams.get("studentContactId");
      if (!studentContactId) return;
       fetchSingleStudentResultEntries(idsObj.sessionClassId, idsObj.termId, studentContactId)(dispatch)
   }, []);

  const handleFocus = (event) => event.target.select();
console.log("here", publishSingleStudent);
  return (
    <>
      <Row className="pt-3">
        <Col sm="12">
          <Card>
            <Card.Header>
              <h3>Double Click to edit</h3>
            </Card.Header>
            <Card.Body>
              <div>
                <PublishResultEditTable />
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  type="button"
                  className="btn-sm mx-2"
                  variant="btn btn-danger"
                  // onClick={() => {
                  //   setEditMode(false);
                  //   setPreviewMode(!isPreviewMode);
                  //   getAllClassScoreEntryPreview(
                  //     idsForPreview.sessionClassId,
                  //     idsForPreview.subjectId
                  //   )(dispatch);
                  // }}
                  onClick={() => history.goBack()}
                >
                  Back
                </Button>
              </div>

              <Formik
              // initialValues={{ examScore: 0, assessmentScore: 0 }}
              // validationSchema={validation}
              // enableReinitialize={true}
              // onSubmit={(values) => { }}
              >
                {({
                  handleSubmit,
                  values,
                  setFieldValue,
                  touched,
                  errors,
                  isValid,
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
                        <td className="text-uppercase h6">Is Offered</td>
                        <td className="text-uppercase h6 px-2">Grade</td>
                        <td className="text-uppercase h6 px-2">Remark</td>
                      </tr>
                    </thead>
                    <tbody>
                      {publishSingleStudent?.studentSubjectEntries.map((item, index) => (
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
                            {/* <td className="fw-bold text-center">
                                                    {item.assessmentScore}
                                                </td> */}
                            <td
                              className="fw-bold text-center"
                              style={{ maxWidth: "150px" }}
                            >
                              {!isEditMode ? (
                                <span className="fw-bold">
                                  {item.assessmentScore}
                                </span>
                              ) : indexRow == index ? (
                                <Field
                                  style={{
                                    maxHeight: "25px",
                                    maxWidth: "120px",
                                    height: "25px",
                                    zIndex: 1000,
                                  }}
                                  className="fw-bold"
                                  type="text"
                                  maxLength={publishResults?.assessmentScore}
                                  name={`${item.classScoreEntryId}_assessmentScore`}
                                  defaultValue={item.assessmentScore}
                                  onFocus={handleFocus}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `${item.classScoreEntryId}_assessmentScore`,
                                      e.target.value
                                    );
                                  }}
                                  onBlur={(e) => {
                                    setpublishAssessmentScore(
                                      item.classScoreEntryId,
                                      e.target.value,
                                      publishSingleStudent
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
                              ) : indexRow == index ? (
                                <Field
                                  style={{
                                    maxHeight: "25px",
                                    maxWidth: "120px",
                                    height: "25px",
                                    zIndex: 1000,
                                  }}
                                  className=" fw-bold "
                                  type="text"
                                  maxLength={publishResults?.examScore}
                                  name={`${item.classScoreEntryId}_examScore`}
                                  defaultValue={item.examScore}
                                  onFocus={handleFocus}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `${item.classScoreEntryId}_examScore`,
                                      e.target.value
                                    );
                                  }}
                                  onBlur={(e) => {
                                    setpublishExamScore(
                                      item.classScoreEntryId,
                                      e.target.value,
                                      publishSingleStudent
                                    )(dispatch);
                                  }}
                                />
                              ) : (
                                <span className="fw-bold">
                                  {item.examScore}
                                </span>
                              )}
                            </td>
                            <td style={{ width: "5px" }}>
                              {" "}
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                checked={item.isOffered}
                              />
                            </td>

                            {item.isSaving ? (
                              <td>
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
                            ) : (
                              <>
                                <td>{item.grade}</td>
                                <td>{item.remark}</td>
                              </>
                            )}
                          </tr>
                        </OverlayTrigger>
                      ))}
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
