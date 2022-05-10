import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/roles-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const getAllRoles = () => (dispatch) => {
    dispatch({
        type: actions.ROLES_LOADING
    });

    axiosInstance.get('role/api/v1/getall')
        .then((res) => {
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
        items: roleIds
    }

    axiosInstance.post('/role/api/v1/delete', payload)
        .then((res) => {
            getAllRoles()(dispatch);
            dispatch({
                type: actions.DELETE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.ROLE_REQUEST_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const returnList = (roles) => (dispatch) => {
    dispatch({
        type: actions.RETURN_LIST,
        payload: roles
    })
}

export const fetchSingleRole = (roleId) => dispatch => {

    dispatch({
        type: actions.FETCH_SINGLE_ROLE_LOADING
    });


    console.log('roleId', roleId)
    axiosInstance.get(`/role/api/v1/get/${roleId}?roldeId=${roleId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_ROLE_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_ROLE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const updateRoleActivityState = (id, value, selectedRole, action) => dispatch => {
    const otherActivities = selectedRole.activities.filter(e => e.activityId !== id);
    let targetActivity = selectedRole.activities.find(e => e.activityId === id);
    if (targetActivity) {
        switch (action) {
            case 'canCreate':
                targetActivity.canCreate = value;
                break;
            case 'canUpdate':
                targetActivity.canUpdate = value;
                break;
            case 'canDelete':
                targetActivity.canDelete = value;
                break;
            case 'canImport':
                targetActivity.canImport = value;
                break;
            case 'canExport':
                targetActivity.canExport = value;
                break;
            default:
                break;
        }

        if (!targetActivity.canCreate && !targetActivity.canUpdate && !targetActivity.canDelete && !targetActivity.canImport && !targetActivity.canExport) {
            selectedRole.activities = [...otherActivities];
        } else {
            selectedRole.activities = [...otherActivities, targetActivity];
        }
        dispatch({
            type: actions.UPDATE_ROLE_ACTIVITY_STATE,
            payload: selectedRole
        });
    } else {

        const newActivity = addNewActivityToRole(id, value, action)
        selectedRole.activities = [...otherActivities, newActivity];
        dispatch({
            type: actions.UPDATE_ROLE_ACTIVITY_STATE,
            payload: selectedRole
        });
    }
}

const addNewActivityToRole = (id, value, action) => {
    const activityId = id;
    let canCreate = false;
    let canUpdate = false;
    let canDelete = false;
    let canImport = false;
    let canExport = false;
    switch (action) {
        case 'canCreate':
            canCreate = value;
            break;
        case 'canUpdate':
            canUpdate = value;
            break;
        case 'canDelete':
            canDelete = value;
            break;
        case 'canImport':
            canImport = value;
            break;
        case 'canExport':
            canExport = value;
            break;
        default:
            break;
    }

    return {
        activityId,
        canCreate,
        canUpdate,
        canDelete,
        canImport,
        canExport
    };
}

export const updateRoleNameState = (name, selectedRole) => dispatch => {
    selectedRole.name = name;
    dispatch({
        type: actions.UPDATE_ROLE_NAME_STATE,
        payload: selectedRole,
    });


}
export const updateModifiedRole = (role) => dispatch => {
    dispatch({
        type: actions.UPDATE_ROLE_LOADING
    });
    axiosInstance.post('/role/api/v1/update', role)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ROLE_LOADING,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ROLE_LOADING,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createNewRole = (role) => dispatch => {
    dispatch({
        type: actions.UPDATE_ROLE_LOADING
    });
    axiosInstance.post('/role/api/v1/create', role)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ROLE_LOADING,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ROLE_LOADING,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


// export const deleteEachRole = (itemsId) => {
//         console.log('id', itemsId);
//         return {
//             type: actions.DELETE_ROLE_STATE,
//             payload: itemsId,
//         }
//     }

// export const deleteRoles = (id) => dispatch => {
//     dispatch({
//         type: actions.DELETE_ROLES_LOADING
//     });

//     const payload = {
//         items: id
//     }
//     console.log('id', id);
//     console.log('id', payload);
//     axiosInstance.post('/role/api/v1/delete', payload)
//         .then((res) => {
//             dispatch({
//                 type: actions.DELETE_ROLES_LOADING,
//                 payload: res.data.message.friendlyMessage
//             });
//             showSuccessToast(res.data.message.friendlyMessage)(dispatch)
//         }).catch((err) => {
//             dispatch({
//                 type: actions.DELETE_ROLES_LOADING,
//                 payload: err.response.data.message.friendlyMessage
//             });
//             showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
//         });
// }