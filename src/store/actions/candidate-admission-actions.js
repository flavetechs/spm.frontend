import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/candidate-admission-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";
import swal from 'sweetalert';
import { candidateLocations } from "../../router/candidate-path-location";

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

// export const userEmailLogin = (userEmail) => (dispatch) => {

//     dispatch({
//         type: actions.LOGIN_CANDIDATE_LOADING
//     });

//     axiosInstance.post('/smp/server/smp/api/v1/candidate-admission/login', userEmail)
//         .then((res) => {
//             dispatch({
//                 type: actions.LOGIN_CANDIDATE_SUCCESS,
//                 payload: res.data.result,
//             });

//         }).catch(err => {
//             dispatch({
//                 type: actions.LOGIN_CANDIDATE_FAILED,
//                 payload: err.response.data.message.friendlyMessage
//             })
//         })
// }
export const userRegistration = (values, history) => (dispatch) => {

    dispatch({
        type: actions.REGISTER_CANDIDATE_LOADING
    });

    axiosInstance.post('/smp/server/smp/api/v1/candidate-admission/register-parent', values)
        .then((res) => {
            history.push(candidateLocations.registrationEmailReceived)
            dispatch({
                type: actions.REGISTER_CANDIDATE_SUCCESS,
                payload: res?.data.result,
            });

        }).catch(err => {
            dispatch({
                type: actions.REGISTER_CANDIDATE_FAILED,
                payload: err?.response?.data.message.friendlyMessage
            })

        })
}

export const confirmUserEmail = (admissionNotificationId) => (dispatch) => {

    dispatch({
        type: actions.CONFIRM_USER_EMAIL_LOADING
    });

    const payload = {
        admissionNotificationId
    }

    axiosInstance.post('/smp/server/smp/api/v1/candidate-admission/confirm-email', payload)
        .then((res) => {
            dispatch({
                type: actions.CONFIRM_USER_EMAIL_SUCCESS,
                payload: res.data.result,
            });
        }).catch(err => {
            dispatch({
                type: actions.CONFIRM_USER_EMAIL_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}

export const logOutUserEmail = () => {
    return {
        type: actions.LOG_OUT_CANDIDATE_USER
    }
}

export const getCandidatesAdmissionList = (admissionSettingsId, pageSize, PageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ADMISSIONS_LIST_LOADING,
    });
    axiosInstance.get(`/smp/server/smp/api/v1/candidate-admission/get-all-admission?PageNumber=${PageNumber}&pageSize=${pageSize}&admissionSettingsId=${admissionSettingsId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADMISSIONS_LIST_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ADMISSIONS_LIST_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getSingleAdmissionDetail = (admissionId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_ADMISSION_LOADING,
    });
    axiosInstance.get(`/smp/server/smp/api/v1/candidate-admission/get-single-admission/${admissionId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getAdmissionClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ADMISSION_CLASSES_LOADING,
    });
    axiosInstance.get(`/smp/server/smp/api/v1/candidate-admission/get-admission-classes`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADMISSION_CLASSES_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ADMISSION_CLASSES_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const createCandidateAdmission = (values, admissionSettingsId) => (dispatch) => {
    dispatch({
        type: actions.CREATE_CANDIDATE_ADMISSION_LOADING
    });
    axiosInstance.post('/smp/server/smp/api/v1/candidate-admission/create', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CANDIDATE_ADMISSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            successModal(res.data.message.friendlyMessage)
            getCandidatesAdmissionList(admissionSettingsId, 10, 1)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CANDIDATE_ADMISSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            errorModal(err.response.data.message.friendlyMessage)
        });
}

export const updateCandidateAdmission = (values, admissionSettingsId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CANDIDATE_ADMISSION_LOADING
    });
    axiosInstance.post('/smp/server/smp/api/v1/candidate-admission/update', values)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_CANDIDATE_ADMISSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            successModal(res.data.message.friendlyMessage)
            getCandidatesAdmissionList(admissionSettingsId, 10, 1)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_CANDIDATE_ADMISSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            errorModal(err.response.data.message.friendlyMessage)
        });
}

export const deleteCandidateAdmission = (item, admissionSettingsId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CANDIDATE_ADMISSION_LOADING
    });
    const payload = {
        item: item[0]
    }
    axiosInstance.post(`/smp/server/smp/api/v1/candidate-admission/delete-admission`, payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CANDIDATE_ADMISSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getCandidatesAdmissionList(admissionSettingsId, 10, 1)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_CANDIDATE_ADMISSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const successModal = (message) => { swal("Successful", message, "success") }

export const errorModal = (message) => { swal("Error", message, "error") }

export const deleteDialogModal = (id) => (dispatch) => {
    swal({
        title: "Are you sure you want to delete this?",
        text: "Once deleted, you will not be able to recover this",
        icon: "warning",
        buttons: ["cancel", true],
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            // swal(message, {
            //   icon: "success",
            // });
            respondToDeleteDialog('continue')(dispatch)
        } else {
            swal("Your item is safe!");
            respondToDeleteDialog('cancel')(dispatch)
        }
    });
}

export const respondToDeleteDialog = (value) => (dispatch) => {
    dispatch({
        type: actions.DELETE_DIALOG_RESPPONSE,
        payload: value
    })
}

export const admissionOpenAndCloseModal = () => (dispatch) => {
    swal({
        title: "Sorry! Admission is closed for this session",
        text: "Please check back for future intake opportunities",
        icon: "warning",
        dangerMode: true,
    })
}

export const getAdmissionStatus = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ADMISSION_STATUS_LOADING,
    });
    axiosInstance.get(`/smp/server/smp/api/v1/candidate-admission/get-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADMISSION_STATUS_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ADMISSION_STATUS_FAILED,
                payload: err.data.message.friendlyMessage,
            });
        });
};
export const resendEmail = (values) => (dispatch) => {

    dispatch({
        type: actions.CONFIRM_USER_EMAIL_LOADING
    });

    axiosInstance.post('/smp/server/smp/api/v1/candidate-admission/resend-email-to/registered-parent', values)
        .then((res) => {
            dispatch({
                type: actions.RESEND_MESSAGE_SUCCESS,
                payload: res?.data.message.friendlyMessage,
            });

        }).catch(err => {
            dispatch({
                type: actions.CONFIRM_USER_EMAIL_FAILED,
                payload: err?.response?.data.message.friendlyMessage
            })

        })
}