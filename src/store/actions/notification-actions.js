import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/notification-action-types"
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const createAnnouncement = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_ANNOUNCEMENT_LOADING,
       
    });

    axiosInstance.post('/announcements/api/v1/create/announcement', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_ANNOUNCEMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_ANNOUNCEMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
    }


export const getAllAnnouncement = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ANNOUNCEMENT_LOADING
    });

    axiosInstance.get("/announcements/api/v1/get/announcements")
        .then((res) => {
            dispatch({
                type: actions.FETCH_ANNOUNCEMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_ANNOUNCEMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const updateSeenAnnouncement = (announcementsId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SEEN_ANNOUNCEMENT_LOADING,
       
    });

   const payload = {
        announcementsId
      }

    axiosInstance.post('/announcements/api/v1/update/seen-announcement', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SEEN_ANNOUNCEMENT_SUCCESS,
                payload: res.data.result
            });
        
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SEEN_ANNOUNCEMENT_FAILED,
                payload: err.response.data.result
            })
            
        });
    }