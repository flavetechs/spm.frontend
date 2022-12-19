import React, { useState } from 'react'


//router
import { Switch, Route } from 'react-router'
//layoutpages
// import Index from '../views/index'
import Default from '../layouts/dashboard/default'
import Simple from '../layouts/dashboard/simple'
import SignIn from '../components/spm-auth/sign-in'
import { authLocations } from './spm-path-locations'
import { getUserDetails } from '../utils/permissions'
import studentDefault from '../layouts/dashboard/student-default'
import FirstTimeLoginPassswordChange from '../components/spm-auth/change-password-on-login'
import parentDefault from '../layouts/dashboard/parent-default'
import RegistrationSignIn from '../components/spm-auth/registration-sign-in'
import candidateDefault from '../layouts/dashboard/candidate-default'
import { candidateAuthLocation, candidateLocations } from './candidate-path-location'
import CandidateList from '../components/candidate-admission/candidate-list'
import CandidateRegistration from '../components/candidate-admission/candidate-registration'
import CandidateDetails from '../components/candidate-admission/candidate-details'
import ConfirmUserEmail from '../components/candidate-admission/confirm-login-email'

const IndexRouters = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetail, setUserDetail] = useState(null);

    React.useEffect(() => {
        setUserDetail(getUserDetails());
        if (userDetail)
            setIsLoggedIn(true)
    }, [isLoggedIn]);

    return (
        <>
            <Switch>
                {
                    <>
                        <Route exact path="/"
                            component={userDetail?.userType === 'Student' ? studentDefault : userDetail?.userType === "Parent" ? parentDefault : Default}>
                        </Route>

                        <Route path={userDetail?.userType == 'Student' ? '/stds-dashboard' : userDetail?.userType == "Parent" ? "/parent-dashboard" : "/dashboard"}
                            component={userDetail?.userType == 'Student' ? studentDefault : userDetail?.userType == "Parent" ? parentDefault : Default}>
                        </Route>
                        {/* <Route exact path="/"
                            component={userDetail?.userType === 'Student' ? candidateDefault : userDetail?.userType === "Parent" ? parentDefault : Default}>
                        </Route>

                        <Route path={userDetail?.userType == 'Student' ? '/candidates' : userDetail?.userType == "Parent" ? "/parent-dashboard" : "/dashboard"}
                            component={userDetail?.userType == 'Student' ? candidateDefault : userDetail?.userType == "Parent" ? parentDefault : Default}>
                        </Route> */}

                        <Route exact path={candidateAuthLocation.signIn} component={RegistrationSignIn}></Route>
                        <Route exact path={candidateLocations.candidateRegistration} component={CandidateRegistration}></Route>
                        <Route exact path={candidateLocations.candidateList} component={CandidateList}></Route>
                        <Route exact path={candidateLocations.candidateDetails} component={CandidateDetails}></Route>
                        <Route exact path={candidateLocations.candidateAdmissionConfirmation} component={ConfirmUserEmail}></Route>
                        <Route path={authLocations.login} component={SignIn}></Route>

                        <Route path={authLocations.firstTimeLogin} component={FirstTimeLoginPassswordChange}></Route>
                        <Route path="/errors" component={Simple}></Route>
                    </>
                }
            </Switch>
        </>
    )
}

export default IndexRouters
