import React from 'react'


//router
import { Switch,Route } from 'react-router'
//layoutpages
// import Index from '../views/index'
import Default from '../layouts/dashboard/default'
import Simple from '../layouts/dashboard/simple'
import SignIn from '../components/spm-auth/sign-in'
import { authLocations } from './spm-path-locations'

const IndexRouters = () => { 
  
    return (
        <>
            <Switch>
              
                <Route exact path="/" component={Default}></Route>
                <Route  path="/dashboard" component={Default}></Route>
                <Route  path={authLocations.login} component={SignIn}></Route>
                <Route  path="/errors" component={Simple}></Route>
            </Switch>
        </>
    )
}

export default IndexRouters
