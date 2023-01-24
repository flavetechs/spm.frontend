import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/parent-action-types";

export const getMyWardsList = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_LIST_LOADING
    });
    ////smp/maywards/api/v1/get/maywards?pageNumber=1
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards?pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_MY_WARDS_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllMyWardsClassNotes = (pageNumber, studentId, subjectId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_CLASS_NOTE_LOADING,
    });
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-class-notes?pageNumber=${pageNumber}&studentId=${studentId}&subjectId=${subjectId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_CLASS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_CLASS_NOTE_LOADING,
                payload: err.response.data.result
            })
        });
}

export const getAllMyWardsNotes = (pageNumber, classId, subjectId, studentContactId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_NOTE_LOADING,
    });
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-notes?pageNumber=${pageNumber}&classId=${classId}&subjectId=${subjectId}&studentContactId=${studentContactId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_NOTE_FAILED,
                payload: err.response.data.result
            })
        });
}


export const getSingleWardsNote = (studentNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_WARDS_NOTE_LOADING,
    });
    axiosInstance.get(`/smp/maywards/api/v1/get-single/maywards-notes?studentNoteId=${studentNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_NOTE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleWardsClassNote = (teacherClassNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_WARDS_CLASS_NOTE_LOADING,
    });

    axiosInstance.get(`/smp/maywards/api/v1/get-single/maywards-class-notes?teacherClassNoteId=${teacherClassNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_CLASS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_CLASS_NOTE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getMyWardsClassTimetable = (classlkpId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_CLASS_TIMETABLE_LOADING,
    });
                     ///smp/maywards/api/v1/get-maywards/class-timetable?classlkpId=d564177c-df46-4e52-6993-08da3fdc57d7
    axiosInstance.get(`/smp/maywards/api/v1/get-maywards/class-timetable?classlkpId=${classlkpId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_CLASS_TIMETABLE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_CLASS_TIMETABLE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleWardDetails = (StudentAccountId ) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_WARD_DETAILS_LOADING,
    });
                    ///smp/maywards/api/v1/get-single/3ee845d8-7506-4e3a-9cef-c5a29e54d83f
    axiosInstance.get(`smp/maywards/api/v1/get-single/${StudentAccountId }`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARD_DETAILS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARD_DETAILS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getMyWardsHomeAssessment = (pageNumber, sessionClassSubjectId, studentContactId, status ) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_HOME_ASSESSMENT_LOADING,
    });
                    ///smp/maywards/api/v1/get/maywards-home-assessments?pageNumber=1&sessionClassSubjectId=8ae6a190-64dd-469c-a295-08daa5d8c70f&studentContactId=3ee845d8-7506-4e3a-9cef-c5a29e54d83f&status=1
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-home-assessments?pageNumber=${pageNumber}&sessionClassSubjectId=${sessionClassSubjectId}&studentContactId=${studentContactId}&status=${status}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_HOME_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_HOME_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}


export const getMyWardsAnnouncement = (PageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_ANNOUNCEMENT_LOADING,
    });

    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-announcements?PageNumber=${PageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_ANNOUNCEMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_ANNOUNCEMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getMyWardsSingleAnnouncement = (announcementId ) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_SINGLE_ANNOUNCEMENT_LOADING,
    });
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-announcement-details/${announcementId }`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_SINGLE_ANNOUNCEMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_SINGLE_ANNOUNCEMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const updateMyWardsSeenAnnouncement = (announcementsId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_MY_WARDS_SEEN_ANNOUNCEMENT_LOADING
    });
    const payload = {
        announcementsId
    }

    axiosInstance.post('/smp/maywards/api/v1/get/maywards/update/seen-announcement', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_MY_WARDS_SEEN_ANNOUNCEMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_MY_WARDS_SEEN_ANNOUNCEMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
        });
}


export const getAllParents = (pageSize,pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_PARENTS_LOADING
    });
    axiosInstance.get(`/parent/api/v1/get-all/parents?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_PARENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_PARENTS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleParents = (parentId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_PARENTS_LOADING,
    });
    axiosInstance.get(`/parent/api/v1/get/parent/${parentId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_PARENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_PARENTS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getParentsWard = (pageSize,pageNumber,parentId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_PARENTS_WARD_LIST_LOADING
    });
    axiosInstance.get(`/parent/api/v1/get/parent-wards?pageNumber=${pageNumber}&pageSize=${pageSize}&parentId=${parentId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_PARENTS_WARD_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_PARENTS_WARD_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}
