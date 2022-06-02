import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/spm-permissions/role-list';
import RoleEdit from '../components/spm-permissions/role-edit';
import RoleAdd from '../components/spm-permissions/role-add';
import { classLocations, dashboardLocations, permissionLocations, sessionLocations, studentsLocations, staffLocations, enrollment } from './spm-path-locations';
import ClassSetList from '../components/spm-class/class-setup-list';
import ClassSetupAdd from '../components/spm-class/class-setup-add';
import ClassSetupEdit from '../components/spm-class/class-setup-edit';
import SubjectSetupList from '../components/spm-class/subject-setup-list';
import SubjectSetupEdit from '../components/spm-class/subject-setup-edit';
import SubjectSetupAdd from '../components/spm-class/subject-setup-add';
import SessionClassList from '../components/spm-class/session-class-list';
import SessionClassEdit from '../components/spm-class/session-class-edit';
import SessionClassAdd from '../components/spm-class/session-class-add';
import SessionList from '../components/smp-session/SessionList';
import SessionAdd from '../components/smp-session/SessionAdd';
import StaffList from '../components/smp-staff/StaffList';
import StaffAdd from '../components/smp-staff/StaffAdd';
import StaffEdit from '../components/smp-staff/StaffEdit';
import StudentList from '../components/smp-students/student-list';
import StudentAdd from '../components/smp-students/student-add';
import StudentEdit from '../components/smp-students/student-edit';
import StudentDetails from '../components/smp-students/student-details';
import SessionDetails from '../components/smp-session/SessionDetails';
import SessionEdit from '../components/smp-session/SessionEdit';
import SessionClassDetails from '../components/spm-class/session-class-details';
import UnenrolledStudentsList from '../components/smp-enrollment/unenrolled-students-list';
import EnrolledStudents from '../components/smp-enrollment/enrolled-student-list';
import StaffDetails from '../components/smp-staff/StaffDetails';
import PromotionSetup from '../components/smp-session/PromotionSetup';
import PromotionPassedList from '../components/smp-session/PromotionPassedList';
import PromotionFailedList from '../components/smp-session/PromotionFailedList';

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
                    <Route path={classLocations.classSetupList} exact component={ClassSetList} />
                    <Route path={classLocations.classSetupAdd} exact component={ClassSetupAdd} />
                    <Route path={classLocations.classSetupEdit} exact component={ClassSetupEdit} />
                    <Route path={ classLocations.subjectSetupList} exact component={SubjectSetupList} />
                   <Route path={classLocations.editSubjectSetup} exact component={SubjectSetupEdit} />
                    <Route path={classLocations.addSubjectSetup} exact component={SubjectSetupAdd} />
                    <Route path={ classLocations.sessionClassList} exact component={SessionClassList} />
                   <Route path={classLocations.sessionClassEdit} exact component={SessionClassEdit} />
                    <Route path={classLocations.sessionClassAdd} exact component={SessionClassAdd} />
                    <Route path={classLocations.sessionClassDetail} exact component={SessionClassDetails} />

                    {/* session */}
                    <Route path={sessionLocations.sessionList} exact component={SessionList} />
                    <Route path={sessionLocations.sessionAdd} exact component={SessionAdd} />
                    {/* <Route path={sessionLocations.sessionEdit} exact component={SessionEdit} /> */}
                    <Route path={sessionLocations.sessionDetails} exact component={SessionDetails} />

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

                     {/* {promotioon} */}
                     <Route path={sessionLocations.promotionSetup} exact component={PromotionSetup} />
                     <Route path={sessionLocations.promotionPassedList} exact component={PromotionPassedList} />
                     <Route path={sessionLocations.promotionFailedList} exact component={PromotionFailedList} />

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DashboardRouter;