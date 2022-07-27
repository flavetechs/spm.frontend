import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/activity-action-types"

export const getAllActivities = () => dispatch => {
    
    dispatch({
        type: actions.FETCH_APP_ACTIVITIES_LOADING
    });

    axiosInstance.get(`/role/api/v1/getall-activities`)
        .then((res) => {
    
            dispatch({
                type: actions.FETCH_APP_ACTIVITIES_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_APP_ACTIVITIES_FAILED,
                payload: err.response.data
            })
        });
}

export const getAppActivityParent = () => dispatch => {
    
    dispatch({
        type: actions.FETCH_APP_ACTIVITY_PARENT_LOADING
    });

    axiosInstance.get(`/role/api/v1/getall-activity-parent`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_APP_ACTIVITY_PARENT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_APP_ACTIVITY_PARENT_FAILED,
                payload: err.response.data
            })
        });
}
