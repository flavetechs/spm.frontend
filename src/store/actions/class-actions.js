import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/class-action-types";
import { getAllSharedOnStaffClasses } from "./results-actions";
import { respondModal, showErrorToast, showSuccessToast } from "./toaster-actions";


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

export const fetchSingleItem = (lookupId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: lookupId
    });

}

//CLASS ACTION HANDLERS

export const getAllClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASSLOOKUP_LOADING
    });

    axiosInstance.get('class/api/v1/getall/class-lookup')
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_FAILED,
                payload: err.response.data.result
            })
        });
}



export const createClass = (form) => (dispatch) => {
    dispatch({
        type: actions.CREATE_CLASSLOOKUP_LOADING
    });

    axiosInstance.post('/class/api/v1/create/class-lookup', form)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateClass = (classes) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CLASSLOOKUP_LOADING
    });

    axiosInstance.post('/class/api/v1/update/class-lookup', classes)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteClassItems = (classId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASSLOOKUP_LOADING
    });
    const payload = {
        items: classId
    }

    axiosInstance.post('/class/api/v1/delete/class-lookup', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClasses()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const fetchSingleClass = (classId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: classId
    });

}
export const resetClassSetupState = () => dispatch => {
    dispatch({
        type: actions.RESET_CLASS_SETUP
    });

}
//CLASS ACTION HANDLERS


