import {createStore, combineReducers} from 'redux'
import { activityReducer } from './reducers/activity-reducer'
import { authReducer } from './reducers/auth-reducer'
import { rolesReducer } from './reducers/roles-reducer'
import Mode from './setting/setting'
export default createStore(
    combineReducers({
        mode: Mode,
        roles: rolesReducer,
        auth: authReducer,
        activities: activityReducer
    })
)
