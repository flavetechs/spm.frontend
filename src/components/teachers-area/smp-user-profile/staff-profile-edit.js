import { Field, Formik } from "formik";
import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import './profilePage.scss';

import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import { authLocations } from "../../../router/spm-path-locations";
import { fetchSingleStaff, updateTeacherProfile } from "../../../store/actions/staff-actions";
import AvatarImage from "../../../assets/avatar-image";

const StaffProfileEdit = () => {
    //VARIABLE DECLARATIONS
    const [tags, setTags] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const refInput = useRef(null);
    const [image, setImage] = useState("");
    const [textAreaUser, settextAreaUser] = useState("");
    //VARIABLE DECLARATION

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedItem, submitSuccessful } = state.staff;
    //ACCESSING STATE FROM REDUX STORE

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        FirstName: Yup.string()
            .min(2, "First Name Too Short!")
            .required("First Name is required"),
        LastName: Yup.string()
            .min(2, "Last Name Too Short!")
            .required("Last Name is required"),
        Email: Yup.string().email("Invalid email format")
            .required("Email is required"),
        DOB: Yup.string()
            .required("Date of birth is required!"),
        Phone: Yup.string().required("Phone Number is required"),
    });
    //VALIDATIONS SCHEMA

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const teacherAccountId = queryParams.get("teacherAccountId");
        if (!teacherAccountId) return;
        fetchSingleStaff(teacherAccountId)(dispatch);
    }, [dispatch, locations.search]);

    const ImageDisplay = (event) => {
        if (event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };
    //HANDLING ENTER KEY FUNCTION
    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }
    //HANDLING ENTER KEY FUNCTION

    React.useEffect(() => {
        submitSuccessful && history.push(`${authLocations.staffProfilePage}?teacherAccountId=${selectedItem?.teacherAccountId}`);
    }, [submitSuccessful]);

    //CLOSING ICON ON INPUT TAG REMOVE FUNCTION
    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    React.useEffect(() => {
        setImage(selectedItem?.photo);
        settextAreaUser(selectedItem?.shortBiography);
        if (selectedItem?.hobbies) {
            setTags([...selectedItem?.hobbies]);
        }
    }, [selectedItem]);

    //USING USEREF TO CREATE ADD HOBBIES BUTTON
    function handleRef() {
        const valueRef = refInput.current.value;
        if (!valueRef.trim()) return
        refInput.current.focus()
        setTags([...tags, refInput.current.value])
        refInput.current.value = ""
    }
    //USING USEREF TO CREATE ADD HOBBIES BUTTON

    return (
        <>
            <Formik
                initialValues={{
                    TeacherUserAccountId: selectedItem?.teacherUserAccountId || "",
                    Hobbies: [],
                    ProfileImage: null,
                    Email: selectedItem?.email|| "",
                    FirstName: selectedItem?.firstName||"",
                    LastName: selectedItem?.lastName|| "",
                    MiddleName: selectedItem?.middleName  || "",
                    Phone: selectedItem?.phone|| "",
                    DOB: selectedItem?.dob|| "",
                    Address: selectedItem?.address|| "",
                    ShortBiography: selectedItem?.shortBiography|| "",
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                    values.TeacherUserAccountId = values.TeacherUserAccountId;
                    values.Hobbies = tags;
                    values.ShortBiography = textAreaUser;
                    const params = new FormData();
                    params.append("TeacherUserAccountId", values.TeacherUserAccountId);
                    params.append("Hobbies", values.Hobbies);
                    params.append("Email", values.Email);
                    params.append("FirstName", values.FirstName);
                    params.append("LastName", values.LastName);
                    params.append("MiddleName", values.MiddleName);
                    params.append("Phone", values.Phone);
                    params.append("DOB", values.DOB);
                    params.append("Address", values.Address);
                    params.append("ShortBiography", values.ShortBiography);
                    params.append("ProfileImage", values.ProfileImage);
                    updateTeacherProfile(params)(dispatch);
                }}
                enableReinitialize={true}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                    touched,
                    errors,
                }) => (
                    <div className="col-md-12 mx-auto">
                        <Row>
                            <Col >
                                <Card>
                                    <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                                        <div className="header-title">
                                            <h4 className="card-title"><b>Profile Photo</b></h4>
                                        </div>
                                    </div>
                                    <div className="card-body ">
                                        <Form className="">
                                            <div className="form-group">
                                                <div className="profile-img-edit position-relative">
                                                <AvatarImage />
                                                    <div className="upload-icone bg-primary">
                                                        <label htmlFor="ProfileImage">
                                                            <svg
                                                                className="upload-button"
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 24 24"
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                <path
                                                                    fill="#ffffff"
                                                                    d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                                                                ></path>
                                                            </svg>
                                                            <input
                                                                type="file"
                                                                id="ProfileImage"
                                                                style={{ display: "none" }}
                                                                name="ProfileImage"
                                                                accept="image/jpeg,image/jpg,image/png"
                                                                className="file-upload form-control"
                                                                data-original-title="upload photos"
                                                                onChange={(event) => {
                                                                    setFieldValue("ProfileImage", event.target.files[0]);
                                                                    ImageDisplay(event);
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="img-extension mt-3">
                                                    <div className="d-inline-block align-items-center">
                                                        <span>Only</span>{" "}
                                                        <a href="/hope-ui/react/build/dashboard/app/user-add">
                                                            .jpg
                                                        </a>{" "}
                                                        <a href="/hope-ui/react/build/dashboard/app/user-add">
                                                            .png
                                                        </a>{" "}
                                                        <a href="/hope-ui/react/build/dashboard/app/user-add">
                                                            .jpeg
                                                        </a>
                                                        <span> allowed</span>
                                                    </div>
                                                </div>
                                                {image ?
                                                    <img
                                                        style={{ borderRadius: 10 }}
                                                        className=" img-fluid mt-4"
                                                        id="displayImg"
                                                        src={image}
                                                        alt="profile"
                                                    /> : null}
                                            </div>
                                        </Form>
                                    </div>
                                </Card>
                            </Col>
                            <Col className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Card className="">
                                    <Card.Header className="ms-3 col-ms-1">
                                        <h4 className="ms-3">Edit Staff Profile</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form className="mx-auto" onSubmit={e => { e.preventDefault(); }} >
                                            <Row className="d-flex justify-content-center">
                                                <Col md="11" className="form-group">

                                                    <div className="new-user-info">
                                                        <div>
                                                            {(touched.FirstName && errors.FirstName) && <div className='text-danger'>{errors.FirstName}</div>}
                                                            {(touched.LastName && errors.LastName) && <div className='text-danger'>{errors.LastName}</div>}
                                                            {(touched.MiddleName && errors.MiddleName) && <div className='text-danger'>{errors.MiddleName}</div>}
                                                            {(touched.Email && errors.Email) && <div className='text-danger'>{errors.Email}</div>}
                                                            {(touched.Phone && errors.Phone) && <div className='text-danger'>{errors.Phone}</div>}
                                                            {(touched.DOB && errors.DOB) && <div className='text-danger'>{errors.DOB}</div>}
                                                            <div className="row">
                                                                <Form.Group className="col-md-6 form-group">
                                                                    <label htmlFor="FirstName" className="form-label"><b>First Name:</b></label>
                                                                    <Field type="text" className="form-control" name="FirstName" id="FirstName" aria-describedby="name" required placeholder="Enter First Name" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 form-group">
                                                                    <label htmlFor="LastName" className="form-label"><b>Last Name:</b></label>
                                                                    <Field type="text" className="form-control" name="LastName" id="LastName" aria-describedby="name" required placeholder="Enter Last Name" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 form-group">
                                                                    <label htmlFor="MiddleName" className="form-label"><b>Middle Name:</b></label>
                                                                    <Field type="text" className="form-control" name="MiddleName" id="MiddleName" aria-describedby="name" required placeholder="Enter Middle Name" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 form-group">
                                                                    <label htmlFor="Phone" className="form-label"><b>Phone Number:</b></label>
                                                                    <Field type="text" className="form-control" name="Phone" id="Phone" aria-describedby="name" required placeholder="Enter Phone Number e.g 0904849" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 form-group">
                                                                    <label htmlFor="Email" className="form-label"><b>Email:</b> </label>
                                                                    <Field type="email" className="form-control text-lowercase" name="Email" id="Email" aria-describedby="name" required placeholder="Email e.g schoolmgt@yahoo.com" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6  form-group">
                                                                    <label htmlFor="Address" className="form-label"> <b>Home Address.</b></label>
                                                                    <Field type="text" className="form-control" name="Address" id="Address" aria-describedby="name" required placeholder="Enter Home Address" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-3  form-group">
                                                                    <label htmlFor="DOB" className="form-label"><b>Date of Birth:</b> </label>
                                                                    <Field type="date" className="form-control" name="DOB" id="DOB" aria-describedby="name" required placeholder="Enter Date of Birth" />
                                                                </Form.Group>
                                                                <Form.Group className="mb-3 form-group">
                                                                    <label className="form-label mb-1" htmlFor="Hobbies">
                                                                        <b>Hobbies:</b>
                                                                    </label>
                                                                    <div className="tags-input-container">
                                                                        {tags?.map((tag, index) => (
                                                                            <div className="tag-item" key={index}>
                                                                                <span className="text">{tag}</span>
                                                                                <span className="close text-danger" onClick={() => removeTag(index)}>&times;</span>
                                                                            </div>
                                                                        ))}
                                                                        <input
                                                                            ref={refInput}
                                                                            name="Hobbies"
                                                                            onKeyDown={handleKeyDown}
                                                                            type="text" className="tags-input"
                                                                            placeholder="Enter Hobbies"
                                                                            onChange={() => setTags(tags)}
                                                                        />
                                                                    </div>
                                                                    <div className="d-flex justify-content-end">
                                                                        <Button variant="btn btn-success" className="p-1 mt-1"
                                                                            onClick={handleRef}
                                                                        >Add Hobbies
                                                                        </Button>
                                                                    </div>
                                                                </Form.Group>
                                                                <Form.Group className="mb-3 form-group">
                                                                    <label htmlFor="ShortBiography" className="form-label"><b>Biography</b></label>
                                                                    <textarea
                                                                        name="ShortBiography"
                                                                        onChange={(e) => settextAreaUser(e.target.value)}
                                                                        as="textarea"
                                                                        id="ShortBiography"
                                                                        className="form-control"
                                                                        value={textAreaUser}
                                                                        rows="5" />
                                                                </Form.Group>
                                                            </div>
                                                            <div className="d-flex justify-content-end">
                                                                <Button type="button" variant="btn btn-danger mx-2" onClick={() => history.goBack()}>Back</Button>{' '}
                                                                <Button type="button" variant="btn btn-success" onClick={handleSubmit}>Save</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}
            </Formik>
        </>
    );
};

export default StaffProfileEdit;
