import { useEffect } from 'react'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import CustomToggle from '../../../dropdowns'
import { bindActionCreators } from "redux"
import { loginOutUser } from '../../../../store/actions/auth-actions';

//img
import flag1 from '../../../../assets/images/Flag/flag001.png'
import flag2 from '../../../../assets/images/Flag/flag-02.png'
import flag3 from '../../../../assets/images/Flag/flag-03.png'
import flag4 from '../../../../assets/images/Flag/flag-04.png'
import flag5 from '../../../../assets/images/Flag/flag-05.png'
import flag6 from '../../../../assets/images/Flag/flag-06.png'
import shapes1 from '../../../../assets/images/shapes/01.png'
import shapes2 from '../../../../assets/images/shapes/02.png'
import shapes3 from '../../../../assets/images/shapes/03.png'
import shapes4 from '../../../../assets/images/shapes/04.png'
import shapes5 from '../../../../assets/images/shapes/05.png'
import avatars1 from '../../../../assets/images/avatars/01.png'
import avatars2 from '../../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../../assets/images/avatars/avtar_5.png'
// logo

// store
import { NavbarstyleAction, getDirMode, SchemeDirAction, getNavbarStyleMode, getSidebarActiveMode, SidebarActiveStyleAction, getDarkMode, ModeAction, SidebarColorAction, getSidebarColorMode, getSidebarTypeMode } from '../../../../store/setting/setting'
import { connect, useDispatch } from "react-redux"
import { authLocations } from '../../../../router/spm-path-locations'
import { getUserDetails } from '../../../../utils/permissions'
import { studentProfileLocations } from '../../../../router/students-path-locations'
import PushedNotifications from './pushed-notifications'

const mapStateToProps = (state) => {
    return {
        darkMode: getDarkMode(state),
        schemeDirMode: getDirMode(state),
        sidebarcolorMode: getSidebarColorMode(state),
        sidebarTypeMode: getSidebarTypeMode(state),
        sidebaractivestyleMode: getSidebarActiveMode(state),
        navbarstylemode: getNavbarStyleMode(state),
    };
}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            ModeAction,
            SchemeDirAction,
            SidebarColorAction,
            SidebarActiveStyleAction,
            NavbarstyleAction,
        },
        dispatch
    )
})


