import React from 'react';
import { Row, Col, } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';


import { Formik, Form, Field } from 'formik';
import auth1 from '../../assets/images/auth/01.png'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SmpLoader from '../loader/smp-loader';
import { confirmUserEmail, userEmailLogin } from '../../store/actions/candidate-admission-actions';
import { candidateAuthLocation, candidateLocations } from '../../router/candidate-path-location';
import Card from '../Card';

const ConfirmUserEmail = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const admissionNotificationId = queryParams.get("admissionNotificationId");
        if (!admissionNotificationId) return;
        confirmUserEmail(admissionNotificationId)(dispatch);
    }, [dispatch, locations.search]);


    // const state = useSelector((state) => state);
    // const { message } = state.candidate;
    // var emailToken = localStorage.getItem('emailToken');
    // var candidateUserDetails = localStorage.getItem('candidateUserDetails');

    // useEffect(() => {
    //     if (candidateUserDetails) {
    //         if (emailToken !== null) {
    //             window.location.href = '/candidate-list';
    //         } else {
    //             localStorage.removeItem('emailToken');
    //             localStorage.removeItem('candidateUserDetails')

    //         }

    //     }
    // }, [emailToken, history, candidateUserDetails])

    // console.log("candidateUserDetails", emailToken);

    // const validation = Yup.object().shape({
    //     userName: Yup.string()
    //         .min(2, 'Username Too Short!')
    //         .max(50, 'Username Too Long!')
    //         .required('Username is required to login'),
    //     password: Yup.string().required("Password Required")
    //         .min(4, 'Password must be a minimum of 4 characters'),
    // });

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

                                        <h2 className="mb-2 text-center">Kindly Check your email</h2>
                                        <p className="text-center">Proceed to confirm your email.</p>
                                        <Link to={candidateAuthLocation.signIn} className="navbar-brand d-flex align-items-center mb-3">
                                            Login here
                                        </Link>
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

export default ConfirmUserEmail;
