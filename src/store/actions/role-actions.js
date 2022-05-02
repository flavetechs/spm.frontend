import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/roles-action-types";

export const getAllRoles = () => (dispatch) => {
    dispatch({
        type: actions.ROLES_LOADING
    });

    axiosInstance.get('role/api/v1/getall')
        .then((res) => {
            console.log('res', res.data.result)
            dispatch({
                type: actions.FETCH_ROLES_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.ROLE_REQUEST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createUpdateRole = ({ roleId, name }) => (dispatch) => {
    dispatch({
        type: actions.ROLES_LOADING
    });

    const payload = {
        roleId,
        name
    }

    const url = roleId !== '' ? '/role/api/v1/update' : '/role/api/v1/create'

    axiosInstance.post(url, payload)
        .then((res) => {
            dispatch({
                type: actions.CREATE_UPDATE_ROLE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.ROLE_REQUEST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const editRole = (item) => {
    return {
        type: actions.EDIT_ROLE,
        payload: item
    }
}
export const pushId = (itemId) => {
    return {
        type: actions.PUSH_ROLE_ID,
        payload: itemId
    }
}

export const removeId = (itemId) => {
    return {
        type: actions.REMOVE_ROLE_ID,
        payload: itemId
    }
}


export const deleteItems = (roleIds) => (dispatch) => {
    dispatch({
        type: actions.ROLES_LOADING
    });

    const payload = {
        items:roleIds
    }
  
    axiosInstance.post('/role/api/v1/delete', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.ROLE_REQUEST_FAILED,
                payload: err.response.data.result
            })
        });
}




export const returnList = (roles) => (dispatch) => {
    dispatch({
        type: roles.RETURN_LIST,
        payload: roles
    })
}