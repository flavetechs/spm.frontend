import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/session-action-types";
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

export const fetchSingleItem = (sessionId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: sessionId
    });

}


//SESSION FETCH
export const getAllSession = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SESSION_LOADING
    });

    axiosInstance.get('session/api/v1/getall')
        .then((res) => {
            console.log('getall class res: ', res)
            dispatch({
                type: actions.FETCH_SESSION_SUCCESS,
                payload: res.data.result
        })
        }).catch((err) => {
            console.log('getall class err: ', err)
            dispatch({
                type: actions.FETCH_SESSION_FAILED,
                payload: err.data.result
            })
        });
}

export const createSession = (form) => (dispatch) => {
    dispatch({
        type: actions.CREATE_SESSION_LOADING
    });
    axiosInstance.post('/session/api/v1/create', form)
        .then((res) => {
            console.log('create res: ', res)
            dispatch({
                type: actions.CREATE_SESSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('create err: ', err)
            dispatch({
                type: actions.CREATE_SESSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteSession = (session) => (dispatch) => {
    dispatch({
        type: actions.DELETE_SESSION_LOADING
    });
    const payload = {
        item: session[0]
    }

    axiosInstance.post('/session/api/v1/delete', payload)
        .then((res) => {
            console.log('delete session res: ', res)
            dispatch({
                type: actions.DELETE_SESSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllSession()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('delete session err: ', err)
            dispatch({
                type: actions.DELETE_SESSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}



export const updateSession = (updatedSession) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SESSION_LOADING
    });
    
    axiosInstance.post('/session/api/v1/delete', updatedSession)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SESSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SESSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const getActiveSession = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_SESSION_LOADING
    });

    axiosInstance.get('/session/api/v1/get-active')
        .then((res) => {
            console.log('session', res.data);
            dispatch({
                type: actions.FETCH_ACTIVE_SESSION_SUCCESS,
                payload: res.data.result
        })
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_ACTIVE_SESSION_FAILED,
                payload: err.data.result
            })
        });
}