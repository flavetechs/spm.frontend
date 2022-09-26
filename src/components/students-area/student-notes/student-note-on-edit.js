import { Field, Formik } from "formik";
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
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { showErrorToast } from "../../../store/actions/toaster-actions";
import {
  getSingleStudentNotes,
  getSubjectTeacher,
  sendForReview,
  updateStudentNotes,
} from "../../../store/actions/class-actions";
import { closeFullscreen, openFullscreen } from "../../../utils/export-csv";
import { getAllStaffAccount } from "../../../store/actions/staff-actions";
import { studentNoteLocations } from "../../../router/students-path-locations";

const EditStudentNote = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const state = useSelector((state) => state);
  const { createSuccessful,  singleStudentNotes,subjectTeacher} = state.class;
  const { staffList } = state.staff;
  //VALIDATION
  const validation = Yup.object().shape({
    noteTitle: Yup.string().required("Title is required"),
  });
  //VALIDATION
  useEffect(() => {
    createSuccessful &&
    history.goBack();
  }, [createSuccessful,history]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const studentNoteId = queryParams.get("studentNoteId");
    getSingleStudentNotes(studentNoteId)(dispatch);
  }, [dispatch,location.search]);

  React.useEffect(() => {
    getAllStaffAccount()(dispatch);
    getSubjectTeacher(singleStudentNotes?.subjectId)(dispatch);
  }, [singleStudentNotes,dispatch]);

  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(singleStudentNotes?.noteContent);
  }, [singleStudentNotes]);
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
          [{ align: [] }],
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

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setContent(atob(reader.result.split(",")[1]));
    };
  }
 console.log("singleStudentNotes",singleStudentNotes);
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    noteTitle: singleStudentNotes?.noteTitle || "",
                    subjectId: singleStudentNotes?.subjectId || "",
                    submitForReview: singleStudentNotes?.approvalStatus !==2 ? true :false,
                    teacherId:subjectTeacher,
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    if (!content) {
                      showErrorToast("Body is required")(dispatch);
                      return;
                    }
                    values.noteContent = content;
                    values.studentNoteId = singleStudentNotes?.studentNoteId;
                    sendForReview(singleStudentNotes?.studentNoteId)(dispatch);
                    updateStudentNotes(values)(dispatch);
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
                       <h4 className="mb-4">{singleStudentNotes?.subjectName}</h4>
                      <Row className="d-flex justify-content-center">
                      <Col md="11" className="form-group h6">
                          <label className="form-label" >
                            <b>Subject Teacher:</b>
                          </label>
                          <Field
                            as="select"
                            name="teacherId"
                            className="form-select border-secondary h6"
                            id="noteTitle">
                              <option value="">Select Teacher</option>
                                {staffList?.map((item, idx) => (
                                  <option key={idx} value={item.teacherAccountId} >
                                    {item.firstName}{""}{item.lastName}
                                  </option>
                                ))}
                          </Field>
                        </Col>
                        <Col md="11">
                          {touched.noteTitle && errors.noteTitle && (
                            <div className="text-danger">
                              {errors.noteTitle}
                            </div>
                          )}
                        </Col>
                        <Col md="11" className="form-group text-secondary">
                          <label className="form-label" >
                            <b>Title:</b>
                          </label>
                          <Field
                            type="text"
                            name="noteTitle"
                            className="form-control border-secondary text-secondary"
                            id="noteTitle"
                            onChange={(e) => {
                             setFieldValue("noteTitle",e.target.value)
                            }}
                          />
                        </Col>
                        <Col md="11" className="form-group text-secondary">
                          <label className="form-label" >
                            <b>Upload note(text,word,excel):</b>
                          </label>
                          <Field
                            type="file"
                            name="noteFile"
                            accept="application/msword, application/vnd.ms-excel,
                                text/plain,application/pdf,.doc,.docx"
                            className="form-control border-secondary"
                            id="noteFile"
                            onChange={(event) => {
                              getBase64(event.target.files[0]);
                            }}
                          />
                        </Col>
                        <Col md="11">
                          {touched.content && errors.content && (
                            <div className="text-danger">{errors.content}</div>
                          )}
                        </Col>
                        <Col
                          md="11"
                          className="form-group text-secondary"
                        >
                          <label
                            className="form-label d-flex justify-content-between"
                          >
                            <b>Note:</b>{" "}
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
                                      openFullscreen("note-editor");
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
                            style={{ height: "300px" }}
                            id="note-editor"
                            ref={elementRef}
                            className="bg-white"
                          />
                        </Col>

                       {singleStudentNotes?.approvalStatus === 2 && (
                          <Col md="11" className="form-group text-secondary mt-5">
                            <Field
                              type="checkbox"
                              name="submitForReview"
                              className="form-check-input"
                              id="submitForReview"
                            />
                            <label
                              className="form-label mx-1"
                            >
                              <b>Submit for review</b>
                            </label>
                          </Col>
                        )}

                        <div className="d-flex justify-content-end">
                          <Button
                            type="button"
                            className="btn-sm mt-5"
                            variant="btn btn-danger"
                            onClick={() => {
                              history.goBack();
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="btn-sm mx-2 mt-5"
                            variant="btn btn-success"
                            onClick={() => {
                              handleSubmit();
                            }}
                          >
                            Save
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

export default EditStudentNote;
