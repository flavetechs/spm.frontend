import {createStore, combineReducers} from 'redux'
import { activityReducer } from './reducers/activity-reducer'
import { authReducer } from './reducers/auth-reducer'
import { classReducer } from './reducers/class-reducer'
import { generalReducer } from './reducers/general-reducers'
import { rolesReducer } from './reducers/roles-reducer'
import { alertReducer } from './reducers/toaster-reducer'
import Mode from './setting/setting'
export default createStore(
    combineReducers({
        mode: Mode,
        roles: rolesReducer,
        auth: authReducer,
        activities: activityReducer,
        alert: alertReducer,
        appState: generalReducer,
        class: classReducer
    })
)
