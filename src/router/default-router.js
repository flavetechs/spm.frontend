import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/spm-permissions/role-list';
import RoleEdit from '../components/spm-permissions/role-edit';
import RoleAdd from '../components/spm-permissions/role-add';
import { classLocations, dashboardLocations, permissionLocations, sessionLocations } from './spm-path-locations';
import ClassSetList from '../components/spm-class/class-setup-list';
import ClassSetupAdd from '../components/spm-class/class-setup-add';
import ClassSetupEdit from '../components/spm-class/class-setup-edit';
import SubjectSetupList from '../components/spm-class/subject-setup-list';
import SubjectSetupEdit from '../components/spm-class/subject-setup-edit';
import SubjectSetupAdd from '../components/spm-class/subject-setup-add';
import SessionList from '../components/smp-session/SessionList';
import SessionAdd from '../components/smp-session/SessionAdd';

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
                

                    {/* session */}
                    <Route path={sessionLocations.sessionList} exact component={SessionList} />
                    <Route path={sessionLocations.sessionAdd} exact component={SessionAdd} />
                    {/* <Route path={permissionLocations.roleAdd} exact component={RoleAdd} /> */}

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DashboardRouter;
