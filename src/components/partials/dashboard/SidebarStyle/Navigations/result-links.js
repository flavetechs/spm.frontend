import { Link, useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { resultManagement } from '../../../../../router/spm-path-locations'
import { hasAccess, NavPermissions } from '../../../../../utils/permissions'
export function ResultLink(props){
    var location = useLocation()
    return(
        <>
       <Accordion.Item as="li" eventKey="sidebar-result" bsPrefix="nav-item">
                    <props.CustomToggle eventKey="sidebar-result" onClick={(activeKey) => props.setActiveMenu(activeKey)}>
                        <i className="icon">
                            <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M16.6756 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0711 3.92889 22 7.33333 22H16.6756C20.08 22 22 20.0711 22 16.6667V7.33333C22 3.92889 20.08 2 16.6756 2Z" fill="currentColor"></path><path d="M7.36866 9.3689C6.91533 9.3689 6.54199 9.74223 6.54199 10.2045V17.0756C6.54199 17.5289 6.91533 17.9022 7.36866 17.9022C7.83088 17.9022 8.20421 17.5289 8.20421 17.0756V10.2045C8.20421 9.74223 7.83088 9.3689 7.36866 9.3689Z" fill="currentColor"></path><path d="M12.0352 6.08887C11.5818 6.08887 11.2085 6.4622 11.2085 6.92442V17.0755C11.2085 17.5289 11.5818 17.9022 12.0352 17.9022C12.4974 17.9022 12.8707 17.5289 12.8707 17.0755V6.92442C12.8707 6.4622 12.4974 6.08887 12.0352 6.08887Z" fill="currentColor"></path><path d="M16.6398 12.9956C16.1775 12.9956 15.8042 13.3689 15.8042 13.8312V17.0756C15.8042 17.5289 16.1775 17.9023 16.6309 17.9023C17.0931 17.9023 17.4664 17.5289 17.4664 17.0756V13.8312C17.4664 13.3689 17.0931 12.9956 16.6398 12.9956Z" fill="currentColor"></path></svg>
                        </i>
                        <span className="item-name">Results</span>
                        <i className="right-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </props.CustomToggle>
                    {
                    hasAccess(NavPermissions.scoreEntry) &&
                    <Accordion.Collapse eventKey="sidebar-result">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === resultManagement.scoreEntry ? 'active' : ''} nav-link`} to={resultManagement.scoreEntry} onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> S </i>
                                    <span className="item-name">Scores Entry</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                  }
                   {
                    hasAccess(NavPermissions.publishResult) &&
                    <Accordion.Collapse eventKey="sidebar-result">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === resultManagement.publishResult ? 'active' : ''} nav-link`} to={resultManagement.publishResult}
                                onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> P </i>
                                    <span className="item-name">Publish Result</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                     }
                      {
                    hasAccess(NavPermissions.masterList) &&
                    <Accordion.Collapse eventKey="sidebar-result">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === resultManagement.masterList ? 'active' : ''} nav-link`} to={resultManagement.masterList}
                                onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> M </i>
                                    <span className="item-name">Master List</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                    }
                    {
                    hasAccess(NavPermissions.printResult) &&
                    <Accordion.Collapse eventKey="sidebar-result">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === resultManagement.printResult ? 'active' : ''} nav-link`} to={resultManagement.printResult}
                                onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> M </i>
                                    <span className="item-name">Print Result</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                    }
                    {
                    hasAccess(NavPermissions.cummulativeMasterList) &&
                    <Accordion.Collapse eventKey="sidebar-result">
                        <ul className="sub-nav">
                            <li className="nav-item">
                                <Link className={`${location.pathname === resultManagement.cumulativeMasterList ? 'active' : ''} nav-link`} to={resultManagement.cumulativeMasterList}
                                onClick={props.minisidebar}>
                                    <i className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                                            <g>
                                                <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                                            </g>
                                        </svg>
                                    </i>
                                    <i className="sidenav-mini-icon"> M </i>
                                    <span className="item-name">Cumulative Result</span>
                                </Link>
                            </li>
                        </ul>
                    </Accordion.Collapse>
                    }
                </Accordion.Item>
        </>
    )
}