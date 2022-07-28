import { Row, Col, Image, ListGroup, } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from '../Card'


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// img
import auth1 from '../../assets/images/auth/01.png'
import { dashboardLocations } from '../../router/spm-path-locations';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/auth-actions';
import { useEffect } from 'react';
import SmpLoader from '../loader/smp-loader';

const SignIn = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { message } = state.auth;
    var token = localStorage.getItem('token');
    useEffect(() => {
        if(token){
            history.push('/dashboard')
        }
    }, [token])

    const validation = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'Username Too Short!')
            .max(50, 'Username Too Long!')
            .required('Username is required to login'),
        password: Yup.string().required("Password Required")
            .min(8, 'Password must be a minimum of 8 characters'),
    });

    return (
        <>
            <section className="login-content">
                <SmpLoader />
                <Row className="m-0 align-items-center bg-white vh-100">
                    <Col md="6">
                        <Row className="justify-content-center">
                            <Col md="10">
                                <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                                    <Card.Body>
                                        <Link to={dashboardLocations.dashboard} className="navbar-brand d-flex align-items-center mb-3">
                                            <svg width="30" className="text-primary" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                                                <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                                                <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                                                <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                                            </svg>
                                            <h4 className="logo-title ms-3">FLAVTECH</h4>
                                        </Link>
                                        <h2 className="mb-2 text-center">Sign In</h2>
                                        <p className="text-center">Login to stay connected.</p>

                                        <Formik
                                            initialValues={{
                                                userName: '',
                                                password: '',
                                            }}
                                            validationSchema={validation}
                                            onSubmit={values => {
                                                loginUser(values)(dispatch)
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
                                                                {((touched.userName && errors.userName) || message) && <div className='text-danger'>{errors.userName}</div>}
                                                                <label htmlFor="userName" className="form-label">User Name</label>
                                                                <Field type="userName" className="form-control" name="userName" id="userName" aria-describedby="userName" required placeholder=" " />
                                                            </div>
                                                        </Col>
                                                        <Col lg="12" className="">
                                                            <div className="form-group">
                                                                {(touched.password && errors.password) && <div className='text-danger'>{errors.password}</div>}
                                                                <label htmlFor="password" className="form-label">Password</label>
                                                                <Field type="password" required className="form-control" name="password" id="password" aria-describedby="password" placeholder=" " />
                                                            </div>
                                                        </Col>
                                                        <Col lg="12" className="d-flex justify-content-between">
                                                            <div className="form-check mb-3 form-Check">
                                                                <Field type="checkbox" id="customCheck1" className="form-check-input" />
                                                                <label htmlFor="customCheck1" className='check-label'>Remember Me </label>
                                                            </div>
                                                            <Link to="/auth/recoverpw">Forgot Password?</Link>
                                                        </Col>
                                                    </Row>
                                                    <div className="d-flex justify-content-center">
                                                        <button onSubmit={() => {
                                                            handleSubmit()
                                                        }} type="submit" variant="btn btn-primary" className='btn btn-primary'>Sign In</button>
                                                    </div>
                                                    <p className="mt-3 text-center">
                                                        Don’t have an account? <Link to="/auth/sign-up" className="text-underline">Click here to sign up.</Link>
                                                    </p>
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
                    <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                        <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default SignIn
