import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import { fetchSingleAdminAdmissionDetail } from "../../../store/actions/admin-admission-actions";
import { showHideModal } from "../../../store/actions/toaster-actions";
import Card from "../../Card";
import { CredentialModal, TemplateModal } from "../smp-portal-setting/template-modal";

const AdmissionDetail = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  const [displayPhoto, setDisplayPhoto] = useState("");
  const [showModalProp, setShowModalProp] = useState("");
  const [displayCredential, setDisplayCredential] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedAdmissionDetail } = state.adminAdmission;
  // ACCESSING STATE FROM REDUX STORE
  const queryParams = new URLSearchParams(locations.search);
  const admissionIdQuery = queryParams.get("admissionId");

  React.useEffect(() => {
    if(admissionIdQuery){
    fetchSingleAdminAdmissionDetail(admissionIdQuery)(dispatch);
    }
  }, [dispatch, admissionIdQuery]);

  return (
    <>
      <Row>
        <div className="col-xl-9 col-lg-8 mx-auto">
          <div className="card ">
            <div className="card-header d-flex justify-content-between d-flex justify-content-between">
              {" "}
              <div className="header-title">
                <h4 className="card-title">Student Information</h4>
              </div>{" "}
            </div>
            {showModalProp === "showPhotoModal" ?
              <TemplateModal>
                <img src={displayPhoto} alt="display" />
              </TemplateModal>
              :
              <CredentialModal>
                <object data={displayCredential}
                >
                </object>
              </CredentialModal>
            }
            <Card.Body>
              {" "}
              <div className="new-user-info">
                <Form>
                  <div className="row">
                    <div className="col-md-12  form-group">
                      <p><span>Class:</span><span className="h6"> {selectedAdmissionDetail?.className}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>First Name:</span> <span className="h6"> {selectedAdmissionDetail?.firstname}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Last Name:</span> <span className="h6"> {selectedAdmissionDetail?.lastname}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p> <span>Middle Name:</span><span className="h6 text-capitalize"> {selectedAdmissionDetail?.middlename}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Mobile Number:</span> <span className="h6"> {selectedAdmissionDetail?.phoneNumber}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Email Address:</span> <span className="h6 text-capitalize"> {selectedAdmissionDetail?.email}</span></p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p> <span>Date Of Birth:</span> <span className="h6"> {selectedAdmissionDetail?.dateOfBirth}</span></p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p><span>City:</span> <span className="h6 text-capitalize"> {selectedAdmissionDetail?.lgaOfOrigin}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>State:</span> <span className="h6 text-capitalize"> {selectedAdmissionDetail?.stateOfOrigin}</span></p>
                    </div>
                    <div className="col-md-12 form-group text-capitalize">
                      <p><span>Country:</span><span className="h6 text-capitalize"> {selectedAdmissionDetail?.countryOfOrigin}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <label className="form-label" htmlFor="dd">
                        <b>Credential:</b>
                      </label>
                      <div className="">
                        {!selectedAdmissionDetail?.credentials ?
                          <div>No available Credential</div>
                          :
                          <object data={selectedAdmissionDetail?.credentials}
                            width="250"
                            height="250"
                            onClick={() => {
                              showHideModal(true)(dispatch);
                              setDisplayCredential(selectedAdmissionDetail?.credentials);
                              setShowModalProp("showCredentialModal");
                            }}
                          >
                          </object>
                        }
                      </div>
                    </div>
                    <div className="col-md-6 form-group">
                      <label className="form-label" htmlFor="dd">
                        <b>Photo:</b>
                      </label>
                      <div>
                        <img
                          src={selectedAdmissionDetail?.photo}
                          className="img-fluid"
                          alt="Photo Document"
                          loading="lazy"
                          onClick={() => {
                            showHideModal(true)(dispatch);
                            setDisplayPhoto(selectedAdmissionDetail?.photo);
                            setShowModalProp("showPhotoModal");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h5 className="mb-3">Parent/Guardian(s) Information</h5>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <p><span>Name:</span> <span className="h6 text-capitalize"> {selectedAdmissionDetail?.parentName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Relationship:</span>{" "}
                        <span className="h6 text-capitalize"> {selectedAdmissionDetail?.parentRelationship}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Mobile Number:</span> <span className="h6"> {selectedAdmissionDetail?.parentPhoneNumber}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Email Address:</span> <span className="h6"> {selectedAdmissionDetail?.parentEmail}</span>
                      </p>
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
                  </div>
                </Form>
              </div>{" "}
            </Card.Body>{" "}
          </div>
        </div>
      </Row>
    </>
  );
};

export default AdmissionDetail;
