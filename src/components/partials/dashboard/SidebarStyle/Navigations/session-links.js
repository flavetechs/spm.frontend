import { Link, useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { adminAdmissionLocations, sessionLocations } from '../../../../../router/spm-path-locations'
import { hasAccess, NavPermissions } from '../../../../../utils/permissions'
export function SessionLink(props) {
    var location = useLocation()
    return (
        <>
            <Accordion.Item as="li" eventKey="sidebar-session" bsPrefix="nav-item">
                <props.CustomToggle eventKey="sidebar-session" onClick={(activeKey) => props.setActiveMenu(activeKey)}>
                    <i className="icon">
                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M10.0833 15.958H3.50777C2.67555 15.958 2 16.6217 2 17.4393C2 18.2559 2.67555 18.9207 3.50777 18.9207H10.0833C10.9155 18.9207 11.5911 18.2559 11.5911 17.4393C11.5911 16.6217 10.9155 15.958 10.0833 15.958Z" fill="currentColor">
                            </path>
                            <path opacity="0.4" d="M22.0001 6.37867C22.0001 5.56214 21.3246 4.89844 20.4934 4.89844H13.9179C13.0857 4.89844 12.4102 5.56214 12.4102 6.37867C12.4102 7.1963 13.0857 7.86 13.9179 7.86H20.4934C21.3246 7.86 22.0001 7.1963 22.0001 6.37867Z" fill="currentColor">
                            </path>
                            <path d="M8.87774 6.37856C8.87774 8.24523 7.33886 9.75821 5.43887 9.75821C3.53999 9.75821 2 8.24523 2 6.37856C2 4.51298 3.53999 3 5.43887 3C7.33886 3 8.87774 4.51298 8.87774 6.37856Z" fill="currentColor"></path><path d="M21.9998 17.3992C21.9998 19.2648 20.4609 20.7777 18.5609 20.7777C16.6621 20.7777 15.1221 19.2648 15.1221 17.3992C15.1221 15.5325 16.6621 14.0195 18.5609 14.0195C20.4609 14.0195 21.9998 15.5325 21.9998 17.3992Z" fill="currentColor">
                            </path>
                        </svg>
                    </i>
                    <span className="item-name">Session</span>
                    <i className="right-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </i>
                </props.CustomToggle>
                {
                    hasAccess(NavPermissions.sessionSetup) &&
                    <Accordion.Collapse eventKey="sidebar-session">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === sessionLocations.sessionList ? 'active' : ''} nav-link`} to={sessionLocations.sessionList}
                                    onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> U </i>
                                    <span className="item-name">Session Setup</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                }

                {/* {
                    hasAccess(NavPermissions.classSetup) &&
                    <Accordion.Collapse eventKey="sidebar-session" >
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === sessionLocations.classSetupList ? 'active' : ''} nav-link`} to={sessionLocations.classSetupList}
                                    onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> S </i>
                                    <span className="item-name">Class Setup</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                } */}

                {/* {
                    hasAccess(NavPermissions.subjectSetup) &&
                    <Accordion.Collapse eventKey="sidebar-session" >
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === sessionLocations.subjectSetupList ? 'active' : ''} nav-link`} to={sessionLocations.subjectSetupList}
                                    onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> S </i>
                                    <span className="item-name">Subject Setup</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                } */}

                {
                    hasAccess(NavPermissions.sessionSessionClass) &&
                    <Accordion.Collapse eventKey="sidebar-session" >
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === sessionLocations.sessionClassList ? 'active' : ''} nav-link`} to={sessionLocations.sessionClassList}
                                    onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> S </i>
                                    <span className="item-name">Class</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                }
                {
                    hasAccess(NavPermissions.promotionList) &&
                    <Accordion.Collapse eventKey="sidebar-session">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === sessionLocations.promotionSetup ? 'active' : ''} nav-link`} to={sessionLocations.promotionSetup}
                                    onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> U </i>
                                    <span className="item-name">Promotion</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                }
                <Accordion.Collapse eventKey="sidebar-session">
                    <ul className="sub-nav">
                        <li className="nav-item">
                            <Link className={`${location.pathname === adminAdmissionLocations.adminAdmissionList ? 'active' : ''} nav-link`} to={adminAdmissionLocations.adminAdmissionList}
                                onClick={props.minisidebar}>
                                <i className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                        <g>
                                            <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                </i>
                                <i className="sidenav-mini-icon"> U </i>
                                <span className="item-name">Admission</span>
                            </Link>
                        </li>
                    </ul>
                </Accordion.Collapse>
            </Accordion.Item>
        </>
    )
}