const Header = (props) => {


    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // navbarstylemode
        const navbarstyleMode1 = sessionStorage.getItem('Navbarstyle-mode');
        if (navbarstyleMode1 === null) {
            props.NavbarstyleAction(props.navbarstylemode);
        }
        else {
            props.NavbarstyleAction(navbarstyleMode1);
        }
    }, [props])
    const minisidebar = () => {
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }

    var userDetail = getUserDetails();
    return (
        <>
            <Navbar expand="lg" variant="light" className="nav iq-navbar">
                <Container fluid className="navbar-inner">
                    <Link to="/dashboard" className="navbar-brand">
                        {/* <Logo color={true} /> */}
                        <h4 className="logo-title">{userDetail?.schoolAbbreviation ?? ''}</h4>
                    </Link>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                        <i className="icon">
                            <svg width="20px" height="20px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                            </svg>
                        </i>
                    </div>
                    <div className="input-group search-input">
                        <span className="input-group-text" id="search-input">
                            <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </span>
                        <input type="search" className="form-control" placeholder="Search..." />
                    </div>
                    <Navbar.Toggle aria-controls="navbarSupportedContent">
                        <span className="navbar-toggler-icon">
                            <span className="mt-2 navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="navbarSupportedContent">


                        <Nav as="ul" className="mb-2 ms-auto navbar-list mb-lg-0">

                            <PushedNotifications />

                            {/* <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} href="#" variant="nav-link" id="mail-drop" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M22 15.94C22 18.73 19.76 20.99 16.97 21H16.96H7.05C4.27 21 2 18.75 2 15.96V15.95C2 15.95 2.006 11.524 2.014 9.298C2.015 8.88 2.495 8.646 2.822 8.906C5.198 10.791 9.447 14.228 9.5 14.273C10.21 14.842 11.11 15.163 12.03 15.163C12.95 15.163 13.85 14.842 14.56 14.262C14.613 14.227 18.767 10.893 21.179 8.977C21.507 8.716 21.989 8.95 21.99 9.367C22 11.576 22 15.94 22 15.94Z" fill="currentColor"></path>
                                        <path d="M21.4759 5.67351C20.6099 4.04151 18.9059 2.99951 17.0299 2.99951H7.04988C5.17388 2.99951 3.46988 4.04151 2.60388 5.67351C2.40988 6.03851 2.50188 6.49351 2.82488 6.75151L10.2499 12.6905C10.7699 13.1105 11.3999 13.3195 12.0299 13.3195C12.0339 13.3195 12.0369 13.3195 12.0399 13.3195C12.0429 13.3195 12.0469 13.3195 12.0499 13.3195C12.6799 13.3195 13.3099 13.1105 13.8299 12.6905L21.2549 6.75151C21.5779 6.49351 21.6699 6.03851 21.4759 5.67351Z" fill="currentColor"></path>
                                    </svg>
                                    <span className="bg-primary count-mail"></span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-0 sub-drop dropdown-menu-end" aria-labelledby="mail-drop">
                                    <div className="m-0 shadow-none card">
                                        <div className="py-3 card-header d-flex justify-content-between bg-primary">
                                            <div className="header-title">
                                                <h5 className="mb-0 text-white">All Message</h5>
                                            </div>
                                        </div>
                                        <div className="p-0 card-body ">
                                            <Link to="#" className="iq-sub-card">
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <img className="p-1 avatar-40 rounded-pill bg-soft-primary" src={shapes1} alt="" />
                                                    </div>
                                                    <div className=" w-100 ms-3">
                                                        <h6 className="mb-0 ">Bni Emma Watson</h6>
                                                        <small className="float-left font-size-12">13 Jun</small>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="#" className="iq-sub-card">
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <img className="p-1 avatar-40 rounded-pill bg-soft-primary" src={shapes2} alt="" />
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 ">Lorem Ipsum Watson</h6>
                                                        <small className="float-left font-size-12">20 Apr</small>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="#" className="iq-sub-card">
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <img className="p-1 avatar-40 rounded-pill bg-soft-primary" src={shapes3} alt="" />
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 ">Why do we use it?</h6>
                                                        <small className="float-left font-size-12">30 Jun</small>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="#" className="iq-sub-card">
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <img className="p-1 avatar-40 rounded-pill bg-soft-primary" src={shapes4} alt="" />
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 ">Variations Passages</h6>
                                                        <small className="float-left font-size-12">12 Sep</small>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link to="#" className="iq-sub-card">
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <img className="p-1 avatar-40 rounded-pill bg-soft-primary" src={shapes5} alt="" />
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0 ">Lorem Ipsum generators</h6>
                                                        <small className="float-left font-size-12">5 Dec</small>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown> */}

                            <Dropdown as="li" className="nav-item">
                                <Dropdown.Toggle as={CustomToggle} variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={avatars1} alt="User-Profile" className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={avatars2} alt="User-Profile" className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={avatars3} alt="User-Profile" className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={avatars5} alt="User-Profile" className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={avatars6} alt="User-Profile" className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <img src={avatars4} alt="User-Profile" className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" />
                                    <div className="caption ms-3 d-none d-md-block ">
                                        <h6 className="mb-0 caption-title">{userDetail?.userName}</h6>
                                        <p className="mb-0 caption-sub-title">{userDetail?.userType}</p>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    {/* {
                                        userDetail?.userType === "Teacher"
                                            ? (
                                                <Dropdown.Item onClick={() => {
                                                    history.push(`${authLocations.staffProfilePage}?teacherAccountId=${userDetail?.id}`)
                                                }}>
                                                    <span>  Profile</span>
                                                </Dropdown.Item>)
                                            : <Dropdown.Item onClick={() => {
                                                history.push(`${profileLocations.profile}?studentAccountId=${userDetail?.id}`)
                                            }}>
                                                <span> Profile</span>
                                            </Dropdown.Item>
                                    } */}
                                    {
                                        userDetail?.userType === "Teacher"|| userDetail?.userType === "Admin"
                                            ? (
                                                <Dropdown.Item onClick={() => {
                                                    history.push(`${authLocations.staffProfilePage}?teacherAccountId=${userDetail?.id}`)
                                                }}>
                                                    <span>  Profile</span>
                                                </Dropdown.Item>)
                                            :  userDetail?.userType === "Student" && <Dropdown.Item onClick={() => {
                                                history.push(`${studentProfileLocations.profile}?studentAccountId=${userDetail?.id}`)
                                            }}>
                                                <span> Profile</span>
                                            </Dropdown.Item>
                                    }

                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => {
                                        dispatch(loginOutUser());
                                        history.push(authLocations.login)
                                    }}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
