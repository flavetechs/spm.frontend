import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";

import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_2.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import {
  getSchoolSetting,
  updateSchoolSetting,
} from "../../../store/actions/portal-setting-action";
import {
  getCountries,
  getStates,
} from "../../../store/actions/student-actions";
import AvatarImage from "../../../assets/avatar-image";
import { ImageValidation } from "../../../utils/file-size-validation";

const SchoolSetting = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [images, setImages] = useState(null);
  const [editButton, setEditButton] = useState(false);
  const [saveButton, setSaveButton] = useState(false);
  const [disable, setDisable] = useState(true);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { schoolSetting } = state.portal;
  const { countries, states } = state.student;
  // ACCESSING STATE FROM REDUX STORE
  React.useEffect(() => {
    setSaveButton(true);
    setEditButton(false);
    setDisable(true);
    getSchoolSetting()(dispatch);
    getCountries()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    setImages(schoolSetting?.filepath);
    schoolSetting?.country && getStates(schoolSetting?.country)(dispatch);  
  }, [schoolSetting]);
   


  const ImageDisplay = (event) => {
    if (event.target.files[0]) {
      setImages(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          schoolSettingsId: schoolSetting?.schoolSettingsId ?? "",
          schoolName: schoolSetting?.schoolName ?? "",
          schoolAbbreviation: schoolSetting?.schoolAbbreviation ?? "",
          schoolAddress: schoolSetting?.schoolAddress ?? "",
          email: schoolSetting?.email ?? "",
          phoneNo1: schoolSetting?.phoneNo1 ?? "",
          phoneNo2: schoolSetting?.phoneNo2 ?? "",
          country: schoolSetting?.country ?? "",
          state: schoolSetting?.state ?? "",
          schoolType: schoolSetting?.schoolType ?? "",
          filepath: schoolSetting?.filepath ?? "",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          values.schoolName = values.schoolName.toUpperCase();
          values.schoolAddress = values.schoolAddress.toUpperCase();
          values.schoolAbbreviation = values.schoolAbbreviation.toUpperCase();
          values.filepath = images;
          const params = new FormData();
          params.append("schoolSettingsId", values.schoolSettingsId);
          params.append("schoolName", values.schoolName);
          params.append("schoolAddress", values.schoolAddress);
          params.append("schoolAbbreviation", values.schoolAbbreviation);
          params.append("country", values.country);
          params.append("state", values.state);
          params.append("phoneNo1", values.phoneNo1);
          params.append("phoneNo2", values.phoneNo2);
          params.append("schoolType", values.schoolType);
          params.append("filepath", values.filepath);
          params.append("photo", values.photo);
          params.append("email", values.email);
          setSaveButton(!saveButton);
          setEditButton(!editButton);
          setDisable(true);
          updateSchoolSetting(params)(dispatch);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Row className="" id="schoolSetting">
            <Card.Body>
              <div className="col-xl-9 col-lg-8">
                <div className="">
                  <div className=" d-flex justify-content-between d-flex justify-content-between mb-4">
                    {" "}
                    <div className="header-title d-md-flex align-items-center">
                      <h4 className="">
                        <b>School Settings </b>
                      </h4>
                      {disable &&
                      <i className="text-danger mx-2">Click the edit button to edit page</i>
                      }
                    </div>{" "}
                  </div>{" "}
                  <div className="new-user-info">
                    <Form>
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="schoolName">
                            <b>School Name: </b>
                          </label>
                          <Field
                            disabled={disable}
                            placeholder="School Name"
                            type="text"
                            id="schoolName"
                            name="schoolName"
                            className="form-control schoolName"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label
                            className="form-label"
                            htmlFor="schoolAbbreviation"
                          >
                            <b>School Abbreviation: </b>
                          </label>
                          <Field
                            disabled={disable}
                            placeholder="School Abbreviation"
                            type="text"
                            id="schoolAbbreviation"
                            name="schoolAbbreviation"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-12 form-group">
                          <label className="form-label" htmlFor="schoolAddress">
                            <b>School Address:</b>
                          </label>
                          <Field
                            disabled={disable}
                            placeholder="School Address"
                            type="text"
                            id="schoolAddress"
                            name="schoolAddress"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-9 form-group">
                          <label className="form-label" htmlFor="email">
                            <b>School Email Adress:</b>
                          </label>
                          <Field
                            disabled={disable}
                            placeholder="School Email Address"
                            type="email"
                            id="email"
                            name="email"
                            className="form-control text-lowercase"
                          />
                        </div>
                        <div className="col-md-6  form-group">
                          <label className="form-label" htmlFor="country">
                            <b>Country Located:</b>
                          </label>
                          <Field
                            disabled={disable}
                            as="select"
                            name="country"
                            className="form-select"
                            id="country"
                            onChange={(e)=> {
                              setFieldValue("country",e.target.value); 
                              getStates(e.target.value)(dispatch);}
                            }
                          >
                            <option value="Select City">
                              Select Country
                            </option>
                            {countries?.map((item, idx) => (
                              <option
                                key={idx}
                                // defaultValue={item.value}
                                defaultValue={
                                    schoolSetting?.country === item.value
                                }
                              >
                                {item.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="state">
                            <b>State Located:</b>
                          </label>
                          <Field
                            disabled={disable}
                            as="select"
                            name="state"
                            className="form-select"
                            id="state"
                          >
                            <option value="Select State">
                            Select State
                            </option>
                            {states?.map((item, idx) => (
                              <option
                                key={idx}
                                // defaultValue={item.value}
                                defaultValue={schoolSetting?.state === item.value}
                              >
                                {item.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="phoneNo1">
                            <b>Phone Number 1:</b>
                          </label>
                          <Field
                            disabled={disable}
                            placeholder="Phone Number 1"
                            type="number"
                            name="phoneNo1"
                            id="phoneNo1"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="phoneNo2">
                            <b>Phone Number 2:</b>
                          </label>
                          <Field
                            disabled={disable}
                            placeholder="Phone Number 2"
                            type="number"
                            name="phoneNo2"
                            id="phoneNo2"
                            className="form-control"
                          />
                        </div>
                        <div className="form-check ms-4">
                          <Field
                            disabled={disable}
                            className="form-check-input"
                            type="radio"
                            name="schoolType"
                            id="flexRadioDefault1"
                            checked={
                              values.schoolType === "primary" ? true : false
                            }
                            onChange={(e) => {
                              setFieldValue(
                                "schoolType",
                                e.target.checked && "primary"
                              );
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="schoolType1"
                          >
                            Primary
                          </label>
                        </div>
                        <div className="form-check ms-4">
                          <Field
                            disabled={disable}
                            className="form-check-input"
                            type="radio"
                            name="schoolType"
                            id="schoolType"
                            checked={
                              values.schoolType === "secondary" ? true : false
                            }
                            onChange={(e) => {
                              setFieldValue(
                                "schoolType",
                                e.target.checked && "secondary"
                              );
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="schoolType1"
                          >
                            Secondary
                          </label>
                        </div>
                        <div className="row form-group">
                          <div className="col-md-6">
                            <div className="header-title mt-3">
                              <p className="card-title fw-bold">School Logo</p>
                            </div>
                            <div className="profile-img-edit position-relative">
                            <AvatarImage />
                              <div className="upload-icone bg-primary">
                                <label htmlFor="photo">
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
                                    disabled={disable}
                                    type="file"
                                    id="photo"
                                    style={{ display: "none" }}
                                    name="photo"
                                    accept="image/jpeg,image/jpg,image/png"
                                    className="file-upload form-control"
                                    data-original-title="upload photos"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "photo",
                                        event.currentTarget.files[0]
                                      );
                                      ImageDisplay(event);
                                      ImageValidation(event,setFieldValue,"photo",setImages)
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
                          </div>
                          <div className="col-md-6">
                            {images ? (
                              <img
                                className=" img-fluid mt-4"
                                id="displayImg"
                                src={images}
                                alt="School Logo"
                                height="180px"
                                width="180px"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="row"></div>
                      <div className="d-flex mt-4 justify-content-end">
                        {saveButton ? (
                          <Button
                            type="button"
                            variant="btn btn-primary mx-2"
                            onClick={() => {
                              setSaveButton(!saveButton);
                              setEditButton(!editButton);
                              setDisable(!disable);
                            }}
                          >
                            CLICK TO EDIT
                          </Button>
                        ) : (
                          <Button
                            type="button"
                            variant="btn btn-danger mx-2"
                            onClick={handleSubmit}
                          >
                            Save Changes
                          </Button>
                        )}
                      </div>
                    </Form>
                  </div>{" "}
                </div>
              </div>
            </Card.Body>{" "}
          </Row>
        )}
      </Formik>
    </>
  );
};

export default SchoolSetting;
