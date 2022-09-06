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

const VerticalNav = () => {
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

                {hasAccess(NavPermissions.roleList) && (
                    <PermissionLink
                        minisidebar={minisidebar}
                        CustomToggle={CustomToggle}
                        setActiveMenu={setActiveMenu}
                    />
                )}

                {hasAccess2([
                    NavPermissions.sessionSetup,
                    NavPermissions.classSetup,
                    NavPermissions.subjectSetup,
                    NavPermissions.sessionSessionClass,
                    NavPermissions.promotionList
                ]) && (
                        <SessionLink
                            minisidebar={minisidebar}
                            CustomToggle={CustomToggle}
                            setActiveMenu={setActiveMenu}
                        />
                    )}

                {hasAccess2([
                    NavPermissions.sessionClass,
                    NavPermissions.classAttendance
                ]) && (
                        <ClassLink
                            minisidebar={minisidebar}
                            CustomToggle={CustomToggle}
                            setActiveMenu={setActiveMenu}
                        />
                    )}

                {hasAccess(NavPermissions.staffList) && (
                    <>
                        <li>
                            <hr className="hr-horizontal" />
                        </li>
                        <StaffLink
                            minisidebar={minisidebar}
                            CustomToggle={CustomToggle}
                            setActiveMenu={setActiveMenu}
                        />
                    </>
                )}

                {hasAccess2([
                    NavPermissions.studentList,
                    NavPermissions.enrolledStudentsList,
                    NavPermissions.unenrolledStudentsList
                ]) && (
                        <StudentLink
                            minisidebar={minisidebar}
                            CustomToggle={CustomToggle}
                            setActiveMenu={setActiveMenu}
                        />
                    )}

                {hasAccess2([
                    NavPermissions.scoreEntry,
                    NavPermissions.publishResult,
                    NavPermissions.masterList,
                    NavPermissions.printResult,
                    NavPermissions.cummulativeMasterList
                ]) && (
                        <>
                            <li>
                                <hr className="hr-horizontal" />
                            </li>
                            <ResultLink
                                minisidebar={minisidebar}
                                CustomToggle={CustomToggle}
                                setActiveMenu={setActiveMenu}
                            />
                        </>
                    )}

                {hasAccess2([NavPermissions.unusedPins, NavPermissions.usedPins]) && (
                    <PinLink
                        minisidebar={minisidebar}
                        CustomToggle={CustomToggle}
                        setActiveMenu={setActiveMenu}
                    />
                )}

                {hasAccess2([
                    NavPermissions.portalSetting,
                    NavPermissions.templateSetting,
                    NavPermissions.gradeSetting
                ]) && (
                        <>
                            <li className="nav-item static-item">
                                <Link
                                    className="nav-link static-item disabled"
                                    to="#"
                                    tabIndex="-1"
                                >
                                    <span className="default-icon">settings</span>
                                    <span className="mini-icon">-</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="hr-horizontal" />
                            </li>
                            <PortalSettingsLink
                                minisidebar={minisidebar}
                                CustomToggle={CustomToggle}
                                setActiveMenu={setActiveMenu}
                            />
                        </>
                    )}

            </Accordion>
        </>
    );
};

export default VerticalNav;
