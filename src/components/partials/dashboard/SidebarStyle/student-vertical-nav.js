import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { OnlineClassLink } from "./Navigations/student-navigations/online-class-link";
import { AssessmentLink } from "./Navigations/student-navigations/assessment-link";
import { LessonNoteLink } from "./Navigations/student-navigations/lesson-notes-link";
import { AnnouncementLink } from "./Navigations/student-navigations/announcement-link";
import { TimeTableLink } from "./Navigations/student-navigations/time-table-link";
import { PrintResultLink } from "./Navigations/student-navigations/print-result-link";
import { StudentDashboardLink } from "./Navigations/student-navigations/dashboard-link";


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

        <StudentDashboardLink minisidebar={minisidebar} />

        <OnlineClassLink minisidebar={minisidebar} />

        <AssessmentLink minisidebar={minisidebar} />

        <LessonNoteLink minisidebar={minisidebar} />

        <AnnouncementLink minisidebar={minisidebar} />

        <TimeTableLink minisidebar={minisidebar} />

        <PrintResultLink minisidebar={minisidebar} />

      </Accordion>
    </>
  );
};

export default StudentsVerticalNav;
