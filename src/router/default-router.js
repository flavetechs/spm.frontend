import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
//admin
import RoleList from '../components/spm-permissions/role-list';
import RoleEdit from '../components/spm-permissions/role-edit';
<<<<<<< HEAD
=======
import RoleAdd from '../components/spm-permissions/role-add';
>>>>>>> 2908d646c067a96a3454e2bd391dc0ba485029ec
import { dashboardLocations, permissionLocations } from './spm-path-locations';

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
<<<<<<< HEAD
=======
                    <Route path={permissionLocations.roleAdd} exact component={RoleAdd} />
>>>>>>> 2908d646c067a96a3454e2bd391dc0ba485029ec
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default DashboardRouter;
