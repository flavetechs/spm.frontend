import { Switch, Route } from 'react-router-dom'
//TransitionGroup
import { TransitionGroup, CSSTransition } from "react-transition-group";
import studentIndex from '../views/dashboard/student-index';
import { announcementLocations, assessmentLocations, classNoteLocations, dashboardLocations, onlineClassLocations, printResultLocations, profileLocations, studentNoteLocations, timeTableLocations } from './students-path-locations';
import Protected from '../components/spm-auth/protected';
import candidateIndex from '../views/dashboard/candidate-index';
import CandidateList from '../components/teachers-area/smp-admission/candidate-list';
import CandidateRegistration from '../components/teachers-area/smp-admission/candidate-registration';
import { candidateLocations } from './candidate-path-location';




const CandidateDashboardRouter = () => {

    return (
        // <Protected>
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>
                    {/* dashboard */}
                    <Route exact path="/" component={CandidateList}></Route>
                    <Route path={candidateLocations.candidateList} exact component={CandidateList} />

                    
                    {/* <Route exact path="/" component={candidateIndex}></Route>
                    <Route path={dashboardLocations.dashboard} exact component={candidateIndex} /> */}

                    {/* onlineClass */}
                    <Route path={candidateLocations.candidateRegistration} exact component={CandidateRegistration} />

                    {/* assessment */}

                </Switch>
            </CSSTransition>
        </TransitionGroup>
        // </Protected>
    )
}

export default CandidateDashboardRouter;