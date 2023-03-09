import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { candidateAuthLocation, candidateLocations } from "../../router/candidate-path-location";
import { admissionOpenAndCloseModal, deleteCandidateAdmission, deleteDialogModal, getAdmissionStatus, getCandidatesAdmissionList, logOutUserEmail, pushId, removeId, respondToDeleteDialog } from "../../store/actions/candidate-admission-actions";
import PaginationFilter from "../partials/components/pagination-filter";
import { getUserDetails } from "../../utils/permissions";


const CandidateList = () => {
    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");
    const [getUserDetail, setGetUserDetail] = useState({});
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { admissionList, filterProps, selectedIds, deleteDialogResponse, admissionStatusDetail } = state.candidate;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        getCandidatesAdmissionList(1)(dispatch);
        getAdmissionStatus()(dispatch);
    }, [dispatch]);

    const filteredCandidateList = admissionList.filter((candidate) => {
        if (searchQuery === "") {
            //if query is empty
            return candidate;
        } else if (candidate.firstname.toLowerCase().includes(searchQuery.toLowerCase())) {
            //returns filtered array
            return candidate;
        } else if (candidate.lastname.toLowerCase().includes(searchQuery.toLowerCase())) {
            //returns filtered array
            return candidate;
        } else if (candidate.className.toLowerCase().includes(searchQuery.toLowerCase())) {
            //returns filtered array
            return candidate;
        }

    });

    //DELETE HANDLER
    React.useEffect(() => {
        if (deleteDialogResponse === "continue") {
            if (selectedIds.length === 0) {
                return
            } else {
                deleteCandidateAdmission(selectedIds)(dispatch);
                return selectedIds.forEach((id) => {
                    dispatch(removeId(id));
                });
            }
        } else if (deleteDialogResponse === "cancel") {
            selectedIds.forEach((id) => {
                dispatch(removeId(id));
            });
        }
        return () => {
            respondToDeleteDialog("")(dispatch);
        };
    }, [deleteDialogResponse, dispatch]);
    //DELETE HANDLER

    React.useEffect(() => {
        setGetUserDetail(getUserDetails())
    }, []);

    function handleAdmissionStatus() {
        if (admissionStatusDetail?.admissionStatus === false) {
            admissionOpenAndCloseModal()(dispatch);
        } else {
            history.push(candidateLocations.candidateRegistration);
        }
    }

    return (
        <>
            <div className="container">
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between border border-light" style={{ backgroundColor: "#F5F6FA" }}>
                                <div className="header-title">
                                    <h4 className="card-title mb-3">Candidate List</h4>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h3><span class="badge bg-primary">{getUserDetail?.parentEmail}</span></h3>

                                    <div>
                                        <Link
                                            to="#"
                                        >
                                            <button
                                                type="button"
                                                className="text-center btn-icon mx-3  mt-3 mt-xl-0  btn d-flex border border-light"
                                                onClick={() => {
                                                    dispatch(logOutUserEmail());
                                                    history.push(candidateAuthLocation.signIn)
                                                }}
                                            >
                                                <i className="btn-inner">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="18" height="16" fill="currentColor"
                                                        className="bi bi-power" viewBox="0 0 16 16">
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
                            <div className="d-xl-flex justify-content-between mt-3">
                                <div>
                                    <div className="input-group">
                                        <span className="input-group-text border-0" id="">
                                            <svg
                                                width="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <circle
                                                    cx="11.7669"
                                                    cy="11.7666"
                                                    r="8.98856"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></circle>
                                                <path
                                                    d="M18.0186 18.4851L21.5426 22"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></path>
                                            </svg>
                                        </span>
                                        <div>
                                            <input
                                                type="search"
                                                className="form-control text-lowercase"
                                                placeholder="Search..."
                                                onChange={(event) => setSearchQuery(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-xl-flex justify-content-end px-2">
                                    <div className=" mx-sm-3 mx-xl-1 col-sm-11 col-xl-6 mt-2 mt-xl-0">
                                        { }
                                    </div>
                                    <div className=" mx-sm-3 mx-xl-1 col-sm-11 col-xl-6 mt-2 mt-xl-0">
                                        { }
                                    </div>
                                    <div>
                                        <Link
                                            to="#"
                                        >
                                            <button
                                                onClick={handleAdmissionStatus}
                                                type="button"
                                                className="text-center btn-primary btn-icon mx-3  mt-3 mt-xl-0  btn btn-primary d-flex"
                                            >
                                                <i className="btn-inner">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        ></path>
                                                    </svg>
                                                </i>
                                                <span> Register</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Card.Body className="px-0">
                                {admissionList.length < 1 ? (
                                    <div className="jumbotron jumbotron-fluid">
                                        <div className="container d-flex justify-content-center mt-5 bg-light">
                                            <h3 className="display-4">
                                                No Student, Please register student.
                                            </h3>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="table-responsive w-100">
                                        <table
                                            id="role-list-table"
                                            className="table table-striped"
                                            role="grid"
                                            data-toggle="data-table"
                                        >
                                            <thead>
                                                <tr className="ligth">
                                                    <th>
                                                        S/No
                                                    </th>
                                                    <th>Candidate Name</th>
                                                    <th>Status</th>
                                                    <th>Class</th>
                                                    <th min-width="100px">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredCandidateList.map((student, idx) => (
                                                    <tr key={idx}>
                                                        <td className="">
                                                            <b>{idx + 1}</b>
                                                        </td>
                                                        <td className="text-uppercase">
                                                            <b>{`${student.firstname} ${student.middlename} ${student.lastname}`}</b>
                                                        </td>
                                                        <td className="text-uppercase">
                                                            <b>{student.candidateAdmissionStatus == 0 ? <span className="badge bg-warning">Pending</span> :
                                                                student.candidateAdmissionStatus == 1 ?
                                                                    <span className="badge bg-success">Admitted</span> :
                                                                    student.candidateAdmissionStatus == 2 ?
                                                                        <span className="badge bg-danger">Rejected</span> : ""
                                                            }</b>
                                                        </td>
                                                        <td className="text-uppercase">
                                                            <b>{student.className}</b>
                                                        </td>
                                                        <td>
                                                            <div className="flex align-items-center list-user-action">
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip id="button-tooltip-2">
                                                                            {" "}
                                                                            Detail
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Link
                                                                        className="btn btn-sm btn-icon btn-success"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Edit"
                                                                        to={`${candidateLocations.candidateDetails}?admissionId=${student.admissionId}`}
                                                                    >
                                                                        <span className="btn-inner">
                                                                            <svg
                                                                                width="32"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                                <path
                                                                                    d="M11.9946 16V12"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                                <path
                                                                                    d="M11.9896 8.2041H11.9996"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                </OverlayTrigger>{" "}
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip id="button-tooltip-2">
                                                                            Edit Candidate
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Link
                                                                        className="btn btn-sm btn-icon btn-warning"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Edit"
                                                                        to={`${candidateLocations.candidateEdit}?admissionId=${student.admissionId}`}
                                                                    >
                                                                        <span className="btn-inner">
                                                                            <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path
                                                                                    d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                                    strokeLinejoin="round" />
                                                                                <path fillRule="evenodd" clipRule="evenodd"
                                                                                    d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                                                                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                                                    strokeLinejoin="round" />
                                                                                <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor"
                                                                                    strokeWidth="1.5" strokeLinecap="round"
                                                                                    strokeLinejoin="round" />
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                </OverlayTrigger>{" "}
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={
                                                                        <Tooltip id="button-tooltip-2">
                                                                            Delete Candidate
                                                                        </Tooltip>
                                                                    }
                                                                >
                                                                    <Link
                                                                        className="btn btn-sm btn-icon btn-danger"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Delete"
                                                                        to="#"
                                                                        data-id={student.admissionId}
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                pushId(student.admissionId)
                                                                            );
                                                                            deleteDialogModal(student.admissionId)(dispatch);
                                                                        }}
                                                                    >
                                                                        <span className="btn-inner">
                                                                            <svg
                                                                                width="20"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                                <path
                                                                                    d="M20.708 6.23975H3.75"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                                <path
                                                                                    d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </Card.Body>
                            <Card.Footer>
                                <PaginationFilter filterProps={filterProps} action={getCandidatesAdmissionList} dispatch={dispatch} />
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CandidateList;
