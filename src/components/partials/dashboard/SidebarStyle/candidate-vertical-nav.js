import { Link } from "react-router-dom";
import {
  Accordion,
} from "react-bootstrap";
import { OnlineClassLink } from "./Navigations/student-navigations/online-class-link";
import { AssessmentLink } from "./Navigations/student-navigations/assessment-link";
import { ClassNoteLink  } from "./Navigations/student-navigations/class-notes-link";
import { AnnouncementLink } from "./Navigations/student-navigations/announcement-link";
import { TimeTableLink } from "./Navigations/student-navigations/time-table-link";
import { PrintResultLink } from "./Navigations/student-navigations/print-result-link";
import { StudentDashboardLink } from "./Navigations/student-navigations/dashboard-link";
import { StudentNoteLink } from "./Navigations/student-navigations/my-notes-link";
import { CandidateDashboardLink } from "./Navigations/candidate-navigations/candidate-dashboard-link";


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

const CandidatesVerticalNav = () => {
  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu">
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex="-1">
            <span className="default-icon">Home</span>
            <span className="mini-icon">-</span>
          </Link>
        </li>

        <CandidateDashboardLink minisidebar={minisidebar} />
        {/* <StudentDashboardLink minisidebar={minisidebar} /> */}

        {/* <OnlineClassLink minisidebar={minisidebar} />

        <AssessmentLink minisidebar={minisidebar} />

        <ClassNoteLink minisidebar={minisidebar} />

        <StudentNoteLink minisidebar={minisidebar} />

        <AnnouncementLink minisidebar={minisidebar} />

        <TimeTableLink minisidebar={minisidebar} />

        <PrintResultLink minisidebar={minisidebar} /> */}

      </Accordion>
    </>
  );
};

export default CandidatesVerticalNav;
