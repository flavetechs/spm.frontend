import { useEffect, useState } from "react";
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import {
  getAllClassGroup,
  getAssessmentScore,
  getClassSubjects,
  getSingleClassAssessment,
  getStudentClassAssessment,
  updateClassAssessmentScore,
  updateStudentClassAssessment,
} from "../../../../store/actions/class-actions";

const EditClassAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { createSuccessful,assessmentScore, studentClassAssessment, classSubjects, singleClassAssessmentList } =
    state.class;
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const sessionClassSubjectIdQuery = queryParams.get("sessionClassSubjectId");
  const classAssessmentIdQuery = queryParams.get("classAssessmentId");
  //const typeQuery = queryParams.get("type");

  //HOOKS
  const [classAssessmentScore, setClassAssessmentScore] = useState("");
 const [onSubmit, setOnSubmit] = useState(false)

  useEffect(() => {
    getAssessmentScore(
      sessionClassSubjectIdQuery,
      sessionClassIdQuery
    )(dispatch);
    getClassSubjects(sessionClassIdQuery)(dispatch);
    getAllClassGroup(sessionClassIdQuery)(dispatch);
    getSingleClassAssessment(classAssessmentIdQuery)(dispatch);
    getStudentClassAssessment(classAssessmentIdQuery)(dispatch);
  }, []);

  useEffect(() => {
    onSubmit &&
    createSuccessful &&
      history.goBack()
  }, [createSuccessful]);

  //HOOKS

  //VALIDATION
  const validation = Yup.object().shape({
    title: Yup.string().required("Subject is required"),
    generalAssessmentScore: Yup.number()
      .required("Score is required")
      .min(0, "Assessment score must not be below 0"),
    // deadline: Yup.string().required("Please enter who to send"),
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
                <Form className="mx-auto">
                  <Row className="d-flex justify-content-center">
                    <Col md="11"></Col>
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
                        defaultValue={singleClassAssessmentList?.title}
                      />
                    </Col>
                    <Col md="11" className="form-group h6">
                      <label className="form-label">
                        <b>Subject:</b>
                      </label>
                      <select
                        as="select"
                        name="sessionClassSubjectId"
                        className="form-select h6"
                        id="sessionClassSubjectId"

                      >
                        <option value="">Select Subject</option>
                        {classSubjects?.map((item, idx) => (
                          <option key={idx} value={item.sessionClassSubjectId} selected={item.sessionClassSubjectId}>
                            {item.subjectName}
                          </option>
                        ))}
                      </select>
                    </Col>

                    {/* {touched.sessionClassGroupId &&
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
                        </Col> */}

                    <Row>
                      <div>
                        {classAssessmentScore > assessmentScore?.unused && (
                          <div className="text-danger">
                            {`Assessment should not be above ${assessmentScore?.unused}`}
                          </div>
                        )}
                        {classAssessmentScore < 0 && (
                          <div className="text-danger">
                            {`Assessment should not be less than 0`}
                          </div>
                        )}
                      </div>
                    </Row>
                    <Row className="d-flex justify-content-center">
                      <Col md="2" className="form-group">
                        <label className="form-label">
                          <h6>total</h6>
                        </label>
                        <input
                          type="readonly"
                          name="total"
                          readOnly
                          value={assessmentScore?.totalAssessment}
                          className="form-control h6 py-0 px-1"
                        />
                      </Col>
                      <Col md="2" className="form-group">
                        <label className="form-label">
                          <h6>used</h6>
                        </label>
                        <input
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
                        <input
                          type="number"
                          name="generalAssessmentScore"
                          onChange={(e) => {
                            setClassAssessmentScore(e.target.value);
                          }}
                          defaultValue={singleClassAssessmentList?.assessmentScore}
                          className="form-control h6 py-0 px-1"
                        />
                      </Col>
                      <Col md="4">
                      <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    {" "}
                                    update class assessment score
                                  </Tooltip>
                                }
                              >
                        <Button
                          type="button"
                          className="btn-sm mt-4 mx-4"
                          variant="btn btn-primary"
                          onClick={() => {updateClassAssessmentScore(classAssessmentIdQuery,Number(classAssessmentScore))(dispatch)}}
                        >
                          Update
                        </Button>
                        </OverlayTrigger>
                      </Col>
                    </Row>

                    <Col md="11" className="form-group h6 mt-3">
                      <div className="table-responsive">
                        <table
                          id="role-list-table"
                          className="table  table-borderless table-sm"
                          role="grid"
                          data-toggle="data-table"
                        >
                          <tbody>
                            <tr className="ligth">
                              <td className="" width="300px">
                                Student Name
                              </td>
                              <td className="text-center">Score</td>
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
                                    type="text"
                                    className="w-25"
                                    name={`${item.studentContactId}_score`}
                                    id={item.studentContactId}
                                    onBlur={(e) => {
                                      e.target.value != "" &&
                                      updateStudentClassAssessment(
                                        sessionClassSubjectIdQuery,
                                        classAssessmentIdQuery,
                                        e.target.id,
                                        Number(e.target.value)
                                      )(dispatch);
                                    }}
                                  />
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
                        setOnSubmit(true)
                        }}
                      >
                        Send
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
