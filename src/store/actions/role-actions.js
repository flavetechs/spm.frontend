import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/roles-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const getAllRoles = () => (dispatch) => {
    dispatch({
        type: actions.ROLES_LOADING
    });

    axiosInstance.get('/smp/server/role/api/v1/getall')
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
export const getAllParentActivity = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_PARENT_ROLE_LOADING
    });

    axiosInstance.get('/smp/server/role/api/v1/getall-activity-parent')
        .then((res) => {
            dispatch({
                type: actions.FETCH_PARENT_ROLE_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_PARENT_ROLE_FAILED,
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

    const url = roleId !== '' ? '/smp/server/role/api/v1/update' : '/smp/server/role/api/v1/create'

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

    axiosInstance.post('/smp/server/role/api/v1/delete', payload)
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

    axiosInstance.get(`/smp/server/role/api/v1/get/${roleId}?roldeId=${roleId}`)
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


export const updateRoleActivityOnSelectAll = (id, isChecked, selectedRole ) => dispatch => {
    const otherSelectedActivity = selectedRole.activities.filter(e => e !== id);
        const newActivity = id;
        if (isChecked === false) {
            selectedRole.activities = otherSelectedActivity.filter(o=>!id.includes(o))
        } 
        else{
        selectedRole.activities = [...otherSelectedActivity, newActivity].flat().filter(
            (item, index, self) =>
              index === self.findIndex((a) => a === item)
          );
        }
        dispatch({
            type: actions.UPDATE_ROLE_ACTIVITY_STATE,
            payload: selectedRole
        });
}



export const updateRoleActivityOnSelect = (id, isChecked, selectedRole ) => dispatch => {
    const otherSelectedActivity = selectedRole.activities.filter(e => e !== id);
    let selectedActivity = selectedRole.activities.find(e => e === id);
 
    if (selectedActivity) {
           if (isChecked === false) {
            selectedRole.activities = [...otherSelectedActivity];
        } else {
            selectedRole.activities = [...otherSelectedActivity, selectedActivity];
        }
        dispatch({
            type: actions.UPDATE_ROLE_ACTIVITY_STATE,
            payload: selectedRole
        });
    } else {
        const newActivity = id;
        if (isChecked === false) {
            selectedRole.activities = [...otherSelectedActivity];
        } 
        else{
        selectedRole.activities = [...otherSelectedActivity, newActivity];
        }
        dispatch({
            type: actions.UPDATE_ROLE_ACTIVITY_STATE,
            payload: selectedRole
        });
    }
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
    axiosInstance.post('/smp/server/role/api/v1/update', role)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ROLE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ROLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createNewRole = (role) => dispatch => {
    dispatch({
        type: actions.CREATE_ROLE_LOADING
    });
    axiosInstance.post('/smp/server/role/api/v1/create', role)
        .then((res) => {
            dispatch({
                type: actions.CREATE_ROLE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_ROLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const resetRoleState = () => (dispatch) => {
    dispatch({
         type: actions.RESET_ACTIVITIES,
         payload: {
            name: '', roleId: '', activities: []
        }
     });
 }

 export const getAllNonAddedUsers = (roleId) => dispatch => {

    dispatch({
        type: actions.FETCH_NON_ADDED_USERS_LOADING
    });

    axiosInstance.get(`/smp/server/role/api/v1/get/not-added-users/${roleId}?roldeId=${roleId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_NON_ADDED_USERS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_NON_ADDED_USERS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllAddedUsers = (roleId) => dispatch => {

    dispatch({
        type: actions.FETCH_ADDED_USERS_LOADING
    });

    axiosInstance.get(`/smp/server/role/api/v1/get-role-users?roleId=${roleId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADDED_USERS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ADDED_USERS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const addUserToRoles = (roleId,userIds) => dispatch => {

    dispatch({
        type: actions.ADD_USER_TO_ROLE_LOADING
    });
    const payload ={
        userIds,
        roleId
      }

    axiosInstance.post(`/smp/server/role/api/v1/assign/user-to-role`, payload)
        .then((res) => {
            dispatch({
                type: actions.ADD_USER_TO_ROLE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch(err => {
            dispatch({
                type: actions.ADD_USER_TO_ROLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const removeUserFromRoles = (roleId,userId) => dispatch => {

    dispatch({
        type: actions.REMOVE_USER_FROM_ROLE_LOADING
    });

    axiosInstance.post(`/smp/server/role/api/v1/remove-user/from-role?UserId=${userId}&RoleId=${roleId}`,)
        .then((res) => {
            dispatch({
                type: actions.REMOVE_USER_FROM_ROLE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllAddedUsers(roleId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch(err => {
            dispatch({
                type: actions.REMOVE_USER_FROM_ROLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
 // export const updateRoleActivityState = (id, value, selectedRole, action) => dispatch => {
//     const otherActivities = selectedRole.activities.filter(e => e !== id);
//     let targetActivity = selectedRole.activities.find(e => e === id);
//     if (targetActivity) {

//         if (!targetActivity) {
//             selectedRole.activities = [...otherActivities];
//         } else {
//             selectedRole.activities = [...otherActivities, targetActivity];
//         }
//         dispatch({
//             type: actions.UPDATE_ROLE_ACTIVITY_STATE,
//             payload: selectedRole
//         });
//     } else {

//         const newActivity = id
//         selectedRole.activities = [...otherActivities, newActivity];
//         dispatch({
//             type: actions.UPDATE_ROLE_ACTIVITY_STATE,
//             payload: selectedRole
//         });
//     }
// }
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
//     axiosInstance.post('/smp/server/role/api/v1/delete', payload)
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