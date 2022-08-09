import { Field, Formik } from "formik";
import React, { useRef, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { fetchSingleStudent, updateStudentProfile } from "../../store/actions/student-actions";
import './profilePage.scss';

import avatars1 from "../../assets/images/avatars/01.png";
import avatars2 from "../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../assets/images/avatars/avtar_5.png";
import { authLocations } from "../../router/spm-path-locations";

const StudentProfileEdit = () => {
    //VARIABLE DECLARATIONS
    const [userArray, setUserArray] = useState([]);
    const [tags, setTags] = useState([])
    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const state = useSelector((state) => state);
    const refInput = useRef(null)
    const [image, setImage] = useState("");
    //VARIABLE DECLARATION

    // ACCESSING STATE FROM REDUX STORE
    const { activeSubjects } = state.class;
    const { selectedStudent, submitSuccessful } = state.student;
    //ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const studentAccountId = queryParams.get("studentAccountId");
        if (!studentAccountId) return;
        fetchSingleStudent(studentAccountId)(dispatch);
    }, []);

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
        submitSuccessful &&  history.push(`${authLocations.studentProfilePage}?studentAccountId=${selectedStudent?.studentAccountId}`);;
    }, [submitSuccessful]);

    //CLOSING ICON ON INPUT TAG REMOVE FUNCTION
    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    const handleUserArray = (event) => {
        const checkBoxValue = event.target.checked;
        const userId = event.target.id;
        let selectedUserArray;
        const otherSelectedUsers = userArray.filter((user) => user != userId);
        if (checkBoxValue === false) {
            selectedUserArray = [...otherSelectedUsers];
        } else {
            selectedUserArray = [...otherSelectedUsers, userId];
        }
        setUserArray(selectedUserArray);
    };
    React.useEffect(() => {
        setImage(selectedStudent?.photo);
    }, [selectedStudent]);

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
                    StudentContactId: selectedStudent?.studentAccountId,
                    Hobbies: "",
                    BestSubjectIds: "",
                    File: selectedStudent?.studentAccountId,
                }}
                onSubmit={(values) => {
                    values.StudentContactId = values.StudentContactId;
                    values.Hobbies = tags;
                    values.BestSubjectIds = userArray;
                    const params = new FormData();
                    params.append("StudentContactId", values.StudentContactId);
                    params.append("Hobbies", values.Hobbies);
                    params.append("BestSubjectIds", values.BestSubjectIds);
                    params.append("File", values.File);
                    updateStudentProfile(params)(dispatch);
                }}
                enableReinitialize={true}
            >
                {({
                    handleSubmit,
                    values,
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
                                                        />{" "}
                                                    </div>
                                                    <div className="upload-icone bg-primary">
                                                        <label htmlFor="File">
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
                                                                id="File"
                                                                style={{ display: "none" }}
                                                                name="File"
                                                                accept="image/jpeg,image/jpg,image/png"
                                                                className="file-upload form-control"
                                                                data-original-title="upload photos"
                                                                onChange={(event) => {
                                                                    setFieldValue("File", event.target.files[0])
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
                                        <h4>Edit Student Profile</h4>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form className="mx-auto" onSubmit={e => { e.preventDefault(); }} >
                                            <Row className="d-flex justify-content-center">
                                                <Col md="11" className="form-group text-dark">
                                                    <label className="form-label mb-1" htmlFor="Hobbies">
                                                        <b>Hobbies:</b>
                                                    </label>
                                                    <div className="tags-input-container">
                                                        {tags.map((tag, index) => (
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
                                                </Col>
                                                <Col md="11" className="form-group text-dark">
                                                    <Row>
                                                        <span className=""><b>Choose Best Subjects</b></span>
                                                        {activeSubjects.map((subject, index) => {
                                                            return (
                                                                <Col key={index} className="col-12 col-md-6 col-lg-4  col-sm-6 col-xl-6 col-xxl-6">
                                                                    <div className='text-uppercase'>
                                                                        <Field
                                                                            type="checkbox"
                                                                            name="BestSubjectIds"
                                                                            className="form-check-input"
                                                                            checked={userArray.find(
                                                                                (id) => id === subject.userId
                                                                            )}
                                                                            id={subject.lookupId}
                                                                            onChange={(event) => {
                                                                                handleUserArray(event);
                                                                            }}
                                                                        />{" "}
                                                                        {subject.name}
                                                                    </div>
                                                                </Col>
                                                            )
                                                        })}
                                                    </Row>
                                                </Col>
                                                <div className="d-flex justify-content-end">
                                                    <Button
                                                        type="button"
                                                        className="btn-sm mt-4"
                                                        variant="btn btn-danger"
                                                        onClick={() => {
                                                            history.goBack();
                                                        }}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        className="btn-sm mx-2 mt-4"
                                                        variant="btn btn-success"
                                                        onClick={handleSubmit}
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
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

export default StudentProfileEdit;
