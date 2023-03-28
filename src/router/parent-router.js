import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ParentAnnouncementDetails from '../components/parent-area/announcement/announcement-details';
import AnnouncementList from '../components/parent-area/announcement/announcement-list';
import ParentAssessmentDetails from '../components/parent-area/assessment/parent-assessment-details';
import ParentAssessmentList from '../components/parent-area/assessment/parent-assessment-list';
import ParentAssessmentView from '../components/parent-area/assessment/parent-assessment-view';
import WardsDetails from '../components/parent-area/my-wards/ward-details';
import WardList from '../components/parent-area/my-wards/wards-list';
import PrintParentResult from '../components/parent-area/print-result/parent-print-result';
import ParentTemplateControl from '../components/parent-area/print-result/result-template/parent-template-control';
import TeachersNote from '../components/parent-area/teachers-note/teachers-note';
import TeachersNoteView from '../components/parent-area/teachers-note/teachers-note-view';
import TeachersNoteDetails from '../components/parent-area/teachers-note/teachers-notes-details';
import ParentClassTimeTable from '../components/parent-area/timetable/parent-class-timetable';
import ParentExamTimeTable from '../components/parent-area/timetable/parent-exam-timetable';
import ParentClassTimeTableActivities from '../components/parent-area/timetable/parent-class-timetable-activities';
import PrintTimeTable from '../components/parent-area/timetable/print-timetable';
import WardsNote from '../components/parent-area/wards-note/ward-note';
import WardsNoteDetails from '../components/parent-area/wards-note/ward-note-details';
import WardsNoteView from '../components/parent-area/wards-note/wards-note-view';
import Protected from '../components/spm-auth/protected';
import parentIndex from '../views/dashboard/parent-index';
import {parentAssessmentLocations,  announcementLocations, dashboardLocations, myWardsLocations, parentTeachersNoteLocations, parentTimeTableLocations, printResultLocations, wardsNoteLocations } from './parents-path-locations';
import ParentExamTimeTableActivities from '../components/parent-area/timetable/parent-exam-timetable-activities';
import CumulativeTimeTable from '../components/parent-area/timetable/parent-cumulative-timetable';


const ParentDashboardRouter = () => {

    return (
        <Protected>
            <TransitionGroup>
                <CSSTransition classNames="fadein" timeout={300}>
                    <Switch>
                        {/* dashboard */}
                        <Route exact path="/" component={parentIndex}></Route>
                        <Route path={dashboardLocations.dashboard} exact component={parentIndex} />

                        {/* timetable */}
                        <Route path={parentTimeTableLocations.parentClassTimeTable} exact component={ParentClassTimeTable} />
                        <Route path={parentTimeTableLocations.parentExamTimeTable} exact component={ParentExamTimeTable} />
                        <Route path={parentTimeTableLocations.parentClassTimetableActivities} exact component={ParentClassTimeTableActivities} />
                        <Route path={parentTimeTableLocations.parentExamTimetableActivities} exact component={ParentExamTimeTableActivities} />
                        <Route path={parentTimeTableLocations.printTimeTable} exact component={PrintTimeTable} />
                        <Route path={parentTimeTableLocations.cumulativeTimeTable} exact component={CumulativeTimeTable} />

                        {/* mywards */}
                        <Route path={myWardsLocations.myWards} exact component={WardList} />
                        <Route path={myWardsLocations.wardsDetails} exact component={WardsDetails} />

                        {/* printResult */}
                        <Route path={printResultLocations.printResult} exact component={PrintParentResult} />
                        <Route path={printResultLocations.resultTemplate} exact component={ParentTemplateControl} />

                        {/* teachersnote */}
                        <Route path={parentTeachersNoteLocations.parentTeachersNote} exact component={TeachersNote} />
                        <Route path={parentTeachersNoteLocations.parentTteachersNotesView} exact component={TeachersNoteView} />
                        <Route path={parentTeachersNoteLocations.parentTeachersNotesDetails} exact component={TeachersNoteDetails} />

                        {/* wardsnote */}
                        <Route path={wardsNoteLocations.wardsNote} exact component={WardsNote} />
                        <Route path={wardsNoteLocations.wardsNotesView} exact component={WardsNoteView} />
                        <Route path={wardsNoteLocations.wardsNotesDetails} exact component={WardsNoteDetails} />

                        {/* announcement */}
                        <Route path={announcementLocations.announcement} exact component={AnnouncementList} />
                        <Route path={announcementLocations.parentannouncementDetails} exact component={ParentAnnouncementDetails} />

                        {/* Assessment */}
                        <Route path={parentAssessmentLocations.parentAssessment} exact component={ParentAssessmentList} />
                        <Route path={parentAssessmentLocations.parentAssessmentView} exact component={ParentAssessmentView} />
                        <Route path={parentAssessmentLocations.parentAssessmentDetails} exact component={ParentAssessmentDetails} />

                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Protected>
    )
}

export default ParentDashboardRouter;