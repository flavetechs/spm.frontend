import { Link, useLocation } from 'react-router-dom'
import { Accordion } from 'react-bootstrap'
import { classLocations } from '../../../../../router/spm-path-locations'
import { hasAccess, NavPermissions } from '../../../../../utils/permissions'
export function TimeTableLink(props){
    var location = useLocation()
    return(
        <>
       {
                    hasAccess(NavPermissions.sessionClass) &&
                    
                       <li className="nav-item">
                       <Link className={`${location.pathname === classLocations.classTimeTable ? 'active' : ''} nav-link`} to={classLocations.classTimeTable}
                       onClick={ props.minisidebar}>
                            <i className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 5C2 4.44772 2.44772 4 3 4H8.66667H21C21.5523 4 22 4.44772 22 5V8H15.3333H8.66667H2V5Z" fill="currentColor" stroke="currentColor"></path><path d="M6 8H2V11M6 8V20M6 8H14M6 20H3C2.44772 20 2 19.5523 2 19V11M6 20H14M14 8H22V11M14 8V20M14 20H21C21.5523 20 22 19.5523 22 19V11M2 11H22M2 14H22M2 17H22M10 8V20M18 8V20" stroke="currentColor"></path></svg>
                        </i>
                           <i className="sidenav-mini-icon"> TT </i>
                           <span className="item-name">Time Table</span>
                       </Link>
                   </li>
}     
        </>
    )
}