import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import {
  fetchData,
  resetCreateSuccessfulState,
  updateClassAssessmentScore,
  updateStudentClassAssessment,
} from "../../../../store/actions/class-actions";

const EditClassAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const {
    assessmentScore,
    studentClassAssessment,
    classSubjects,
    singleClassAssessmentList,
  } = state.class;

  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQueryParam = queryParams.get("sessionClassId") || '';
  const sessionClassSubjectIdQueryParam = queryParams.get("sessionClassSubjectId") || '';
  //const typeQueryParam = queryParams.get("type") || '';
  const classAssessmentIdQueryParam = queryParams.get("classAssessmentId");

  useEffect(() => {
    fetchData(sessionClassIdQueryParam, sessionClassSubjectIdQueryParam, classAssessmentIdQueryParam)(dispatch)
  }, [classAssessmentIdQueryParam, sessionClassIdQueryParam, sessionClassSubjectIdQueryParam, dispatch]);

//console.log('singleClassAssessmentList?.assessmentScore', singleClassAssessmentList?.assessmentScore);
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Form className="mx-auto">
                  <Row className="d-flex justify-content-center">
                    <div className="d-flex justify-content-end">{singleClassAssessmentList?.sessionClassName}</div>
                    <Col md="11" className="form-group h6">
                      <label className="form-label">
                        <b>Topic:</b>
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control border-secondary h6"
                        readOnly
                        id="title"
                        value={singleClassAssessmentList?.title || ""}
                      />
                    </Col>
                    <Col md="11" className="form-group h6">
                      <label className="form-label">
                        <b>Subject:</b>
                      </label>
                      <select
                        disabled={true}
                        as="select"
                        name="sessionClassSubjectId"
                        className="form-select h6"
                        id="sessionClassSubjectId"
                        value={sessionClassSubjectIdQueryParam}
                      >
                        <option value="">Select Subject</option>
                        {classSubjects?.map((item, idx) => (
                          <option key={idx} value={item.sessionClassSubjectId}>
                            {item.subjectName}
                          </option>
                        ))}
                      </select>
                    </Col>

                    <Col md="11" >
                      <Row className="d-flex ">
                        <Col md="3" className="form-group">
                          <label className="form-label">
                            <h6>total</h6>
                          </label>
                          <input
                            type="readonly"
                            name="total"
                            readOnly
                            defaultValue={assessmentScore?.totalAssessment}
                            className="form-control h6 py-0 px-1 border-secondary"
                          />
                        </Col>
                        <Col md="3" className="form-group">
                          <label className="form-label">
                            <h6>used out of {assessmentScore?.totalAssessment} marks</h6>
                          </label>
                          <input
                            type="text"
                            name="used"
                            readOnly
                            defaultValue={singleClassAssessmentList?.assessmentScore}
                            className="form-control h6 py-0 px-1 border-secondary"
                          />
                        </Col>

                        <Col md="3" className="form-group">
                          <label className="form-label">
                            <h6>assessment mark</h6>
                          </label>
                          <input
                            type="number"
                            name="generalAssessmentScore"
                            onBlur={(e) => {
                              resetCreateSuccessfulState()(dispatch);
                              updateClassAssessmentScore(
                                classAssessmentIdQueryParam,
                                Number(e.target.value),
                                sessionClassSubjectIdQueryParam, sessionClassIdQueryParam)(dispatch);
                            }}
                            defaultValue={
                              singleClassAssessmentList?.assessmentScore
                            }
                            className="form-control h6 py-0 px-1 border-secondary"
                          />
                        </Col>

                      </Row>
                    </Col>

                    <Col md="11" className="form-group h6 mt-3">
                      <div className="table-responsive">
                        <table
                          id="role-list-table"
                          className="table  table-borderless table-sm "
                          role="grid"
                          data-toggle="data-table"
                        >
                          <tbody>
                            <tr className="ligth">
                              <td>Student Name</td>
                              <td>Score</td>
                            </tr>
                          </tbody>
                          <tbody>
                            {studentClassAssessment?.map((item, idx) => (
                              <tr key={idx}>
                                <td className="text-uppercase">
                                  {item.studentName}
                                </td>

                                <td className="text-center">
                                  <input
                                    type="number"
                                    className="form-control w-75  px-1 border-secondary"
                                    name={`${item.studentContactId}_score`}
                                    defaultValue={item.score || ""}
                                    id={item.studentContactId}
                                    onBlur={(e) => {
                                      resetCreateSuccessfulState()(dispatch);
                                      updateStudentClassAssessment(sessionClassSubjectIdQueryParam, classAssessmentIdQueryParam, e.target.id, Number(e.target.value))(dispatch);

                                      if (e.target.value > singleClassAssessmentList?.assessmentScore) {
                                        e.target.value = 0;
                                      }
                                    }}
                                  />
                                </td>
                                <td className="w-25">
                                  {item.isSaved ? (
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
                                  ) : (
                                    <span>
                                      <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M21.25 12.0005C21.25 17.1095 17.109 21.2505 12 21.2505C6.891 21.2505 2.75 17.1095 2.75 12.0005C2.75 6.89149 6.891 2.75049 12 2.75049C17.109 2.75049 21.25 6.89149 21.25 12.0005Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.4316 14.9429L11.6616 12.6939V7.84692"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Col>


                    <div className="d-flex justify-content-end">
                      
                      <Button
                        type="button"
                        className="btn-sm mx-2 mt-4"
                        variant="btn btn-success"
                        onClick={() => {
                          resetCreateSuccessfulState()(dispatch);
                          history.goBack()
                        }}
                      >
                        Done
                      </Button>
                    </div>

                 
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EditClassAssessment;
