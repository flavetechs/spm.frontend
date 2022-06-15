import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/results-action-types"

    export const getAllStaffClasses = () => (dispatch) => {
        dispatch({
            type: actions.FETCH_STAFF_CLASSES_LOADING
        });
    
        axiosInstance.get("/api/v1/result/get/staff-classes")
            .then((res) => {
                dispatch({
                    type: actions.FETCH_STAFF_CLASSES_SUCCESS,
                    payload: res.data.result
                });
            }).catch((err) => {
                dispatch({
                    type: actions.FETCH_STAFF_CLASSES_FAILED,
                    payload: err.response.data.result
                })
            });
    }

    export const getStaffClassSubjects = (sessionClassId) => (dispatch) => {
        dispatch({
            type: actions.FETCH_STAFF_CLASS_SUBJECTS_LOADING,
            payload: sessionClassId
        });
    
        axiosInstance.get(`/api/v1/result/get/staff-class-subjects/${sessionClassId}`)
            .then((res) => {
                dispatch({
                    type: actions.FETCH_STAFF_CLASS_SUBJECTS_SUCCESS,
                    payload: res.data.result
                });
            }).catch((err) => {
                dispatch({
                    type: actions.FETCH_STAFF_CLASS_SUBJECTS_FAILED,
                    payload: err.response.data.result
                })
            });
    }