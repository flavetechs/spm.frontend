
// import axiosInstance from "../../axios/axiosInstance";
// import { actions } from "../action-types/portal-setting-action-types";
// import { showErrorToast, showSuccessToast } from "./toaster-actions";

import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/dashboard-action-types";

export const getTotalEnrolledStudentFigure = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TOTAL_ENROLLED_STUDENT_FIGURE_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_TOTAL_ENROLLED_STUDENT_FIGURE_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_TOTAL_ENROLLED_STUDENT_FIGURE_FAILED,
                payload: err.response.data.result,
            });
        });
};


export const getTotalStaffFigure = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TOTAL_STAFF_FIGURE_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_TOTAL_STAFF_FIGURE_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_TOTAL_STAFF_FIGURE_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getTotalClassNo = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TOTAL_CLASS_NO_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_TOTAL_CLASS_NO_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_TOTAL_CLASS_NO_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getTotalSubjectNo = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TOTAL_SUBJECTS_NO_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_TOTAL_SUBJECTS_NO_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_TOTAL_SUBJECTS_NO_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getTotalPinFigure = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TOTAL_PINS_FIGURE_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_TOTAL_PINS_FIGURE_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_TOTAL_PINS_FIGURE_FAILED,
                payload: err.response.data.result,
            });
        });
};