//SUBJECT ACTION HANDLERS
export const getAllSubjects = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SUBJECTS_LOADING
    });

    axiosInstance.get('subject/api/v1/getall/subject')
        .then((res) => {
            dispatch({
                type: actions.FETCH_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SUBJECT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllStudentSubjects = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENT_SUBJECTS_LOADING
    });

    axiosInstance.get(`/subject/api/v1/getall/student-subjects`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENT_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_STUDENT_SUBJECT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createSubject = (subject) => (dispatch) => {
    dispatch({
        type: actions.CREATE_SUBJECT_LOADING
    });
    axiosInstance.post('/subject/api/v1/create/subject', subject)
        .then((res) => {
            dispatch({
                type: actions.CREATE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
// export const createSessionClassSubject = (subject) => (dispatch) => {
//     dispatch({
//         type: actions.CREATE_SUBJECT_LOADING
//     });
//     axiosInstance.post('/subject/api/v1/create/subject', subject)
//         .then((res) => {
//             dispatch({
//                 type: actions.CREATE_SUBJECT_SUCCESS,
//                 payload: res.data.message.friendlyMessage
//             });
//             showSuccessToast(res.data.message.friendlyMessage)(dispatch)
//         }).catch((err) => {
//             dispatch({
//                 type: actions.CREATE_SUBJECT_FAILED,
//                 payload: err.response.data.message.friendlyMessage
//             });
//             showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
//         });
// }

export const deleteSubject = (subjectId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_SUBJECT_LOADING
    });
    const payload = {
        items: subjectId
    }

    axiosInstance.post('/subject/api/v1/delete/subject', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllSubjects()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateSubject = (updatedSubject) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SUBJECT_LOADING
    });

    axiosInstance.post('/subject/api/v1/update/subject', updatedSubject)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateSessionClassSubjects = (values) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SUBJECT_LOADING
    });

    axiosInstance.post('/class/api/v1/add-update/session-class-subjects', values)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
//SUBJECT ACTION HANDLERS

//SESSION CLASS ACTION HANDLERS
export const getAllSessionClasses = (sessionId) => (dispatch) => {

    if (!sessionId) {
        return;
    }

    dispatch({
        type: actions.FETCH_SESSION_CLASS_LOADING
    });

    axiosInstance.get(`/class/api/v1/get-all/session-classes${sessionId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SESSION_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SESSION_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}
export const getAllSessionClasses1 = (sessionId) => (dispatch) => {

    if (!sessionId) {
        return;
    }

    dispatch({
        type: actions.FETCH_SESSION_CLASS_LOADING
    });

    axiosInstance.get(`/class/api/v1/get-all/session-classes1/${sessionId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SESSION_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SESSION_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createSessionClass = (sessionClass) => (dispatch) => {
    dispatch({
        type: actions.CREATE_SESSION_CLASS_LOADING
    });
    axiosInstance.post('/class/api/v1/create/session-class', sessionClass)
        .then((res) => {
            dispatch({
                type: actions.CREATE_SESSION_CLASS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_SESSION_CLASS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteSessionClass = (selectedIds, sessionId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_SESSION_CLASS_LOADING
    });
    const payload = {
        item: selectedIds[0]
    }
    axiosInstance.post('/class/api/v1/delete-session-class', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_SESSION_CLASS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllSessionClasses(sessionId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_SESSION_CLASS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const updateSessionClass = (updatedSessionClass) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SESSION_CLASS_LOADING
    });

    axiosInstance.post('/class/api/v1/update/session-class', updatedSessionClass)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SESSION_CLASS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            fetchSingleSessionClass(updatedSessionClass.sessionClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SESSION_CLASS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
//SESSION CLASS ACTION HANDLERS


//GET ACTIVE CLASSES ACTION  HANDLER
export const getAllActiveClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_CLASSES_LOADING
    });

    axiosInstance.get('/class/api/v1/get-all/active-classes')
        .then((res) => {
            dispatch({
                type: actions.FETCH_ACTIVE_CLASSES_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ACTIVE_CLASSES_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET ACTIVE CLASSES ACTION  HANDLER

//CLASS SUBJECT IDS//
export const buildClassSubjectArray = (examSCore, assessment, subjectId, subject, subjectTeacherId, subjectTeacher, classSubjects, checkBoxValue = true) => (dispatch) => {
    var existingClassSubject = classSubjects.find(er => er.subjectId === subjectId);
    var otherClassSubject = classSubjects.filter(er => er.subjectId !== subjectId);
    if (existingClassSubject) {
        if (checkBoxValue) {
            existingClassSubject.subjectId = subjectId;
            existingClassSubject.subject = subject;
            existingClassSubject.subjectTeacher = subjectTeacher === "" ? existingClassSubject.subjectTeacher : subjectTeacher;
            existingClassSubject.subjectTeacherId = subjectTeacherId === "" ? existingClassSubject.subjectTeacherId : subjectTeacherId;
            existingClassSubject.examSCore = examSCore === "" ? existingClassSubject.examSCore : examSCore;
            existingClassSubject.assessment = assessment === "" ? existingClassSubject.assessment : assessment;
            classSubjects = [...otherClassSubject, existingClassSubject]
        } else {
           classSubjects = [...otherClassSubject]
        }
    } else {
        let newClassSubject = {
            subjectId,
            subject,
            subjectTeacherId,
            subjectTeacher,
            examSCore,
            assessment
        }
        classSubjects = [...classSubjects, newClassSubject]
    }

    dispatch({
        type: actions.PUSH_CLASS_SUBJECT_ID,
        payload: classSubjects
    })
}

export const updateClassSubjects = (examSCore, assessment, classSubjects) => dispatch => {
    classSubjects = classSubjects.map((subject, idx) => {
        subject.examSCore = examSCore;
        subject.assessment = assessment;
    })
}
//CLASS SUBJECT IDS//

//GET SINGLE SESSION CLASS
export const fetchSingleSessionClass = (sessionClassId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_SESSION_CLASS_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/class/api/v1/get-single/session-classes/${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_SESSION_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_SESSION_CLASS_FAILED,
                payload: err.response.data.result
            })
        });

}

//GET TEACHERS ACTION HANDLER
export const getAllActiveTeachers = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_TEACHERS_LOADING
    });

    axiosInstance.get('/tercher/api/v1/getall/active-teachers')
        .then((res) => {
            dispatch({
                type: actions.FETCH_ACTIVE_TEACHERS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ACTIVE_TEACHERS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET TEACHERS ACTION HANDLER

//GET ACTIVE SUBJECT ACTION  HANDLER
export const getAllActiveSubjects = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_SUBJECTS_LOADING,
    });

    axiosInstance.get('/subject/api/v1/getall/active-subject')
        .then((res) => {
            dispatch({
                type: actions.FETCH_ACTIVE_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_ACTIVE_SUBJECTS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET ACTIVE SUBJECT ACTION  HANDLER
//GET ACTIVE SUBJECT ACTION  HANDLER
export const getAllClassStudents = (sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_STUDENTS_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/class/api/v1/get-students/${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_STUDENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_STUDENTS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET ACTIVE SUBJECT ACTION  HANDLER


export const pushSessionClassId = (itemId) => {
    return {
        type: actions.PUSH_SESSION_CLASS_ID,
        payload: itemId
    }

}

//ATTENTANCE ACTION//
export const createRegister = (sessionClass) => (dispatch) => {
    dispatch({
        type: actions.CREATE_CLASS_REGISTER_LOADING
    });

    axiosInstance.post('/attendance/api/v1/create-register', sessionClass)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CLASS_REGISTER_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CLASS_REGISTER_FAILED,
                payload: err.response.data.result
            });
        });
}

export const getAllClassRegister = (sessionClassId, termId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_REGISTER_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/attendance/api/v1/get/all/class-register/${sessionClassId}?termId=${termId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_REGISTER_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_REGISTER_FAILED,
                payload: err.response.data.result
            })
        });
}

export const updateRegisterLabel = (classRegisterId, classRegisterLabel, sessionClassId, termId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CLASS_REGISTER_LABEL_LOADING
    });

    axiosInstance.post(`/attendance/api/v1/update/class-register?ClassRegisterId=${classRegisterId}&RegisterLabel=${classRegisterLabel}`)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_CLASS_REGISTER_LABEL_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClassRegister(sessionClassId, termId, 1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_CLASS_REGISTER_LABEL_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteClassRegister = (classRegisterId, sessionClassId, termId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASS_REGISTER_LOADING
    });

    axiosInstance.post(`/attendance/api/v1/delete/class-register?Item=${classRegisterId}`)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CLASS_REGISTER_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClassRegister(sessionClassId, termId, 1)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_CLASS_REGISTER_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const continueClassRegister = (classRegisterId) => (dispatch) => {
    dispatch({
        type: actions.CONTINUE_CLASS_REGISTER_LOADING
    });

    axiosInstance.get(`/attendance/api/v1/continue-attendance?ClassRegisterId=${classRegisterId}`)
        .then((res) => {
            dispatch({
                type: actions.CONTINUE_CLASS_REGISTER_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.CONTINUE_CLASS_REGISTER_FAILED,
                payload: err.response.data.result
            });
        });
}
export const updateAttendance = (classRegisterId, studentContactId, isPresent) => (dispatch) => {
    axiosInstance.post(`/attendance/api/v1/update/student-attendance`, { classRegisterId, studentContactId, isPresent })
        .then((res) => {

        }).catch((err) => {
            showErrorToast('Ooopsss.... unable to update attendance')(dispatch);
        });
}


export const createAttendance = (classRegisterId, studentContactId, isPresent, newClassRegister) => (dispatch) => {
    // const entryIndex = newClassRegister[0]?.attendanceList.findIndex(e => e.studentContactId === studentContactId)
    // let entry = newClassRegister[0]?.attendanceList.find(e => e.studentContactId == studentContactId);
    // if (entry) {
    //     entry.ispresent = isPresent
    //    newClassRegister[0].attendanceList[entryIndex] = entry;
    // dispatch({
    //            type: actions.CREATE_ATTENDANCE,
    //            payload: newClassRegister
    //        });

    axiosInstance.post(`/attendance/api/v1/update/student-attendance`, { classRegisterId, studentContactId, isPresent })
        .then((res) => {
            //   entry.isPresent = res.data.result.isPresent;
            //   newClassRegister[0].attendanceList[entryIndex] = entry
            //    dispatch({
            //        type: actions.CREATE_ATTENDANCE,
            //        payload: newClassRegister
            //    });
        }).catch((err) => {
            showErrorToast('Ooopsss.... unable to add attendance, please confirm entries')(dispatch);
        });
    //    }
}
export const getAllStudentsPresent = (classRegisterId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENTS_PRESENT_LOADING,
        payload: classRegisterId
    });

    axiosInstance.get(`/attendance/api/v1/get/present-students?classRegisterId=${classRegisterId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENTS_PRESENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENTS_PRESENT_FAILED,
                payload: err.response.data.result
            })
        });
}
export const getAllStudentsAbsent = (classRegisterId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENTS_ABSENT_LOADING,
        payload: classRegisterId
    });

    axiosInstance.get(`/attendance/api/v1/get/absent-students?classRegisterId=${classRegisterId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENTS_ABSENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENTS_ABSENT_FAILED,
                payload: err.response.data.result
            })
        });
}


export const resetCreateSuccessfulState = () => (dispatch) => {
    dispatch({
        type: actions.RESET_CREATE_SUCCESSFUL_STATE,
        payload: false
    });
}
export const resetclassRegisterState = () => (dispatch) => {
    dispatch({
        type: actions.RESET_CLASS_REGISTER_STATE,
        payload: [],
    });
}
export const resetSingleClassRegisterState = () => (dispatch) => {
    dispatch({
        type: actions.RESET_SINGLE_CLASS_REGISTER_STATE,
        payload: null,
    });
}
//ATTENTANCE ACTION//

//LESSON NOTE ACTION
export const createLessonNotes = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_LESSON_NOTES_LOADING
    });

    axiosInstance.post('/classnotes/api/v1/create/classnote', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const updateLessonNotes = (values) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_LESSON_NOTES_LOADING
    });

    axiosInstance.post('/classnotes/api/v1/update/classnote', values)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const getAllOtherStaff = (classNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFFACCOUNT_LOADING
    });

    axiosInstance.get(`/classnotes/api/v1/get-note/other-teachers?classNoteId=${classNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STAFFACCOUNT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_STAFFACCOUNT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const shareLessonNotes = (classNoteId, teacherId) => (dispatch) => {
    dispatch({
        type: actions.SHARE_LESSON_NOTES_LOADING
    });
    const payload = {
        classNoteId,
        teacherId,
    }

    axiosInstance.post('/classnotes/api/v1/share/classnote', payload)
        .then((res) => {
            dispatch({
                type: actions.SHARE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            respondModal("cancel")(dispatch);
            getAllOtherStaff(classNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.SHARE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            respondModal("cancel")(dispatch);
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const sendLessonNotes = (teacherClassNoteId, classes) => (dispatch) => {
    dispatch({
        type: actions.SHARE_LESSON_NOTES_LOADING
    });
    const payload = {
        teacherClassNoteId,
        classes,
    }

    axiosInstance.post('/classnotes/api/v1/send/classnotes/to-students', payload)
        .then((res) => {
            dispatch({
                type: actions.SHARE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            respondModal("cancel")(dispatch);
            getAllSharedOnStaffClasses(teacherClassNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.SHARE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            respondModal("cancel")(dispatch);
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const approveNotes = (classNoteId, shouldApprove) => (dispatch) => {
    dispatch({
        type: actions.APPROVE_NOTES_LOADING
    });
    const values = {
        classNoteId,
        shouldApprove
    }

    axiosInstance.post('/classnotes/api/v1/approve-or-dissaprove/classnote', values)
        .then((res) => {
            dispatch({
                type: actions.APPROVE_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.APPROVE_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const sendForApproval = (classNoteId) => (dispatch) => {
    dispatch({
        type: actions.SEND_FOR_APPROVAL_LOADING
    });
    const payload = {
        classNoteId,
    }

    axiosInstance.post('/classnotes/api/v1/send/classnotes/for-approval', payload)
        .then((res) => {
            dispatch({
                type: actions.SEND_FOR_APPROVAL_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.SEND_FOR_APPROVAL_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}


export const getAllLessonNotes = (classId, subjectId, status, termId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_LESSON_NOTES_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get/classnotes/by-teacher?classId=${classId}&subjectId=${subjectId}&status=${status}&termId=${termId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_LESSON_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_LESSON_NOTES_FAILED,
                payload: err.response?.data?.result
            })
        });
}


export const getSingleLessonNotes = (teacherClassNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_LESSON_NOTES_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get/single/teacher-classnote?TeacherClassNoteId=${teacherClassNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_LESSON_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_LESSON_NOTES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getLessonNoteContent = (formData) => (dispatch) => {
    dispatch({
        type: actions.FETCH_LESSON_NOTE_CONTENT_LOADING,
    });

    axiosInstance.post('/homeassessment/api/v1/get/lessonnote-content', formData)
        .then((res) => {
            dispatch({
                type: actions.FETCH_LESSON_NOTE_CONTENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_LESSON_NOTE_CONTENT_FAILED,
                payload: err.response.data.result
            })
        });
}


export const getNotesByStatus = (subjectId, status) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STATUS_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get/teacher-classnote/by-status?subjectId=${subjectId}&status=${status}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STATUS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STATUS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllUnapprovedLessonNotes = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_UNAPPROVED_LESSON_NOTES_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get/not-approved/classnotes`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_UNAPPROVED_LESSON_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_UNAPPROVED_LESSON_NOTES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllComments = (classNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_COMMENTS_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get-classnote/comments?classNoteId=${classNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_COMMENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_COMMENTS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getClassNoteViewers = (classNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_NOTE_VIEWERS_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get/classnote-viewers?classNoteId=${classNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_NOTE_VIEWERS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_NOTE_VIEWERS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getRelatedNotes = (classNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_RELATED_NOTES_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get/related-classnote?classNoteId=${classNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_RELATED_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_RELATED_NOTES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const deleteLessonNotes = (item, subjectId, classId, status, termId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_LESSON_NOTES_LOADING
    });
    const payload = {
        item
    }
    axiosInstance.post(`/classnotes/api/v1/delete/teacher/classnotes`, payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllLessonNotes(classId, subjectId, status, termId, 1)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const addComments = (classNoteId, comment) => (dispatch) => {
    dispatch({
        type: actions.ADD_COMMENTS_LOADING
    });
    const payload = {
        classNoteId,
        comment,
    }

    axiosInstance.post('/classnotes/api/v1/add-comment/to-classnote', payload)
        .then((res) => {
            dispatch({
                type: actions.ADD_COMMENTS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllComments(classNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.ADD_COMMENTS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const addReplies = (commentId, comment, classNoteId) => (dispatch) => {
    dispatch({
        type: actions.ADD_REPLIES_LOADING
    });
    const payload = {
        commentId,
        comment,
    }

    axiosInstance.post('/classnotes/api/v1/reply/classnote-comment', payload)
        .then((res) => {
            dispatch({
                type: actions.ADD_REPLIES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllComments(classNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.ADD_REPLIES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const addClassNoteComments = (classNoteId, comment) => (dispatch) => {
    dispatch({
        type: actions.ADD_COMMENTS_LOADING
    });
    const payload = {
        classNoteId,
        comment,
    }

    axiosInstance.post('/smp/studentclassnotes/api/v1/add-comment/to-classnote', payload)
        .then((res) => {
            dispatch({
                type: actions.ADD_COMMENTS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllComments(classNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.ADD_COMMENTS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const addClassNoteReplies = (commentId, comment, classNoteId) => (dispatch) => {
    dispatch({
        type: actions.ADD_REPLIES_LOADING
    });
    const payload = {
        commentId,
        comment,
    }

    axiosInstance.post('/smp/studentclassnotes/api/v1/reply/classnote-comment', payload)
        .then((res) => {
            dispatch({
                type: actions.ADD_REPLIES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllComments(classNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.ADD_REPLIES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const getLessonNoteDetails = (classNoteId) => (dispatch) => {

    var classNoteCommentUrl = axiosInstance.get(`/classnotes/api/v1/get-classnote/comments?classNoteId=${classNoteId}`);
    var relatedNotes = axiosInstance.get(`/classnotes/api/v1/get/related-classnote?classNoteId=${classNoteId}`);
    var canSeeNoteUrl = axiosInstance.get(`/classnotes/api/v1/get/classnote-viewers?classNoteId=${classNoteId}`);

    var urls = [classNoteCommentUrl, relatedNotes, canSeeNoteUrl];
    Promise.all(urls).then(response => {
        dispatch({
            type: actions.FETCH_COMMENTS_SUCCESS,
            payload: response[0].data.result
        });

        dispatch({
            type: actions.FETCH_RELATED_NOTES_SUCCESS,
            payload: response[1].data.result
        });
        dispatch({
            type: actions.FETCH_NOTE_VIEWERS_SUCCESS,
            payload: response[2].data.result
        });


    }).catch(er => {
        console.log(er);
    })
}

export const getAllClassNotes = (subjectId, pageNumber, termId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_NOTES_LOADING,
    });

    axiosInstance.get(`/smp/studentclassnotes/api/v1/get-classnote/bystudents?subjectId=${subjectId}&pageNumber=${pageNumber}&termId=${termId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_NOTES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllStudentNotes = (subjectId, status, pageNumber, termId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENT_NOTES_LOADING,
    });

    axiosInstance.get(`/smp/studentnotes/api/v1/get/studentnotes/by-student?subjectId=${subjectId}&status=${status}&pageNumber=${pageNumber}&termId=${termId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENT_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENT_NOTES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleStudentNotes = (studentNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_STUDENT_NOTES_LOADING,
    });

    axiosInstance.get(`/smp/studentnotes/api/v1/get-single/studentnote?studentNoteId=${studentNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_STUDENT_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_STUDENT_NOTES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getStudentNotesByTeacher = (classId, subjectId, status, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENT_NOTES_BY_TEACHER_LOADING,
    });

    axiosInstance.get(`/smp/studentnotes/api/v1/get/studentnotes/by-teacher?classId=${classId}&subjectId=${subjectId}&status=${status}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENT_NOTES_BY_TEACHER_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENT_NOTES_BY_TEACHER_FAILED,
                payload: err.response.data.result
            })
        });
}

export const addStudentNotes = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_LESSON_NOTES_LOADING
    });

    axiosInstance.post('/smp/studentnotes/api/v1/create/studentnote', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const updateStudentNotes = (values) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_LESSON_NOTES_LOADING
    });

    axiosInstance.post('/smp/studentnotes/api/v1/update/studentnote', values)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteStudentNotes = (item, subjectId, status, termId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_LESSON_NOTES_LOADING
    });
    const payload = {
        item
    }
    axiosInstance.post(`/smp/studentnotes/api/v1/delete/studentnote`, payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStudentNotes(subjectId, status, 1, termId)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const reviewNotes = (studentNoteId, shouldApprove) => (dispatch) => {
    dispatch({
        type: actions.APPROVE_NOTES_LOADING
    });
    const payload = {
        studentNoteId,
        shouldApprove
    }

    axiosInstance.post('/smp/studentnotes/api/v1/review/studentnote', payload)
        .then((res) => {
            dispatch({
                type: actions.APPROVE_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.APPROVE_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const sendForReview = (studentNoteId) => (dispatch) => {
    dispatch({
        type: actions.SEND_FOR_APPROVAL_LOADING
    });
    const payload = {
        studentNoteId,
    }

    axiosInstance.post('/smp/studentnotes/api/v1/send/studentnote-forreview', payload)
        .then((res) => {
            dispatch({
                type: actions.SEND_FOR_APPROVAL_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.SEND_FOR_APPROVAL_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const getUnreviewedClassNotes = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_REVIEW_LOADING,
    });

    axiosInstance.get(`/smp/studentnotes/api/v1/get/unreviewed/studentnote`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_REVIEW_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_REVIEW_FAILED,
                payload: err.response.data.result
            })
        });
}

export const addStudentComments = (studentNoteId, comment) => (dispatch) => {
    dispatch({
        type: actions.ADD_COMMENTS_LOADING
    });
    const payload = {
        studentNoteId,
        comment,
    }

    axiosInstance.post('/smp/studentnotes/api/v1/add-comment/to-studentnote', payload)
        .then((res) => {
            dispatch({
                type: actions.ADD_COMMENTS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStudentComments(studentNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.ADD_COMMENTS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const addStudentReplies = (commentId, comment, studentNoteId) => (dispatch) => {
    dispatch({
        type: actions.ADD_REPLIES_LOADING
    });
    const payload = {
        commentId,
        comment,
    }

    axiosInstance.post('/smp/studentnotes/api/v1/reply/studentnote-comment', payload)
        .then((res) => {
            dispatch({
                type: actions.ADD_REPLIES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStudentComments(studentNoteId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.ADD_REPLIES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const getAllStudentComments = (studentNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENT_COMMENTS_LOADING,
    });

    axiosInstance.get(`/smp/studentnotes/api/v1/get-studentnote/comments?studentNoteId=${studentNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENT_COMMENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENT_COMMENTS_FAILED,
                payload: err.response.data.result
            })
        });
}
export const getSubjectTeacher = (subjectId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SUBJECT_TEACHER_LOADING,
    });

    axiosInstance.get(`/subject/api/v1/get/subject-teacher?subjectId=${subjectId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SUBJECT_TEACHER_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SUBJECT_TEACHER_FAILED,
                payload: err.response.data.result
            })
        });
}
export const resetLessonNoteContentState = () => (dispatch) => {
    dispatch({
        type: actions.RESET_LESSON_NOTE_CONTENT_STATE,
        payload: {},
    });
}

//LESSON NOTE ACTION

//GROUP ACTION
export const getAllClassGroup = (sessionClassId, sessionClassSubjectId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_GROUP_LOADING,
    });

    axiosInstance.get(`/class/api/v1/getall/class-group?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_GROUP_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_GROUP_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleClassGroup = (groupId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_GROUP_LOADING,
    });

    axiosInstance.get(`/class/api/v1/getall/single/class-group?groupId=${groupId}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_GROUP_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_GROUP_FAILED,
                payload: err.response.data.result
            })
        });
}

export const deleteClassGroup = (items, sessionClassId, sessionClassSubjectIdQuery) => (dispatch) => {
    dispatch({
        type: actions.DELETE_GROUP_LOADING
    });
    const payload = {
        items
    }
    axiosInstance.post(`/class/api/v1/delete/class-group`, payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_GROUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClassGroup(sessionClassId, sessionClassSubjectIdQuery)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_GROUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createClassGroup = (groupName, sessionClassId, sessionClassSubjectId, studentContactIdArray) => (dispatch) => {
    dispatch({
        type: actions.CREATE_GROUP_LOADING
    });
    const payload = {
        groupName,
        sessionClassId,
        sessionClassSubjectId,
        studentContactIds: studentContactIdArray
    }
    axiosInstance.post('/class/api/v1/create/class-group', payload)
        .then((res) => {
            dispatch({
                type: actions.CREATE_GROUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_GROUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const updateClassGroup = (groupId, groupName, sessionClassId, sessionClassSubjectId, studentContactIdArray) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_GROUP_LOADING
    });

    const payload = {
        groupId,
        groupName,
        sessionClassId,
        sessionClassSubjectId,
        isActive: true,
        studentContactIds: studentContactIdArray
    }

    axiosInstance.post('/class/api/v1/update/class-group', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_GROUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_GROUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const getClassSubjects = (sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_SUBJECTS_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/class/api/v1/getall/class-subjects?sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_SUBJECTS_FAILED,
                payload: err.response.data.result
            })
        });
}

//ASSESSMENT ACTIONS

export const getAllHomeAssessment = (sessionClassId, sessionClassSubjectId, groupId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_HOME_ASSESSMENT_LOADING,
    });
    axiosInstance.get(`/homeassessment/api/v1/get/home-assessments?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}&groupId=${groupId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_HOME_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_HOME_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllClassAssessment = (sessionClassId, sessionClassSubjectId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_ASSESSMENT_LOADING,
    });
    axiosInstance.get(`/classassessment/api/v1/get-all/class-assessments?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getCBTClassAssessment = (sessionClassId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CBT_ASSESSMENT_LOADING,
    });
    axiosInstance.get(`/cbtassessment/api/v1/get/assessments?PageNumber=${pageNumber}&PageSize=${20}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CBT_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CBT_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getOpenStudentAssessment = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_HOME_ASSESSMENT_LOADING,
    });
    axiosInstance.get(`/smp/studentassessment/api/v1/get/open-assessments`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_HOME_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_HOME_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getStatusFilterForStudentAssessment = (status, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_HOME_ASSESSMENT_LOADING,
    });
    axiosInstance.get(`/smp/studentassessment/api/v1/filter/home-assessments?status=${status}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_HOME_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_HOME_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleHomeAssessment = (homeassessmentId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_HOME_ASSESSMENT_LOADING,
    });

    axiosInstance.get(`/homeassessment/api/v1/get/single/home-assessments?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_HOME_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_HOME_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleClassAssessment = (classAssessmentId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_CLASS_ASSESSMENT_LOADING,
    });

    axiosInstance.get(`/classassessment/api/v1/get-single/class-assessments?classAssessmentId=${classAssessmentId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_CLASS_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_CLASS_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getStudentClassAssessment = (classAssessmentId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENTS_CLASS_ASSESSMENT_LOADING,
    });

    axiosInstance.get(`/classassessment/api/v1/get-students/class-assessment?classAssessmentId=${classAssessmentId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENTS_CLASS_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENTS_CLASS_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleStudentHomeAssessment = (homeassessmentFeedBackId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_LOADING,
    });

    axiosInstance.get(`/smp/studentassessment/api/v1/get-single/home-assessments?homeassessmentFeedBackId=${homeassessmentFeedBackId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}


export const getAllSingleHomeAssessment = (homeassessmentId, homeassessmentFeedBackId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_HOME_ASSESSMENT_LOADING,
    });
    dispatch({
        type: actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_LOADING,
    });

    var teacherHomeAssessmentUrl = axiosInstance.get(`/homeassessment/api/v1/get/single/home-assessments?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
    var studentHomeAssessmentUrl = axiosInstance.get(`/smp/studentassessment/api/v1/get-single/home-assessments?homeassessmentFeedBackId=${homeassessmentFeedBackId}`)

    var urls = [teacherHomeAssessmentUrl, studentHomeAssessmentUrl];
    Promise.all(urls).then(response => {

        dispatch({
            type: actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_SUCCESS,
            payload: response[1].data.result
        });

        dispatch({
            type: actions.FETCH_SINGLE_HOME_ASSESSMENT_SUCCESS,
            payload: response[0].data.result
        });

    }).catch(err => {
        dispatch({
            type: actions.FETCH_SINGLE_HOME_ASSESSMENT_FAILED,
            payload: err.response.data.result
        })
        dispatch({
            type: actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_FAILED,
            payload: err.response.data.result
        })
    })
}

export const deleteHomeAssessment = (item, sessionClassId, sessionClassSubjectId, groupId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_ASSESSMENT_LOADING
    });
    const payload = {
        item
    }
    axiosInstance.post(`/homeassessment/api/v1/delete/home-assessment`, payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllHomeAssessment(sessionClassId, sessionClassSubjectId, groupId, 1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const closeHomeAssessment = (homeAssessmentId, sessionClassId, sessionClassSubjectId, groupId) => (dispatch) => {
    dispatch({
        type: actions.CLOSE_ASSESSMENT_LOADING
    });
    const payload = {
        homeAssessmentId
    }
    axiosInstance.post(`/homeassessment/api/v1/close/home-assessment`, payload)
        .then((res) => {
            dispatch({
                type: actions.CLOSE_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllHomeAssessment(sessionClassId, sessionClassSubjectId, groupId, 1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CLOSE_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createHomeAssessment = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_ASSESSMENT_LOADING
    });

    axiosInstance.post('/homeassessment/api/v1/create/home-assessment', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch);
            getAllHomeAssessment(values.sessionClassId, values.sessionClassSubjectId, values.sessionClassGroupId, 1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const addClassAssessment = (sessionClassSubjectId) => (dispatch) => {
    dispatch({
        type: actions.CREATE_CLASS_ASSESSMENT_LOADING
    });

    const payload = {
        sessionClassSubjectId
    }

    axiosInstance.post('/classassessment/api/v1/ceate/class-assessment', payload)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CLASS_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
            resetCreateSuccessfulState()(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CLASS_ASSESSMENT_FAILED,
                payload: err.response.data.result
            });

        });
}

export const updateHomeAssessment = (values) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_ASSESSMENT_LOADING
    });

    axiosInstance.post('/homeassessment/api/v1/update/home-assessment', values)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch);
            getAllHomeAssessment(values.sessionClassId, values.sessionClassSubjectId, values.sessionClassGroupId, 1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const deleteClassAssessment = (classAssessmentId, selectedSessionClassSubjectId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_ASSESSMENT_LOADING
    });
    const payload = {
        item: classAssessmentId,
    }
    axiosInstance.post(`/classassessment/api/v1/delete/class-assessment`, payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClassAssessment(sessionClassId, selectedSessionClassSubjectId, 1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateClassAssessmentScore = (classAssessmentId, classAssessmentScore, sessionClassSubjectIdQuery, sessionClassIdQuery) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_ASSESSMENT_LOADING
    });
    const payload = {
        classAssessmentId,
        classAssessmentScore
    }
    axiosInstance.post('/classassessment/api/v1/update/class-assessment/score', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            // resetCreateSuccessfulState()(dispatch);
            // showSuccessToast(res.data.message.friendlyMessage)(dispatch);
            fetchData(sessionClassIdQuery, sessionClassSubjectIdQuery, classAssessmentId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}
export const updateStudentClassAssessment = (sessionClassSubjectId, classAssessmentId, studentContactId, score) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_ASSESSMENT_LOADING
    });
    const payload = {
        sessionClassSubjectId,
        classAssessmentId,
        studentContactId,
        score,
    }
    axiosInstance.post('/classassessment/api/v1/update-student/class-assessment', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const submitHomeAssessmentFeedback = (homeAssessmentFeedBackId, score, comment, include, homeAssessmentId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.SUBMIT_ASSESSMENT_LOADING
    });
    const payload = {
        homeAssessmentFeedBackId,
        score,
        comment,
        include
    }
    axiosInstance.post('/homeassessment/api/v1/score/assessment-feedback', payload)
        .then((res) => {
            dispatch({
                type: actions.SUBMIT_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch);
            getAllSingleHomeAssessment(homeAssessmentId, homeAssessmentFeedBackId, sessionClassId)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.SUBMIT_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const submitStudentAssessment = (formData, status) => (dispatch) => {
    dispatch({
        type: actions.SUBMIT_ASSESSMENT_LOADING
    });

    axiosInstance.post('/smp/studentassessment/api/v1/submit/assessment-feedback', formData)
        .then((res) => {
            dispatch({
                type: actions.SUBMIT_ASSESSMENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch);
            getStatusFilterForStudentAssessment(status, 1)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.SUBMIT_ASSESSMENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });

            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}


export const sendAssesmentToStudents = (homeAssessmentId, checkBoxValue) => (dispatch) => {
    dispatch({
        type: actions.SEND_ASSESSMENT_TO_STUDENTS_LOADING
    });
    const payload = {
        homeAssessmentId,
        shouldSendToStudents: checkBoxValue
    }

    axiosInstance.post('/homeassessment/api/v1/send/home-assessment', payload)
        .then((res) => {
            dispatch({
                type: actions.SEND_ASSESSMENT_TO_STUDENTS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            resetCreateSuccessfulState()(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.SEND_ASSESSMENT_TO_STUDENTS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const getAssessmentScore = (sessionClassSubjectId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ASSESSMENT_SCORE_LOADING,
    });

    axiosInstance.get(`/homeassessment/api/v1/get/subject/assessment-score?sessionClassSubjectId=${sessionClassSubjectId}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ASSESSMENT_SCORE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_ASSESSMENT_SCORE_FAILED,
                payload: err.response.data.result
            })
            showErrorToast("An error occured, please try again")(dispatch);
        });
}

export const getScoreRecords = (homeAssessmentId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SCORE_RECORD_LOADING
    });

    axiosInstance.post('/homeassessment/api/v1/get/home-assessment/score-record', { homeAssessmentId })
        .then((res) => {
            dispatch({
                type: actions.FETCH_SCORE_RECORD_SUCCESS,
                payload: res.data.result
            });

        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SCORE_RECORD_FAILED,
                payload: err.response.data.result
            });
        });
}

export const includeClassToScoreRecord = (homeAssessmentId) => (dispatch) => {
    dispatch({
        type: actions.INCLUDE_CLASS_SCORE_RECORD_LOADING
    });
    const payload = {
        homeAssessmentId
    }

    axiosInstance.post('/homeassessment/api/v1/include-class/home-assessment/to-scoreentry', payload)
        .then((res) => {
            dispatch({
                type: actions.INCLUDE_CLASS_SCORE_RECORD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getScoreRecords(homeAssessmentId)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.INCLUDE_CLASS_SCORE_RECORD_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const includeStudentToScoreRecord = (homeAssessmentFeedBackId, homeAssessmentId) => (dispatch) => {
    dispatch({
        type: actions.INCLUDE_STUDENT_SCORE_RECORD_LOADING
    });
    const payload = {
        homeAssessmentFeedBackId
    }

    axiosInstance.post('/homeassessment/api/v1/include-student/home-assessment/to-scoreentry', payload)
        .then((res) => {
            dispatch({
                type: actions.INCLUDE_STUDENT_SCORE_RECORD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getScoreRecords(homeAssessmentId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.INCLUDE_STUDENT_SCORE_RECORD_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
        });
}

export const fetchData = (sessionClassIdQuery, sessionClassSubjectIdQuery, classAssessmentIdQuery) => async (dispatch) => {

    dispatch({
        type: actions.FETCH_ASSESSMENT_SCORE_LOADING,
    });

    dispatch({
        type: actions.FETCH_CLASS_SUBJECTS_LOADING,
    });

    dispatch({
        type: actions.FETCH_GROUP_LOADING,
    });

    dispatch({
        type: actions.FETCH_SINGLE_CLASS_ASSESSMENT_LOADING,
    });

    dispatch({
        type: actions.FETCH_STUDENTS_CLASS_ASSESSMENT_LOADING,
    });


    var assessmentScoreUrl = axiosInstance.get(`/homeassessment/api/v1/get/subject/assessment-score?sessionClassSubjectId=${sessionClassSubjectIdQuery}&sessionClassId=${sessionClassIdQuery}`)
    var classSubjectsUrl = axiosInstance.get(`/class/api/v1/getall/class-subjects?sessionClassId=${sessionClassIdQuery}`)
    var classGroupUrl = axiosInstance.get(`/class/api/v1/getall/class-group?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${sessionClassSubjectIdQuery}`)
    var classAssessmentUrl = axiosInstance.get(`/classassessment/api/v1/get-single/class-assessments?classAssessmentId=${classAssessmentIdQuery}`)
    var studentClassAssessmentUrl = axiosInstance.get(`/classassessment/api/v1/get-students/class-assessment?classAssessmentId=${classAssessmentIdQuery}`)

    var urls = [assessmentScoreUrl, classSubjectsUrl, classGroupUrl, classAssessmentUrl, studentClassAssessmentUrl];
    await Promise.all(urls).then(response => {
        dispatch({
            type: actions.FETCH_ASSESSMENT_SCORE_SUCCESS,
            payload: response[0].data.result
        });

        dispatch({
            type: actions.FETCH_CLASS_SUBJECTS_SUCCESS,
            payload: response[1].data.result
        });

        dispatch({
            type: actions.FETCH_GROUP_SUCCESS,
            payload: response[2].data.result
        });

        dispatch({
            type: actions.FETCH_SINGLE_CLASS_ASSESSMENT_SUCCESS,
            payload: response[3].data.result
        });

        dispatch({
            type: actions.FETCH_STUDENTS_CLASS_ASSESSMENT_SUCCESS,
            payload: response[4].data.result
        });

    }).catch(err => {
        showErrorToast('Please ensure you have adequate network')(dispatch);
        dispatch({
            type: actions.FETCH_ASSESSMENT_SCORE_FAILED,
            payload: err.response.data.result
        });

        dispatch({
            type: actions.FETCH_CLASS_SUBJECTS_FAILED,
            payload: err.response.data.result
        });

        dispatch({
            type: actions.FETCH_GROUP_FAILED,
            payload: err.response.data.result
        });

        dispatch({
            type: actions.FETCH_SINGLE_CLASS_ASSESSMENT_FAILED,
            payload: err.response.data.result
        });

        dispatch({
            type: actions.FETCH_STUDENTS_CLASS_ASSESSMENT_FAILED,
            payload: err.response.data.result
        });
    })
}


