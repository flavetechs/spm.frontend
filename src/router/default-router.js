import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/teachers-area/spm-permissions/role-list';
import RoleEdit from '../components/teachers-area/spm-permissions/role-edit';
import RoleAdd from '../components/teachers-area/spm-permissions/role-add';
import { classLocations, dashboardLocations, permissionLocations, sessionLocations, studentsLocations, staffLocations, enrollment, gradeSetting, resultManagement, portalSetting, pinManagement, notificationManagement, authLocations, inprogress, pushedNotificationManagement, adminAdmissionLocations } from './spm-path-locations';
import StudentList from '../components/teachers-area/smp-students/student-list';
import StudentAdd from '../components/teachers-area/smp-students/student-add';
import StudentEdit from '../components/teachers-area/smp-students/student-edit';
import StudentDetails from '../components/teachers-area/smp-students/student-details';
import UnenrolledStudentsList from '../components/teachers-area/smp-enrollment/unenrolled-students-list';
import EnrolledStudents from '../components/teachers-area/smp-enrollment/enrolled-student-list';
import StaffDetails from '../components/teachers-area/smp-staff/staff-details';
import PromotionSetup from '../components/teachers-area/smp-session/promotion-list';
import PromotionPassedList from '../components/teachers-area/smp-session/promotion-passed-list';
import PromotionFailedList from '../components/teachers-area/smp-session/promotion-failed-list';
import GradeSetting from '../components/teachers-area/smp-grade-setting/grade-setting';
import ClassSetupAdd from '../components/teachers-area/smp-session/class-setup-add';
import ClassSetupList from '../components/teachers-area/smp-session/class-setup-list';
import ClassSetupEdit from '../components/teachers-area/smp-session/class-setup-edit';
import SubjectSetupList from '../components/teachers-area/smp-session/subject-setup-list';
import SubjectSetupEdit from '../components/teachers-area/smp-session/subject-setup-edit';
import SubjectSetupAdd from '../components/teachers-area/smp-session/subject-setup-add';
import SessionClassList from '../components/teachers-area/smp-session/session-class-list';
import SessionClassEdit from '../components/teachers-area/smp-session/session-class-edit';
import SessionClassAdd from '../components/teachers-area/smp-session/session-class-add';
import SessionClassDetails from '../components/teachers-area/smp-session/session-class-details';
import SessionList from '../components/teachers-area/smp-session/session-list';
import SessionAdd from '../components/teachers-area/smp-session/session-add';
import SessionDetails from '../components/teachers-area/smp-session/session-details';
import StaffList from '../components/teachers-area/smp-staff/staff-list';
import StaffAdd from '../components/teachers-area/smp-staff/staff-add';
import StaffEdit from '../components/teachers-area/smp-staff/staff-edit';
import Setting from '../components/teachers-area/smp-portal-setting/setting';
import Pins from '../components/teachers-area/smp-pin-management/pins';
import UsedPins from '../components/teachers-area/smp-pin-management/used-pins';
import PinDetails from '../components/teachers-area/smp-pin-management/pin-details';
import TemplateSetting from '../components/teachers-area/smp-portal-setting/template-setting';
import UsedPinDetails from '../components/teachers-area/smp-pin-management/used-pin-details';
import AnnouncementList from '../components/teachers-area/smp-notifications/announcement-list';
import AnnouncementDetails from '../components/teachers-area/smp-notifications/announcement-details';
import AnnouncementEdit from '../components/teachers-area/smp-notifications/announcement-edit';
import AddUser from '../components/teachers-area/spm-permissions/role-add-user';
import StaffProfilePage from '../components/teachers-area/smp-user-profile/staff-profile-page';
import RemoveUser from '../components/teachers-area/spm-permissions/role-remove-user';
import HomeAssessmentDetails from '../components/teachers-area/spm-class/assessment/home-assessment-details';
import CreateHomeAssessment from '../components/teachers-area/spm-class/assessment/home-assessment-on-create';
import AssessmentList from '../components/teachers-area/spm-class/assessment/assessment-list';
import EditClassAssessment from '../components/teachers-area/spm-class/assessment/class-assessment-on-edit';
import LessonNotes from '../components/teachers-area/spm-class/lesson-notes/lesson-notes';
import CreateLessonNote from '../components/teachers-area/spm-class/lesson-notes/lesson-note-on-create';
import EditLessonNote from '../components/teachers-area/spm-class/lesson-notes/lesson-note-on-edit';
import LessonNoteDetails from '../components/teachers-area/spm-class/lesson-notes/lesson-note-details';
import StaffProfileEdit from '../components/teachers-area/smp-user-profile/staff-profile-edit';
import SessionClassList2 from '../components/teachers-area/spm-class/session-class-list';
import Attendance from '../components/teachers-area/spm-class/attendance-on-create';
import AttendanceRegisterList from '../components/teachers-area/spm-class/attendance-register-list';
import AttendancePresence from '../components/teachers-area/spm-class/attendance-presence';
import ScoreEntry from '../components/teachers-area/smp-result-management/score-entry';
import PublishResult from '../components/teachers-area/smp-result-management/publish-result-setup';
import AdminScoreEntry from '../components/teachers-area/smp-result-management/admin-score-entry';
import MasterList from '../components/teachers-area/smp-result-management/master-list';
import PublishResultEdit from '../components/teachers-area/smp-result-management/publish-result-edit';
import CumulativeMasterList from '../components/teachers-area/smp-result-management/cumulative-master-list';
import PrintResult from '../components/teachers-area/smp-result-management/print-result';
import ClassGroup from '../components/teachers-area/spm-class/class-group/class-group-list';
import AddClassGroup from '../components/teachers-area/spm-class/class-group/add-class-group';
import EditClassGroup from '../components/teachers-area/spm-class/class-group/edit-class-group';
import UpdateAttendance from '../components/teachers-area/spm-class/attendance-on-update';
import CreateAttendance from '../components/teachers-area/spm-class/attendance-on-create';
import ViewStudentsAssessment from '../components/teachers-area/spm-class/assessment/view-students-assessment';
import EditHomeAssessment from '../components/teachers-area/spm-class/assessment/home-assessment-on-edit';
import TemplateControl from '../components/teachers-area/smp-result-management/result-templates/template-control';
import PublishResultTable from '../components/teachers-area/smp-result-management/publish-result-table';
import ClassTimeTable from '../components/teachers-area/spm-class/time-table/class-timetable';
import InProgress from '../components/teachers-area/in-progress';
import StudentNoteDetails from '../components/teachers-area/spm-class/student-notes/student-note-details';
import StudentNotes from '../components/teachers-area/spm-class/student-notes/student-notes';
import ClassAssessmentDetails from '../components/teachers-area/spm-class/assessment/class-assessment-details';
import ScoreEntryTable from '../components/teachers-area/smp-result-management/score-entry-small-table';
import AdminScoreEntryTable from '../components/teachers-area/smp-result-management/admin-score-entry-small-table';
import BatchPrintPreview from '../components/teachers-area/smp-result-management/print-result-by-batch-preview';
import ScoreRecord from '../components/teachers-area/spm-class/assessment/assessment-score-record';
import ScoreRecordDetails from '../components/teachers-area/spm-class/assessment/assessment-score-record-details';
import PublishedClassList from '../components/teachers-area/smp-result-management/published-classes-result';
import Protected from '../components/spm-auth/protected';
import PrintTimeTable from '../components/teachers-area/spm-class/time-table/printTimetable';
import MakeAnnouncement from '../components/teachers-area/smp-notifications/make-announcement';
import PushedNotificationDetail from '../components/partials/dashboard/HeaderStyle/pushed-notification-details';
import SessionClassTableEdit from '../components/teachers-area/smp-session/session-class-edit-table';
import SessionClassTableAdd from '../components/teachers-area/smp-session/session-class-add-table';
import AdmissionList from '../components/teachers-area/smp-admission/admission-setup';
import AdmissionDetail from '../components/teachers-area/smp-admission/admission-detail';
import ViewCandidateAnswers from '../components/teachers-area/smp-admission/view-candidate-answers';
import CBTAssessmentList from '../components/teachers-area/spm-class/assessment/cbt-assessment-list';
import settingoffcanvas from '../components/partials/components/settingoffcanvas';

