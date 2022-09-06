import { Link, useLocation } from 'react-router-dom'
import { announcementLocations } from '../../../../../../router/students-path-locations'
export function AnnouncementLink(props){
    var location = useLocation()
    return(
        <>
         <li className="nav-item">
                    <Link className={`${location.pathname === announcementLocations.announcement ? 'active' : ''} nav-link `} aria-current="page" to={announcementLocations.announcement} onClick={props.minisidebar}>
                        <i className="icon">
                        <svg
                        width="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3571 6.45056C13.3068 5.96422 13.2543 5.45963 13.1254 4.95611C12.7741 3.75153 11.801 3.00001 10.7576 3.00001C10.1757 2.99786 9.43954 3.35644 9.0222 3.71932L5.56287 6.61697H3.75194C2.41918 6.61697 1.34751 7.6444 1.14513 9.12705C0.973161 10.5506 0.931217 13.2379 1.14513 14.8042C1.33073 16.3706 2.35416 17.383 3.75194 17.383H5.56287L9.08931 20.3236C9.45107 20.6382 10.0897 20.9989 10.6769 20.9989C10.7146 21 10.7482 21 10.7817 21C11.845 21 12.7814 20.2206 13.1327 19.0192C13.2659 18.5082 13.312 18.0293 13.3571 17.5666L13.4043 17.1082C13.5846 15.6213 13.5846 8.36908 13.4043 6.89288L13.3571 6.45056Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M17.4064 6.49468C17.118 6.06953 16.5465 5.96325 16.1281 6.25849C15.7139 6.55587 15.6112 7.14206 15.8995 7.56613C16.7017 8.74816 17.1432 10.3221 17.1432 12.0001C17.1432 13.6771 16.7017 15.252 15.8995 16.4341C15.6112 16.8581 15.7139 17.4443 16.1292 17.7417C16.2844 17.8512 16.4658 17.9092 16.6524 17.9092C16.9534 17.9092 17.2344 17.7578 17.4064 17.5055C18.4193 16.0132 18.9782 14.0582 18.9782 12.0001C18.9782 9.94201 18.4193 7.98698 17.4064 6.49468Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M20.5672 3.45726C20.2809 3.03319 19.7073 2.92475 19.29 3.22107C18.8758 3.51845 18.773 4.10464 19.0603 4.52871C20.4172 6.52776 21.1649 9.18169 21.1649 11.9999C21.1649 14.8192 20.4172 17.4731 19.0603 19.4722C18.773 19.8973 18.8758 20.4824 19.291 20.7798C19.4462 20.8893 19.6266 20.9473 19.8132 20.9473C20.1142 20.9473 20.3963 20.7959 20.5672 20.5436C22.1359 18.2343 22.9999 15.2003 22.9999 11.9999C22.9999 8.80164 22.1359 5.76657 20.5672 3.45726Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                        </i>
                        <span className="item-name">Announcement</span>
                    </Link>
                </li>
        </>
    )
}