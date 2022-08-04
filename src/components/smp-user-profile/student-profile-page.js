import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
    fetchSingleStudent,
} from "../../store/actions/student-actions";
import avatars1 from "../../assets/images/avatars/01.png";
import avatars2 from "../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../assets/images/avatars/avtar_5.png";
import { getAllActiveSubjects, getAllSessionClasses } from "../../store/actions/class-actions";
import { getAllResultList } from "../../store/actions/publish-actions";
import { authLocations } from "../../router/spm-path-locations";

const StudentProfilePage = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const locations = useLocation();
    const dispatch = useDispatch();
    let profilePhoto = "https://highwaymail.co.za/wp-content/uploads/sites/50/2017/09/Themba-Dloti.jpg"
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { message, selectedStudent } = state.student;
    const {  activeSubjects } = state.class;
    console.log('activeSubjects :', activeSubjects);
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const studentAccountId = queryParams.get("studentAccountId");
        if (!studentAccountId) return;
        fetchSingleStudent(studentAccountId)(dispatch);
    }, []);

    React.useEffect(() => {
        getAllSessionClasses()(dispatch);
        getAllActiveSubjects()(dispatch);
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                        </div>
                        <div className="card-body ">
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                }}>
                                    <img src={profilePhoto} alt="profilePhoto"
                                        className="d-block justify-content-center mb-3"
                                        width="220px"
                                        height="220px"
                                        style={{ borderRadius: "50%", }}
                                    />
                                </div>

                                <h5 className="d-flex justify-content-center text-dark">Benson David E.</h5>
                                <h6 className="d-flex justify-content-center text-dark">ABC/000000927/XYX</h6>
                                <hr className="fw-bold" />
                                <p className=""><span>Status: </span>{" "}
                                    <span className="text-dark fwd-bold ps-2"><b>Student</b></span></p>
                                <p className=""><span>Hobbies: </span>{" "}
                                    <span className="text-dark fwd-bold ps-2"><b>Reading, Dancing, Football, Coding</b></span>
                                </p>
                                <p className=""><span>Best Subject: </span>{" "}
                                    <span className="text-dark fwd-bold ps-2"><b>English, Mathematics, Physics</b></span>
                                </p>
                                <div className="mt-5 d-flex justify-content-end">
                                    <Button className="me-3"
                                        type="button"
                                        variant="btn btn-danger"
                                        onClick={() => {
                                            history.push('/dashboard')
                                        }}
                                    >Back</Button>{" "}
                                    <Button className=""
                                        type="button"
                                        variant="btn btn-primary"
                                        onClick={() => {
                                            history.push(authLocations.studentProfileEdit)
                                        }}
                                    >Edit Profile</Button>
                                </div>
                            </div>
                            {/* <Form className="">
                <div className="form-group">
                  {!selectedStudent?.photo ? (
                    <div>
                      <img
                        src={avatars1}
                        alt="User-Profile"
                        className="theme-color-default-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars2}
                        alt="User-Profile"
                        className="theme-color-purple-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars3}
                        alt="User-Profile"
                        className="theme-color-blue-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars5}
                        alt="User-Profile"
                        className="theme-color-green-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars6}
                        alt="User-Profile"
                        className="theme-color-yellow-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars4}
                        alt="User-Profile"
                        className="theme-color-pink-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                    </div>
                  ) : (
                    <img  className="img-fluid mt-4" src={selectedStudent?.photo} alt="profile" />
                  )}
                </div>
              </Form> */}
                        </div>
                    </Card>
                </Col>
                <div className="col-xl-9 col-lg-8">
                    <div className="card ">
                        <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                            {" "}
                            <div className="header-title">
                                <h4 className="card-title">
                                    <span className="pe-1">
                                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M11.9849 15.3462C8.11731 15.3462 4.81445 15.931 4.81445 18.2729C4.81445 20.6148 8.09636 21.2205 11.9849 21.2205C15.8525 21.2205 19.1545 20.6348 19.1545 18.2938C19.1545 15.9529 15.8735 15.3462 11.9849 15.3462Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M11.9849 12.0059C14.523 12.0059 16.5801 9.94779 16.5801 7.40969C16.5801 4.8716 14.523 2.81445 11.9849 2.81445C9.44679 2.81445 7.3887 4.8716 7.3887 7.40969C7.38013 9.93922 9.42394 11.9973 11.9525 12.0059H11.9849Z"
                                                stroke="currentColor" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    My Account
                                </h4>
                            </div>{" "}
                        </div>
                        <Card.Body>
                            {" "}
                            <div className="new-user-info">
                                <Form>
                                    {message && <div className="text-danger">{message}</div>}
                                    <div className="row">
                                        <div className="col-md-12  form-group">
                                        </div>
                                        {/* <div className="col-md-6 form-group">
                      <p><span>First Name:</span> <span className="h6"> {selectedStudent?.firstName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Last Name:</span> <span className="h6"> {selectedStudent?.lastName}</span></p>
                    </div> */}
                                        {/* <div className="col-md-6 form-group">
                      <p> <span>Middle Name:</span><span className="h6 text-capitalize"> {selectedStudent?.middleName}</span></p>
                    </div> */}
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor" />
                                                        <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor" />
                                                    </svg>
                                                    {/* <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.353 2.5C18.054 2.911 20.978 5.831 21.393 9.532" stroke="currentColor" strokeWidth="1.5"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.353 6.04297C16.124 6.38697 17.508 7.77197 17.853 9.54297" stroke="currentColor" strokeWidth="1.5"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M11.0315 12.4724C15.0205 16.4604 15.9254 11.8467 18.4653 14.3848C20.9138 16.8328 22.3222 17.3232 19.2188 20.4247C18.8302 20.737 16.3613 24.4943 7.68447 15.8197C-0.993406 7.144 2.76157 4.67244 3.07394 4.28395C6.18377 1.17385 6.66682 2.58938 9.11539 5.03733C11.6541 7.5765 7.04254 8.48441 11.0315 12.4724Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg> */}
                                                </span>{" "}
                                                <span>Mobile Number:</span> <span className="h6">08057494883</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.5317 12.4724C15.5208 16.4604 16.4258 11.8467 18.9656 14.3848C21.4143 16.8328 22.8216 17.3232 19.7192 20.4247C19.3306 20.737 16.8616 24.4943 8.1846 15.8197C-0.493478 7.144 3.26158 4.67244 3.57397 4.28395C6.68387 1.17385 7.16586 2.58938 9.61449 5.03733C12.1544 7.5765 7.54266 8.48441 11.5317 12.4724Z" fill="currentColor" />
                                                    </svg>
                                                    {/* <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M11.5317 12.4724C15.5208 16.4604 16.4258 11.8467 18.9656 14.3848C21.4143 16.8328 22.8216 17.3232 19.7192 20.4247C19.3306 20.737 16.8616 24.4943 8.1846 15.8197C-0.493478 7.144 3.26158 4.67244 3.57397 4.28395C6.68387 1.17385 7.16586 2.58938 9.61449 5.03733C12.1544 7.5765 7.54266 8.48441 11.5317 12.4724Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg> */}
                                                </span>{" "}
                                                <span>Home Phone Number:</span> <span className="h6">08098487494</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor" />
                                                        <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>Emergency Phone Number:{" "}</span>
                                                <span className="h6">09098737373</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M22 15.94C22 18.73 19.76 20.99 16.97 21H16.96H7.05C4.27 21 2 18.75 2 15.96V15.95C2 15.95 2.006 11.524 2.014 9.298C2.015 8.88 2.495 8.646 2.822 8.906C5.198 10.791 9.447 14.228 9.5 14.273C10.21 14.842 11.11 15.163 12.03 15.163C12.95 15.163 13.85 14.842 14.56 14.262C14.613 14.227 18.767 10.893 21.179 8.977C21.507 8.716 21.989 8.95 21.99 9.367C22 11.576 22 15.94 22 15.94Z" fill="currentColor" />
                                                        <path d="M21.4759 5.67351C20.6099 4.04151 18.9059 2.99951 17.0299 2.99951H7.04988C5.17388 2.99951 3.46988 4.04151 2.60388 5.67351C2.40988 6.03851 2.50188 6.49351 2.82488 6.75151L10.2499 12.6905C10.7699 13.1105 11.3999 13.3195 12.0299 13.3195C12.0339 13.3195 12.0369 13.3195 12.0399 13.3195C12.0429 13.3195 12.0469 13.3195 12.0499 13.3195C12.6799 13.3195 13.3099 13.1105 13.8299 12.6905L21.2549 6.75151C21.5779 6.49351 21.6699 6.03851 21.4759 5.67351Z" fill="currentColor" />
                                                    </svg>{" "}
                                                    {/* <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17.9028 8.85107L13.4596 12.4641C12.6201 13.1301 11.4389 13.1301 10.5994 12.4641L6.11865 8.85107"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M16.9089 21C19.9502 21.0084 22 18.5095 22 15.4384V8.57001C22 5.49883 19.9502 3 16.9089 3H7.09114C4.04979 3 2 5.49883 2 8.57001V15.4384C2 18.5095 4.04979 21.0084 7.09114 21H16.9089Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>{" "} */}
                                                </span>
                                                <span>Email Address:</span> <span className="h6 text-capitalize">davidbffffen@gmail.com</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 16.8701V9.25708H21V16.9311C21 20.0701 19.0241 22.0001 15.8628 22.0001H8.12733C4.99561 22.0001 3 20.0301 3 16.8701ZM7.95938 14.4101C7.50494 14.4311 7.12953 14.0701 7.10977 13.6111C7.10977 13.1511 7.46542 12.7711 7.91987 12.7501C8.36443 12.7501 8.72997 13.1011 8.73985 13.5501C8.7596 14.0111 8.40395 14.3911 7.95938 14.4101ZM12.0198 14.4101C11.5653 14.4311 11.1899 14.0701 11.1701 13.6111C11.1701 13.1511 11.5258 12.7711 11.9802 12.7501C12.4248 12.7501 12.7903 13.1011 12.8002 13.5501C12.82 14.0111 12.4643 14.3911 12.0198 14.4101ZM16.0505 18.0901C15.596 18.0801 15.2305 17.7001 15.2305 17.2401C15.2206 16.7801 15.5862 16.4011 16.0406 16.3911H16.0505C16.5148 16.3911 16.8902 16.7711 16.8902 17.2401C16.8902 17.7101 16.5148 18.0901 16.0505 18.0901ZM11.1701 17.2401C11.1899 17.7001 11.5653 18.0611 12.0198 18.0401C12.4643 18.0211 12.82 17.6411 12.8002 17.1811C12.7903 16.7311 12.4248 16.3801 11.9802 16.3801C11.5258 16.4011 11.1701 16.7801 11.1701 17.2401ZM7.09989 17.2401C7.11965 17.7001 7.49506 18.0611 7.94951 18.0401C8.39407 18.0211 8.74973 17.6411 8.72997 17.1811C8.72009 16.7311 8.35456 16.3801 7.90999 16.3801C7.45554 16.4011 7.09989 16.7801 7.09989 17.2401ZM15.2404 13.6011C15.2404 13.1411 15.596 12.7711 16.0505 12.7611C16.4951 12.7611 16.8507 13.1201 16.8705 13.5611C16.8804 14.0211 16.5247 14.4011 16.0801 14.4101C15.6257 14.4201 15.2503 14.0701 15.2404 13.6111V13.6011Z" fill="currentColor" />
                                                        <path opacity="0.4" d="M3.00293 9.25699C3.01577 8.66999 3.06517 7.50499 3.15803 7.12999C3.63224 5.02099 5.24256 3.68099 7.54442 3.48999H16.4555C18.7376 3.69099 20.3677 5.03999 20.8419 7.12999C20.9338 7.49499 20.9832 8.66899 20.996 9.25699H3.00293Z" fill="currentColor" />
                                                        <path d="M8.30465 6.59C8.73934 6.59 9.06535 6.261 9.06535 5.82V2.771C9.06535 2.33 8.73934 2 8.30465 2C7.86996 2 7.54395 2.33 7.54395 2.771V5.82C7.54395 6.261 7.86996 6.59 8.30465 6.59Z" fill="currentColor" />
                                                        <path d="M15.6953 6.59C16.1201 6.59 16.456 6.261 16.456 5.82V2.771C16.456 2.33 16.1201 2 15.6953 2C15.2606 2 14.9346 2.33 14.9346 2.771V5.82C14.9346 6.261 15.2606 6.59 15.6953 6.59Z" fill="currentColor" />
                                                    </svg>
                                                    {/* <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.09277 9.40421H20.9167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M16.442 13.3097H16.4512" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M12.0045 13.3097H12.0137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M7.55818 13.3097H7.56744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M16.442 17.1962H16.4512" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M12.0045 17.1962H12.0137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M7.55818 17.1962H7.56744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M16.0433 2V5.29078" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M7.96515 2V5.29078" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M16.2383 3.5791H7.77096C4.83427 3.5791 3 5.21504 3 8.22213V17.2718C3 20.3261 4.83427 21.9999 7.77096 21.9999H16.229C19.175 21.9999 21 20.3545 21 17.3474V8.22213C21.0092 5.21504 19.1842 3.5791 16.2383 3.5791Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg> */}
                                                </span>{" "}
                                                <span>Date Of Birth:</span> <span className="h6">10-06-2001</span></p>
                                        </div>
                                        <div className="col-sm-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor" />
                                                    </svg>
                                                    {/* <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg> */}
                                                </span>{" "}
                                                <span>Home Address:</span> <span className="h6 text-capitalize">Igwuruta lekki phase 2</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.53162 2.93677C10.7165 1.66727 13.402 1.68946 15.5664 2.99489C17.7095 4.32691 19.012 6.70418 18.9998 9.26144C18.95 11.8019 17.5533 14.19 15.8075 16.0361C14.7998 17.1064 13.6726 18.0528 12.4488 18.856C12.3228 18.9289 12.1848 18.9777 12.0415 19C11.9036 18.9941 11.7693 18.9534 11.6508 18.8814C9.78243 17.6746 8.14334 16.134 6.81233 14.334C5.69859 12.8314 5.06584 11.016 5 9.13442C4.99856 6.57225 6.34677 4.20627 8.53162 2.93677ZM9.79416 10.1948C10.1617 11.1008 11.0292 11.6918 11.9916 11.6918C12.6221 11.6964 13.2282 11.4438 13.6748 10.9905C14.1214 10.5371 14.3715 9.92064 14.3692 9.27838C14.3726 8.29804 13.7955 7.41231 12.9073 7.03477C12.0191 6.65723 10.995 6.86235 10.3133 7.55435C9.63159 8.24635 9.42664 9.28872 9.79416 10.1948Z" fill="currentColor" />
                                                        <ellipse opacity="0.4" cx="12" cy="21" rx="5" ry="1" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>City:</span> <span className="h6 text-capitalize"> Island City</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M16.6756 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0711 3.92889 22 7.33333 22H16.6756C20.08 22 22 20.0711 22 16.6667V7.33333C22 3.92889 20.08 2 16.6756 2Z" fill="currentColor" />
                                                        <path d="M7.36866 9.3689C6.91533 9.3689 6.54199 9.74223 6.54199 10.2045V17.0756C6.54199 17.5289 6.91533 17.9022 7.36866 17.9022C7.83088 17.9022 8.20421 17.5289 8.20421 17.0756V10.2045C8.20421 9.74223 7.83088 9.3689 7.36866 9.3689Z" fill="currentColor" />
                                                        <path d="M12.0352 6.08887C11.5818 6.08887 11.2085 6.4622 11.2085 6.92442V17.0755C11.2085 17.5289 11.5818 17.9022 12.0352 17.9022C12.4974 17.9022 12.8707 17.5289 12.8707 17.0755V6.92442C12.8707 6.4622 12.4974 6.08887 12.0352 6.08887Z" fill="currentColor" />
                                                        <path d="M16.6398 12.9956C16.1775 12.9956 15.8042 13.3689 15.8042 13.8312V17.0756C15.8042 17.5289 16.1775 17.9023 16.6309 17.9023C17.0931 17.9023 17.4664 17.5289 17.4664 17.0756V13.8312C17.4664 13.3689 17.0931 12.9956 16.6398 12.9956Z" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>State:</span> <span className="h6 text-capitalize"> {selectedStudent?.stateId} Lagos</span></p>
                                        </div>
                                        <div className="col-md-6 form-group text-capitalize">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.53162 2.93677C10.7165 1.66727 13.402 1.68946 15.5664 2.99489C17.7095 4.32691 19.012 6.70418 18.9998 9.26144C18.95 11.8019 17.5533 14.19 15.8075 16.0361C14.7998 17.1064 13.6726 18.0528 12.4488 18.856C12.3228 18.9289 12.1848 18.9777 12.0415 19C11.9036 18.9941 11.7693 18.9534 11.6508 18.8814C9.78243 17.6746 8.14334 16.134 6.81233 14.334C5.69859 12.8314 5.06584 11.016 5 9.13442C4.99856 6.57225 6.34677 4.20627 8.53162 2.93677ZM9.79416 10.1948C10.1617 11.1008 11.0292 11.6918 11.9916 11.6918C12.6221 11.6964 13.2282 11.4438 13.6748 10.9905C14.1214 10.5371 14.3715 9.92064 14.3692 9.27838C14.3726 8.29804 13.7955 7.41231 12.9073 7.03477C12.0191 6.65723 10.995 6.86235 10.3133 7.55435C9.63159 8.24635 9.42664 9.28872 9.79416 10.1948Z" fill="currentColor" />
                                                        <ellipse opacity="0.4" cx="12" cy="21" rx="5" ry="1" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>Country:</span><span className="h6 text-capitalize">Nigeria</span></p>
                                        </div>
                                        <div className="col-md-6 form-group text-capitalize">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M16.3345 1.99976H7.66549C4.27649 1.99976 2.00049 4.37776 2.00049 7.91676V16.0838C2.00049 19.6218 4.27649 21.9998 7.66549 21.9998H16.3335C19.7225 21.9998 22.0005 19.6218 22.0005 16.0838V7.91676C22.0005 4.37776 19.7235 1.99976 16.3345 1.99976Z" fill="currentColor" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3144 11.2484H17.0144C17.4244 11.2484 17.7644 11.5884 17.7644 11.9984V13.8484C17.7644 14.2684 17.4244 14.5984 17.0144 14.5984C16.5944 14.5984 16.2644 14.2684 16.2644 13.8484V12.7484H14.9344V13.8484C14.9344 14.2684 14.5944 14.5984 14.1844 14.5984C13.7644 14.5984 13.4344 14.2684 13.4344 13.8484V12.7484H11.3144C10.9944 13.8184 10.0144 14.5984 8.84437 14.5984C7.40437 14.5984 6.23438 13.4384 6.23438 11.9984C6.23438 10.5684 7.40437 9.39844 8.84437 9.39844C10.0144 9.39844 10.9944 10.1784 11.3144 11.2484ZM7.73438 11.9984C7.73438 12.6084 8.23438 13.0984 8.84438 13.0984C9.44438 13.0984 9.94438 12.6084 9.94438 11.9984C9.94438 11.3884 9.44438 10.8984 8.84438 10.8984C8.23438 10.8984 7.73438 11.3884 7.73438 11.9984Z" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>Zip Code:</span> <span className="h6">50081</span></p>
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="mb-3">Parents/Guardian(s) Information</h5>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor" />
                                                        <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>Name:</span> <span className="h6 text-capitalize">Benson Desmond</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor" />
                                                        <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor" />
                                                        <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>Relationship:</span>{" "}
                                                <span className="h6 text-capitalize">Father</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor" />
                                                        <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>Mobile Number:</span> <span className="h6">0808983773</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p className="text-dark">
                                                <span>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M22 15.94C22 18.73 19.76 20.99 16.97 21H16.96H7.05C4.27 21 2 18.75 2 15.96V15.95C2 15.95 2.006 11.524 2.014 9.298C2.015 8.88 2.495 8.646 2.822 8.906C5.198 10.791 9.447 14.228 9.5 14.273C10.21 14.842 11.11 15.163 12.03 15.163C12.95 15.163 13.85 14.842 14.56 14.262C14.613 14.227 18.767 10.893 21.179 8.977C21.507 8.716 21.989 8.95 21.99 9.367C22 11.576 22 15.94 22 15.94Z" fill="currentColor" />
                                                        <path d="M21.4759 5.67351C20.6099 4.04151 18.9059 2.99951 17.0299 2.99951H7.04988C5.17388 2.99951 3.46988 4.04151 2.60388 5.67351C2.40988 6.03851 2.50188 6.49351 2.82488 6.75151L10.2499 12.6905C10.7699 13.1105 11.3999 13.3195 12.0299 13.3195C12.0339 13.3195 12.0369 13.3195 12.0399 13.3195C12.0429 13.3195 12.0469 13.3195 12.0499 13.3195C12.6799 13.3195 13.3099 13.1105 13.8299 12.6905L21.2549 6.75151C21.5779 6.49351 21.6699 6.03851 21.4759 5.67351Z" fill="currentColor" />
                                                    </svg>
                                                </span>{" "}
                                                <span>Email Address:</span> <span className="h6">bensin@gmail.com</span>
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="d-flex justify-content-end">
                                        <Button
                                            type="button"
                                            variant="btn btn-danger mx-2"
                                        // onClick={() => {
                                        //     history.goBack();
                                        //     const queryParams = new URLSearchParams(locations.search);
                                        //     const sessionClassId = queryParams.get("sessionClassId");
                                        //     const termId = queryParams.get("termId");
                                        //     getAllResultList(sessionClassId, termId)(dispatch);
                                        // }}
                                        >
                                            Cancel
                                        </Button>{" "}
                                    </div> */}
                                </Form>
                            </div>{" "}
                        </Card.Body>{" "}
                    </div>
                </div>
            </Row>
        </>
    );
};

export default StudentProfilePage;
