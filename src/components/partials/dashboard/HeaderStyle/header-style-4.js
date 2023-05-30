import React from "react";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
// logo
import Logo from "../../components/logo";
import { getUserDetails } from "../../../../utils/permissions";
import {
  announcementLocations,
  parentAssessmentLocations,
  parentDashboardLocations,
  myWardsLocations,
  parentTeachersNoteLocations,
  parentTimeTableLocations,
  parentPrintResultLocations,
  wardsNoteLocations,
  parentAccountLocations,
} from "../../../../router/parents-path-locations";
import { Link, useHistory } from "react-router-dom";
import "./header-style-4.scss";
import { getMyWardsList } from "../../../../store/actions/parent-actions";
import { useDispatch, useSelector } from "react-redux";
import { loginOutUser } from "../../../../store/actions/auth-actions";
import { authLocations } from "../../../../router/spm-path-locations";
import SmpLoader from "../../../loader/smp-loader";

const HeaderStyle4 = () => {
  var userDetail = getUserDetails();

  //VARIABLE DECLARATIONS
  let history = useHistory();
  const dispatch = useDispatch();
  const appSetting = JSON.parse(localStorage.getItem("appSetting"));
  const schoolLogo = localStorage.getItem("schoolLogo");
  const schoolAbrev = localStorage.getItem("schoolAbrev");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { myWardList, filterProps } = state.parent;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getMyWardsList(1)(dispatch);
  }, [dispatch]);
  var userDetail = localStorage.getItem('userDetail')
  

  return (
    <>
     <SmpLoader />
      <div className="mt-n5 mx-3 mb-2 text-center d-flex d-block d-md-none  justify-content-end align-items-center">
        <img src={schoolLogo} alt="school logo" height="40px" />
        <h4 className="logo-title mx-2 h6">{schoolAbrev} </h4>
      </div>

      <Navbar
        bg="dark"
        expand="lg"
        variant="dark"
        className="fixed-top d-none d-md-block "
        aria-label="Main navigation"
      >
        <Container fluid>
        <div className="text-center d-flex align-items-center">
        <img src={schoolLogo} alt="school logo" height="40px" />
        <h4 className="logo-title mx-2 text-light">{schoolAbrev} </h4>
      </div>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav justify-content-between me-0">
            <Nav as="ul" className=" me-auto mb-2 mb-lg-0">
              <Nav.Item as="li">
                <Nav.Link
                  active
                  aria-current="page"
                  href={parentDashboardLocations.dashboard}
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="#">Notifications</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="#">Switch account</Nav.Link>
              </Nav.Item>
            </Nav>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar
        expand="lg"
        variant={appSetting?.scheme === "dark" ? "dark" : "light"}
        aria-label="Secondary navigation"
        className="mt-n5 mt-md-0"
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav justify-content-between me-0">
            <Nav as="ul" className=" me-auto mb-2 mb-lg-0">
              <Nav.Item as="li">
                <Nav.Link href={myWardsLocations.myWards}>
                  My Ward(s){" "}
                  <span className="badge bg-light text-dark rounded-pill align-text-bottom">
                    {myWardList.length}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href={parentTeachersNoteLocations.parentTeachersNote}>
                  Teacher's Note
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href={wardsNoteLocations.wardsNote}>
                  Ward's Note
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href={parentAssessmentLocations.parentAssessment}>
                  Assessment
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href={parentPrintResultLocations.printResult}>
                  Print Result
                </Nav.Link>
              </Nav.Item>
              <NavDropdown title="Timetable" id="sec-nav-dropdown">
                <Dropdown.Item
                  onClick={() => {
                    history.push(parentTimeTableLocations.parentClassTimeTable);
                  }}
                >
                  Class Timetable
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    history.push(parentTimeTableLocations.parentExamTimeTable);
                  }}
                >
                  Exam Timetable
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    history.push(parentTimeTableLocations.cumulativeTimeTable);
                  }}
                >
                  Cumulative Exam Timetable
                </Dropdown.Item>
              </NavDropdown>
              <Nav.Item as="li">
                <Nav.Link href={announcementLocations.announcement}>
                  Announcement
                </Nav.Link>
              </Nav.Item>
              <NavDropdown
                title="Account"
                id="basic-nav-dropdown dropdown-main dropdown-toggle-menu "
              >
                <NavDropdown.Item
                  href={parentAccountLocations.profile}
                  className=""
                >
                  Profile
                </NavDropdown.Item>
                <Dropdown.Divider />
                <NavDropdown.Item
                  href={`${parentAccountLocations.resetPassword}?id=${JSON.parse(userDetail).userAccountId}`}
                  className=""
                >
                  Reset Password
                </NavDropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    dispatch(loginOutUser());
                    history.push(authLocations.login);
                  }}
                >
                  Logout
                </Dropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderStyle4;
