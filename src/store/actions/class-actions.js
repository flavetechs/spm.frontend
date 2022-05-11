import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/class-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const getAllClassList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASSLOOKUP_LOADING
    });

    axiosInstance.get('class/api/v1/getall/class-lookup')
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_FAILED,
                payload: err.response.data.result
            })
        });
}




export const createClass = ({ name, isActive }) => (dispatch) => {

    dispatch({
        type: actions.CREATE_CLASSLOOKUP_LOADING
    });

    const payload = {
        name,
        isActive
    }

    console.log('create res class', payload);
    axiosInstance.post('/class/api/v1/create/class-lookup', payload)
        .then((res) => {
            
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('create err class', err);
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}



export const updateClass = ({name, lookupId, isActive}) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CLASSLOOKUP_LOADING
    });
    const payload = {
        lookupId : lookupId,
        name: name,
        isActive: isActive
    }
    axiosInstance.post('/class/api/v1/update/class-lookup', payload)
        .then((res) => {
            console.log('update res: ', res)
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage.result
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('update error: ', err)
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const removeClassId = (itemId) => {
    return {
        type: actions.REMOVE_CLASSLOOKUP_ID_SUCCESS,
        payload: itemId
    }
}

export const pushClassId = (itemId) => {
    return {
        type: actions.PUSH_CLASSLOOKPUP_ID_SUCCESS,
        payload: itemId
    }
}

export const returnClassList = (classList) => (dispatch) => {
    dispatch({
        type: actions.RETURN_CLASS_LIST_SUCCESS,
        payload: classList
    })
}

 
export const deleteClassItems = (classId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASSLOOKUP_LOADING
    });

    const payload = {
        items: classId
    }
    axiosInstance.post('/class/api/v1/delete/class-lookup', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('delete error: ', err)
            dispatch({
                type: actions.DELETE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const resetForm = () => (dispatch) => {
    dispatch({
        type: actions.RESET_FORM,
    });
}

export const fetchSingleClass = (classId) => dispatch =>{
        console.log('my fetchsingleclass', classId)
    dispatch({
        type: actions.GET_SINGLE_CLASS,
        payload: classId
    });

}








