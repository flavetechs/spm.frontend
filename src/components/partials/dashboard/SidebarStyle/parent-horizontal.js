import { Link } from "react-router-dom";
import {
  Accordion,
} from "react-bootstrap";
import { DashboardLink } from "./Navigations/dashboard-links";


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

const ParentsHorizontalNav = () => {
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

        {/* <announcementLink minisidebar={minisidebar} /> */}

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

export default ParentsHorizontalNav;
