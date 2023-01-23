import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../Card';

// img
import auth1 from '../../assets/images/auth/04.png'
import Logo from '../partials/components/logo'
import { authLocations } from '../../router/spm-path-locations';
import { useDispatch, useSelector } from 'react-redux';

const PasswordResetSuccessful = () => {

    const state = useSelector((state) => state);
    const { message } = state.auth;

    const clearForgotPasswordMessage = () => {
        sessionStorage.removeItem("forgotPasswordMessage")
      }

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
                                {message && <div className='text-success d-flex justify-content-center'>{message}</div>}
                                <p className='d-flex justify-content-center'>Didn't get an Email? return to Forgot Password &#x2193;</p>
                                <div >
                                    <Row>
                                        <Col lg="12" className="d-flex justify-content-center">
                                            <Link
                                                onClick={clearForgotPasswordMessage}
                                                to={authLocations.forgottenPassword}
                                            >Return to Forgot Password?</Link>
                                        </Col>
                                    </Row>
                                </div>
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

export default PasswordResetSuccessful;
