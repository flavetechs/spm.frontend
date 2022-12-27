import React from 'react';
import { Row, Col, } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SmpLoader from '../loader/smp-loader';
import { confirmUserEmail, logOutUserEmail } from '../../store/actions/candidate-admission-actions';
import { candidateAuthLocation } from '../../router/candidate-path-location';
import Card from '../Card';

const ConfirmUserEmail = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const queryParams = new URLSearchParams(locations.search);
    const admissionNotificationIdQuery = queryParams.get("admissionNotificationId") || "";

    React.useEffect(() => {
        if (!admissionNotificationIdQuery) return;
        confirmUserEmail(admissionNotificationIdQuery)(dispatch);
    }, [dispatch, locations.search]);

    var expires = localStorage.getItem('expires');

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
                                        <h5 className="mb-2 text-center text-success">Email successfully confirmed. Please proceed to login</h5>
                                        <p className="text-center text-danger"> Login Access expires on {expires} </p>
                                        <p className="text-center">
                                            <Link to={candidateAuthLocation.signIn} className="text-center mb-3"
                                                onClick={() => {
                                                    dispatch(logOutUserEmail());
                                                    history.push(candidateAuthLocation.signIn)
                                                }}
                                            >
                                                Log in Again
                                            </Link>
                                        </p>

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
