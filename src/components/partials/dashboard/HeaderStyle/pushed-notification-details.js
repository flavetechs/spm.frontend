import React from "react";
import {
    Button,
    Card,
    Col,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { getSinglePushedNotificationDetail } from "../../../../store/actions/notification-actions";
import './pushed-notification.scss';
const PushedNotificationDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const state = useSelector((state) => state);
    const { pushedNotificationdetails } = state.notification;

    const queryParams = new URLSearchParams(locations.search);
    const notificationIdQuery = queryParams.get("notififcationId");

    React.useEffect(() => {
        getSinglePushedNotificationDetail(notificationIdQuery)(dispatch);
    }, [dispatch, locations.search]);

    return (
        <div className="col-md-12 mx-auto">
            <Row>
                <Col sm="12">
                    <Card className="">

                        <div className="mx-3 mt-3">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                            >
                                <svg
                                    onClick={() => {
                                        history.goBack();
                                    }}
                                    style={{ cursor: "pointer" }}
                                    className=" text-primary"
                                    width="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </OverlayTrigger>
                            <span>back</span>
                        </div>
                        <div className="marquee bg-light">
                            <div>HAPPY READING!!! </div>
                        </div>
                        <Card.Body>
                            <div className="d-flex justify-content-between mt-3 flex-wrap">
                                <div>
                                    <h6>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-card-heading" viewBox="0 0 16 16">
                                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                                <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
                                            </svg>
                                        </span>{" "}
                                        {pushedNotificationdetails?.subject}
                                    </h6>
                                </div>
                                <div className="text-end text-primary">
                                    {pushedNotificationdetails?.dateCreated}
                                </div>
                            </div>
                            <div className="d-flex justify-content-start mt-4">
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-soft-secondary btn-icon rounded-circle avatar-50 d-flex align-items-center justify-content-center"
                                    >
                                        <span>
                                            <svg
                                                width="25"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M13.3571 6.45056C13.3068 5.96422 13.2543 5.45963 13.1254 4.95611C12.7741 3.75153 11.801 3.00001 10.7576 3.00001C10.1757 2.99786 9.43954 3.35644 9.0222 3.71932L5.56287 6.61697H3.75194C2.41918 6.61697 1.34751 7.6444 1.14513 9.12705C0.973161 10.5506 0.931217 13.2379 1.14513 14.8042C1.33073 16.3706 2.35416 17.383 3.75194 17.383H5.56287L9.08931 20.3236C9.45107 20.6382 10.0897 20.9989 10.6769 20.9989C10.7146 21 10.7482 21 10.7817 21C11.845 21 12.7814 20.2206 13.1327 19.0192C13.2659 18.5082 13.312 18.0293 13.3571 17.5666L13.4043 17.1082C13.5846 15.6213 13.5846 8.36908 13.4043 6.89288L13.3571 6.45056Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    opacity="0.4"
                                                    d="M17.4064 6.49468C17.118 6.06953 16.5465 5.96325 16.1281 6.25849C15.7139 6.55587 15.6112 7.14206 15.8995 7.56613C16.7017 8.74816 17.1432 10.3221 17.1432 12.0001C17.1432 13.6771 16.7017 15.252 15.8995 16.4341C15.6112 16.8581 15.7139 17.4443 16.1292 17.7417C16.2844 17.8512 16.4658 17.9092 16.6524 17.9092C16.9534 17.9092 17.2344 17.7578 17.4064 17.5055C18.4193 16.0132 18.9782 14.0582 18.9782 12.0001C18.9782 9.94201 18.4193 7.98698 17.4064 6.49468Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    opacity="0.4"
                                                    d="M20.5672 3.45726C20.2809 3.03319 19.7073 2.92475 19.29 3.22107C18.8758 3.51845 18.773 4.10464 19.0603 4.52871C20.4172 6.52776 21.1649 9.18169 21.1649 11.9999C21.1649 14.8192 20.4172 17.4731 19.0603 19.4722C18.773 19.8973 18.8758 20.4824 19.291 20.7798C19.4462 20.8893 19.6266 20.9473 19.8132 20.9473C20.1142 20.9473 20.3963 20.7959 20.5672 20.5436C22.1359 18.2343 22.9999 15.2003 22.9999 11.9999C22.9999 8.80164 22.1359 5.76657 20.5672 3.45726Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div className="ms-2 mt-2 fw-bold">
                                    <div className="w-50 py-2 item-content"
                                        dangerouslySetInnerHTML={{ __html: pushedNotificationdetails?.content }}
                                    >
                                    </div>
                                    <span>
                                        {pushedNotificationdetails ?
                                            <Link
                                                title=""
                                                data-original-title="link"
                                                to={pushedNotificationdetails?.notificationPageLink}
                                            >
                                                Read More...
                                            </Link>
                                            :
                                            null
                                        }
                                    </span>
                                    <br />
                                </div>
                            </div>
                            <div
                            ></div>
                            <hr />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PushedNotificationDetail;
