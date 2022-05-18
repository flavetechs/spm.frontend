import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

// import {
//   createSubject,
// } from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";
import { createSession } from "../../store/actions/session-actions";

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

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {sessionList, isSuccessful, message } = state.session;
  console.log('data from state isSuccessful message', message, isSuccessful );
  // ACCESSING STATE FROM REDUX STORE

  
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
                    headTeacherId: ''
                  }}
                  validationSchema={validation}
                  onSubmit={values => {
                    console.log(values);
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
                      <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                 {(touched.startDate && errors.startDate) && <div className='text-danger'>{errors.startDate}</div>}
                                    <label htmlFor="startDate" className="form-label"> Start Year:</label>
                                    <Field type="text" className="form-control" name="startDate" id="name" aria-describedby="name" required placeholder="Start Year" />
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                 {(touched.endDate && errors.endDate) && <div className='text-danger'>{errors.endDate}</div>}
                                     <label htmlFor="endYear" className="form-label">End Year:</label>
                                 <Field type="text" className="form-control" name="endDate" id="name" aria-describedby="name" required placeholder="End Year" />
                                 </Form.Group>

                                 <Form.Group className="col-sm-6 form-group" style={{border: '2px solid red'}}>
                                 <label htmlFor="terms" className="form-label">Head of School</label><br/>
                                 <Field as='select' id='headTeacherId' name='headTeacherId' className="form-control" data-style="py-0">
                                       {sessionList.map((teacher, idx) => {
                                           console.log('sessionList', teacher);
                                           return (
                                           <option key={idx}>
                                               {teacher.headTeacherName}
                                            </option>
                                           )
                                           
                                       })}
                                    </Field>
                                 </Form.Group>
                                 <Form.Group className="col-sm-3 form-group" style={{border: '2px solid red'}}>
                                 <label htmlFor="terms" className="form-label">No. of Terms</label><br/>
                                 <Field as='select' id='terms' name='terms' className="form-control" data-style="py-0">
                                       <option value='1'>1</option>
                                       <option value='2'>2</option>
                                       <option value='3'>3</option>
                                       <option value='4'>4</option>
                                       <option value='5'>5</option>
                                       <option value='6'>6</option>
                                       <option value='7'>7</option>
                                       <option value='8'>8</option>
                                       <option value='9'>9</option>
                                       <option value='10'>10</option>
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
