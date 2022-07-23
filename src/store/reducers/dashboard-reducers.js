import { actions } from "../action-types/dashboard-action-types";
import { _state } from "../states/dashboard-state";
export const dashboardReducer = (state = _state, { type, payload }) => {
    switch (type) {

        case actions.FETCH_TOTAL_ENROLLED_STUDENT_FIGURE_LOADING:
            return {
                ...state,
                loading: true,
                message: "",
                isSuccessful: false,
            };
        case actions.FETCH_TOTAL_ENROLLED_STUDENT_FIGURE_SUCCESS:
            return {
                ...state,
                loading: false,
                totalStudentsFigure: payload,
                isSuccessful: true,
            };
        case actions.FETCH_TOTAL_ENROLLED_STUDENT_FIGURE_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            };


        case actions.FETCH_TOTAL_STAFF_FIGURE_LOADING:
            return {
                ...state,
                loading: true,
                message: "",
                isSuccessful: false,
            };
        case actions.FETCH_TOTAL_STAFF_FIGURE_SUCCESS:
            return {
                ...state,
                loading: false,
                totalStaffFigure: payload,
                isSuccessful: true,
            };
        case actions.FETCH_TOTAL_STAFF_FIGURE_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            };

        case actions.FETCH_TOTAL_CLASS_NO_LOADING:
            return {
                ...state,
                loading: true,
                message: "",
                isSuccessful: false,
            };
        case actions.FETCH_TOTAL_CLASS_NO_SUCCESS:
            return {
                ...state,
                loading: false,
                totalClassNo: payload,
                isSuccessful: true,
            };
        case actions.FETCH_TOTAL_CLASS_NO_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            };

        case actions.FETCH_TOTAL_SUBJECTS_NO_LOADING:
            return {
                ...state,
                loading: true,
                message: "",
                isSuccessful: false,
            };
        case actions.FETCH_TOTAL_SUBJECTS_NO_SUCCESS:
            return {
                ...state,
                loading: false,
                totalSubjectsNo: payload,
                isSuccessful: true,
            };
        case actions.FETCH_TOTAL_SUBJECTS_NO_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            };

        case actions.FETCH_TOTAL_SUBJECTS_NO_LOADING:
            return {
                ...state,
                loading: true,
                message: "",
                isSuccessful: false,
            };
        case actions.FETCH_TOTAL_SUBJECTS_NO_SUCCESS:
            return {
                ...state,
                loading: false,
                totalSubjectsNo: payload,
                isSuccessful: true,
            };
        case actions.FETCH_TOTAL_SUBJECTS_NO_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            };

        case actions.FETCH_TOTAL_PINS_FIGURE_LOADING:
            return {
                ...state,
                loading: true,
                message: "",
                isSuccessful: false,
            };
        case actions.FETCH_TOTAL_PINS_FIGURE_SUCCESS:
            return {
                ...state,
                loading: false,
                totalPinFigure: payload,
                isSuccessful: true,
            };
        case actions.FETCH_TOTAL_PINS_FIGURE_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            };

        default:
            return state;
    }
};
