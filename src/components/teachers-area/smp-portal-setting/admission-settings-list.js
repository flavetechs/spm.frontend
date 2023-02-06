import React, { useState } from "react";
import {
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
    Badge,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card";
import PaginationFilter from "../../partials/components/pagination-filter";
import { getAllAdmissionSetting } from "../../../store/actions/portal-setting-action";

const AdmissionSettingsList = () => {
    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { admissionSettingList, filterProps } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        getAllAdmissionSetting(1)(dispatch);
    }, [dispatch]);

    //   React.useEffect(() => {
    //     if (dialogResponse === "continue") {
    //       if (!promotion.toSessionClassId) {
    //         showErrorToast("No class selected")(dispatch);
    //       } else {
    //         promoteStudent(promotion)(dispatch);
    //         showHideDialog(false, null)(dispatch);
    //         respondDialog("")(dispatch);
    //         setPromotion(promIntialState)
    //       }
    //       return () => {
    //         respondDialog("")(dispatch)
    //         showHideDialog(false, null)(dispatch);
    //       }
    //     }
    //   }, [dialogResponse, promotion.toSessionClassId, dispatch]);

    console.log("admissionSettingResult", admissionSettingList);

    return (
        <>
            <div>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-md-flex justify-content-between">
                                <Row className="d-md-flex justify-content-between w-100">
                                    <div className="col col-md-6">
                                        <h4 className="card-title">Admission Settings</h4>
                                    </div>
                                    <div className="col col-md-6 d-md-flex justify-content-end">
                                        {/* <h4 >
                                            <Badge bg="light text-dark">New Admission</Badge>
                                        </h4> */}
                                        <Link
                                            // to={staffLocations.staffAdd}
                                            to="#"
                                            className="d-flex justify-content-end"
                                        >
                                            <button
                                                type="button"
                                                className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
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
                                                <span>New Admission</span>
                                            </button>
                                        </Link>

                                    </div>
                                </Row>
                            </Card.Header>
                            <Card.Body className="px-0">
                                <div className="table-responsive">
                                    <table
                                        id="role-list-table"
                                        className="table table-striped table-bordered"
                                        role="grid"
                                        data-toggle="data-table"
                                    >
                                        <thead className="text-dark">
                                            <tr className="ligth">
                                                <th>{"S/No"}</th>
                                                <th className="text-center">Admission Id</th>
                                                <th className="text-center">Admission Name</th>
                                                <th className="text-center">
                                                    Admission Status
                                                </th>
                                                <th className="text-center">
                                                    Free or Paid
                                                </th>
                                                <th min-width="100px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {admissionSettingList?.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="">{idx + 1}</td>
                                                    <td className="text-center">
                                                        {item.admissionSettingId}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.admissionSettingName}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.admissionStatus === true ?
                                                            <Badge bg="success"> Open </Badge>
                                                            :
                                                            <Badge bg="danger"> Closed </Badge>
                                                        }
                                                    </td>
                                                    <td className="text-center">
                                                        {item.registrationFee === true ?
                                                            <Badge bg="warning"> Paid </Badge>
                                                            :
                                                            <Badge bg="primary"> Free </Badge>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div className="flex align-items-center list-user-action">
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip id="button-tooltip-2">
                                                                        View/Update Settings
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Link
                                                                    className="btn btn-sm btn-icon btn-success"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title=""
                                                                    data-original-title="Details"
                                                                    to="#"
                                                                // to={`${staffLocations.staffDetails}?teacherAccountId=${item.teacherAccountId}`}
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
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <PaginationFilter filterProps={filterProps} action={getAllAdmissionSetting} dispatch={dispatch} />
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default AdmissionSettingsList;
