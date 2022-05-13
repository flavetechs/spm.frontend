import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import {
  createSubject,
} from "../../store/actions/class-actions";
import { useHistory } from "react-router-dom";

const SubjectSetupAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Subject Name Too Short!')
      .required('Subject is required')
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  
  if (isSuccessful) {
    history.push(classLocations.subjectSetupList);
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
                    name: '',
                    isActive: true
                  }}
                  validationSchema={validation}
                  onSubmit={values => {
                    console.log(values);
                     createSubject(values)(dispatch)
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
                      <Col lg="12">
                        <div className="form-group">
                          {(touched.name && errors.name) && <div className='text-danger'>{errors.name}</div>}
                          <label htmlFor="name" className="form-label"> Name</label>
                          <Field type="text" className="form-control" name="name" id="name" aria-describedby="name" required placeholder=" " />
                        </div>
                      </Col>

                      <Col lg="12" className="d-flex justify-content-between">
                        <div className="form-check mb-3 form-Check">
                          <Field type="checkbox" id="customCheck1" className="form-check-input" />
                          <label htmlFor="customCheck1" className='check-label'>isActive </label>
                        </div>
                      </Col>
                      <div className="d-flex justify-content-end">
                      <Button type="button" variant="btn btn-danger mx-2" onClick={() => { history.push(classLocations.subjectSetupList) }}>Cancel</Button>{' '}
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

export default SubjectSetupAdd;
