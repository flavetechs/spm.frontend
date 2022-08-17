import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/timetable-action-types"
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

// export const fetchSingleItem = (teacherAccountId) => dispatch => {
//     dispatch({
//         type: actions.GET_SINGLE_ITEM,
//         payload: teacherAccountId
//     });

// }


//TIMETABLE ACTION HANDLERS
export const getAllTimetable = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TIMETABLE_LOADING
    });

    axiosInstance.get('')
        .then((res) => {
            dispatch({
                type: actions.FETCH_TIMETABLE_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_TIMETABLE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createTimetableDays = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_TIMETABLE_DAYS_LOADING
    });
    axiosInstance.post('', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_TIMETABLE_DAYS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_TIMETABLE_DAYS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}



//TIMETABLE ACTION HANDLERS