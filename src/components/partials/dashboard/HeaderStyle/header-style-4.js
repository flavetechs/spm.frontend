import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Dropdown } from 'react-bootstrap'
// logo
import Logo from '../../components/logo'
import { getUserDetails } from '../../../../utils/permissions'
import { announcementLocations, parentAssessmentLocations, dashboardLocations, myWardsLocations, parentTeachersNoteLocations, parentTimeTableLocations, printResultLocations, wardsNoteLocations } from '../../../../router/parents-path-locations'
import { Link, useHistory } from 'react-router-dom'
import './header-style-4.scss'
import { getMyWardsList } from '../../../../store/actions/parent-actions'
import { useDispatch, useSelector } from 'react-redux'
import { loginOutUser } from '../../../../store/actions/auth-actions'
import { authLocations } from '../../../../router/spm-path-locations'

const HeaderStyle4 = () => {
    var userDetail = getUserDetails();

    //VARIABLE DECLARATIONS
    let history = useHistory();
    const dispatch = useDispatch();
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { myWardList, filterProps } = state.parent;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        getMyWardsList(1)(dispatch);
    }, [dispatch]);

    let parentNavLinks = [
        { name: "Dashboard", link: dashboardLocations.dashboard },
        { name: "My Wards", link: myWardsLocations.myWards },
        { name: "Teacher's Note", link: parentTeachersNoteLocations.parentTeachersNote },
        { name: "Ward's Note", link: wardsNoteLocations.wardsNote },
        { name: "Assessment", link: parentAssessmentLocations.parentAssessment},
        { name: "Print Result", link: printResultLocations.printResult },
        { name: "Class Timetable", link: parentTimeTableLocations.parentClassTimeTable },
        { name: "Exam Timetable", link: parentTimeTableLocations.parentExamTimeTable },
        { name: "Announcement", link: announcementLocations.announcement },
    ]

    return (
        <>
            <Navbar bg='dark' expand="lg" variant="dark" className="fixed-top iq-navbar" aria-label="Main navigation">
                <Container fluid>
                    <Link to="/dashboard" className="navbar-brand d-flex align-items-center">
                        {/* <Logo color={true} /> */}
                        {/* <h4 className="logo-title text-light ms-3 mb-0"> {userDetail?.schoolAbbreviation ?? ''}</h4> */}
                    </Link>
                    <Navbar.Toggle className="p-0 border-0" aria-controls="navbarSideCollapse" >
                        <span className="navbar-toggler-icon">
                            <span className="navbar-toggler-bar bar1 mt-2"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="offcanvas-collapse" >
                        <Nav as="ul" className=" me-auto mb-2 mb-lg-0">
                            <Nav.Item as="li">
                                <Nav.Link active aria-current="page" href={dashboardLocations.dashboard}>Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href="#">Notifications</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link href="#">Switch account</Nav.Link>
                            </Nav.Item>
                            <NavDropdown title="Profile" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => {
                                    dispatch(loginOutUser());
                                    history.push(authLocations.login)
                                }}>Logout</Dropdown.Item>
                            </NavDropdown>
                            {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="nav-scroller bg-body shadow-sm">
                <Nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link
                        className='header-styles'
                        to={dashboardLocations.dashboard}
                    >
                        Dashboard
                    </Link>
                    {/* <Nav.Link aria-current="page" href={dashboardLocations.dashboard}>Dashboard</Nav.Link> */}
                    {/* <Nav.Link href="#">
                        Student(s)
                        <span className="badge bg-light text-dark rounded-pill align-text-bottom">7</span>
                    </Nav.Link> */}
                    {/* <Nav.Link href="#">Explore</Nav.Link>
                    <Nav.Link href="#">Suggestions</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link> */}
                    <Link
                        className='header-styles '
                        to={myWardsLocations.myWards}
                    >
                        My  Ward(s)
                        <span className="badge bg-light text-dark rounded-pill align-text-bottom">{myWardList.length}</span>
                    </Link>
                    <Link
                        className='header-styles'
                        to={parentTeachersNoteLocations.parentTeachersNote}
                    >
                        Teacher's Note
                    </Link>
                    <Link
                        className='header-styles'
                        to={wardsNoteLocations.wardsNote}
                    >
                        Ward's Note
                    </Link>
                    <Link
                        className='header-styles'
                        to={parentAssessmentLocations.parentAssessment}
                    >
                        Assessment
                    </Link>
                    <Link
                        className='header-styles'
                        to={printResultLocations.printResult}
                    >
                        Print Result
                    </Link>
                    
                    <NavDropdown title="Timetable"  id="sec-nav-dropdown">
                                <Dropdown.Item onClick={() => {
                                    history.push(parentTimeTableLocations.parentClassTimeTable)
                                }}>
                                    Class Timetable</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => {
                                    history.push(parentTimeTableLocations.parentExamTimeTable)
                                }}>
                                    Exam Timetable
                                    </Dropdown.Item>
                            </NavDropdown>
                      
                    <Link
                        className='header-styles'
                        to={announcementLocations.announcement}
                    >
                        Announcement
                    </Link>
                    {/* {parentNavLinks.map((item, idx) => (
                        <Link
                            className='header-styles'
                            to={item.link}
                            key={idx}
                        >
                            {item.name}
                            <span className="badge bg-light text-dark rounded-pill align-text-bottom">7</span>
                        </Link>
                    ))} */}
                </Nav>
            </div>
        </>
    )
}

export default HeaderStyle4
