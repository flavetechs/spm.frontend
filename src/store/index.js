import {createStore, combineReducers} from 'redux'
import { activityReducer } from './reducers/activity-reducer'
import { authReducer } from './reducers/auth-reducer'
import { classReducer } from './reducers/class-reducer'
import { enrollmentReducer } from './reducers/enrollment-reducer'
import { generalReducer } from './reducers/general-reducers'
import { promotionReducer } from './reducers/promotion-reducer'
import { rolesReducer } from './reducers/roles-reducer'
import { sessionReducer } from './reducers/session-reducer'
import { staffReducer } from './reducers/staff-reducers'
import { studentReducer } from './reducers/student-reducers'
import { alertReducer } from './reducers/toaster-reducer'
import { gradeReducer } from './reducers/grade-setting-reducer'
import Mode from './setting/setting'
import { resultsReducer } from './reducers/results-reducers'
export default createStore(
    combineReducers({
        mode: Mode,
        roles: rolesReducer,
        auth: authReducer,
        activities: activityReducer,
        alert: alertReducer,
        appState: generalReducer,
        class: classReducer,
        session: sessionReducer,
        staff: staffReducer,
        student: studentReducer,
        enrollment: enrollmentReducer,
        promotion: promotionReducer,
        grade: gradeReducer,
        results: resultsReducer
    })
)
