import React from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../Card'
import { useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUpdateClass } from '../../store/actions/class-actions'



const ClassSetupAdd = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    // const { newClass } = state.class;

    const validation = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Class Name Too Short!')
        //     .max(50, 'Username Too Long!')
        //     .required('Username is required to login'),
        // password: Yup.string().required("Password Required")
        //     .min(8, 'Password must be a minimum of 8 characters'),
    });

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
                                            // initialValues={{
                                            //     name: ''
                                            // }}
                                            validationSchema={validation}
                                            onSubmit={values => {
                                                console.log(values);
                                                // loginUser(values)(dispatch)
                                                createUpdateClass(values)(dispatch)
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
                                                    {/* {newClass && <div className='text-danger'>{newClass}</div>} */}
                                                    <Form.Group className="form-group">
                                                    {/* {((touched.addClass && errors.addClass) || newClass) && <div className='text-danger'>{errors.addClass}</div>} */}
                                                        <Form.Control type="text" name="name" id="name"/>
                                                    </Form.Group>
                                                
                                                    <div className="checkbox mb-3">
                                                        <Form.Check className="form-check ">
                                                            <Form.Check.Input  type="checkbox" defaultValue="" id="flexCheckDefault3"/>
                                                            <Form.Check.Label  htmlFor="flexCheckDefault3">
                                                                Is Active
                                                            </Form.Check.Label>
                                                        </Form.Check>
                                                    </div>
                                                    <Button type="button" variant="btn btn-danger" onClick={() => {history.go(-1)}}>Cancel</Button>{' '}
                                                    <Button type="button" variant="btn btn-primary" onSubmit={() => {
                                                            handleSubmit()
                                                        }}>Submit</Button>
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
