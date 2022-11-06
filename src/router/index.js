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

const IndexRouters = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetail, setUserDetail] = useState(null);

    React.useEffect(() => {
        setUserDetail(getUserDetails());
        if (userDetail)
            setIsLoggedIn(true)
    }, [isLoggedIn]);

    console.log("userDetail", userDetail);

    return (
        <>
            <Switch>
                {
                    <>

                        <Route exact path="/"
                            component={userDetail?.userType === 'Student' ? studentDefault : userDetail?.userType === "Parent" ? parentDefault : Default}></Route>

                        <Route path={userDetail?.userType == 'Student' ? '/stds-dashboard' : userDetail?.userType == "Parent" ? "/parent-dashboard" : "/dashboard"}
                            component={userDetail?.userType == 'Student' ? studentDefault : userDetail?.userType == "Parent" ? parentDefault : Default}></Route>

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
