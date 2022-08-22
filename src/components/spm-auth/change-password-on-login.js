// import React from 'react'
// import { Row, Col, Image, Button } from 'react-bootstrap'
// import { useHistory } from 'react-router-dom'
// import Card from '../Card';
// import * as Yup from 'yup';

// import { Formik, Form, Field } from 'formik';
// // img
// import auth1 from '../../assets/images/auth/04.png'
// import Logo from '../partials/components/logo'
// import { useDispatch, useSelector } from 'react-redux'

// const FirstTimeLoginPassswordChange = () => {
//     let history = useHistory();
//     const dispatch = useDispatch();
//     const state = useSelector((state) => state);
//     const { message } = state.auth;
//     var token = localStorage.getItem('token');
//     var userDetail = localStorage.getItem('userDetail')

//     React.useEffect(() => {
//         if (userDetail) {
//             if (JSON.parse(userDetail).userType == 'Student') {
//                 window.location.href = '/stds-dashboard';
//             } else {
//                 window.location.href = '/dashboard';
//             }

//         }
//     }, [token])

//     const validation = Yup.object().shape({
//         oldPassword: Yup.string().required("Old Password Required")
//             .min(4, 'Password must be a minimum of 4 characters'),
//         newPassword: Yup.string().required("New Password Required")
//             .min(4, 'Password must be a minimum of 4 characters'),
//         confirmNewPassword: Yup.string().required("Confirm Password Required")
//             .min(4, 'Password must be a minimum of 4 characters')
//             .when("password", {
//               is: val => (val && val.length > 0 ? true : false),
//               then: Yup.string().oneOf([Yup.ref("newPassword")], "Both password need to be the same" )
//     })
// })
//     return (
//         <>
//             <section className="login-content">
//                 <Row className="m-0 align-items-center bg-white vh-100">
//                     <Col md="6" className="p-0">
//                         <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
//                             <Card.Body>

//                                 <Logo color={true} />
//                                 <br />
//                                 <br />
//                                 <br />
//                                 <p>Enter your current password to and a new passsword</p>
                               
                               
//                                 <Formik
//                                             initialValues={{
//                                                 oldPassword: '',
//                                                 newPassword: '',
//                                                 confirmNewPassword: '',
//                                             }}
//                                             validationSchema={validation}
//                                             onSubmit={values => {
//                                                 // loginUser(values)(dispatch)
//                                             }}
//                                         >
//                                             {({
//                                                 handleChange,
//                                                 handleBlur,
//                                                 handleSubmit,
//                                                 values,
//                                                 touched,
//                                                 errors,
//                                                 isValid }) => (
//                                                     <Form>
//                                                     <Row>
//                                                         <Col lg="12">
//                                                             <Form.Group className="floating-label form-group">
//                                                             {((touched.oldPassword && errors.oldPassword) || message) && <div className='text-danger'>{errors.oldPassword}</div>}
//                                                                 <Form.Label htmlFor="oldPassword" className="">Old Password</Form.Label>
//                                                                 <Field type="password" className="form-control" id="oldPassword" aria-describedby="oldPassword" placeholder=" " />
//                                                             </Form.Group>
//                                                         </Col>
//                                                         <Col lg="12">
//                                                             <Form.Group className="floating-label form-group">
//                                                             {((touched.newPassword && errors.newPassword) || message) && <div className='text-danger'>{errors.newPassword}</div>}
//                                                                 <Form.Label htmlFor="New Password" className="">New Password</Form.Label>
//                                                                 <Field type="password" className="form-control" id="newPassword" aria-describedby="newPassword" placeholder=" " />
//                                                             </Form.Group>
//                                                         </Col>
//                                                         <Col lg="12">
//                                                             <Form.Group className="floating-label form-group">
//                                                             {((touched.confirmNewPassword && errors.confirmNewPassword) || message) && <div className='text-danger'>{errors.confirmNewPassword}</div>}
//                                                                 <Form.Label htmlFor="confirmNewPassword" className="">Confirm New Password</Form.Label>
//                                                                 <Field type="password" className="form-control" id="confirmNewPassword" aria-describedby="confirmNewPassword" placeholder=" " />
//                                                             </Form.Group>
//                                                         </Col>
//                                                     </Row>
//                                                     <Button onClick={() => history.push('/dashboard')} type="button" variant="btn btn-primary">Login</Button>
//                                                 </Form>
//                                             )}
//                                         </Formik>
                               
                               
                          
//                             </Card.Body>
//                         </Card>
//                         <div className="sign-bg">
//                             <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <g opacity="0.05">
//                                     <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF"></rect>
//                                     <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF"></rect>
//                                     <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF"></rect>
//                                     <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF"></rect>
//                                 </g>
//                             </svg>
//                         </div>
//                     </Col>
//                     <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
//                         <Image src={auth1} className="img-fluid gradient-main animated-scaleX" alt="images" />
//                     </Col>
//                 </Row>
//             </section>
//         </>
//     )
// }

// export default FirstTimeLoginPassswordChange
