import React from 'react'
import Index from '../views/dashboard/index'
import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
import studentIndex from '../views/dashboard/student-index';
import { studentsLocations } from './spm-path-locations';



const StudentDashboardRouter = () => {

    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>
                    {/* dashboard */}
                    <Route exact path="/" component={studentIndex}></Route>
                    <Route path={studentsLocations.dashboard} exact component={studentIndex} />

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default StudentDashboardRouter;