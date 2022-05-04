import { _state } from "../states/activity-state";
import { actions } from "../action-types/activity-action-types"
export const activityReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.FETCH_APP_ACTIVITIES_LOADING:
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
                loading: false
            }
        default:
            return state
    }
}