
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { useHistory } from "react-router-dom";
import { createSession } from "../../store/actions/session-actions";
import { getAllActiveTeachers } from "../../store/actions/class-actions";
const SessionAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({

    startDate: Yup.string()
      .required('Start Year is required'),
    endDate: Yup.string()
      .required('End Year is required'),
    terms: Yup.string().required("Please select Term"),
    headTeacherId: Yup.string().required("Please select Head Teacher")
  });
  //VALIDATIONS SCHEMA

  React.useEffect(() => {
    getAllActiveTeachers()(dispatch)
  }, []);
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message } = state.session;
  const { activeTeachers } = state.class;
  const { staffList } = state.staff;
  // ACCESSING STATE FROM REDUX STORE



  if (isSuccessful) {
    history.push(sessionLocations.sessionList);
  }

  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Add New Session</h4>
                </div>
              </Card.Header>
              <Card.Body>
                <Formik
                  initialValues={{
                    startDate: '',
                    endDate: '',
                    terms: '3',
                    headTeacherId: ''
                  }}
                  validationSchema={validation}
                  onSubmit={values => {
                    createSession(values)(dispatch)
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                    isValid }) => (

                    <Form>
                      {message && <div className='text-danger'>{message}</div>}
                      {(touched.startDate && errors.startDate) && <div className='text-danger'>{errors.startDate}</div>}
                      {(touched.endDate && errors.endDate) && <div className='text-danger'>{errors.endDate}</div>}
                      {(touched.headTeacherId && errors.headTeacherId) && <div className='text-danger'>{errors.headTeacherId}</div>}
                      {(touched.terms && errors.terms) && <div className='text-danger'>{errors.terms}</div>}
                      <div className="row">
                        <Form.Group className="col-md-6 form-group">
                          <label htmlFor="startDate" className="form-label"> <b>Start Year:</b></label>
                          <Field type="text" className="form-control" name="startDate" id="name" aria-describedby="name" required placeholder="Start Year" />
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">
                          <label htmlFor="endYear" className="form-label"><b>End Year:</b></label>
                          <Field type="text" className="form-control" name="endDate" id="name" aria-describedby="name" required placeholder="End Year" />
                        </Form.Group>
                        <Form.Group className="col-sm-6 form-group">
                          <label htmlFor="headTeacherId" className="form-label"><b>Head of School:</b></label><br />
                          <Field as='select' id='headTeacherId' name='headTeacherId' className="form-control" data-style="py-0">
                            <option value={''}>Select head of school</option>
                            {activeTeachers.map((teacher, idx) => {
                              return (
                                <option key={idx} value={teacher.teacherAccountId}>
                                  {teacher.firstName} {teacher.lastName}
                                </option>

                              )

                            })}
                          </Field>
                        </Form.Group>

                        <Form.Group className="col-sm-3 form-group">
                          <label htmlFor="terms" className="form-label"><b>No. of Terms</b></label><br />
                          <Field as='select' id='terms' name='terms' className="form-control" data-style="py-0">
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                          </Field>
                        </Form.Group>

                      </div>
                      <div className="d-flex justify-content-end ">
                        <Button
                          type="button"
                          variant="btn btn-danger mx-2"
                          onClick={() => {
                            history.goBack();
                          }}
                        >
                          Cancel
                        </Button>{" "}
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Submit
                        </Button>
                      </div>
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
export default SessionAdd;