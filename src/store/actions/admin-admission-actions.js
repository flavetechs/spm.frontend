import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/admin-admission-action-types";

export const fetchAllAdminAdmissionList = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ALL_ADMISSION_LIST_LOADING
    });
    axiosInstance.get(`/smp/api/v1/admission/get-all-admission?PageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ALL_ADMISSION_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ALL_ADMISSION_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const fetchSingleAdminAdmissionDetail = (admissionId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_ADMISSION_DETAIL_LOADING
    });
    axiosInstance.get(`/smp/api/v1/admission/get-admission/${admissionId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_DETAIL_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_DETAIL_FAILED,
                payload: err.response.data.result
            })
        });
}
