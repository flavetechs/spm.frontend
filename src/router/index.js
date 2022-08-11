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

const IndexRouters = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userDetail, setUserDetail] = useState(null);

    React.useEffect(() => {
        setUserDetail(getUserDetails());
        if (userDetail)
            setIsLoggedIn(true)
    }, [isLoggedIn])

    console.log('userDetails', userDetail);
    return (
        <>
            <Switch>
                {
                    <>
                        <Route exact path="/" component={ userDetail?.userType === 'Teacher' ? Default : studentDefault}></Route>
                        <Route path="/dashboard" component={ userDetail?.userType === 'Teacher' ? Default : studentDefault}></Route>
                        <Route path={authLocations.login} component={SignIn}></Route>
                        <Route path="/errors" component={Simple}></Route>
                    </>
                }
            </Switch>
        </>
    )
}

export default IndexRouters
