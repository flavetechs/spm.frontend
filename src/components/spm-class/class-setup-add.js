import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Card from '../Card'
import { useHistory, Link } from 'react-router-dom'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createClass } from '../../store/actions/class-actions'
import { classLocations } from '../../router/spm-path-locations';



const ClassSetupAdd = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { newClass, message, isSuccessful } = state.class;

    const validation = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Class Name Too Short!')
            .required('Username is required to login')
    });

    if(isSuccessful){
        history.push(classLocations.classSetupList)
    }

    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="6">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">New Class Setup</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                <Formik
                                    initialValues={{
                                        name: '',
                                        isActive : true
                                    }}
                                    validationSchema={validation}
                                    onSubmit={values => {
                                        console.log(values);
                                        createClass(values)(dispatch)
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
                                            <Col lg="6">
                                                <div className="form-group">
                                                    {(touched.name && errors.name) && <div className='text-danger'>{errors.name}</div>}
                                                    <label htmlFor="name" className="form-label"> Name</label>
                                                    <Field type="text" className="form-control" name="name" id="name" aria-describedby="name" required placeholder=" " />
                                                </div>
                                            </Col>

                                            <Col lg="6" className="d-flex justify-content-between">
                                                            <div className="form-check mb-3 form-Check">
                                                                <Field type="checkbox" id="customCheck1" className="form-check-input" />
                                                                <label htmlFor="customCheck1" className='check-label'>Remember Me </label>
                                                            </div>
                                                        </Col>
                                            <Button type="button" variant="btn btn-danger" onClick={() => { history.push(classLocations.classSetupList) }}>Cancel</Button>{' '}
                                            <Button type="button" variant="btn btn-primary" onClick={handleSubmit}>Submit</Button>
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

export default ClassSetupAdd
