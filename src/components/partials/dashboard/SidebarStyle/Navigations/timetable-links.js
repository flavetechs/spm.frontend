import { Link, useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import {  timetableLocations } from '../../../../../router/spm-path-locations'
import { hasAccess, NavPermissions } from '../../../../../utils/permissions'
export function TimeTableLink(props){
    var location = useLocation()
    return(
        <>
       
                 <Accordion.Item as="li" eventKey="sidebar-timetable" bsPrefix="nav-item">
                <props.CustomToggle eventKey="sidebar-timetable" onClick={(activeKey) => props.setActiveMenu(activeKey)}>
                    <i className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M2 5C2 4.44772 2.44772 4 3 4H8.66667H21C21.5523 4 22 4.44772 22 5V8H15.3333H8.66667H2V5Z" fill="currentColor" stroke="currentColor"></path>
                        <path d="M6 8H2V11M6 8V20M6 8H14M6 20H3C2.44772 20 2 19.5523 2 19V11M6 20H14M14 8H22V11M14 8V20M14 20H21C21.5523 20 22 19.5523 22 19V11M2 11H22M2 14H22M2 17H22M10 8V20M18 8V20" stroke="currentColor"></path>
                        </svg>
                    </i>
                    <span className="item-name">Time Table</span>
                    <i className="right-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </i>
                </props.CustomToggle>
                {
                    hasAccess(NavPermissions.sessionSetup) &&
                    <Accordion.Collapse eventKey="sidebar-timetable">
                        <ul className="sub-nav">
                            <li className="nav-item">
                            <Link className={`${location.pathname === timetableLocations.classTimeTable ? 'active' : ''} nav-link`} to={timetableLocations.classTimeTable}
                       onClick={ props.minisidebar}>
                            <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                           <i className="sidenav-mini-icon">  </i>
                           <span className="item-name">Class Activities</span>
                       </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                }

{
                    hasAccess(NavPermissions.sessionSetup) &&
                    <Accordion.Collapse eventKey="sidebar-timetable">
                        <ul className="sub-nav">
                            <li className="nav-item">
                            <Link className={`${location.pathname === timetableLocations.examTimeTable ? 'active' : ''} nav-link`} to={timetableLocations.examTimeTable}
                       onClick={ props.minisidebar}>
                            <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                           <i className="sidenav-mini-icon">  </i>
                           <span className="item-name">Exam Activites</span>
                       </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                }



            </Accordion.Item>
        </>
    )
}