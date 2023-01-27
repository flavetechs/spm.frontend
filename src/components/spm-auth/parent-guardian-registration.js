import { Row, Col, } from 'react-bootstrap'
import Card from '../Card'


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// img
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SmpLoader from '../loader/smp-loader';
import { userEmailLogin } from '../../store/actions/candidate-admission-actions';

const RegistrationSignIn = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { message, parentGuardianFirstTimeLogin, token } = state.candidate;

    useEffect(() => {
        if (token && parentGuardianFirstTimeLogin === false) {
            window.location.href = '/candidates';
        } else if (parentGuardianFirstTimeLogin === true) {
            window.location.href = '/candidates/registration-email';
        }
    }, [ token, parentGuardianFirstTimeLogin]);

    const validation = Yup.object().shape({
        parentEmail: Yup.string()
            .email("Must be a valid email")
            .required('Email is required to login'),
    });

    return (
        <>
            <section className="login-content">
                <SmpLoader />
                <Row className="m-0 align-items-center bg-white vh-100">
                    <Col md="12">
                        <Row className="justify-content-center">
                            <Col md="6">
                                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                                    <Card.Body>
                                        <h2 className="mb-2 text-center">Sign In  with your Email</h2>
                                        <p className="text-center">Login to stay connected.</p>

                                        <Formik
                                            initialValues={{
                                                parentEmail: '',
                                            }}
                                            validationSchema={validation}
                                            onSubmit={values => {
                                                userEmailLogin(values)(dispatch)
                                            }}
                                        >
                                            {({
                                                handleSubmit,
                                                touched,
                                                errors }) => (
                                                <Form >
                                                    <Row>
                                                        {message && <div className='text-danger'>{message}</div>}
                                                        <Col lg="12">
                                                            <div className="form-group">
                                                                {((touched.parentEmail && errors.parentEmail) || message) && <div className='text-danger'>{errors.parentEmail}</div>}
                                                                <label htmlFor="parentEmail" className="form-label">User Email</label>
                                                                <Field type="email" className="form-control" name="parentEmail" id="parentEmail" aria-describedby="parentEmail" required placeholder=" " />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="d-flex justify-content-center">
                                                        <button onSubmit={() => {
                                                            handleSubmit()
                                                        }} type="submit" variant="btn btn-primary" className='btn btn-primary'>Sign In</button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <div className="sign-bg">
                            <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.05">
                                    <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                                    <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                                    <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                                    <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                                </g>
                            </svg>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default RegistrationSignIn
