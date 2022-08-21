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
  getClassSubjects,
  getSingleHomeAssessment,
  getStudentClassAssessment,
  sendAssesmentToStudents,
  updateHomeAssessment,
  updateStudentClassAssessment,
} from "../../../../store/actions/class-actions";
import { openFullscreen } from "../../../../utils/export-csv";

const EditClassAssessment = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const elementRef = useRef(null);
  const state = useSelector((state) => state);
  const { createSuccessful, groupList, singleHomeAssessmentList,assessmentScore,studentClassAssessment,classSubjects } = state.class;
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const sessionClassSubjectIdQuery = queryParams.get("sessionClassSubjectId");
  const classAssessmentIdQuery = queryParams.get("classAssessmentId");
  const typeQuery = queryParams.get("type");

//HOOKS

  useEffect(() => {
    getAssessmentScore(sessionClassSubjectIdQuery,sessionClassIdQuery)(dispatch);
    getClassSubjects(sessionClassIdQuery)(dispatch);
    getAllClassGroup(sessionClassIdQuery)(dispatch);
    getStudentClassAssessment(classAssessmentIdQuery)(dispatch);
  }, []);

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

  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    sessionClassSubjectId: sessionClassSubjectIdQuery,
                    classAssessmentId: classAssessmentIdQuery,
                    studentContactId:"",
                    score:""
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    
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
                                      value={item.sessionClassSubjectId}
                                    >
                                      {item.subjectName}
                                    </option>
                                  ))}
                                </Field>
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
                        <td className="text-center">
                        Score
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      {studentClassAssessment?.map(
                        (item, idx) =>
                            <tr key={idx}>
                              <td className="text-uppercase">{item.studentName}</td>

                              <td className="text-center"><Field type="text" className="w-25" name="score" id={item.studentContactId} onBlur={(e)=>updateStudentClassAssessment(sessionClassSubjectIdQuery,classAssessmentIdQuery,e.target.id,e.target.value)(dispatch)}/></td>
                            </tr>
                      )}
                    </tbody>
                  </table>
              
                </div>
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
                              className="form-control h6 py-0 px-1"
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

export default EditClassAssessment;
