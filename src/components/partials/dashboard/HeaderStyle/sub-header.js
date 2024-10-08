import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
//img
import topHeader from "../../../../assets/images/dashboard/top-header.png";
import topHeader1 from "../../../../assets/images/dashboard/top-header1.png";
import topHeader2 from "../../../../assets/images/dashboard/top-header2.png";
import topHeader3 from "../../../../assets/images/dashboard/top-header3.png";
import topHeader4 from "../../../../assets/images/dashboard/top-header4.png";
import topHeader5 from "../../../../assets/images/dashboard/top-header5.png";

// store
import {
  NavbarstyleAction,
  getDirMode,
  SchemeDirAction,
  getNavbarStyleMode,
  getSidebarActiveMode,
  SidebarActiveStyleAction,
  getDarkMode,
  ModeAction,
  SidebarColorAction,
  getSidebarColorMode,
  getSidebarTypeMode,
} from "../../../../store/setting/setting";
import { connect } from "react-redux";
import {
  notificationManagement,
  sessionLocations,
} from "../../../../router/spm-path-locations";
import { hasAccess, NavPermissions } from "../../../../utils/permissions";

import { socket } from "../../../../App";
import { UserType } from "../../../spm-auth/login-templates/UserTypesBoxes";
import { stripHtml, truncateContent } from "../../../../utils/tools";
import { getAllNotifications2 } from "../../../../store/actions/notification-actions";

const mapStateToProps = (state) => {
  return {
    darkMode: getDarkMode(state),
    schemeDirMode: getDirMode(state),
    sidebarcolorMode: getSidebarColorMode(state),
    sidebarTypeMode: getSidebarTypeMode(state),
    sidebaractivestyleMode: getSidebarActiveMode(state),
    navbarstylemode: getNavbarStyleMode(state),
  };
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(
    {
      ModeAction,
      SchemeDirAction,
      SidebarColorAction,
      SidebarActiveStyleAction,
      NavbarstyleAction,
    },
    dispatch
  ),
});



var userDetails = JSON.parse(localStorage.getItem("userDetail"));

const SubHeader = (props) => {
  const [session, setSessionDisplay] = useState(
    localStorage.getItem("currentSession")
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === sessionLocations.sessionAdd || location.pathname === sessionLocations.sessionList) {
      setSessionDisplay(localStorage.getItem("currentSession"));
    }
  }, [session, location.pathname]);

  const [notification, setNotification]= useState()
  useEffect(() => {
   async function fetchNotification(){
    const notif =  await getAllNotifications2();
    setNotification(notif);
   } 
   fetchNotification();
  }, [])

  useEffect(() => {
    // navbarstylemode
    const navbarstyleMode = sessionStorage.getItem("Navbarstyle-mode");
    props.NavbarstyleAction(navbarstyleMode);
  });

  const [announcementData, setAnnouncementData] = useState({});

  useEffect(() => {
    const announcementData = window.localStorage.getItem(userDetails?.clientId?.toLowerCase() + "_" + userDetails?.userType?.toLowerCase() + "_announcement");
    setAnnouncementData(JSON.parse(announcementData));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      userDetails?.clientId?.toLowerCase() + "_" + userDetails?.userType?.toLowerCase() + "_announcement",
      JSON.stringify(announcementData)
    );
  });

  if (userDetails) {
    console.log(userDetails);
    socket.on(
      userDetails?.clientId?.toLowerCase() + "_" + userDetails?.userType?.toLowerCase() + "_announcement",
      function (message) {
        setAnnouncementData(message?.announcementData);
      }
    );
  }
 
  return (
    <>
      <div className="iq-navbar-header" style={{ height: "215px" }}>
        <Container fluid className=" iq-container">
          <Row>
            <Col md="12">
              <div className="d-flex justify-content-between flex-wrap">
                <div>
                  <small>{session}</small>
                  {announcementData?.subject !== undefined || announcementData?.content !== undefined ? (
                    <>
                        <h1>{announcementData?.subject}</h1>
                        <p><div
                      dangerouslySetInnerHTML={{ __html: stripHtml(announcementData?.content) }}
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '700px' }}></div></p>
                    </>  
                  ) : (
                    <>
                      <h1>{notification?.subject}</h1>
                      <p><div
                      dangerouslySetInnerHTML={{ __html: stripHtml(notification?.content) }}
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '700px' }}></div></p>
                    </>
                  )}
                </div>
                <div className="d-flex align-items-center">
                  {hasAccess(NavPermissions.announcementList) && (
                    <Link
                      to={notificationManagement.announcement}
                      className="btn btn-link btn-soft-light"
                    >
                      <svg
                        width="20"
                        className="me-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8251 15.2171H12.1748C14.0987 15.2171 15.731 13.985 16.3054 12.2764C16.3887 12.0276 16.1979 11.7713 15.9334 11.7713H14.8562C14.5133 11.7713 14.2362 11.4977 14.2362 11.16C14.2362 10.8213 14.5133 10.5467 14.8562 10.5467H15.9005C16.2463 10.5467 16.5263 10.2703 16.5263 9.92875C16.5263 9.58722 16.2463 9.31075 15.9005 9.31075H14.8562C14.5133 9.31075 14.2362 9.03619 14.2362 8.69849C14.2362 8.35984 14.5133 8.08528 14.8562 8.08528H15.9005C16.2463 8.08528 16.5263 7.8088 16.5263 7.46728C16.5263 7.12575 16.2463 6.84928 15.9005 6.84928H14.8562C14.5133 6.84928 14.2362 6.57472 14.2362 6.23606C14.2362 5.89837 14.5133 5.62381 14.8562 5.62381H15.9886C16.2483 5.62381 16.4343 5.3789 16.3645 5.13113C15.8501 3.32401 14.1694 2 12.1748 2H11.8251C9.42172 2 7.47363 3.92287 7.47363 6.29729V10.9198C7.47363 13.2933 9.42172 15.2171 11.8251 15.2171Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M19.5313 9.82568C18.9966 9.82568 18.5626 10.2533 18.5626 10.7823C18.5626 14.3554 15.6186 17.2627 12.0005 17.2627C8.38136 17.2627 5.43743 14.3554 5.43743 10.7823C5.43743 10.2533 5.00345 9.82568 4.46872 9.82568C3.93398 9.82568 3.5 10.2533 3.5 10.7823C3.5 15.0873 6.79945 18.6413 11.0318 19.1186V21.0434C11.0318 21.5715 11.4648 22.0001 12.0005 22.0001C12.5352 22.0001 12.9692 21.5715 12.9692 21.0434V19.1186C17.2006 18.6413 20.5 15.0873 20.5 10.7823C20.5 10.2533 20.066 9.82568 19.5313 9.82568Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      Announcements
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* {{!-- rounded-bottom if not using animation --}} */}
        <div className="iq-header-img">
          <img
            src={topHeader}
            alt="header"
            className="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader1}
            alt="header"
            className=" theme-color-purple-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader2}
            alt="header"
            className="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader3}
            alt="header"
            className="theme-color-green-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader4}
            alt="header"
            className="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX"
          />
          <img
            src={topHeader5}
            alt="header"
            className="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX"
          />
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);
