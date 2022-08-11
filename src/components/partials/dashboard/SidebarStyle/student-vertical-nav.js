import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Accordion,
    useAccordionButton,
    AccordionContext,
} from "react-bootstrap";
import { DashboardLink } from "./Navigations/dashboard-links";
import { PermissionLink } from "./Navigations/permission-links";
import {
    getUserDetails,
    hasAccess,
    hasAccess2,
    NavPermissions,
} from "../../../../utils/permissions";
import { SessionLink } from "./Navigations/session-links";
import { ClassLink } from "./Navigations/class-links";
import { StaffLink } from "./Navigations/staff-links";
import { StudentLink } from "./Navigations/student-links";
import { ResultLink } from "./Navigations/result-links";
import { PinLink } from "./Navigations/pin-links";
import { PortalSettingsLink } from "./Navigations/portal-setting-links";

function CustomToggle({ children, eventKey, onClick }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, (active) =>
        onClick({ state: !active, eventKey: eventKey })
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <Link
            to="#"
            aria-expanded={isCurrentEventKey ? "true" : "false"}
            className="nav-link"
            role="button"
            onClick={(e) => {
                decoratedOnClick(isCurrentEventKey);
            }}
        >
            {children}
        </Link>
    );
}
const minisidebar = () => {
  
    if (window.innerWidth < 800) {
        if (
            !document
                .getElementsByTagName("ASIDE")[0]
                ?.classList.contains("sidebar-mini")
        ) {
            document.getElementsByTagName("ASIDE")[0]?.classList?.add("sidebar-mini");
        }
    }
};

const StudentsVerticalNav = () => {
    const [activeMenue, setActiveMenu] = useState(false);
    //location
    // console.log(activeMenu);
    let location = useLocation();

    return (
        <>
            <Accordion as="ul" className="navbar-nav iq-main-menu">
                <li className="nav-item static-item">
                    <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
                        <span className="default-icon">Home</span>
                        <span className="mini-icon">-</span>
                    </Link>
                </li>

                <DashboardLink minisidebar={minisidebar} />

                

            </Accordion>
        </>
    );
};

export default StudentsVerticalNav;
