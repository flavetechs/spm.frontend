import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/notification-action-types"
import { showErrorToast, showSuccessToast } from "./toaster-actions";


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

export const createAnnouncement = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_ANNOUNCEMENT_LOADING,

    });

    axiosInstance.post('/smp/server/announcements/api/v1/create/announcement', values)
        .then(async (res) => {
            dispatch({
                type: actions.CREATE_ANNOUNCEMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetAnnouncementSuccessfulState()(dispatch);

            // await hubConnection.invoke("JoinNotificationRoom", { user: user, message: user });

            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_ANNOUNCEMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const getAllAnnouncement = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ANNOUNCEMENT_LOADING
    });
    axiosInstance.get(`/smp/server/announcements/api/v1/get/announcements?PageNumber=${pageNumber}`)
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

    axiosInstance.post('/smp/server/announcements/api/v1/update/seen-announcement', payload)
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

export const deleteAnnouncement = (announcement) => (dispatch) => {
    dispatch({
        type: actions.DELETE_ANNOUNCEMENT_LOADING
    });
    const payload = {
        item: announcement[0]
    }

    axiosInstance.post('/smp/server/announcements/api/v1/delete/announcements', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_ANNOUNCEMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllAnnouncement()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_ANNOUNCEMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateAnnouncement = (values) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_ANNOUNCEMENT_LOADING
    });

    axiosInstance.post('/smp/server/announcements/api/v1/update/announcement', values)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ANNOUNCEMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetAnnouncementSuccessfulState()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ANNOUNCEMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const resetAnnouncementSuccessfulState = () => (dispatch) => {
    dispatch({
        type: actions.RESET_ANNOUNCEMENT_SUCCESSFUL,
        payload: null
    });
}

export const getSinglePushedNotificationDetail = (notififcationId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_PUSHED_NOTIFICATION_DETAILS_LOADING
    });
    axiosInstance.get(`/smp/server/notification/api/v1/get-single-notifications?notififcationId=${notififcationId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_PUSHED_NOTIFICATION_DETAILS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_PUSHED_NOTIFICATION_DETAILS_FAILED,
                payload: err.response.data.result
            })
        });
}