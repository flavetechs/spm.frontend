import { _state } from "../states/activity-state";
import { actions } from "../action-types/activity-action-types"
export const activityReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.FETCH_APP_ACTIVITIES_SUCCESS:
            return {
                ...state,
            }
   
        default:
            return state
    }
}