import { Row, Col, Image, } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from '../Card'


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// img
import auth1 from '../../assets/images/auth/01.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SmpLoader from '../loader/smp-loader';
import { userEmailLogin } from '../../store/actions/candidate-admission-actions';
import { candidateLocations } from '../../router/candidate-path-location';

const RegistrationSignIn = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { message } = state.candidate;
    var emailToken = localStorage.getItem('emailToken');
    var candidateUserDetails = JSON.parse(localStorage.getItem('candidateUserDetails'));
    var authStatus = JSON.parse(localStorage.getItem('authStatus'));

    useEffect(() => {
        if (candidateUserDetails) {
            if (emailToken !== null) {
                window.location.href = '/candidates';
            } else if (authStatus === null) {
                localStorage.removeItem('emailToken');
                history.push(candidateLocations.registrationEmailReceived)
                // history.push(candidateLocations.candidateAdmissionConfirmation + '?admissionNotificationId=' + candidateUserDetails.admissionNotificationId)
            } else {
                localStorage.removeItem('emailToken');
            }
        }
    }, [emailToken, history, candidateUserDetails])

    console.log("emailToken", emailToken);
    console.log("candidateUserDetails", candidateUserDetails);
    console.log("authStatus", authStatus);

    const validation = Yup.object().shape({
        parentEmail: Yup.string()
            .min(2, 'Username Too Short!')
            .max(50, 'Username Too Long!')
            .required('Username is required to login'),
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
