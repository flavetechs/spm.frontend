import React, { useState, useEffect } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Link, useHistory, useLocation } from "react-router-dom";
import Card from "../Card";
import {
  errorModal,
  getAdmissionClasses,
  getSingleAdmissionDetail,
  updateCandidateAdmission,
} from "../../store/actions/candidate-admission-actions";
import {
  getCities,
  getCountries,
  getStates,
} from "../../store/actions/student-actions";
import SmpLoader from "../loader/smp-loader";
import { candidateAuthLocation } from "../../router/candidate-path-location";
import { loginOutUser } from "../../store/actions/auth-actions";
import { getUserDetails } from "../../utils/permissions";
import avatars1 from "../../assets/images/avatars/01.png";
import avatars2 from "../../assets/images/avatars/avtar_2.png";
import avatars3 from "../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../assets/images/avatars/avtar_5.png";

const CandidateEdit = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [getUserDetail, setGetUserDetail] = useState({});
  const [images, setImages] = useState(null);
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    Firstname: Yup.string()
      .min(2, "First Name Too Short!")
      .required("First Name is required"),
    Lastname: Yup.string()
      .min(2, "Last Name Too Short!")
      .required("Last Name is required"),
    Email: Yup.string().email("Invalid email format"),
    ClassId: Yup.string().required("Class name is required"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { admissionClasses, message, singleAdmissionDetail, submitSuccessful } =
    state.candidate;
  const { countries, states, cities } = state.student;
  // ACCESSING STATE FROM REDUX STORE

  const locations = useLocation();
  const queryParams = new URLSearchParams(locations.search);
  const admissionIdQuery = queryParams.get("admissionId") || "";

  React.useEffect(() => {
    if (!admissionIdQuery) return;
    getSingleAdmissionDetail(admissionIdQuery)(dispatch);
    setCredentials(singleAdmissionDetail?.credentials || "");
  }, [dispatch, locations.search]);

  React.useEffect(() => {
    setSelectedCountry(singleAdmissionDetail?.countryOfOrigin);
    setSelectedState(singleAdmissionDetail?.stateOfOrigin);
  }, [singleAdmissionDetail]);

  React.useEffect(() => {
    getAdmissionClasses()(dispatch);
    getCountries()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if (selectedCountry) {
      getStates(selectedCountry)(dispatch);
    }
  }, [dispatch, selectedCountry]);

  React.useEffect(() => {
    if (selectedState) {
      getCities(selectedState)(dispatch);
    }
  }, [dispatch, selectedState]);

  React.useEffect(() => {
    setGetUserDetail(getUserDetails());
  }, []);

  const studentparentGuarndianRelationship = [
    "father",
    "mother",
    "sister",
    "brother",
    "uncle",
    "aunt",
    "grandparent",
    "other",
  ];

  React.useEffect(() => {
    submitSuccessful && history.goBack();
  }, [submitSuccessful, history]);

  const ImageDisplay = (event) => {
    if (event.target.files[0]) {
      setImages(URL.createObjectURL(event.target.files[0]));
    }
  };

  React.useEffect(() => {
    setImages(singleAdmissionDetail?.photo);
  }, [singleAdmissionDetail]);

 

  return (
    <>
      <SmpLoader />
      <Formik
        enableReinitialize={true}
        initialValues={{
          AdmissionId: singleAdmissionDetail.singleAdmissionDetail || "",
          Firstname: singleAdmissionDetail.firstname || "",
          Lastname: singleAdmissionDetail.lastname || "",
          Middlename: singleAdmissionDetail.middlename || "",
          Email: singleAdmissionDetail.email || "",
          PhoneNumber: singleAdmissionDetail.phoneNumber || "",
          DateOfBirth: singleAdmissionDetail.dateOfBirth || "",
          CountryOfOrigin: singleAdmissionDetail.countryOfOrigin || "",
          StateOfOrigin: singleAdmissionDetail.stateOfOrigin || "",
          LGAOfOrigin: singleAdmissionDetail.lgaOfOrigin || "",
          ClassId: singleAdmissionDetail.classId || "",
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          values.AdmissionId = admissionIdQuery;
          values.Firstname = values.Firstname;
          values.Middlename = values.Middlename;
          values.Lastname = values.Lastname;
          values.Email = values.Email;
          values.PhoneNumber = values.PhoneNumber;
          values.DateOfBirth = values.DateOfBirth;
          values.CountryOfOrigin = values.CountryOfOrigin;
          values.StateOfOrigin = values.StateOfOrigin;
          values.LGAOfOrigin = values.LGAOfOrigin;
          values.ClassId = values.ClassId;
          values.CredentialPath = credentials
          values.ProfilePhotoPath = images;
          const params = new FormData();
          params.append("AdmissionId", values.AdmissionId);
          params.append("Firstname", values.Firstname);
          params.append("Middlename", values.Middlename);
          params.append("Lastname", values.Lastname);
          params.append("Email", values.Email);
          params.append("PhoneNumber", values.PhoneNumber);
          params.append("DateOfBirth", values.DateOfBirth);
          params.append("CountryOfOrigin", values.CountryOfOrigin);
          params.append("StateOfOrigin", values.StateOfOrigin);
          params.append("LGAOfOrigin", values.LGAOfOrigin);
          params.append("Credentials", values.Credentials);
          params.append("Photo", values.Photo);
          params.append("ProfilePhotoPath", values.ProfilePhotoPath);
          params.append("CredentialPath", values.CredentialPath);
          params.append("ClassId", values.ClassId);
          updateCandidateAdmission(params, admissionIdQuery)(dispatch);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
          setFieldValue,
        }) => (
          <Row className="">
            <div className="col-xl-9 col-lg-8 col-md-8 mx-auto">
              <div className="card ">
                <Card.Header
                  className="d-md-flex justify-content-between border border-light mb-5"
                  style={{ backgroundColor: "#F5F6FA" }}
                >
                  <div className="header-title">
                    <h4 className="card-title mb-3">Candidate List</h4>
                  </div>
                  <div className="d-md-flex  justify-content-between">
                    <h6
                      style={{
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap",
                      }}
                      className="card-title fw-bold my-2"
                    >
                      {getUserDetail?.userName}
                    </h6>
                    <div>
                      <Link to="#">
                        <button
                          type="button"
                          className="text-center btn-icon mx-3 my-2 my-md-0 mt-3 mt-xl-0  btn d-flex border border-light"
                          onClick={() => {
                            dispatch(loginOutUser());
                            history.push(candidateAuthLocation.signIn);
                          }}
                        >
                          <i className="btn-inner">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="16"
                              fill="currentColor"
                              className="bi bi-power"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.5 1v7h1V1h-1z" />
                              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                            </svg>
                          </i>
                          <span> Log Out</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card.Header>
                <div className=" d-flex justify-content-between  justify-content-between border-bottom border-light p-3">
                  {" "}
                  <div className="header-title">
                    <h4 className="card-title">
                      <b>Edit Candidate Information</b>
                    </h4>
                  </div>{" "}
                </div>
                <Card.Body>
                  {" "}
                  <div className="new-user-info">
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      <div className="row">
                        <Row>
                          <div className="col-md-12">
                            {touched.ClassId && errors.ClassId && (
                              <div className="text-danger">
                                {errors.ClassId}
                              </div>
                            )}
                          </div>
                        </Row>
                        <div className="col-md-12  form-group">
                          <label className="form-label" htmlFor="ClassId">
                            <b>Class:</b>
                          </label>
                          <Field
                            as="select"
                            name="ClassId"
                            className="form-select"
                            id="ClassId"
                            onChange={(e) => {
                              setFieldValue("ClassId", e.target.value);
                            }}
                          >
                            <option value={singleAdmissionDetail?.classId}>
                              {singleAdmissionDetail?.className}
                            </option>
                            {admissionClasses
                              ?.filter(
                                (item) =>
                                  item.className !==
                                  singleAdmissionDetail?.className
                              )
                              ?.map((c, idx) => (
                                <option key={idx} value={c.classId}>
                                  {c.className}
                                </option>
                              ))}
                          </Field>
                        </div>
                        <Row>
                          <div className="col-md-6">
                            {touched.Firstname && errors.Firstname && (
                              <div className="text-danger">
                                {errors.Firstname}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            {touched.Lastname && errors.Lastname && (
                              <div className="text-danger">
                                {errors.Lastname}
                              </div>
                            )}
                          </div>
                        </Row>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="Firstname">
                            <b>First Name:</b>
                          </label>
                          <Field
                            placeholder="First Name"
                            type="text"
                            id="Firstname"
                            name="Firstname"
                            className="form-control firstName"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="Lastname">
                            <b>Last Name:</b>
                          </label>
                          <Field
                            placeholder="Last Name"
                            type="text"
                            id="Lastname"
                            name="Lastname"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="Middlename">
                            <b>Middle Name:</b>
                          </label>
                          <Field
                            placeholder="Middle Name"
                            type="text"
                            name="Middlename"
                            id="Middlename"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="PhoneNumber">
                            <b>Phone Number:</b>
                          </label>
                          <Field
                            placeholder="Phone Number"
                            type="number"
                            name="PhoneNumber"
                            id="PhoneNumber"
                            className="form-control"
                          />
                        </div>
                        <Row>
                          <div className="col-md-6">
                            {touched.Email && errors.Email && (
                              <div className="text-danger">{errors.Email}</div>
                            )}
                          </div>
                        </Row>
                        <div className="col-md-12 form-group">
                          <label className="form-label" htmlFor="Email">
                            <b>Candidate Email Address:</b>
                          </label>
                          <Field
                            placeholder="Email Address"
                            type="email"
                            id="Email"
                            name="Email"
                            className="form-control text-lowercase"
                          />
                        </div>
                        <div className="col-md-6  form-group">
                          <label className="form-label" htmlFor="DateOfBirth">
                            <b>Date Of Birth:</b>
                          </label>
                          <Field
                            type="date"
                            className="form-control"
                            name="DateOfBirth"
                            id="DateOfBirth"
                            aria-describedby="name"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label
                            className="form-label"
                            htmlFor="CountryOfOrigin"
                          >
                            <b>Country:</b>
                          </label>
                          <Field
                            as="select"
                            name="CountryOfOrigin"
                            className="form-select"
                            id="CountryOfOrigin"
                            onChange={(e) => {
                              setFieldValue("CountryOfOrigin", e.target.value);
                              setSelectedCountry(e.target.value);
                            }}
                          >
                            <option value="">Select Country</option>
                            {countries?.map((country, idx) => (
                              <option key={idx} value={country.value}>
                                {country.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="StateOfOrigin">
                            <b>State:</b>
                          </label>
                          <Field
                            as="select"
                            name="StateOfOrigin"
                            className="form-select"
                            id="StateOfOrigin"
                            disabled={!values.CountryOfOrigin ? true : false}
                            onChange={(e) => {
                              setFieldValue("StateOfOrigin", e.target.value);
                              setSelectedState(e.target.value);
                            }}
                          >
                            <option value="">Select State</option>
                            {states?.map((state, idx) => (
                              <option key={idx} value={state.value}>
                                {state.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="LGAOfOrigin">
                            <b>L.G.A:</b>
                          </label>
                          <Field
                            as="select"
                            name="LGAOfOrigin"
                            className="form-select"
                            id="LGAOfOrigin"
                            disabled={!values.StateOfOrigin ? true : false}
                            onChange={(e) => {
                              setFieldValue("LGAOfOrigin", e.target.value);
                            }}
                          >
                            <option value="">Select Cities</option>
                            {cities?.map((city, idx) => (
                              <option key={idx} value={city.value}>
                                {city.name}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="col-md-6 form-group">
                          <div className="col-md-6">
                            <div className="header-title mt-3">
                              <p className="card-title fw-bold">Choose Photo</p>
                            </div>
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
                                <label htmlFor="Photo">
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
                                    id="Photo"
                                    name="Photo"
                                    accept="image/jpeg,image/jpg,image/png"
                                    className="file-upload form-control"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "Photo",
                                        event.target.files[0]
                                      );
                                      ImageDisplay(event);
                                      var maxSize = 200 * 200; //200kb
                                      if (
                                        event.target.files[0].size > maxSize
                                      ) {
                                        errorModal(
                                          "File size exceeds 200kb. Please choose a smaller file."
                                        );
                                        event.target.value = "";
                                        setFieldValue(
                                            "Photo",
                                            ""
                                          );
                                        setImages(null); // Reset the file input
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="img-extension mt-3">
                              <div className="d-inline-block align-items-center">
                                <span>Only</span> <span>.jpg</span>{" "}
                                <span>.png</span> <span>.jpeg</span>
                                <span> allowed</span>
                              </div>
                            </div>
                            <div className="col-md-6">
                              {images ? (
                                <img
                                  className=" img-fluid mt-4"
                                  id="displayImg"
                                  src={images}
                                  alt="School Logo"
                                  height="250px"
                                  width="250px"
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 form-group">
                          <label className="form-label mt-3" htmlFor="dd">
                            <b>Choose File (optional):</b>
                          </label>
                          <div className="">
                            <input
                              type="file"
                              id="Credentials"
                              name="Credentials"
                              className="form-control"
                              accept="image/*, application/pdf,"
                              onChange={(event) => {
                                setFieldValue(
                                  "Credentials",
                                  event.target.files[0]
                                );
                              }}
                            />
                          </div>
                          <div className="col-md-6 form-group">
                            <label className="form-label" htmlFor="dd">
                              <b>Credential:</b>
                            </label>
                            <div className="">
                              <div className="">
                                <object
                                  data={singleAdmissionDetail?.credentials}
                                  width="250"
                                  height="250"
                                ></object>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end">
                        <Button
                          type="button"
                          variant="btn btn-danger mx-2"
                          onClick={() => {
                            history.goBack();
                          }}
                        >
                          Cancel
                        </Button>{" "}
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Update
                        </Button>
                      </div>
                    </Form>
                  </div>{" "}
                </Card.Body>{" "}
              </div>
            </div>
          </Row>
        )}
      </Formik>
    </>
  );
};

export default CandidateEdit;
