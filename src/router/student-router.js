import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
import studentIndex from '../views/dashboard/student-index';
import { assessmentLocations, classNoteLocations, dashboardLocations, onlineClassLocations, printResultLocations, profileLocations, studentNoteLocations, timeTableLocations } from './students-path-locations';
import OnlineClass from '../components/students-area/class/online-class';
import StudentProfilePage from '../components/students-area/user-profile/student-profile-page';
import StudentProfileEdit from '../components/students-area/user-profile/student-profile-edit';
import StudentAssessmentList from '../components/students-area/assessment/assessment-list';
import StudentAssessmentDetails from '../components/students-area/assessment/assessment-details';
import ClassNotes from '../components/students-area/class-notes/class-notes';
import ClassNoteDetails from '../components/students-area/class-notes/class-note-details';
import StudentNotes from '../components/students-area/student-notes/student-notes';
import CreateStudentNote from '../components/students-area/student-notes/student-note-on-create';
import EditStudentNote from '../components/students-area/student-notes/student-note-on-edit';
import StudentNoteDetails from '../components/students-area/student-notes/student-note-details';
import StudentTimeTable from '../components/students-area/student-timetable/student-timetable';
import PrintStudentResult from '../components/students-area/Printing/student-print-result';
import StudentTemplateControl from '../components/students-area/Printing/result-templates/student-template-control';




const StudentDashboardRouter = () => {

    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>
                    {/* dashboard */}
                    <Route exact path="/" component={studentIndex}></Route>
                    <Route path={dashboardLocations.dashboard} exact component={studentIndex} />

                    {/* onlineClass */}
                    <Route path={onlineClassLocations.onlineClass} exact component={OnlineClass} />

                    {/* assessment */}
                    <Route path={assessmentLocations.assessment} exact component={StudentAssessmentList} /> 
                    <Route path={assessmentLocations.assessmentDetails} exact component={StudentAssessmentDetails} />
                    {/* classNote */}
                    <Route path={classNoteLocations.classNotes} exact component={ClassNotes} />
                    <Route path={classNoteLocations.classNotesDetails} exact component={ClassNoteDetails} />

                    {/* studentNote */}
                    <Route path={studentNoteLocations.studentNotes} exact component={StudentNotes} />
                    <Route path={studentNoteLocations.createStudentNotes} exact component={CreateStudentNote} />
                    <Route path={studentNoteLocations.editStudentNotes} exact component={EditStudentNote} />
                    <Route path={studentNoteLocations.studentNotesDetails} exact component={StudentNoteDetails} />

                    {/* announcement */}
                    {/* <Route path={announcementLocations.announcement} exact component={studentIndex} /> */}

                    {/* timeTable */}
                    {/*         <Route path={timeTableLocations.timeTable} exact component={studentIndex} />*/}
                    <Route path={timeTableLocations.timeTable} exact component={StudentTimeTable} />

                    {/* printResult */}
                    <Route path={printResultLocations.printResult} exact component={PrintStudentResult} />
                    <Route path={printResultLocations.resultTemplate} exact component={StudentTemplateControl} />
                    {/* profile */}
                    <Route path={profileLocations.profile} exact component={StudentProfilePage} />
                    <Route path={profileLocations.profileEdit} exact component={StudentProfileEdit} />

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default StudentDashboardRouter;