import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
import studentIndex from '../views/dashboard/student-index';
import { studentAnnouncementLocations, studentAssessmentLocations, studentClassNoteLocations, studentDashboardLocations, onlineClassLocations, studentPrintResultLocations, studentProfileLocations, studentResetPasswordLocations, studentNoteLocations, studentTimeTableLocations } from './students-path-locations';
import OnlineClass from '../components/students-area/class/online-class';
import StudentProfileEdit from '../components/students-area/user-profile/student-profile-edit';
import StudentAssessmentList from '../components/students-area/assessment/assessment-list';
import StudentAssessmentDetails from '../components/students-area/assessment/assessment-details';
import ClassNotes from '../components/students-area/class-notes/class-notes';
import ClassNoteDetails from '../components/students-area/class-notes/class-note-details';
import StudentNotes from '../components/students-area/student-notes/student-notes';
import CreateStudentNote from '../components/students-area/student-notes/student-note-on-create';
import EditStudentNote from '../components/students-area/student-notes/student-note-on-edit';
import StudentNoteDetails from '../components/students-area/student-notes/student-note-details';
import StudentClassTimeTable from '../components/students-area/student-timetable/student-class-timetable';
import PrintStudentResult from '../components/students-area/Printing/student-print-result';
import StudentTemplateControl from '../components/students-area/Printing/result-templates/student-template-control';
import StudentAnnouncement from '../components/students-area/announcement/student-announcement-list';
import StudentAnnouncementDetails from '../components/students-area/announcement/student-announcement-details';
import Protected from '../components/spm-auth/protected';
import PrintTimeTable from '../components/students-area/student-timetable/print-timetable';
import StudentProfilePage from '../components/students-area/user-profile/student-profile-page';
import StudentExamTimeTable from '../components/students-area/student-timetable/student-exam-timetable';
import CumulativeTimeTable from '../components/students-area/student-timetable/cumulative-timetable';
import ResetPassword from '../components/spm-auth/reset-password';




const StudentDashboardRouter = () => {

    return (
        <Protected>
            <TransitionGroup>
                <CSSTransition classNames="fadein" timeout={300}>
                    <Switch>
                        {/* dashboard */}
                        <Route exact path="/" component={studentIndex}></Route>
                        <Route path={studentDashboardLocations.dashboard} exact component={studentIndex} />

                        {/* onlineClass */}
                        <Route path={onlineClassLocations.onlineClass} exact component={OnlineClass} />

                        {/* assessment */}
                        <Route path={studentAssessmentLocations.assessment} exact component={StudentAssessmentList} />
                        <Route path={studentAssessmentLocations.assessmentDetails} exact component={StudentAssessmentDetails} />
                        {/* classNote */}
                        <Route path={studentClassNoteLocations.classNotes} exact component={ClassNotes} />
                        <Route path={studentClassNoteLocations.classNotesDetails} exact component={ClassNoteDetails} />

                        {/* studentNote */}
                        <Route path={studentNoteLocations.studentNotes} exact component={StudentNotes} />
                        <Route path={studentNoteLocations.createStudentNotes} exact component={CreateStudentNote} />
                        <Route path={studentNoteLocations.editStudentNotes} exact component={EditStudentNote} />
                        <Route path={studentNoteLocations.studentNotesDetails} exact component={StudentNoteDetails} />

                        {/* announcement */}
                        {/* <Route path={announcementLocations.announcement} exact component={studentIndex} /> */}
                        <Route path={studentAnnouncementLocations.announcement} exact component={StudentAnnouncement} />
                        <Route path={studentAnnouncementLocations.studentAnnouncementDetails} exact component={StudentAnnouncementDetails} />

                        {/* timeTable */}
                        {/*         <Route path={timeTableLocations.timeTable} exact component={studentIndex} />*/}
                        <Route path={studentTimeTableLocations.classTimeTable} exact component={StudentClassTimeTable} />
                        <Route path={studentTimeTableLocations.examTimeTable} exact component={StudentExamTimeTable} />
                        <Route path={studentTimeTableLocations.printTimeTable} exact component={PrintTimeTable} />
                        <Route path={studentTimeTableLocations.cumulativeTimeTable} exact component={CumulativeTimeTable} />

                        {/* printResult */}
                        <Route path={studentPrintResultLocations.printResult} exact component={PrintStudentResult} />
                        <Route path={studentPrintResultLocations.resultTemplate} exact component={StudentTemplateControl} />
                        {/* profile */}
                        <Route path={studentProfileLocations.profile} exact component={StudentProfilePage} />
                        <Route path={studentProfileLocations.profileEdit} exact component={StudentProfileEdit} />
                      {/* resetPassword */}
                        <Route path={studentResetPasswordLocations.resetPassword} exact component={ResetPassword} />
                        
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Protected>
    )
}

export default StudentDashboardRouter;