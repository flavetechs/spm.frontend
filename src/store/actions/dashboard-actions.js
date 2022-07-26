import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/dashboard-action-types";

export const getAllDashboardCount = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_DASHBOARD_COUNT_LOADING
    });

    axiosInstance.get('/dashboard/api/v1/get/dashboard-count')
        .then((res) => {
            dispatch({
                type: actions.FETCH_DASHBOARD_COUNT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_DASHBOARD_COUNT_FAILED,
                payload: err.response.data.result
            })
        });
}