import { Link, useLocation } from 'react-router-dom'
import { assessmentLocations } from '../../../../../../router/students-path-locations'
export function AssessmentLink(props){
    var location = useLocation()
    return(
        <>
         <li className="nav-item">
                    <Link className={`${location.pathname === assessmentLocations.assessment ? 'active' : ''} nav-link `} aria-current="page" to={assessmentLocations.assessment} onClick={props.minisidebar}>
                        <i className="icon">
                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.6653 2.01034C18.1038 1.92043 19.5224 2.41991 20.5913 3.3989C21.5703 4.46779 22.0697 5.88633 21.9898 7.33483V16.6652C22.0797 18.1137 21.5703 19.5322 20.6013 20.6011C19.5323 21.5801 18.1038 22.0796 16.6653 21.9897H7.33487C5.88636 22.0796 4.46781 21.5801 3.39891 20.6011C2.41991 19.5322 1.92043 18.1137 2.01034 16.6652V7.33483C1.92043 5.88633 2.41991 4.46779 3.39891 3.3989C4.46781 2.41991 5.88636 1.92043 7.33487 2.01034H16.6653ZM10.9811 16.845L17.7042 10.102C18.3136 9.4826 18.3136 8.48364 17.7042 7.87427L16.4056 6.57561C15.7862 5.95625 14.7872 5.95625 14.1679 6.57561L13.4985 7.25491C13.3986 7.35481 13.3986 7.52463 13.4985 7.62453C13.4985 7.62453 15.0869 9.20289 15.1169 9.24285C15.2268 9.36273 15.2967 9.52256 15.2967 9.70238C15.2967 10.062 15.007 10.3617 14.6374 10.3617C14.4675 10.3617 14.3077 10.2918 14.1978 10.1819L12.5295 8.5236C12.4496 8.44368 12.3098 8.44368 12.2298 8.5236L7.46474 13.2887C7.13507 13.6183 6.94527 14.0579 6.93528 14.5274L6.87534 16.8949C6.87534 17.0248 6.9153 17.1447 7.00521 17.2346C7.09512 17.3245 7.21499 17.3744 7.34486 17.3744H9.69245C10.172 17.3744 10.6315 17.1846 10.9811 16.845Z" fill="currentColor"></path>
                        </svg>
                        </i>
                        <span className="item-name">Assessment</span>
                    </Link>
                </li>
        </>
    )
}