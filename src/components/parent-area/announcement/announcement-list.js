import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { announcementLocations } from "../../../router/parents-path-locations";
import { getAllAnnouncement, updateSeenAnnouncement } from "../../../store/actions/notification-actions";
import { stripHtml } from "../../../utils/tools";
// import "../../teachers-area/smp-notifications/announcement.scss";
import "../../teachers-area/smp-notifications/announcement.scss";

const ParentAnnouncement = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector((state) => state);
    const { announcementList, filterProps } = state.notification;

    React.useEffect(() => {
        getAllAnnouncement(1)(dispatch);
    }, []);

    function truncateString(str) {
        str = str.replace("<br>", "<div></div>");
        if (window.innerWidth >= 1400) {
            return str?.length > 60 ? str.slice(0, 60) + "..." : str;
        } else if (window.innerWidth >= 1200) {
            return str?.length > 45 ? str.slice(0, 45) + "..." : str;
        } else if (window.innerWidth >= 992) {
            return str?.length > 35 ? str.slice(0, 35) + "..." : str;
        } else if (window.innerWidth >= 768) {
            return str?.length > 25 ? str.slice(0, 25) + "..." : str;
        } else if (window.innerWidth < 768) {
            return str?.length > 25 ? str.slice(0, 25) + "..." : str;
        }
    }

    return (
        <>
            <div className="col-md-12 mx-auto">
                <Card>
                    <Card.Header>
                        <div>
                            <h5>Parent Announcement Dashboard</h5>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-1">
                        <div className="tab-bottom-bordered d-flex justify-content-end align-items-center flex-wrap pt-2 mail-data">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2">Refresh</Tooltip>}
                            >
                                <div className=" mx-3">
                                    <svg
                                        onClick={() => {
                                            getAllAnnouncement()(dispatch);
                                        }}
                                        style={{ cursor: "pointer" }}
                                        width="23"
                                        fill="blue"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path d="M468.9 32.11c13.87 0 27.18 10.77 27.18 27.04v145.9c0 10.59-8.584 19.17-19.17 19.17h-145.7c-16.28 0-27.06-13.32-27.06-27.2c0-6.634 2.461-13.4 7.96-18.9l45.12-45.14c-28.22-23.14-63.85-36.64-101.3-36.64c-88.09 0-159.8 71.69-159.8 159.8S167.8 415.9 255.9 415.9c73.14 0 89.44-38.31 115.1-38.31c18.48 0 31.97 15.04 31.97 31.96c0 35.04-81.59 70.41-147 70.41c-123.4 0-223.9-100.5-223.9-223.9S132.6 32.44 256 32.44c54.6 0 106.2 20.39 146.4 55.26l47.6-47.63C455.5 34.57 462.3 32.11 468.9 32.11z" />
                                    </svg>
                                </div>
                            </OverlayTrigger>
                        </div>
                    </Card.Body>
                    <hr className="mb-0 mt-2" />
                    <Card.Body className="h-100 py-0">
                        <div className="tab-content iq-tab-fade-up" id="myTabContent-2">
                            <div className="tab-pane fade show active">
                                {announcementList?.map((item, idx) => (
                                    <div key={idx} >
                                        <div className="">
                                            <div
                                                className={
                                                    item.isSeen === false
                                                        ? " h6 d-md-flex justify-content-evenly item-outer-container"
                                                        : "d-md-flex justify-content-evenly item-outer-container"
                                                }
                                                style={{ cursor: "pointer" }}

                                            >
                                                <div
                                                    style={{ width: "5%" }}
                                                    className="py-2 item-table"
                                                >
                                                    <div
                                                        onClick={() => {
                                                            history.push(
                                                                `${announcementLocations.parentannouncementDetails
                                                                }?announcementsId=${item.announcementsId}`
                                                            );
                                                            updateSeenAnnouncement(item.announcementsId)(dispatch)
                                                        }}
                                                    >
                                                        {item.isSeen === false ? (
                                                            <svg
                                                                width="22"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M9.76045 14.3667C9.18545 13.7927 8.83545 13.0127 8.83545 12.1377C8.83545 10.3847 10.2474 8.97168 11.9994 8.97168C12.8664 8.97168 13.6644 9.32268 14.2294 9.89668"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></path>
                                                                <path
                                                                    d="M15.1049 12.6987C14.8729 13.9887 13.8569 15.0067 12.5679 15.2407"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></path>
                                                                <path
                                                                    d="M6.65451 17.4722C5.06751 16.2262 3.72351 14.4062 2.74951 12.1372C3.73351 9.85823 5.08651 8.02823 6.68351 6.77223C8.27051 5.51623 10.1015 4.83423 11.9995 4.83423C13.9085 4.83423 15.7385 5.52623 17.3355 6.79123"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></path>
                                                                <path
                                                                    d="M19.4473 8.99072C20.1353 9.90472 20.7403 10.9597 21.2493 12.1367C19.2823 16.6937 15.8063 19.4387 11.9993 19.4387C11.1363 19.4387 10.2853 19.2987 9.46729 19.0257"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></path>
                                                                <path
                                                                    d="M19.8868 4.24951L4.11279 20.0235"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></path>
                                                            </svg>
                                                        ) : (
                                                            <svg
                                                                width="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    id="Ellipse 158"
                                                                    d="M22.4541 11.3918C22.7819 11.7385 22.7819 12.2615 22.4541 12.6082C21.0124 14.1335 16.8768 18 12 18C7.12317 18 2.98759 14.1335 1.54586 12.6082C1.21811 12.2615 1.21811 11.7385 1.54586 11.3918C2.98759 9.86647 7.12317 6 12 6C16.8768 6 21.0124 9.86647 22.4541 11.3918Z"
                                                                    stroke="#130F26"
                                                                ></path>
                                                                <circle
                                                                    id="Ellipse 159"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="5"
                                                                    stroke="#130F26"
                                                                ></circle>
                                                                <circle
                                                                    id="Ellipse 160"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="3"
                                                                    fill="#130F26"
                                                                ></circle>
                                                                <mask
                                                                    id="mask0"
                                                                    mask-type="alpha"
                                                                    maskUnits="userSpaceOnUse"
                                                                    x="9"
                                                                    y="9"
                                                                    width="6"
                                                                    height="6"
                                                                >
                                                                    <circle
                                                                        id="Ellipse 163"
                                                                        cx="12"
                                                                        cy="12"
                                                                        r="3"
                                                                        fill="#130F26"
                                                                    ></circle>
                                                                </mask>
                                                                <circle
                                                                    id="Ellipse 161"
                                                                    opacity="0.89"
                                                                    cx="13.5"
                                                                    cy="10.5"
                                                                    r="1.5"
                                                                    fill="white"
                                                                ></circle>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="py-2  item-table"
                                                    style={{ width: "20%" }}
                                                    onClick={() => {
                                                        history.push(
                                                            `${announcementLocations.parentannouncementDetails
                                                            }?announcementsId=${item.announcementsId}`
                                                        );
                                                        updateSeenAnnouncement(item.announcementsId)(dispatch)
                                                    }}
                                                >
                                                    {item.header}
                                                </div>
                                                <div className="w-50 py-2 item-table"
                                                    dangerouslySetInnerHTML={{ __html: stripHtml(truncateString(item.content)) }}
                                                    onClick={() => {
                                                        history.push(
                                                            `${announcementLocations.parentannouncementDetails
                                                            }?announcementsId=${item.announcementsId}`
                                                        );
                                                        updateSeenAnnouncement(item.announcementsId)(dispatch);
                                                    }}
                                                >

                                                </div>
                                                <div className="w-25 py-2 item-table"
                                                    onClick={() => {
                                                        history.push(
                                                            `${announcementLocations.parentannouncementDetails
                                                            }?announcementsId=${item.announcementsId}`
                                                        );
                                                        updateSeenAnnouncement(item.announcementsId)(dispatch)
                                                    }}
                                                >
                                                    {item.announcementDate}
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card.Body>
                    {/* <Card.Footer>
                        <PaginationFilter filterProps={filterProps} action={getAllAnnouncement} dispatch={dispatch} />
                    </Card.Footer> */}
                </Card>
            </div>
        </>
    );
};

export default ParentAnnouncement;
