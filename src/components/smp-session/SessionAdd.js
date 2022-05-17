import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations, sessionLocations } from "../../router/spm-path-locations";
import { Formik } from 'formik';
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
    startYear: Yup.string()
        // .number('Must be Number')
        .min(4, 'Must be in Year Format!')
        .max(4, 'Must be in Year Format!')
        .required('Session Year is required'),
    endYear: Yup.string()
        // .number('Must be Number')
        .min(4, 'Must be in Year Format!')
        .max(4, 'Must be in Year Format!')
        .required('Session Year is required'),
    terms: Yup.string().required("Please select Term")
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message } = state.session;
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
                    terms: ''
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
                      {/* <Col lg="6">
                        <div className="form-group">
                          {(touched.name && errors.name) && <div className='text-danger'>{errors.name}</div>}
                          <label htmlFor="name" className="form-label">Session Name</label>
                          <Field type="text" className="form-control" name="name" id="name" aria-describedby="name" required placeholder=" " />
                        </div>
                        <div className="form-group">
                          {(touched.name && errors.name) && <div className='text-danger'>{errors.name}</div>}
                          <label htmlFor="name" className="form-label">Session Name</label>
                          <Field type="text" className="form-control" name="name" id="name" aria-describedby="name" required placeholder=" " />
                        </div>
                      </Col> */}
                      <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                 {(touched.name && errors.name) && <div className='text-danger'>{errors.name}</div>}
                                    <Form.Label htmlFor="startYear">Session Year:</Form.Label>
                                    <Form.Control type="text" placeholder="Start Year" name="startYear" id="startYear"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                 {(touched.name && errors.name) && <div className='text-danger'>{errors.name}</div>}
                                    <Form.Label htmlFor="endYear">Session Year:</Form.Label>
                                    <Form.Control type="text" placeholder="End Year" name="endYear" id="endYear"/>
                                 </Form.Group>
                                 <Form.Group className="col-sm-3 form-group">
                                    <Form.Label>No. of Terms:</Form.Label>
                                    <select name="terms" className="selectpicker form-control" data-style="py-0">
                                       <option>Select Term</option>
                                       <option>1</option>
                                       <option>2</option>
                                       <option>3</option>
                                       <option>4</option>
                                       <option>5</option>
                                       <option>6</option>
                                       <option>7</option>
                                       <option>8</option>
                                       <option>9</option>
                                       <option>10</option>
                                    </select>
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