const DashboardRouter = () => {

    return (
        <Protected>
            <TransitionGroup>
                <CSSTransition classNames="fadein" timeout={300}>
                    <Switch>
                        {/* dashboard */}
                        <Route exact path="/" component={Index}></Route>
                        <Route path={dashboardLocations.dashboard} exact component={Index} />

                        {/* permissions */}
                        <Route path={permissionLocations.roleList} exact component={RoleList} />
                        <Route path={permissionLocations.roleEdit} exact component={RoleEdit} />
                        <Route path={permissionLocations.roleAdd} exact component={RoleAdd} />
                        <Route path={permissionLocations.addUser} exact component={AddUser} />
                        <Route path={permissionLocations.removeUser} exact component={RemoveUser} />

                        {/* class */}
                        <Route path={classLocations.sessionClassList2} exact component={SessionClassList2} />
                        <Route path={classLocations.updateClassAttendance} exact component={UpdateAttendance} />
                        <Route path={classLocations.createClassAttendance} exact component={CreateAttendance} />
                        <Route path={classLocations.classAttendanceBoard} exact component={AttendanceRegisterList} />
                        <Route path={classLocations.attendancePresence} exact component={AttendancePresence} />
                        <Route path={classLocations.assessment} exact component={AssessmentList} />
                        <Route path={classLocations.createHomeAssessment} exact component={CreateHomeAssessment} />
                        <Route path={classLocations.editHomeAssessment} exact component={EditHomeAssessment} />
                        <Route path={classLocations.editClassAssessment} exact component={EditClassAssessment} />
                        <Route path={classLocations.homeAssessmentDetails} exact component={HomeAssessmentDetails} />
                        <Route path={classLocations.classAssessmentDetails} exact component={ClassAssessmentDetails} />
                        <Route path={classLocations.viewStudentsHomeAssessment} exact component={ViewStudentsAssessment} />
                        <Route path={classLocations.lessonNotes} exact component={LessonNotes} />
                        <Route path={classLocations.createLessonNotes} exact component={CreateLessonNote} />
                        <Route path={classLocations.editLessonNotes} exact component={EditLessonNote} />
                        <Route path={classLocations.lessonNotesDetails} exact component={LessonNoteDetails} />
                        <Route path={classLocations.studentNotes} exact component={StudentNotes} />
                        <Route path={classLocations.studentNotesDetails} exact component={StudentNoteDetails} />
                        <Route path={classLocations.classTimeTable} exact component={ClassTimeTable} />
                        <Route path={classLocations.printTimeTable} exact component={PrintTimeTable} />
                        <Route path={classLocations.scoreRecord} exact component={ScoreRecord} />
                        <Route path={classLocations.scoreRecordDetails} exact component={ScoreRecordDetails} />
                        <Route path={classLocations.cbtAssessmentList} exact component={CBTAssessmentList} />


                        <Route path={classLocations.classGroup} exact component={ClassGroup} />
                        <Route path={classLocations.addClassGroup} exact component={AddClassGroup} />
                        <Route path={classLocations.editClassGroup} exact component={EditClassGroup} />
                        {/* session */}
                        <Route path={sessionLocations.sessionList} exact component={SessionList} />
                        <Route path={sessionLocations.sessionAdd} exact component={SessionAdd} />
                        <Route path={sessionLocations.sessionDetails} exact component={SessionDetails} />
                        <Route path={sessionLocations.classSetupList} exact component={ClassSetupList} />
                        <Route path={sessionLocations.classSetupAdd} exact component={ClassSetupAdd} />
                        <Route path={sessionLocations.classSetupEdit} exact component={ClassSetupEdit} />
                        <Route path={sessionLocations.subjectSetupList} exact component={SubjectSetupList} />
                        <Route path={sessionLocations.editSubjectSetup} exact component={SubjectSetupEdit} />
                        <Route path={sessionLocations.addSubjectSetup} exact component={SubjectSetupAdd} />
                        <Route path={sessionLocations.sessionClassList} exact component={SessionClassList} />
                        <Route path={sessionLocations.sessionClassEdit} exact component={SessionClassEdit} />
                        <Route path={sessionLocations.sessionClassAdd} exact component={SessionClassAdd} />
                        <Route path={sessionLocations.sessionClassTableEdit} exact component={SessionClassTableEdit} />
                        <Route path={sessionLocations.sessionClassTableAdd} exact component={SessionClassTableAdd} />
                        <Route path={sessionLocations.sessionClassDetail} exact component={SessionClassDetails} />
                        <Route path={sessionLocations.promotionSetup} exact component={PromotionSetup} />
                        <Route path={sessionLocations.promotionPassedList} exact component={PromotionPassedList} />
                        <Route path={sessionLocations.promotionFailedList} exact component={PromotionFailedList} />

                        {/* students */}
                        <Route path={studentsLocations.studentList} exact component={StudentList} />
                        <Route path={studentsLocations.studentAdd} exact component={StudentAdd} />
                        <Route path={studentsLocations.studentEdit} exact component={StudentEdit} />
                        <Route path={studentsLocations.studentDetails} exact component={StudentDetails} />

                        {/* staff */}
                        <Route path={staffLocations.staffList} exact component={StaffList} />
                        <Route path={staffLocations.staffAdd} exact component={StaffAdd} />
                        <Route path={staffLocations.staffEdit} exact component={StaffEdit} />
                        <Route path={staffLocations.staffDetails} exact component={StaffDetails} />

                        {/* enrollment */}
                        <Route path={studentsLocations.unenrolledStudents} exact component={UnenrolledStudentsList} />
                        <Route path={studentsLocations.enrolledStudents} exact component={EnrolledStudents} />


                        {/* Pin Management */}
                        <Route path={pinManagement.pins} exact component={Pins} />
                        <Route path={pinManagement.usedPins} exact component={UsedPins} />
                        <Route path={pinManagement.pinDetails} exact component={PinDetails} />
                        <Route path={pinManagement.usedPinDetails} exact component={UsedPinDetails} />

                        {/* Grade Setting */}
                        <Route path={gradeSetting.setting} exact component={GradeSetting} />

                        {/* resultManagement */}
                        <Route path={resultManagement.scoreEntry} exact component={ScoreEntry} />
                        <Route path={resultManagement.scoreEntryTable} exact component={ScoreEntryTable} />
                        <Route path={resultManagement.publishResult} exact component={PublishResult} />
                        <Route path={resultManagement.publishedClassList} exact component={PublishedClassList} />
                        <Route path={resultManagement.adminScoreEntry} exact component={AdminScoreEntry} />
                        <Route path={resultManagement.adminScoreEntryTable} exact component={AdminScoreEntryTable} />
                        <Route path={resultManagement.masterList} exact component={MasterList} />
                        <Route path={resultManagement.publishResultEdit} exact component={PublishResultEdit} />
                        <Route path={resultManagement.publishResultTable} exact component={PublishResultTable} />
                        <Route path={resultManagement.cumulativeMasterList} exact component={CumulativeMasterList} />
                        <Route path={portalSetting.templateSetting} exact component={TemplateSetting} />
                        <Route path={resultManagement.printResult} exact component={PrintResult} />
                        <Route path={resultManagement.batchPrintPreview} exact component={BatchPrintPreview} />
                        <Route path={resultManagement.resultTemplate} exact component={TemplateControl} />

                        {/* portal setting */}
                        <Route path={portalSetting.setting} exact component={Setting} />
                        <Route path={portalSetting.theme} exact component={settingoffcanvas} />

                        {/* notificationManagement */}
                        <Route path={notificationManagement.announcement} exact component={AnnouncementList} />
                        <Route path={notificationManagement.makeAnnouncement} exact component={MakeAnnouncement} />
                        <Route path={notificationManagement.announcementDetails} exact component={AnnouncementDetails} />
                        <Route path={notificationManagement.announcementEdit} exact component={AnnouncementEdit} />

                        {/* pushedNotification */}
                        <Route path={pushedNotificationManagement.pushedNotificationDetails} exact component={PushedNotificationDetail} />

                        {/* user profile page */}
                        <Route path={authLocations.staffProfilePage} exact component={StaffProfilePage} />
                        <Route path={authLocations.staffProfileEdit} exact component={StaffProfileEdit} />

                        {/* admin admission */}
                        <Route path={adminAdmissionLocations.adminAdmissionList} exact component={AdmissionList} />
                        <Route path={adminAdmissionLocations.adminAdmissionDetail} exact component={AdmissionDetail} />
                        <Route path={adminAdmissionLocations.viewCandidateAnswers} exact component={ViewCandidateAnswers} />

                        {/* user profile page */}
                        <Route path={inprogress.unactivated} exact component={InProgress} />

                        {/* admission */}
                        {/* <Route path={admissionLocations.admissionRegistration} exact component={AdmissionRegistration} />
                        <Route path={admissionLocations.admissionRegistrationInformation} exact component={AdmissionInformation} />
                        <Route path={admissionLocations.admissionBoard} exact component={AdmissionBoard} /> */}

                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Protected>
    )
}

export default DashboardRouter;