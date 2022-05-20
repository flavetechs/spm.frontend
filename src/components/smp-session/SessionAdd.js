
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { useHistory } from "react-router-dom";
import { createSession } from "../../store/actions/session-actions";
import { getAllTeachers } from "../../store/actions/class-actions";
const SessionAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    
    startDate: Yup.string()
      .required('Session Year is required'),
    endDate: Yup.string()
      .required('Session Year is required'),
    terms: Yup.string().required("Please select Term"),
    headTeacherId: Yup.string().required("Please select Term")
  });
  //VALIDATIONS SCHEMA

  React.useEffect(() => {
    getAllTeachers()(dispatch)
  }, []);
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message } = state.session;
  const { teacherList } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  console.log('teacherList', teacherList);


  if (isSuccessful) {
    history.push(sessionLocations.sessionList);
  }

  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <Formik
                  initialValues={{
                    startDate: '',
                    endDate: '',
                    terms: '3',
                    headTeacherId: '7457e078-07b6-4d2d-474e-08da373808c4'
                  }}
                  validationSchema={validation}
                  onSubmit={values => {
                    console.log(values);
                    values.headTeacherId = '7457e078-07b6-4d2d-474e-08da373808c4';
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
                      <div className="row">
                        <Form.Group className="col-md-6 form-group">

                          <label htmlFor="startDate" className="form-label"> Start Year:</label>
                          <Field type="text" className="form-control" name="startDate" id="name" aria-describedby="name" required placeholder="Start Year" />
                        </Form.Group>
                        <Form.Group className="col-md-6 form-group">

                          <label htmlFor="endYear" className="form-label">End Year:</label>
                          <Field type="text" className="form-control" name="endDate" id="name" aria-describedby="name" required placeholder="End Year" />
                        </Form.Group>

                        <Form.Group className="col-sm-6 form-group">
                          <label htmlFor="terms" className="form-label">Head of School</label><br />
                          <Field as='select' id='headTeacherId' name='headTeacherId' className="form-control" data-style="py-0">
                            {teacherList.map((teacher, idx) => {
                              return (
                                <option key={idx} value={teacher.userAccountId}>
                                  {teacher.firstName} {teacher.lastName}
                                </option>

                              )

                            })}


                            {/* <option key={idx} name={values.headTeacherId} value={teacher.userAccountId}>
                            {teacher.fullName}
                            </option> */}
                          </Field>
                        </Form.Group>
                        <Form.Group className="col-sm-3 form-group">
                          <label htmlFor="terms" className="form-label">No. of Terms</label><br />
                          <Field as='select' id='terms' name='terms' className="form-control" data-style="py-0">
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                          </Field>
                        </Form.Group>
                      </div>
                      <div className="d-flex justify-content-end">
                        <Button type="button" variant="btn btn-danger mx-2" onClick={() => { history.push(sessionLocations.sessionList) }}>Cancel</Button>{' '}
                        <Button type="button" variant="btn btn-primary" onClick={handleSubmit}>Submit</Button>
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