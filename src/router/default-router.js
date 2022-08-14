import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/teachers-area/spm-permissions/role-list';
import RoleEdit from '../components/teachers-area/spm-permissions/role-edit';
import RoleAdd from '../components/teachers-area/spm-permissions/role-add';
import { classLocations, dashboardLocations, permissionLocations, sessionLocations, studentsLocations, staffLocations, enrollment, gradeSetting, resultManagement, portalSetting, pinManagement, notificationManagement, authLocations } from './spm-path-locations';
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
import MakeAnnouncement from '../components/teachers-area/smp-notifications/make-announcement';
import AnnouncementDetails from '../components/teachers-area/smp-notifications/announcement-details';
import AnnouncementEdit from '../components/teachers-area/smp-notifications/announcement-edit';
import AddUser from '../components/teachers-area/spm-permissions/role-add-user';
import StaffProfilePage from '../components/teachers-area/smp-user-profile/staff-profile-page';
import RemoveUser from '../components/teachers-area/spm-permissions/role-remove-user';
import AssignmentDetails from '../components/teachers-area/spm-class/assignment/assignment-details';
import CreateAssignment from '../components/teachers-area/spm-class/assignment/assignment-on-create';
import AssignmentList from '../components/teachers-area/spm-class/assignment/assignment-list';
import EditAssignment from '../components/teachers-area/spm-class/assignment/assignment-on-edit';
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

const DashboardRouter = () => {

    return (
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
                    <Route path={classLocations.classAttendance} exact component={Attendance} />
                    <Route path={classLocations.classAttendanceBoard} exact component={AttendanceRegisterList} />
                    <Route path={classLocations.attendancePresence} exact component={AttendancePresence} />
                    <Route path={classLocations.assignment} exact component={AssignmentList} />
                    <Route path={classLocations.createAssignment} exact component={CreateAssignment} />
                    <Route path={classLocations.editAssignment} exact component={EditAssignment} />
                    <Route path={classLocations.assignmentDetails} exact component={AssignmentDetails} />
                    <Route path={classLocations.lessonNotes} exact component={LessonNotes} />
                    <Route path={classLocations.createLessonNotes} exact component={CreateLessonNote} />
                    <Route path={classLocations.editLessonNotes} exact component={EditLessonNote} />
                    <Route path={classLocations.lessonNotesDetails} exact component={LessonNoteDetails} />
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
                      <Route path={resultManagement.publishResult} exact component={PublishResult} />
                      <Route path={resultManagement.adminScoreEntry} exact component={AdminScoreEntry} />
                      <Route path={resultManagement.masterList} exact component={MasterList} />
                      <Route path={resultManagement.publishResultEdit} exact component={PublishResultEdit} />
                      <Route path={resultManagement.cumulativeMasterList} exact component={CumulativeMasterList} />
                      <Route path={portalSetting.templateSetting} exact component={TemplateSetting} />
                      <Route path={resultManagement.printResult} exact component={PrintResult} />
                      {/* <Route path={resultManagement.resultTemplate} exact component={TemplateControl} /> */}

                      {/* portal setting */}
                      <Route path={portalSetting.setting} exact component={Setting} />

                       {/* notificationManagement */}
                      <Route path={notificationManagement.announcement} exact component={AnnouncementList} />
                      <Route path={notificationManagement.makeAnnouncement} exact component={MakeAnnouncement} />
                      <Route path={notificationManagement.announcementDetails} exact component={AnnouncementDetails} />
                      <Route path={notificationManagement.announcementEdit} exact component={AnnouncementEdit} />

                      {/* user profile page */}
                      <Route path={authLocations.staffProfilePage} exact component={StaffProfilePage} />
                      <Route path={authLocations.staffProfileEdit} exact component={StaffProfileEdit} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DashboardRouter;