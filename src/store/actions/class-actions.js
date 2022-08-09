import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/class-action-types";
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
//SUBJECT ACTION HANDLERS

//SESSION CLASS ACTION HANDLERS
export const getAllSessionClasses = (sessionId) => (dispatch) => {

    if(!sessionId){
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

export const deleteSessionClass = (selectedIds, activeSessionId) => (dispatch) => {
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
            getAllSessionClasses(activeSessionId)(dispatch);
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
export const buildClassSubjectArray = (examSCore, assessment, subjectId, subjectTeacherId, classSubjects, checkBoxValue = true) => (dispatch) => {
    var existingClassSubject = classSubjects.find(er => er.subjectId === subjectId);
    var otherClassSubject = classSubjects.filter(er => er.subjectId !== subjectId);
    if (existingClassSubject) {
        if (checkBoxValue) {
            existingClassSubject.subjectId = subjectId;
            existingClassSubject.subjectTeacherId = subjectTeacherId == "" ? existingClassSubject.subjectTeacherId : subjectTeacherId;
            existingClassSubject.examSCore = examSCore == "" ? existingClassSubject.examSCore : examSCore;
            existingClassSubject.assessment = assessment == "" ? existingClassSubject.assessment : assessment;
            classSubjects = [...otherClassSubject, existingClassSubject]
        } else {
            classSubjects = [...otherClassSubject]
        }
    } else {
        let newClassSubject = {
            subjectId,
            subjectTeacherId,
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

export const getAllClassRegister = (sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_REGISTER_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/attendance/api/v1/get/all/class-register/${sessionClassId}`)
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

export const updateRegisterLabel = (classRegisterId,classRegisterLabel, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CLASS_REGISTER_LABEL_LOADING
    });

    axiosInstance.post(`/attendance/api/v1/update/class-register?ClassRegisterId=${classRegisterId}&RegisterLabel=${classRegisterLabel}`)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_CLASS_REGISTER_LABEL_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClassRegister(sessionClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_CLASS_REGISTER_LABEL_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteClassRegister = (classRegisterId,sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASS_REGISTER_LOADING
    });

    axiosInstance.post(`/attendance/api/v1/delete/class-register?Item=${classRegisterId}`)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CLASS_REGISTER_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClassRegister(sessionClassId)(dispatch)
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
    axiosInstance.post(`/attendance/api/v1/update/student-attendance`, {classRegisterId, studentContactId, isPresent})
    .then((res) => {
        
    }).catch((err) => {
        showErrorToast('Ooopsss.... unable to update attendance')(dispatch);
    });
}


    export const createAttendance = (classRegisterId, studentContactId, isPresent, newClassRegister) => (dispatch) => {
        const entryIndex = newClassRegister[0]?.attendanceList.findIndex(e => e.studentContactId === studentContactId)
        let entry = newClassRegister[0]?.attendanceList.find(e => e.studentContactId == studentContactId);
        if (entry) {
            entry.ispresent = isPresent
           newClassRegister[0].attendanceList[entryIndex] = entry;
        dispatch({
                   type: actions.CREATE_ATTENDANCE,
                   payload: newClassRegister
               });
      
               axiosInstance.post(`/attendance/api/v1/update/student-attendance`, {classRegisterId, studentContactId, isPresent})
                   .then((res) => {
                      entry.isPresent = res.data.result.isPresent;
                      newClassRegister[0].attendanceList[entryIndex] = entry
                       dispatch({
                           type: actions.CREATE_ATTENDANCE,
                           payload: newClassRegister
                       });
                   }).catch((err) => {
                       showErrorToast('Ooopsss.... unable to add attendance, please confirm entries')(dispatch);
                   });
           }
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

export const shareLessonNotes = (classNoteId,teacherId) => (dispatch) => {
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


export const getAllLessonNotes = (subjectId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_LESSON_NOTES_LOADING,
    });

    axiosInstance.get(`/classnotes/api/v1/get/classnotes/by-teacher?subjectId=${subjectId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_LESSON_NOTES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_LESSON_NOTES_FAILED,
                payload: err.response.data.result
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

export const getClassNotesByStatus = (subjectId,status) => (dispatch) => {
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

export const deleteLessonNotes = (item,subjectId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_LESSON_NOTES_LOADING
    });
const payload= {
    item
}
    axiosInstance.post(`/classnotes/api/v1/delete/teacher/classnotes`,payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_LESSON_NOTES_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllLessonNotes(subjectId)(dispatch)
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_LESSON_NOTES_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const addComments = (classNoteId,comment) => (dispatch) => {
    dispatch({
        type: actions.ADD_COMMENTS_LOADING
    });
const payload ={
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

export const addReplies = (commentId,comment,classNoteId) => (dispatch) => {
    dispatch({
        type: actions.ADD_REPLIES_LOADING
    });
const payload ={
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

export const getDetails = (classNoteId) => (dispatch) => {
    dispatch({
        type: actions.ADD_REPLIES_LOADING
    });
// const payload ={
//         commentId,
//         comment,
// }

        Promise.all([`/classnotes/api/v1/get/classnote-viewers?classNoteId=${classNoteId}`])
       .then((res) => {
        console.log(res[0]);
        // dispatch({
        //     type: actions.FETCH_NOTE_VIEWERS_SUCCESS,
        //     payload: res[0].data.result
        // });
//     console.log(response[1]);
//    console.log(response[2]);
//    console.log(response[3]);
// console.log(response[4]);
  })
  .catch((err) => {
    // dispatch({
    //     type: actions.FETCH_NOTE_VIEWERS_FAILED,
    //     payload: err[0].response.data.result
    // })
    console.error(err.message)
  });
}
//LESSON NOTE ACTION