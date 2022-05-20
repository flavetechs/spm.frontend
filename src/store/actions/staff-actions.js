
import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/staff-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";




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

export const fetchSingleItem = (teacherAccountId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: teacherAccountId
    });

}

export const fetchSingleStaff = (teacherAccountId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_STAFF_LOADING,
    });
        axiosInstance.get(`/tercher/api/v1/get-single/${teacherAccountId}`)
            .then((res) => {
                console.log("res", res.data)
                dispatch({
                    type: actions.FETCH_SINGLE_STAFF_SUCCESS,
                    payload: res.data.result
                });
            }).catch(err => {
                dispatch({
                    type: actions.FETCH_SINGLE_STAFF_FAILED,
                    payload: err.response.data.result
                })
            });
}


//STAFF ACTION HANDLERS
export const getAllStaffAccount = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFFACCOUNT_LOADING
    });

    axiosInstance.get('/tercher/api/v1/getall/teachers')
        .then((res) => {
            console.log('staff get all res: ', res)
            dispatch({
                type: actions.FETCH_STAFFACCOUNT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            console.log('staff get all err: ', err)
            dispatch({
                type: actions.FETCH_STAFFACCOUNT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createStaffAccount = (staff) => (dispatch) => {
    dispatch({
        type: actions.CREATE_STAFFACCOUNT_LOADING
    });
    axiosInstance.post('/create/teacher', staff)
        .then((res) => {
            console.log('staff create all res: ', res)
            dispatch({
                type: actions.CREATE_STAFFACCOUNT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('staff create all err: ', err)
            dispatch({
                type: actions.CREATE_STAFFACCOUNT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteStaffAccount = (teacherUserAccountId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_STAFFACCOUNT_LOADING
    });
    const payload = {
        items: teacherUserAccountId
    }

    axiosInstance.post('/tercher/api/v1/delete/teacher', payload)
        .then((res) => {
            console.log('delete all res: ', res)
            dispatch({
                type: actions.DELETE_STAFFACCOUNT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStaffAccount()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('delete all err: ', err)
            dispatch({
                type: actions.DELETE_STAFFACCOUNT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateStaffAccount = (teacherAccountId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_STAFFACCOUNT_LOADING
    });
    
    axiosInstance.post('/update/teacher', teacherAccountId)
        .then((res) => {
            console.log('update action res', res);
            dispatch({
                type: actions.UPDATE_STAFFACCOUNT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('update action err', err);
            dispatch({
                type: actions.UPDATE_STAFFACCOUNT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
//STAFF ACTION HANDLERS