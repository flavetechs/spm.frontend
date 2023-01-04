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
import { publishresultsReducer } from './reducers/publish-result-reducer'
import { portalSettingReducer } from './reducers/portal-setting-reducer'
import { notificationReducer } from './reducers/notification-reducer'
import { pinReducer } from './reducers/pin-management-reducer'
import { timetableReducer } from './reducers/timetable-reducer'
import { dashboardReducer } from './reducers/dashboard-reducer'
import { parentReducer } from './reducers/parent-reducer'
import { adminAdmissionReducer } from './reducers/admin-admission-reducer'
import { candidateAdmissionReducer } from './reducers/candidate-admission-reducer'
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
        results: resultsReducer,
        publish: publishresultsReducer,
        portal: portalSettingReducer,
        notification: notificationReducer,
        pin: pinReducer,
        timetable: timetableReducer,
        dashboard: dashboardReducer,
        parent: parentReducer,
        adminAdmission: adminAdmissionReducer,
        candidate: candidateAdmissionReducer,
    })
)
