import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../../../dropdowns";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import React from "react";

import shapes1 from "../../../../assets/images/shapes/01.png";
import shapes2 from "../../../../assets/images/shapes/02.png";
import shapes3 from "../../../../assets/images/shapes/03.png";
import shapes4 from "../../../../assets/images/shapes/04.png";
import hubInstance from "../../../../HubConnection/hub-instance";
import axiosInstance from "../../../../axios/axiosInstance";
import { pushedNotificationManagement } from "../../../../router/spm-path-locations";
import { socket } from "../../../../App";
import {
  getAllNotifications,
  getAllAnnouncement,
} from "../../../../store/actions/notification-actions";
import { useDispatch, useSelector } from "react-redux";

const PushedNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [date, setDate] = useState("");
  const [announcement, setAnnouncementData] = useState(null);
  const state = useSelector((state) => state);
  const { pushedNotificationdetails } = state.notification;

  const dispatch = useDispatch();
  React.useEffect(() => {
    getAllNotifications(1)(dispatch);
  }, [dispatch]);

  // useEffect(() => {
  //     setNotifications(notifications => [...notifications, announcement])
  //  },[announcement])

  useEffect(() => {
    pushedNotificationdetails?.data?.unshift(announcement);
  }, [announcement]);

  var userDetails = JSON.parse(localStorage.getItem("userDetail"));

  socket.on(
    userDetails?.userType.toLowerCase() + "-announcement",
    function (message) {
      setAnnouncementData(message?.announcementData);
    }
  );

  return (
    <>
      <Dropdown as="li" className="nav-item">
        <Dropdown.Toggle
          as={CustomToggle}
          href="#"
          variant=" nav-link"
          id="notification-drop"
          data-bs-toggle="dropdown"
        >
          <svg
            width="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z"
              fill="currentColor"
            ></path>
            <path
              opacity="0.4"
              d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z"
              fill="currentColor"
            ></path>
          </svg>
          <span className="bg-danger dots"></span>
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="p-0 sub-drop dropdown-menu-end"
          aria-labelledby="notification-drop"
        >
          <div className="m-0 shadow-none card">
            <div className="py-3 card-header d-flex justify-content-between bg-primary">
              <div className="header-title">
                <h5 className="mb-0 text-white">
                  All Notifications
                  <span className="badge bg-light text-dark rounded-pill align-text-bottom">
                    {pushedNotificationdetails?.data.length}
                  </span>
                  {/* <span className="badge bg-light text-dark rounded-pill align-text-bottom">{notifications.length}</span> */}
                </h5>
              </div>
            </div>
            <div className="p-0 card-body">
              {pushedNotificationdetails?.data.map((x, i) => {
                return (
                  // <Link to={`${pushedNotificationManagement.pushedNotificationDetails}?notififcationId=${x?.announcementId}`} className="iq-sub-card" key={i}>
                  <Link
                    to={`${x.notificationPageLink}`}
                    className="iq-sub-card"
                    key={i}
                  >
                    <div className="d-flex align-items-center">
                      <span>
                        <svg
                          width="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <div className="ms-3 w-100">
                        <h6 className="mb-0">{x?.subject}</h6>
                        <p className="mb-0">{x?.type}</p>
                        <small className="float-right font-size-12">
                          {x?.dateCreated}
                        </small>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default PushedNotifications;
