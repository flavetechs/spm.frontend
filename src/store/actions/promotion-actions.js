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


export const fetchPassedStudentList = (sessionClassId) => dispatch => {
    dispatch({
        type: actions.FETCH_PASSED_STUDENT_LOADING,
    });
    axiosInstance.get(`/promotion/api/v1/get/passed-students${sessionClassId}?sessioinClassId=${sessionClassId}`)
        .then((res) => {
            console.log("passed students", res.data)
            dispatch({
                type: actions.FETCH_PASSED_STUDENT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            console.log("fetchSinglePassed err", err)
            dispatch({
                type: actions.FETCH_PASSED_STUDENT_FAILED,
                payload: err.response.data.result
            })
        });
}
export const fetchFailedStudentList = (sessionClassId) => dispatch => {
    dispatch({
        type: actions.FETCH_FAILED_STUDENT_LOADING,
    });
    axiosInstance.get(`/promotion/api/v1/get/failed-students${sessionClassId}?sessioinClassId=${sessionClassId}`)
        .then((res) => {
            console.log("failed students sucess", res.data)
            dispatch({
                type: actions.FETCH_FAILED_STUDENT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            console.log("failed student list err", err)
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

    axiosInstance.get('/promotion/api/v1/get/previous/session-classes')
        .then((res) => {
            console.log('promotion get all res: ', res)
            dispatch({
                type: actions.FETCH_PROMOTION_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            console.log('promotion get all err: ', err)
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
    console.log('payload', payload)
    axiosInstance.post('/promotion/api/v1/promote/class', payload)
        .then((res) => {
            console.log('promote student res action', res);
            dispatch({
                type: actions.PROMOTE_STUDENT_SUCCESS,
                payload: res.data.result
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch(err => {
            console.log('promote student err action', err.response.data.result);
            dispatch({
                type: actions.PROMOTE_STUDENT_FAILED,
                payload: err.response.data.result
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        })
}





//PROMOTION ACTION HANDLERS