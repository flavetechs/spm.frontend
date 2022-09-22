import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/promotion-action-types"
import { showErrorToast, showSuccessToast } from "./toaster-actions"




export const pushId = (itemId) => {
    return {
        type: actions.PUSH_ITEM_ID,
        payload: itemId
    }
}
export const removeId = (itemId) => {
    return {
        type: actions.REMOVE_ITEM_ID,
        payload: itemId
    }
}
export const returnList = (items) => (dispatch) => {
    dispatch({
        type: actions.RETURN_ITEM_LIST,
        payload: items
    })
}


export const fetchPassedStudentList = (studentIds) => dispatch => {
    dispatch({
        type: actions.FETCH_PASSED_STUDENT_LOADING,
    });
    axiosInstance.post(`/promotion/api/v1/get/passed-students`, { studentIds: studentIds })
        .then((res) => {
            dispatch({
                type: actions.FETCH_PASSED_STUDENT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_PASSED_STUDENT_FAILED,
                payload: err.response.data.result
            })
        });
}
export const fetchFailedStudentList = (studentIds) => dispatch => {
    dispatch({
        type: actions.FETCH_FAILED_STUDENT_LOADING,
    });
    axiosInstance.post(`/promotion/api/v1/get/failed-students`, { studentIds: studentIds })
        .then((res) => {
            dispatch({
                type: actions.FETCH_FAILED_STUDENT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_FAILED_STUDENT_FAILED,
                payload: err.response.data.result
            })
        });
}

//PROMOTION ACTION HANDLERS

export const getAllPromotionList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_PROMOTION_LOADING
    });

    let promotionUrl = axiosInstance.get('/promotion/api/v1/get/previous/session-classes')
    let resultSettingUrl = axiosInstance.get('/portalsetting/api/v1/get/result-settings')

    Promise.all([promotionUrl, resultSettingUrl]).then((responses) => {
        const responseOne = responses[0]
        const responseTwo = responses[1]
        dispatch({
            type: actions.FETCH_PROMOTION_SUCCESS,
            payload: [responseOne.data.result, responseTwo.data.result]
        });
    }).catch(err => {
        dispatch({
            type: actions.FETCH_PROMOTION_FAILED,
            payload: err.response.data.result
        })
    });
}


export const promoteStudent = (classToBePromoted, classToPromoteTo) => (dispatch) => {

    dispatch({
        type: actions.PROMOTE_STUDENT_LOADING
    });

    const payload = {
        classToBePromoted,
        classToPromoteTo
    }
    axiosInstance.post('/promotion/api/v1/promote/class', payload)
        .then((res) => {
            dispatch({
                type: actions.PROMOTE_STUDENT_SUCCESS,
                payload: res.data.result
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllPromotionList()(dispatch)
        }).catch(err => {
            dispatch({
                type: actions.PROMOTE_STUDENT_FAILED,
                payload: err.response.data.result
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        })
}


//PROMOTION ACTION HANDLERS