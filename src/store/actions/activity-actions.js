import { actions } from "../action-types/activity-action-types"

export const getAllActivities = () => dispatch => {
    dispatch({
        type: actions.FETCH_APP_ACTIVITIES_SUCCESS
    })
}