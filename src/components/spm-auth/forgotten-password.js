import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from '../Card';
import * as Yup from 'yup';

import { Formik, Form, Field } from 'formik';
// img
import auth1 from '../../assets/images/auth/04.png'
import { connect } from 'react-redux'
import { authLocations } from '../../router/spm-path-locations';
import { forgotPasswordFunc } from '../../store/actions/auth-actions';
import SmpLoader from '../loader/smp-loader';
import { ServiceURLs } from '../../utils/other';
import { getAppLayout } from '../../store/actions/portal-setting-action';

const ForgottenPassword = (props) => {

    let forgotPasswordMessage = sessionStorage.getItem("forgotPasswordMessage")

    const history = useHistory();
    const { message } = props.state.auth;
    const { appSetting } = props.state.portal;

    const validation = Yup.object().shape({
        email: Yup.string().required("User Email is Required")
            .email("Must be a valid email"),
    })

    React.useEffect(() => {
        if (forgotPasswordMessage) {
            history.push(authLocations.passwordResetSuccessful)
        }
    }, [forgotPasswordMessage]);

    const schoolUrl = ServiceURLs.GetAppUrl();
    useEffect(() => {
        props.getAppLayout(schoolUrl).then(res => {
            return res;
        })
    }, [schoolUrl])

    return (
        <>
            <section className="login-content">
                <SmpLoader />
                <Row className="m-0 align-items-center bg-white vh-100">
                    <Col md="6" className="p-0">
                        <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                            <Card.Body>
                                <div className="text-center mb-3">
                                    <img
                                        src={appSetting?.schoolLogo}
                                        alt="school logo"
                                        height="120px"
                                    />
                                    <h4>{appSetting?.schoolName}</h4>
                                </div>
                                <p>Enter your current email to recover forgotten password</p>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        schoolUrl
                                    }}
                                    validationSchema={validation}
                                    onSubmit={values => {
                                        props.forgotPasswordFunc(values);
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
                                                {forgotPasswordMessage && <div className='text-success'>{forgotPasswordMessage}</div>}
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
                                                    handleSubmit();

                                                }} type="button" variant="btn btn-primary" className='btn btn-primary'>Reset</button>
                                            </div>
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

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAppLayout: (schoolUrl) => getAppLayout(schoolUrl)(dispatch),
        forgotPasswordFunc: (values) => forgotPasswordFunc(values)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
