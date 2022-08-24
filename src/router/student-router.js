import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
import studentIndex from '../views/dashboard/student-index';
import { assessmentLocations, dashboardLocations, lessonNoteLocations, onlineClassLocations, profileLocations } from './students-path-locations';
import CreateLessonNote from '../components/students-area/lesson-notes/lesson-note-on-create';
import EditLessonNote from '../components/students-area/lesson-notes/lesson-note-on-edit';
import LessonNoteDetails from '../components/students-area/lesson-notes/lesson-note-details';
import LessonNotes from '../components/students-area/lesson-notes/lesson-notes';
import OnlineClass from '../components/students-area/class/online-class';

import StudentProfilePage from '../components/students-area/user-profile/student-profile-page';
import StudentProfileEdit from '../components/students-area/user-profile/student-profile-edit';
import StudentAssessmentList from '../components/students-area/class/assessment/assessment-list';
import StudentAssessmentDetails from '../components/students-area/class/assessment/assessment-details';



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
                    {/* lessonNote */}
                    <Route path={lessonNoteLocations.lessonNotes} exact component={LessonNotes} />
                    <Route path={lessonNoteLocations.createLessonNotes} exact component={CreateLessonNote} />
                    <Route path={lessonNoteLocations.editLessonNotes} exact component={EditLessonNote} />
                    <Route path={lessonNoteLocations.lessonNotesDetails} exact component={LessonNoteDetails} />

                    {/* announcement */}
                    {/* <Route path={announcementLocations.announcement} exact component={studentIndex} /> */}

                    {/* timeTable */}
                    {/*         <Route path={timeTableLocations.timeTable} exact component={studentIndex} />*/}

                    {/* printResult */}
                    {/* <Route path={printResultLocations.printResult} exact component={studentIndex} /> */}

                    {/* profile */}
                    <Route path={profileLocations.profile} exact component={StudentProfilePage} />
                    <Route path={profileLocations.profileEdit} exact component={StudentProfileEdit} />

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default StudentDashboardRouter;