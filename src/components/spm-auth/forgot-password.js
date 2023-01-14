import React, { useState } from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Card from '../Card';
import * as Yup from 'yup';

import { Formik, Form, Field } from 'formik';
// img
import auth1 from '../../assets/images/auth/04.png'
import Logo from '../partials/components/logo'
import { useDispatch, useSelector } from 'react-redux'
import { authLocations } from '../../router/spm-path-locations';
import { changeMyPassword, forgotPassword } from '../../store/actions/auth-actions';

const ForgotPassword = () => {

    const locations = useLocation();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);


    const { message } = state.auth;
    var token = localStorage.getItem('token');
    var userDetail = localStorage.getItem('userDetail');
    const [userId, setId] = useState('');
    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const id = queryParams.get("id");
        if (!id) return;
        setId(id);
    }, [userId]);

    React.useEffect(() => {
        if (userDetail) {
            if (JSON.parse(userDetail).userType === 'Student') {
                window.location.href = '/stds-dashboard';
            } else {
                window.location.href = '/dashboard';
            }

        }

    }, [token, userDetail])

    const validation = Yup.object().shape({
        email: Yup.string().required("Old Password Required")
            .min(4, 'Password must be a minimum of 4 characters'),
    })
    return (
        <>
            <section className="login-content">
                <Row className="m-0 align-items-center bg-white vh-100">
                    <Col md="6" className="p-0">
                        <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                            <Card.Body>

                                <Logo color={true} />
                                <br />
                                <br />
                                <br />
                                <p>Enter your current email to recover forgotten password</p>


                                <Formik
                                    initialValues={{
                                        email: '',
                                    }}
                                    validationSchema={validation}
                                    onSubmit={values => {
                                        console.log("values", values);
                                        forgotPassword(values)(dispatch)
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

                                        <Form >
                                            <Row>
                                                {message && <div className='text-danger'>{message}</div>}
                                                <Col lg="12">
                                                    <div className="form-group">
                                                        {((touched.email && errors.email) || message) && <div className='text-danger'>{errors.email}</div>}
                                                        <label htmlFor="email" className="form-label">Enter Email</label>
                                                        <Field type="email" className="form-control" name="email" id="email" aria-describedby="email" required placeholder=" " />
                                                    </div>
                                                </Col>
                                                <Col lg="12" className="d-flex justify-content-between">
                                                    <div className="form-check mb-3 form-Check">
                                                        <Field type="checkbox" id="customCheck1" className="form-check-input" />
                                                        <label htmlFor="customCheck1" className='check-label'>Remember Me </label>
                                                    </div>
                                                    <Link to={authLocations.login}>Return back to login?</Link>
                                                </Col>
                                            </Row>
                                            <div className="d-flex justify-content-center">
                                                <button onSubmit={() => {
                                                    handleSubmit()
                                                }} type="submit" variant="btn btn-primary" className='btn btn-primary'>Sign In</button>
                                            </div>
                                            {/* <p className="mt-3 text-center">
                                                        Don’t have an account? <Link to="/auth/sign-up" className="text-underline">Click here to sign up.</Link>
                                                    </p> */}
                                        </Form>
                                    )}
                                </Formik>



                            </Card.Body>
                        </Card>
                        <div className="sign-bg">
                            <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.05">
                                    <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF"></rect>
                                    <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF"></rect>
                                    <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF"></rect>
                                    <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF"></rect>
                                </g>
                            </svg>
                        </div>
                    </Col>
                    <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                        <Image src={auth1} className="img-fluid gradient-main animated-scaleX" alt="images" />
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default ForgotPassword;
