import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/class-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const getAllClassList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_LOADING
    });

    // axiosInstance.get('role/api/v1/getall')
    axiosInstance.get('class/api/v1/getall/class-lookup')
        .then((res) => {
            console.log('my class res', res.data)
            dispatch({
                type: actions.FETCH_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}




export const createUpdateClass = ({ name }) => (dispatch) => {

    dispatch({
        type: actions.CREATE_CLASS_LOADING
    });

    const payload = {
        name,
    }

    // const url = lookupId !== '' ? '/class/api/v1/update/class-lookup' : '/class/api/v1/create/class-lookup'

    axiosInstance.post('/class/api/v1/create/class-lookup', payload)
        .then((res) => {
            console.log('class add', res.data.result);
            dispatch({
                type: actions.CREATE_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            console.log('class create err', err.response.data.result);
            dispatch({
                type: actions.CREATE_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}
// export const createUpdateClass = ({ classId, name  }) => (dispatch) => {
//     dispatch({
//         type: actions.CREATE_CLASS_LOADING
//     });

//     const payload = {
//         classId,
//         name
//     }

//     // const url = classId !== '' ? '/class/api/v1/update/class-lookup' : '/class/api/v1/create/class-lookup'

//     axiosInstance.post(url, payload)
//         .then((res) => {
//             dispatch({
//                 type: actions.CREATE_CLASS_SUCCESS,
//                 payload: res.data.result
//             });
//         }).catch((err) => {
//             dispatch({
//                 type: actions.CREATE_CLASS_FAILED,
//                 payload: err.response.data.result
//             })
//         });
// }


export const editClass = (item) => {
    return {
        type: actions.UPDATE_CLASS_SUCCESS,
        payload: item
    }
}
// export const pushClassId = (itemId) => {
//     return {
//         type: actions.PUSH_CLASS_ID,
//         payload: itemId
//     }
// }

// export const removeClassId = (itemId) => {
//     return {
//         type: actions.REMOVE_CLASS_ID,
//         payload: itemId
//     }
// }


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

export const returnList = (classList) => (dispatch) => {
    dispatch({
        type: classList.RETURN_LIST,
        payload: classList
    })
}

// export const fetchSingleRole = (classId) => dispatch => {

//     dispatch({
//         type: actions.FETCH_SINGLE_CLASS_LOADING
//     });

//     axiosInstance.get(`/role/api/v1/get/${classId}?classId=${classId}`)
//         .then((res) => {
//             dispatch({
//                 type: actions.FETCH_SINGLE_ROLE_SUCCESS,
//                 payload: res.data.result
//             });
//         }).catch(err => {
//             dispatch({
//                 type: actions.FETCH_SINGLE_ROLE_FAILED,
//                 payload: err.response.data.result
//             })
//         });
// }

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

export const addNewState = (id, value, newRole, action) => dispatch => {
    const otherActivities = newRole.activities.filter(e => e.activityId !== id);
    let targetActivity = newRole.activities.find(e => e.activityId === id);
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
            newRole.activities = [...otherActivities];
        } else {
            newRole.activities = [...otherActivities, targetActivity];
        }
        dispatch({
            type: actions.CREATE_ROLE_STATE,
            payload: newRole
        });
    } else {

        const newActivity = addition(id, value, action)
        newRole.activities = [...otherActivities, newActivity];
        dispatch({
            type: actions.CREATE_ROLE_STATE,
            payload: newRole
        });
    }
}

const addition = (id, value, action) => {
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







export const createNewName = (newName, newRole) => dispatch => {
    newRole.name = newName;
    dispatch({
        type: actions.CREATE_ROLE_NAME_STATE,
        payload: newRole,
    });


}










export const addNewRole = (role) => dispatch => {
    dispatch({
        type: actions.ADD_NEW_ROLE_LOADING
    });

    console.log('role', role);
    axiosInstance.post('/role/api/v1/create', role)
        .then((res) => {
            dispatch({
                type: actions.ADD_NEW_ROLE_LOADING,
                payload: res.data.message.friendlyMessage
            });
        }).catch((err) => {
            dispatch({
                type: actions.ADD_NEW_ROLE_LOADING,
                payload: err.response.message.friendlyMessage
            })
        });
}