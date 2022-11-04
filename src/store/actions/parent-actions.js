import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/parent-action-types";

export const getMyWardsList = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_LIST_LOADING
    });
                    ////smp/maywards/api/v1/get/maywards?pageNumber=1
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards?pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_MY_WARDS_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}
