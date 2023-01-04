import { Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import CandidateList from '../components/teachers-area/smp-admission/candidate-list';
import CandidateRegistration from '../components/teachers-area/smp-admission/candidate-registration';
import { candidateLocations } from './candidate-path-location';

const CandidateDashboardRouter = () => {

    return (
        <TransitionGroup>
            <CSSTransition classNames="fadein" timeout={300}>
                <Switch>
                    <Route exact path="/" component={CandidateList}></Route>
                    <Route path={candidateLocations.candidateList} exact component={CandidateList} />

                    <Route path={candidateLocations.candidateRegistration} exact component={CandidateRegistration} />

                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default CandidateDashboardRouter;