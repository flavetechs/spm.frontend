import { Link, useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { pinManagement } from '../../../../../router/spm-path-locations'
import { hasAccess, NavPermissions } from '../../../../../utils/permissions'
export function PinLink(props){
    var location = useLocation()
    return(
        <>
    <Accordion.Item as="li" eventKey="sidebar-pin" bsPrefix="nav-item">
                    <props.CustomToggle eventKey="sidebar-pin" onClick={(activeKey) => props.setActiveMenu(activeKey)}>
                        <i className="icon">
                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.0105 14.6013C17.4245 14.6013 17.7605 14.2653 17.7605 13.8513V11.9993C17.7605 11.5853 17.4245 11.2493 17.0105 11.2493H11.3185C10.9945 10.1823 10.0125 9.39827 8.84051 9.39827C7.40651 9.39827 6.23951 10.5653 6.23951 11.9993C6.23951 13.4343 7.40651 14.6013 8.84051 14.6013C10.0125 14.6013 10.9945 13.8173 11.3185 12.7493H13.4305V13.8513C13.4305 14.2653 13.7665 14.6013 14.1805 14.6013C14.5945 14.6013 14.9305 14.2653 14.9305 13.8513V12.7493H16.2605V13.8513C16.2605 14.2653 16.5965 14.6013 17.0105 14.6013ZM7.66551 1.99927H16.3345C19.7225 1.99927 21.9995 4.37727 21.9995 7.91627V16.0833C21.9995 19.6223 19.7225 21.9993 16.3335 21.9993H7.66551C4.27651 21.9993 1.99951 19.6223 1.99951 16.0833V7.91627C1.99951 4.37727 4.27651 1.99927 7.66551 1.99927ZM7.73861 12.0002C7.73861 11.3922 8.23361 10.8982 8.84061 10.8982C9.44761 10.8982 9.94261 11.3922 9.94261 12.0002C9.94261 12.6072 9.44761 13.1012 8.84061 13.1012C8.23361 13.1012 7.73861 12.6072 7.73861 12.0002Z" fill="currentColor">
                                </path>
                        </svg>
                        </i>
                        <span className="item-name">Pin MGT</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </props.CustomToggle>
                    {
                    hasAccess(NavPermissions.totalPins) &&
                    <Accordion.Collapse eventKey="sidebar-pin">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === pinManagement.pins ? 'active' : ''} nav-link`} to={pinManagement.pins} onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> P </i>
                                    <span className="item-name">Pins</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                 }
                 {
                    hasAccess(NavPermissions.usedPins) &&
                    <Accordion.Collapse eventKey="sidebar-pin">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === pinManagement.usedPins? 'active' : ''} nav-link`} to={pinManagement.usedPins} onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> U </i>
                                    <span className="item-name">Used Pins</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                }
                </Accordion.Item>
        </>
    )
}

