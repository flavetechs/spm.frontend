import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/spm-permissions/role-list';
import RoleEdit from '../components/spm-permissions/role-edit';
import RoleAdd from '../components/spm-permissions/role-add';
import { dashboardLocations, permissionLocations, classLocations } from './spm-path-locations';
import SubjectSetupList from '../components/spm-class/subject-setup-list';


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
                     {/* <Route path={classLocations.classSetupList} exact component={ClassSetupList} />*/}
                    <Route path={ classLocations.subjectSetupList} exact component={SubjectSetupList} />
                   {/* <Route path={classLocations.editSubjectSetup} exact component={EditSubjectSetup} />*/}
                    {/*<Route path={classLocations.addSubjectSetup} exact component={AddSubjectSetup} />*/}
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DashboardRouter;
