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
import { getAllActiveTeachers } from "../../store/actions/class-actions";
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

  React.useEffect(() => {
    getAllActiveTeachers()(dispatch)
  }, []);
  
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