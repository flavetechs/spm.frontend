import { Field, Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { respondDialog, showErrorToast, showHideDialog } from "../../../../store/actions/toaster-actions";
import { createLessonNotes, getLessonNoteContent, resetLessonNoteContentState } from "../../../../store/actions/class-actions";
import { openFullscreen } from "../../../../utils/export-csv";
import { getAllStaffClasses, getStaffClassSubjectByClassLookup} from "../../../../store/actions/results-actions";
import { TextEditorToolBar } from "../../../../utils/tools";

const CreateLessonNote = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const [fileContent, setFileContent] = useState(null);
  const state = useSelector((state) => state);
  const [errorOnUpload, setErrorOnUpload] = useState("");
  const { createSuccessful,lessonNoteContent } = state.class;
  const { staffClasses, staffClassSubjects } = state.results;
  const { dialogResponse } = state.alert;
  //VALIDATION
  const validation = Yup.object().shape({
    noteTitle: Yup.string().required("Title is required"),
  });
  //VALIDATION
  const queryParams = new URLSearchParams(location.search);
  const subjectIdQuery = queryParams.get("subjectId");
  const classIdQueryParam = queryParams.get("classId") || "";
  const sessionClassIdQueryParam = queryParams.get("sessionClassId") || "";


  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  useEffect(() => {
    getAllStaffClasses()(dispatch);
    classIdQueryParam && sessionClassIdQueryParam && getStaffClassSubjectByClassLookup(classIdQueryParam, sessionClassIdQueryParam)(dispatch);
  }, [dispatch, sessionClassIdQueryParam]);

  useEffect(() => {
    createSuccessful && history.goBack();
    resetLessonNoteContentState()(dispatch);
  }, [createSuccessful, history,dispatch]);

  useEffect(() => {
    if(Object.keys(lessonNoteContent).length !== 0) {
      setContent(lessonNoteContent);
    }
  }, [lessonNoteContent]);

  useEffect(() => {
    if (dialogResponse === "continue") {
      const params = new FormData();
      params.append("file", fileContent);
     getLessonNoteContent(params)(dispatch);
     reset()
     } else if(dialogResponse === "cancel"){
        showHideDialog(false, null)(dispatch);
        respondDialog("")(dispatch);
      }
      return () => {
        respondDialog("")(dispatch)
        showHideDialog(false, null)(dispatch);
      }
  }, [dialogResponse,fileContent, dispatch]);

  const [content, setContent] = useState('');
  const textEditorModules = useMemo(() => ({ toolbar: TextEditorToolBar }), []);


  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    noteTitle: "",
                    noteContent: "",
                    shouldSendForApproval: false,
                  }}
                  validationSchema={validation}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    const queryParams = new URLSearchParams(location.search);
                    const classId = queryParams.get("classId");
                    const subjectId = queryParams.get("subjectId");
                    if (!content) {
                      showErrorToast('Body is required')(dispatch);
                      return;
                    }
                    values.noteContent = content;
                    values.subjectId = subjectId;
                    values.classes = [classId];
                    createLessonNotes(values)(dispatch);
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
                          <h5 className="mb-3">{staffClasses?.find(i => i.sessionClassId === sessionClassIdQueryParam)?.sessionClass}-{staffClassSubjects?.find(i => i.subjectId === subjectIdQuery)?.subjectName}</h5>

                        </Col>
                        <Col md="11">
                          {touched.noteTitle && errors.noteTitle && (
                            <div className="text-danger">{errors.noteTitle}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label" >
                            <b>Title:</b>
                          </label>
                          <Field
                            type="text"
                            name="noteTitle"
                            className="form-control border-secondary h6"
                            id="noteTitle"
                            placeholder="Enter note title..."
                          />
                        </Col>
                        
                        <Col md="11">
                          {!fileContent && 
                            <div className="text-danger">{errorOnUpload}</div>
                          }
                        </Col>
                        <Col md="11" className="form-group h6">
                          <label className="form-label" >
                            <b>Upload note(text,word):</b>
                          </label>
                          <div className="d-md-flex">
                            <Col sm="11" md="6">
                          <input
                            type="file"
                            name="noteFile"
                            accept="application/msword, ,
                                text/plain,.docx"
                            className="form-control border-secondary "
                            id="noteFile"
                            ref={ref}
                            onChange={(event) => { setFieldValue("noteFile",event.target.files[0]);
                            setFileContent(event.target.files[0]) }}
                          />
                          </Col>
                          <div className="btn btn-success mx-2  mt-3 mt-md-0" onClick={()=>{
                            if(!fileContent){setErrorOnUpload("No file found to Upload");}
                            else{
                           if(content === ""){
                             const params = new FormData();
                            params.append("file", fileContent);
                           getLessonNoteContent(params)(dispatch);
                           reset()
                          }
                           else{
                           fileContent && showHideDialog(true, "Note that uploading a lesson note will overwrite current content in the editor, do you want to continue?")(dispatch);
                           }
                          }
                          }}>
                              Upload
                            </div>
                          </div>
                        </Col>
                    
                        <Col md="11">
                          {touched.noteContent && errors.noteContent && (
                            <div className="text-danger">{errors.noteContent}</div>
                          )}
                        </Col>
                        <Col md="11" className="form-group h6 ">
                          <label className="form-label d-flex justify-content-between">
                            <b>Note:</b>
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
                            style={{ height: '300px',maxHeight:'300px' }}
                          />
                        </Col>

                        <div className="mt-5">
                        <Col md="11" className="form-group h6 mt-5 mx-4">
                          <Field
                            type="checkbox"
                            name="shouldSendForApproval"
                            className="form-check-input"
                            id="shouldSendForApproval"
                          />
                          <label className="form-label mx-1" htmlFor="shouldSendForApproval">
                            <b>Submit for review</b>
                          </label>
                        </Col>
                        </div>


                        <div className="d-flex justify-content-end">
                          <Button
                            type="button"
                            className="btn-sm mt-4"
                            variant="btn btn-danger"
                            onClick={() => {
                              reset();
                              history.goBack();
                              resetLessonNoteContentState()(dispatch);
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
  )
}

export default CreateLessonNote