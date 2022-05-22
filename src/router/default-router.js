import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/spm-permissions/role-list';
import RoleEdit from '../components/spm-permissions/role-edit';
import RoleAdd from '../components/spm-permissions/role-add';
import { classLocations, dashboardLocations, permissionLocations, sessionLocations, studentsLocations, staffLocations } from './spm-path-locations';
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
import SessionEdit from '../components/smp-session/SessionEdit';

const DashboardRouter = () => {

    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>
                    {/* dashboard */}
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

                    {/* session */}
                    <Route path={sessionLocations.sessionList} exact component={SessionList} />
                    <Route path={sessionLocations.sessionAdd} exact component={SessionAdd} />
                    <Route path={sessionLocations.sessionEdit} exact component={SessionEdit} />

                    {/* students */}
                    <Route path={studentsLocations.studentList} exact component={StudentList} />
                   <Route path={studentsLocations.studentAdd} exact component={StudentAdd} />
                    <Route path={studentsLocations.studentEdit} exact component={StudentEdit} />
                    <Route path={studentsLocations.studentDetails} exact component={StudentDetails} />

                     {/* staff */}
                     <Route path={staffLocations.staffList} exact component={StaffList} />
                    <Route path={staffLocations.staffAdd} exact component={StaffAdd} />
                    <Route path={staffLocations.staffEdit} exact component={StaffEdit} />

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DashboardRouter;