import { _state } from "../states/activity-state";
import { actions } from "../action-types/activity-action-types"
export const activityReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.FETCH_APP_ACTIVITIES_LOADING:
<<<<<<< HEAD
            return {
                ...state, 
                loading: true
            }
            case actions.FETCH_APP_ACTIVITIES_SUCCESS:
                return {
                    ...state, 
                    activities: payload,
                    loading: false
                }
        case actions.FETCH_APP_ACTIVITIES_SUCCESS:
            return {
                ...state, 
=======
            return {
                ...state, 
                loading: true
            }
            case actions.FETCH_APP_ACTIVITIES_SUCCESS:
                return {
                    ...state, 
                    activities: payload,
                    loading: false
                }
        case actions.FETCH_APP_ACTIVITIES_FAILED:
            return {
                ...state, 
>>>>>>> 2908d646c067a96a3454e2bd391dc0ba485029ec
                loading: false
            }
        default:
            return state
    }
}