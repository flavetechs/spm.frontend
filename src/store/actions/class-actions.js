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

    axiosInstance.post('/class/api/v1/create/class-lookup', payload)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

 
export const deleteClassItems = (classId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASS_LOADING
    });

    const payload = {
        items: classId
    }

    axiosInstance.post('/class/api/v1/delete/class-lookup', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}










