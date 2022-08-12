import { Link, useLocation } from 'react-router-dom'
import { printResultLocations } from '../../../../../../router/students-path-locations'
export function PrintResultLink(props){
    var location = useLocation()
    return(
        <>
         <li className="nav-item">
                    <Link className={`${location.pathname === printResultLocations.printResult ? 'active' : ''} nav-link `} aria-current="page" to={printResultLocations.printResult} onClick={props.minisidebar}>
                        <i className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
                            <path d="M24 5h-4v-5h-16v5h-4v13h4v6h9.519c2.947 0 6.029-3.577 6.434-6h4.047v-13zm-18-3h12v3h-12v-3zm8.691 16.648s1.469 3.352-2 3.352h-6.691v-8h12v2.648c0 3.594-3.309 2-3.309 2zm6.809-10.648c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5zm-5.5 9h-8v-1h8v1zm-3 1h-5v1h5v-1z"fill="currentColor"/>
                        </svg>
                        </i>
                        <span className="item-name">Print Result</span>
                    </Link>
                </li>
        </>
    )
}