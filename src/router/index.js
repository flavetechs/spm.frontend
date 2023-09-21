import React, { useState } from 'react'


//router
import { Switch, Route } from 'react-router'
//layoutpages
// import Index from '../views/index'
import Default from '../layouts/dashboard/default'
import Simple from '../layouts/dashboard/simple'
import SignIn from '../components/spm-auth/sign-in'
import { authLocations} from './spm-path-locations'
import { getUserDetails } from '../utils/permissions'
import studentDefault from '../layouts/dashboard/student-default'
import FirstTimeLoginPassswordChange from '../components/spm-auth/change-password-on-login'
import parentDefault from '../layouts/dashboard/parent-default'
import RegistrationSignUp from '../components/spm-auth/parent-guardian-registration'
import { candidateAuthLocation, candidateLocations } from './candidate-path-location'
import CandidateList from '../components/candidate-admission/admission-list'
import CandidateRegistration from '../components/candidate-admission/candidate-registration'
import CandidateDetails from '../components/candidate-admission/admission-details'
import ConfirmUserEmail from '../components/candidate-admission/confirm-login-email'
import RegistrationEmailReceived from '../components/candidate-admission/registration-email-received-notification'
import CandidateEdit from '../components/candidate-admission/admission-edit'
import ForgottenPassword from '../components/spm-auth/forgotten-password'
import PasswordReset from '../components/spm-auth/PasswordReset'
import PasswordResetSuccessful from '../components/spm-auth/password-reset-successful'
import PageNotFound from '../components/spm-auth/page-not-found'
import { getAppLayout } from '../store/actions/portal-setting-action'
import { connect } from 'react-redux'
import { ServiceURLs } from '../utils/other'
import RegistrationSignIn from '../components/spm-auth/parent-guardian-login'

const IndexRouters = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetail, setUserDetail] = useState(null);


    const schoolUrl = ServiceURLs.GetAppUrl();
    React.useEffect(() => {
        props.getAppLayout(schoolUrl).then(res => {
            return res;
        })
    }, [schoolUrl])


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

                        <Route path={userDetail?.userType == 'Student' ? '/stds-dashboard/' : userDetail?.userType == "Parent" ? "/parent-dashboard/" : "/dashboard/"}
                            component={userDetail?.userType == 'Student' ? studentDefault : userDetail?.userType == "Parent" ? parentDefault : Default}>
                        </Route>


                        <Route exact path={candidateAuthLocation.signUp} component={RegistrationSignUp}></Route>
                        <Route exact path={candidateAuthLocation.signIn} component={RegistrationSignIn}></Route>
                        <Route exact path={candidateLocations.candidateRegistration} component={CandidateRegistration}></Route>
                        <Route exact path={candidateLocations.candidateEdit} component={CandidateEdit}></Route>
                        <Route exact path={candidateLocations.candidateList} component={CandidateList}></Route>
                        <Route exact path={candidateLocations.candidateDetails} component={CandidateDetails}></Route>
                        <Route exact path={candidateLocations.candidateAdmissionConfirmation} component={ConfirmUserEmail}></Route>
                        <Route exact path={candidateLocations.registrationEmailReceived} component={RegistrationEmailReceived}></Route>
                        <Route path={authLocations.login} component={SignIn}></Route>
                        {/* <Route path={authLocations.login} component={LoginTemplate4}></Route> */}
                        <Route path={authLocations.forgottenPassword} component={ForgottenPassword}></Route>
                        <Route path={authLocations.PasswordReset} component={PasswordReset}></Route>
                        <Route path={authLocations.passwordResetSuccessful} component={PasswordResetSuccessful}></Route>
                        <Route path={authLocations.pageNotFound} component={PageNotFound}></Route>
                        <Route path={authLocations.firstTimeLogin} component={FirstTimeLoginPassswordChange}></Route>

                        <Route path="/errors" component={Simple}></Route>
                    </>
                }
            </Switch>
        </>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        getAppLayout: (schoolUrl) => getAppLayout(schoolUrl)(dispatch)
    };
}

export default connect(null, mapDispatchToProps)(IndexRouters);
