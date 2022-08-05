import { Field, Formik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { showErrorToast } from "../../../store/actions/toaster-actions";
import { getSingleLessonNotes, updateLessonNotes } from "../../../store/actions/class-actions";
import { classLocations } from "../../../router/spm-path-locations";
import { read } from "xlsx";

const EditLessonNote = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { createSuccessful, singleLessonNotes } = state.class;

    //VALIDATION
    const validation = Yup.object().shape({
      noteTitle: Yup.string().required("Title is required"),
    });
    //VALIDATION
    React.useEffect(() => {
      createSuccessful && history.push(classLocations.lessonNotes);
    }, [createSuccessful]);

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const teacherClassNoteId = queryParams.get("teacherClassNoteId");
      getSingleLessonNotes(teacherClassNoteId)(dispatch);
    }, []);
  
    const [content, setContent] = useState('');
    useEffect(() => {
     setContent(singleLessonNotes?.noteContent)
    }, [singleLessonNotes]);
    const textEditorModules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', "strike"],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'align': [] }],
          ['image', "link"],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
        ],
        //   handlers: {
        //     image: imageHandler
        //   }
      },
    }), []);

    function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setContent(atob(reader.result.split(",")[1]))
      };
   }
  
  return (
    <>
    <div className="col-md-8 mx-auto">
            <Row>
              <Col sm="12">
                <Card className="">
                  <Card.Body>
                    <Formik
                      initialValues={{
                        noteTitle: singleLessonNotes?.noteTitle,
                        subjectId:singleLessonNotes?.subject,
                        shouldSendForApproval: false,
                        classId:singleLessonNotes?.classes,
                      }}
                      validationSchema={validation}
                      enableReinitialize={true}
                      onSubmit={(values) => {
                          if(!content){
                            showErrorToast('Body is required')(dispatch);
                            return;
                          }
                          values.noteContent = content;
                          values.classNoteId = singleLessonNotes?.classNoteId
                          updateLessonNotes(values)(dispatch);
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
                              {touched.noteTitle && errors.noteTitle && (
                                <div className="text-danger">{errors.noteTitle}</div>
                              )}
                            </Col>
                            <Col md="11" className="form-group text-dark">
                              <label className="form-label" htmlFor="noteTitle">
                                <b>Title:</b>
                              </label>
                              <Field
                                type="text"
                                name="noteTitle"
                                className="form-control border-secondary"
                                id="noteTitle"
                               
                              />
                            </Col>
                            <Col md="11" className="form-group text-dark">
                              <label className="form-label" htmlFor="noteFile">
                                <b>Attachment:</b>
                              </label>
                              <Field
                                type="file"
                                name="noteFile"
                                accept="application/msword, application/vnd.ms-excel,
                                text/plain,application/pdf,.doc,.docx"
                                className="form-control border-secondary"
                                id="noteFile"
                                onChange={(event)=>{getBase64(event.target.files[0])}}
                              />
                            </Col>
                            <Col md="11">
                              {touched.content && errors.content && (
                                <div className="text-danger">{errors.content}</div>
                              )}
                            </Col>
                            <Col md="11" className="form-group text-dark ">
                              <label className="form-label" htmlFor="noteContent">
                                <b>Note:</b>
                              </label>
                              <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={textEditorModules}
                                style={{height: '300px'}}
                              />
                            </Col>
    
    {/* {singleLessonNotes?.approvalStatus == 2 &&
                            <Col md="11" className="form-group text-dark mt-5">
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
                      } */}
    
                            <div className="d-flex justify-content-end">
                              <Button
                                type="button"
                                className="btn-sm mt-5"
                                variant="btn btn-danger"
                                onClick={() => {
                                  history.goBack();
                                }}
                              >
                                Back
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
  )
}

export default EditLessonNote