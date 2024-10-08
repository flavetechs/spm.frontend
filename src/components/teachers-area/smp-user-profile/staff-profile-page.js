import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { authLocations } from "../../../router/spm-path-locations";
import { fetchSingleStaff, fetchSingleTeacherClassesAndSubjects } from "../../../store/actions/staff-actions";
import './profilePage.scss';

const StaffProfilePage = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const locations = useLocation();
    const dispatch = useDispatch();
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { teacherClassesAndSubjects, selectedItem } = state.staff;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const teacherAccountId = queryParams.get("teacherAccountId");
        if (!teacherAccountId) return;
        fetchSingleStaff(teacherAccountId)(dispatch);
        fetchSingleTeacherClassesAndSubjects(teacherAccountId)(dispatch);
    }, [dispatch, locations.search]);

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
                                    <img src={selectedItem?.photo} alt="profilePhoto"
                                        className="d-block justify-content-center mb-3"
                                        width="220px"
                                        height="220px"
                                        style={{ borderRadius: "50%", }}
                                    />
                                </div>
                                <h5 className="d-flex justify-content-center bg-light">{selectedItem?.fullName}</h5>
                                <hr />
                                <div className="mt-3">
                                    <p className="mb-1 fw-bold">Biography :</p>
                                    <p className="ms-2 bg-light p-2">{selectedItem?.shortBiography}</p>
                                </div>
                                <p className="fw-bold mb-1">Hobbies :</p>
                                <div className="">
                                    {selectedItem?.hobbies?.map((item, index) => (
                                        <div className="tag-item bg-light m-1 text-capitalize" key={index}>
                                            <span className="text">{item}</span>
                                            {item ? <span className="p-1">
                                                <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M2.87187 11.5983C1.79887 8.24832 3.05287 4.41932 6.56987 3.28632C8.41987 2.68932 10.4619 3.04132 11.9999 4.19832C13.4549 3.07332 15.5719 2.69332 17.4199 3.28632C20.9369 4.41932 22.1989 8.24832 21.1269 11.5983C19.4569 16.9083 11.9999 20.9983 11.9999 20.9983C11.9999 20.9983 4.59787 16.9703 2.87187 11.5983Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16 6.69995C17.07 7.04595 17.826 8.00095 17.917 9.12195" stroke="currentColor" strokeWidth="1.5"
                                                        strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> : null}
                                        </div>
                                    ))}
                                </div>

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
                                            history.push(`${authLocations.staffProfileEdit}?teacherAccountId=${selectedItem.teacherAccountId}`)
                                        }}
                                    >Edit Profile</Button>
                                </div>
                            </div>
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
                                <div className="row">
                                    <div className="col-md-12  form-group">
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor" />
                                                    <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>First Name:</span> <span className="h6 text-capitalize">{selectedItem?.firstName}</span></p>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor" />
                                                    <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>Last Name:</span> <span className="h6 text-capitalize">{selectedItem?.lastName}</span></p>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor" />
                                                    <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>Middle Name:{" "}</span>
                                            <span className="h6 text-capitalize"> {selectedItem?.middleName}</span>
                                        </p>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M22 15.94C22 18.73 19.76 20.99 16.97 21H16.96H7.05C4.27 21 2 18.75 2 15.96V15.95C2 15.95 2.006 11.524 2.014 9.298C2.015 8.88 2.495 8.646 2.822 8.906C5.198 10.791 9.447 14.228 9.5 14.273C10.21 14.842 11.11 15.163 12.03 15.163C12.95 15.163 13.85 14.842 14.56 14.262C14.613 14.227 18.767 10.893 21.179 8.977C21.507 8.716 21.989 8.95 21.99 9.367C22 11.576 22 15.94 22 15.94Z" fill="currentColor" />
                                                    <path d="M21.4759 5.67351C20.6099 4.04151 18.9059 2.99951 17.0299 2.99951H7.04988C5.17388 2.99951 3.46988 4.04151 2.60388 5.67351C2.40988 6.03851 2.50188 6.49351 2.82488 6.75151L10.2499 12.6905C10.7699 13.1105 11.3999 13.3195 12.0299 13.3195C12.0339 13.3195 12.0369 13.3195 12.0399 13.3195C12.0429 13.3195 12.0469 13.3195 12.0499 13.3195C12.6799 13.3195 13.3099 13.1105 13.8299 12.6905L21.2549 6.75151C21.5779 6.49351 21.6699 6.03851 21.4759 5.67351Z" fill="currentColor" />
                                                </svg>{" "}
                                            </span>
                                            <span>Email Address:</span> <span className="h6">{selectedItem?.email}</span></p>
                                    </div>
                                    <div className="col-md-6  form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z" fill="currentColor" />
                                                    <path d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z" fill="currentColor" />
                                                    <path d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>Marital Status:</span> <span className="h6 text-capitalize">{selectedItem?.maritalStatus}</span></p>
                                    </div>
                                    <div className="col-md-6  form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor" />
                                                    <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>Gender:</span> <span className="h6 text-capitalize">{selectedItem?.gender}</span></p>
                                    </div>
                                    <div className="col-md-6  form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3 16.8701V9.25708H21V16.9311C21 20.0701 19.0241 22.0001 15.8628 22.0001H8.12733C4.99561 22.0001 3 20.0301 3 16.8701ZM7.95938 14.4101C7.50494 14.4311 7.12953 14.0701 7.10977 13.6111C7.10977 13.1511 7.46542 12.7711 7.91987 12.7501C8.36443 12.7501 8.72997 13.1011 8.73985 13.5501C8.7596 14.0111 8.40395 14.3911 7.95938 14.4101ZM12.0198 14.4101C11.5653 14.4311 11.1899 14.0701 11.1701 13.6111C11.1701 13.1511 11.5258 12.7711 11.9802 12.7501C12.4248 12.7501 12.7903 13.1011 12.8002 13.5501C12.82 14.0111 12.4643 14.3911 12.0198 14.4101ZM16.0505 18.0901C15.596 18.0801 15.2305 17.7001 15.2305 17.2401C15.2206 16.7801 15.5862 16.4011 16.0406 16.3911H16.0505C16.5148 16.3911 16.8902 16.7711 16.8902 17.2401C16.8902 17.7101 16.5148 18.0901 16.0505 18.0901ZM11.1701 17.2401C11.1899 17.7001 11.5653 18.0611 12.0198 18.0401C12.4643 18.0211 12.82 17.6411 12.8002 17.1811C12.7903 16.7311 12.4248 16.3801 11.9802 16.3801C11.5258 16.4011 11.1701 16.7801 11.1701 17.2401ZM7.09989 17.2401C7.11965 17.7001 7.49506 18.0611 7.94951 18.0401C8.39407 18.0211 8.74973 17.6411 8.72997 17.1811C8.72009 16.7311 8.35456 16.3801 7.90999 16.3801C7.45554 16.4011 7.09989 16.7801 7.09989 17.2401ZM15.2404 13.6011C15.2404 13.1411 15.596 12.7711 16.0505 12.7611C16.4951 12.7611 16.8507 13.1201 16.8705 13.5611C16.8804 14.0211 16.5247 14.4011 16.0801 14.4101C15.6257 14.4201 15.2503 14.0701 15.2404 13.6111V13.6011Z" fill="currentColor" />
                                                    <path opacity="0.4" d="M3.00293 9.25699C3.01577 8.66999 3.06517 7.50499 3.15803 7.12999C3.63224 5.02099 5.24256 3.68099 7.54442 3.48999H16.4555C18.7376 3.69099 20.3677 5.03999 20.8419 7.12999C20.9338 7.49499 20.9832 8.66899 20.996 9.25699H3.00293Z" fill="currentColor" />
                                                    <path d="M8.30465 6.59C8.73934 6.59 9.06535 6.261 9.06535 5.82V2.771C9.06535 2.33 8.73934 2 8.30465 2C7.86996 2 7.54395 2.33 7.54395 2.771V5.82C7.54395 6.261 7.86996 6.59 8.30465 6.59Z" fill="currentColor" />
                                                    <path d="M15.6953 6.59C16.1201 6.59 16.456 6.261 16.456 5.82V2.771C16.456 2.33 16.1201 2 15.6953 2C15.2606 2 14.9346 2.33 14.9346 2.771V5.82C14.9346 6.261 15.2606 6.59 15.6953 6.59Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>Date Of Birth:</span> <span className="h6">{selectedItem?.dob}</span></p>
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z" fill="currentColor" />
                                                    <path opacity="0.4" d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z" fill="currentColor" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>Phone:</span> <span className="h6"> {selectedItem?.phone}</span></p>
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <p className="">
                                            <span>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor" />
                                                </svg>
                                            </span>{" "}
                                            <span>Home Address:</span> <span className="h6 text-capitalize">{selectedItem?.address}</span></p>
                                    </div>
                                    <hr />
                                    <div className="row m-auto">
                                        <Col>
                                            <div className="mb-2">
                                                <h5 className="bg-light">Classes as form Teacher</h5>
                                                <dl>
                                                    {teacherClassesAndSubjects?.classesAsFormTeacher.map((item, index) => {
                                                        return (
                                                            <div className="" key={index}><dt>{item.class}</dt>
                                                                {item.subjectsInClass.map((sub, index) => {
                                                                    return (
                                                                        <dd className="ms-4" key={index}>&#128366; {`${sub}`}</dd>
                                                                    )
                                                                })}
                                                            </div>
                                                        )
                                                    })}
                                                    <dd className="ms-3">
                                                    </dd>
                                                </dl>
                                            </div>
                                        </Col>
                                        <Col className="column-divider">
                                            <div className="mb-2">
                                                <h5 className="bg-light">Subjects as Subject Teacher</h5>
                                                <dl>
                                                    {teacherClassesAndSubjects?.subjectsAsSubjectTeacher.map((item, index) => {
                                                        return (
                                                            <div className="" key={index}><dt>{item.subject}</dt>
                                                                {item.class.map((classes, index) => {
                                                                    return (
                                                                        <dd className="ms-4" key={index}> {` - ${classes}`}</dd>
                                                                    )
                                                                })}
                                                            </div>
                                                        )
                                                    })}
                                                    <dd className="ms-3">
                                                    </dd>
                                                </dl>
                                            </div>
                                        </Col>
                                    </div>
                                </div>
                            </div>{" "}
                        </Card.Body>{" "}
                    </div>
                </div>
            </Row >
        </>
    );
};

export default StaffProfilePage;
