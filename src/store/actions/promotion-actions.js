import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/promotion-action-types"




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



//STAFF ACTION HANDLERS
export const getAllStaffAccount = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_PROMOTION_LOADING
    });

    axiosInstance.get('/tercher/api/v1/getall/teachers')
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


//STAFF ACTION HANDLERS