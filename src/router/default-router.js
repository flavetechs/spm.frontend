import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/spm-permissions/role-list';
import RoleEdit from '../components/spm-permissions/role-edit';
import RoleAdd from '../components/spm-permissions/role-add';
import { classLocations, dashboardLocations, permissionLocations, sessionLocations, studentsLocations, staffLocations, enrollment, gradeSetting, resultManagement } from './spm-path-locations';
import StudentList from '../components/smp-students/student-list';
import StudentAdd from '../components/smp-students/student-add';
import StudentEdit from '../components/smp-students/student-edit';
import StudentDetails from '../components/smp-students/student-details';
import UnenrolledStudentsList from '../components/smp-enrollment/unenrolled-students-list';
import EnrolledStudents from '../components/smp-enrollment/enrolled-student-list';
import StaffDetails from '../components/smp-staff/staff-details';
import PromotionSetup from '../components/smp-session/promotion-list';
import PromotionPassedList from '../components/smp-session/promotion-passed-list';
import PromotionFailedList from '../components/smp-session/promotion-failed-list';
import GradeSetting from '../components/smp-grade-setting/grade-setting';
import ScoreEntry from '../components/smp-result-management/score-entry';
import ClassSetupAdd from '../components/smp-session/class-setup-add';
import ClassSetupList from '../components/smp-session/class-setup-list';
import ClassSetupEdit from '../components/smp-session/class-setup-edit';
import SubjectSetupList from '../components/smp-session/subject-setup-list';
import SubjectSetupEdit from '../components/smp-session/subject-setup-edit';
import SubjectSetupAdd from '../components/smp-session/subject-setup-add';
import SessionClassList from '../components/smp-session/session-class-list';
import SessionClassEdit from '../components/smp-session/session-class-edit';
import SessionClassAdd from '../components/smp-session/session-class-add';
import SessionClassDetails from '../components/smp-session/session-class-details';
import SessionClassList2 from '../components/spm-class/session-class-list';
import SessionList from '../components/smp-session/session-list';
import SessionAdd from '../components/smp-session/session-add';
import SessionDetails from '../components/smp-session/session-details';
import StaffList from '../components/smp-staff/staff-list';
import StaffAdd from '../components/smp-staff/staff-add';
import StaffEdit from '../components/smp-staff/staff-edit';
import PublishResult from '../components/smp-result-management/publish-result-setup';
import AdminScoreEntry from '../components/smp-result-management/admin-score-entry';
import MasterList from '../components/smp-result-management/master-list';

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

                    {/* class */}
                    <Route path={classLocations.sessionClassList2} exact component={SessionClassList2} />
                
                    {/* session */}
                    <Route path={sessionLocations.sessionList} exact component={SessionList} />
                    <Route path={sessionLocations.sessionAdd} exact component={SessionAdd} />
                    {/* <Route path={sessionLocations.sessionEdit} exact component={SessionEdit} /> */}
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
                     <Route path={enrollment.unenrolledStudents} exact component={UnenrolledStudentsList} />
                     <Route path={enrollment.enrolledStudents} exact component={EnrolledStudents} />

                      {/* Grade Setting */}
                      <Route path={gradeSetting.setting} exact component={GradeSetting} />

                      {/* resultManagement */}
                      <Route path={resultManagement.scoreEntry} exact component={ScoreEntry} />
                      <Route path={resultManagement.publishResult} exact component={PublishResult} />
                      <Route path={resultManagement.adminScoreEntry} exact component={AdminScoreEntry} />
                      <Route path={resultManagement.masterList} exact component={MasterList} />

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DashboardRouter;