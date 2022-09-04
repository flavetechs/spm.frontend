import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/general-action-types"

export const resetScreen = (value: any) => (dispatch: any) => {
    dispatch({
        type: actions.RESET_SCREEN,
        payload: value
    });

}



export const getGeneralActiveSession = () => (dispatch: any) => {
    dispatch({
        type: actions.FETCH_ACTIVE_SESSION_LOADING
    });

    axiosInstance.get('/session/api/v1/get-active')
        .then((res) => {
            
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