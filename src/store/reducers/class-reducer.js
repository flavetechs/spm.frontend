import { actions } from "../action-types/class-action-types";
import { _state } from "../states/class-state";

export const classReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.GET_SINGLE_ITEM: {
      const selectedItem = state.itemList.find((d) => d.lookupId === payload);
      if (selectedItem) {
        return {
          ...state,
          selectedItem,
        };
      }
    }
      break;
    case actions.PUSH_ITEM_ID:
      var arrayToFilter = [...state.selectedIds, payload]
      return {
        ...state,
        selectedIds: [...new Set(arrayToFilter)],
      };
    case actions.REMOVE_ITEM_ID:
      var filteredIds = filterSelectedIds(state.selectedIds, payload);
      return {
        ...state,
        selectedIds: filteredIds,
      };
    case actions.RETURN_ITEM_LIST:
      return {
        ...state,
        itemList: payload,
      };
    case actions.RESET_CLASS_SETUP:
      return {
        ...state,
        itemList: [],
        message: "",
      };

    //CLASS ACTION REDUCERS

    case actions.FETCH_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };
    case actions.FETCH_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        itemList: payload,
        isSuccessful: false,
      };
    case actions.FETCH_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.CREATE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.UPDATE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.DELETE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.DELETE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
    //CLASS ACTION REDUCERS

    //SUBJECT ACTION REDUCERS
    case actions.FETCH_SUBJECTS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        itemList: payload,
      };
    case actions.FETCH_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_STUDENT_SUBJECTS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
        studentSubjectList: [],
      };
    case actions.FETCH_STUDENT_SUBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        studentSubjectList: payload,
      };
    case actions.FETCH_STUDENT_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
        studentSubjectList: [],
      };


    case actions.CREATE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_SUBJECT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.UPDATE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
      };
    case actions.UPDATE_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.DELETE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
    //SUBJECT ACTION REDUCERS

    //SESSION_CLASS ACTION REDUCERS
    case actions.FETCH_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        itemList: payload,
      };
    case actions.FETCH_SESSION_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.CREATE_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_SESSION_CLASS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.UPDATE_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
      };
    case actions.UPDATE_SESSION_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.DELETE_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.DELETE_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        selectedSessionId: "",
        message: payload,
        isSuccessful: true,
        loading: false,
      };
    case actions.DELETE_SESSION_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
    //SESSION_CLASS ACTION REDUCERS

    //GET TEACHER ACTION REDUCER
    case actions.FETCH_ACTIVE_TEACHERS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_ACTIVE_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        activeTeachers: payload,
      };
    case actions.FETCH_ACTIVE_TEACHERS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };
    //GET TEACHER ACTION REDUCER

    //GET ACTIVE SUBJECTS REDUCER
    case actions.FETCH_ACTIVE_SUBJECTS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_ACTIVE_SUBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        activeSubjects: payload,
      };
    case actions.FETCH_ACTIVE_SUBJECTS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };
    //GET ACTIVE SUBJECTS REDUCER

    //GET ACTIVE CLASSES REDUCER
    case actions.FETCH_ACTIVE_CLASSES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_ACTIVE_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        activeClasses: payload,
      };
    case actions.FETCH_ACTIVE_CLASSES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };
    //GET ACTIVE CLASSES REDUCER

    //CLASS SUBJECT IDS//
    case actions.PUSH_CLASS_SUBJECT_ID:
      return {
        ...state,
        classSubjects: payload,
      };

    case actions.FETCH_SINGLE_SESSION_CLASS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_SINGLE_SESSION_CLASS_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedItem: payload,
        classSubjects: payload.classSubjects,
      };
    }
    case actions.FETCH_SINGLE_SESSION_CLASS_FAILED: {
      return {
        ...state,
        loading: false,
        selectedItem: null,
      };
    }
    //GET SINGLE SESSION CLASS

    case actions.PUSH_SESSION_CLASS_ID:
      return {
        ...state,
        selectedIds: [payload],
      };

    case actions.FETCH_CLASS_STUDENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_CLASS_STUDENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        classStudents: payload,
      };
    }
    case actions.FETCH_CLASS_STUDENTS_FAILED: {
      return {
        ...state,
        loading: false,
        classStudents: null,
      };
    }

    //ATTENDANCE
    case actions.CREATE_CLASS_REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.CREATE_CLASS_REGISTER_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        loading: false,
        newClassRegister: payload,
      };
    case actions.CREATE_CLASS_REGISTER_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        loading: false,
        newClassRegister: null,
      };

    case actions.FETCH_CLASS_REGISTER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_CLASS_REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        classRegister: payload.data,
        filterProps: payload,
      };
    }
    case actions.FETCH_CLASS_REGISTER_FAILED: {
      return {
        ...state,
        loading: false,
        classRegister: [],
      };
    }
    case actions.UPDATE_CLASS_REGISTER_LABEL_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
        registerLabelUpdateSuccessful: false,
      };
    case actions.UPDATE_CLASS_REGISTER_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
        registerLabelUpdateSuccessful: true,
      };
    case actions.UPDATE_CLASS_REGISTER_LABEL_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
        registerLabelUpdateSuccessful: false,
      };

    case actions.DELETE_CLASS_REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.DELETE_CLASS_REGISTER_SUCCESS:
      return {
        ...state,
        selectedSessionId: "",
        message: payload,
        isSuccessful: true,
        loading: false,
      };
    case actions.DELETE_CLASS_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
    case actions.CONTINUE_CLASS_REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.CONTINUE_CLASS_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        singleClassRegister: payload,
      };
    case actions.CONTINUE_CLASS_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        singleClassRegister: null,
      };

    case actions.FETCH_STUDENTS_PRESENT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_STUDENTS_PRESENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentsPresence: payload,
      };
    }
    case actions.FETCH_STUDENTS_PRESENT_FAILED: {
      return {
        ...state,
        loading: false,
        studentsPresence: [],
      };
    }

    case actions.FETCH_STUDENTS_ABSENT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_STUDENTS_ABSENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentsPresence: payload,
      };
    }
    case actions.FETCH_STUDENTS_ABSENT_FAILED: {
      return {
        ...state,
        loading: false,
        studentsPresence: [],
      };
    }

    case actions.CREATE_ATTENDANCE:
      return {
        ...state,
        newClassRegister: payload,
      };

    case actions.RESET_SINGLE_CLASS_REGISTER_STATE: {
      return {
        ...state,
        singleClassRegister: payload,
      };
    }

    case actions.RESET_LESSON_NOTE_CONTENT_STATE: {
      return {
        ...state,
        lessonNoteContent: payload,
      };
    }

    case actions.RESET_CLASS_REGISTER_STATE: {
      return {
        ...state,
        classRegister: payload,
      };
    }

    case actions.RESET_CREATE_SUCCESSFUL_STATE: {
      return {
        ...state,
        createSuccessful: payload,
        singleGroupList: null
      };
    }
    //ATTENDANCE

    //LESSON NOTES
    case actions.CREATE_LESSON_NOTES_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.CREATE_LESSON_NOTES_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.CREATE_LESSON_NOTES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        message: payload,
        createSuccessful: false,
        loading: false,
      };

    case actions.UPDATE_LESSON_NOTES_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.UPDATE_LESSON_NOTES_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.UPDATE_LESSON_NOTES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        message: payload,
        loading: false,
      };

    case actions.FETCH_STAFFACCOUNT_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };

    case actions.FETCH_STAFFACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        otherStaffList: payload,
      };

    case actions.FETCH_STAFFACCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload
      };

    case actions.SHARE_LESSON_NOTES_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.SHARE_LESSON_NOTES_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.SHARE_LESSON_NOTES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.APPROVE_NOTES_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        createSuccessful: false,
      };
    case actions.APPROVE_NOTES_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
        createSuccessful: true,
      };
    case actions.APPROVE_NOTES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.SEND_FOR_APPROVAL_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        createSuccessful: false,
        sendApprovalSuccessful: false,
      };
    case actions.SEND_FOR_APPROVAL_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        createSuccessful: true,
        sendApprovalSuccessful: true,
      };
    case actions.SEND_FOR_APPROVAL_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        sendApprovalSuccessful: false,
        loading: false,
      };

    case actions.DELETE_LESSON_NOTES_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.DELETE_LESSON_NOTES_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.DELETE_LESSON_NOTES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.FETCH_SINGLE_LESSON_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
        singleLessonNotes: null,
      };
    }
    case actions.FETCH_SINGLE_LESSON_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        singleLessonNotes: payload,
      };
    }
    case actions.FETCH_SINGLE_LESSON_NOTES_FAILED: {
      return {
        ...state,
        loading: false,
        singleLessonNotes: null,
      };
    }

    case actions.FETCH_SINGLE_STUDENT_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
        singleStudentNotes: null,
      };
    }
    case actions.FETCH_SINGLE_STUDENT_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        singleStudentNotes: payload,
      };
    }
    case actions.FETCH_SINGLE_STUDENT_NOTES_FAILED: {
      return {
        ...state,
        loading: false,
        singleStudentNotes: null,
      };
    }

    case actions.FETCH_COMMENTS_LOADING: {
      return {
        ...state,
        loading: true,
        comments: [],
      };
    }
    case actions.FETCH_COMMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        comments: payload,
      };
    }
    case actions.FETCH_COMMENTS_FAILED: {
      return {
        ...state,
        loading: false,
        comments: [],
      };
    }

    case actions.FETCH_STUDENT_COMMENTS_LOADING: {
      return {
        ...state,
        loading: true,
        studentComments: [],
      };
    }
    case actions.FETCH_STUDENT_COMMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentComments: payload,
      };
    }
    case actions.FETCH_STUDENT_COMMENTS_FAILED: {
      return {
        ...state,
        loading: false,
        studentComments: [],
      };
    }

    case actions.FETCH_STATUS_LOADING: {
      return {
        ...state,
        loading: true,
        lessonNotes: [],
        studentNotes: [],
      };
    }
    case actions.FETCH_STATUS_SUCCESS: {
      return {
        ...state,
        loading: false,
        lessonNotes: payload,
        studentNotes: payload,
      };
    }
    case actions.FETCH_STATUS_FAILED: {
      return {
        ...state,
        loading: false,
        lessonNotes: [],
        studentNotes: [],
      };
    }

    case actions.FETCH_NOTE_VIEWERS_LOADING: {
      return {
        ...state,
        loading: true,
        viewers: [],
      };
    }
    case actions.FETCH_NOTE_VIEWERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        viewers: payload,
      };
    }
    case actions.FETCH_NOTE_VIEWERS_FAILED: {
      return {
        ...state,
        loading: false,
        viewers: [],
      };
    }

    case actions.FETCH_RELATED_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
        relatedNotes: [],
      };
    }
    case actions.FETCH_RELATED_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        relatedNotes: payload,
      };
    }
    case actions.FETCH_RELATED_NOTES_FAILED: {
      return {
        ...state,
        loading: false,
        relatedNotes: [],
      };
    }


    case actions.FETCH_UNAPPROVED_LESSON_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
        unapprovedLessonNotes: [],
      };
    }
    case actions.FETCH_UNAPPROVED_LESSON_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        unapprovedLessonNotes: payload,
      };
    }
    case actions.FETCH_UNAPPROVED_LESSON_NOTES_FAILED: {
      return {
        ...state,
        loading: false,
        unapprovedLessonNotes: [],
      };
    }

    case actions.FETCH_LESSON_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
        lessonNotes: [],
      };
    }
    case actions.FETCH_LESSON_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        lessonNotes: payload.data,
        filterProps: payload,
      };
    }
    case actions.FETCH_LESSON_NOTES_FAILED: {
      return {
        ...state,
        loading: false,
        lessonNotes: [],
      };
    }

    case actions.FETCH_LESSON_NOTE_CONTENT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_LESSON_NOTE_CONTENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        lessonNoteContent: payload,
      };
    }
    case actions.FETCH_LESSON_NOTE_CONTENT_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case actions.FETCH_CLASS_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
        classNotes: [],
      };
    }
    case actions.FETCH_CLASS_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        classNotes: payload.data,
        filterProps: payload,
      };
    }
    case actions.FETCH_CLASS_NOTES_FAILED: {
      return {
        ...state,
        loading: false,
        classNotes: [],
      };
    }

    case actions.FETCH_STUDENT_NOTES_LOADING: {
      return {
        ...state,
        loading: true,
        studentNotes: [],
      };
    }
    case actions.FETCH_STUDENT_NOTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentNotes: payload,
        filterProps: payload,
      };
    }
    case actions.FETCH_STUDENT_NOTES_FAILED: {
      return {
        ...state,
        loading: false,
        studentNotes: [],
      };
    }

    case actions.FETCH_STUDENT_NOTES_BY_TEACHER_LOADING: {
      return {
        ...state,
        loading: true,
        studentNotesByTeacher: [],
      };
    }
    case actions.FETCH_STUDENT_NOTES_BY_TEACHER_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentNotesByTeacher: payload,
      };
    }
    case actions.FETCH_STUDENT_NOTES_BY_TEACHER_FAILED: {
      return {
        ...state,
        loading: false,
        studentNotesByTeacher: [],
      };
    }

    case actions.FETCH_SUBJECT_TEACHER_LOADING: {
      return {
        ...state,
        loading: true,
        subjectTeacher: [],
      };
    }
    case actions.FETCH_SUBJECT_TEACHER_SUCCESS: {
      return {
        ...state,
        loading: false,
        subjectTeacher: payload,
      };
    }
    case actions.FETCH_SUBJECT_TEACHER_FAILED: {
      return {
        ...state,
        loading: false,
        subjectTeacher: [],
      };
    }

    case actions.ADD_COMMENTS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.ADD_COMMENTS_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.ADD_COMMENTS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        message: payload,
        loading: false,
      };

    case actions.ADD_REPLIES_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.ADD_REPLIES_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.ADD_REPLIES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        message: payload,
        loading: false,
      };

    //LESSON NOTES

    //GROUP REDUCER
    case actions.DELETE_GROUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.DELETE_GROUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.FETCH_GROUP_LOADING: {
      return {
        ...state,
        loading: true,
        groupList: [],
      };
    }
    case actions.FETCH_GROUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        groupList: payload,
      };
    }
    case actions.FETCH_GROUP_FAILED: {
      return {
        ...state,
        loading: false,
        groupList: [],
      };
    }

    case actions.FETCH_CLASS_SUBJECTS_LOADING: {
      return {
        ...state,
        loading: true,
        classSubjects: [],
      };
    }
    case actions.FETCH_CLASS_SUBJECTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        classSubjects: payload,
      };
    }
    case actions.FETCH_CLASS_SUBJECTS_FAILED: {
      return {
        ...state,
        loading: false,
        classSubjects: [],
      };
    }

    case actions.FETCH_SINGLE_GROUP_LOADING: {
      return {
        ...state,
        loading: true,
        singleGroupList: null,
      };
    }
    case actions.FETCH_SINGLE_GROUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        singleGroupList: payload,
      };
    }
    case actions.FETCH_SINGLE_GROUP_FAILED: {
      return {
        ...state,
        loading: false,
        singleGroupList: null,
      };
    }

    case actions.CREATE_GROUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.CREATE_GROUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        message: payload,
        createSuccessful: false,
        loading: false,
      };

    case actions.UPDATE_GROUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.UPDATE_GROUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        message: payload,
        loading: false,
      };
    //ASSESSMENT REDUCER
    case actions.DELETE_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.DELETE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.DELETE_ASSESSMENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.CLOSE_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.CLOSE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CLOSE_ASSESSMENT_FAILED:

    case actions.FETCH_HOME_ASSESSMENT_LOADING: {
      return {
        ...state,
        loading: true,
        assessmentList: [],
      };
    }
    case actions.FETCH_HOME_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        assessmentList: payload.data,
        filterProps: payload,
      };
    }
    case actions.FETCH_HOME_ASSESSMENT_FAILED: {
      return {
        ...state,
        loading: false,
        assessmentList: [],
      };
    }


    case actions.FETCH_CLASS_ASSESSMENT_LOADING: {
      return {
        ...state,
        loading: true,
        assessmentList: [],
      };
    }
    case actions.FETCH_CLASS_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        assessmentList: payload.data,
        filterProps: payload,
      };
    }
    case actions.FETCH_CLASS_ASSESSMENT_FAILED: {
      return {
        ...state,
        loading: false,
        assessmentList: [],
      };
    }

    case actions.FETCH_SINGLE_HOME_ASSESSMENT_LOADING: {
      return {
        ...state,
        loading: true,
        singleHomeAssessment: null,
      };
    }
    case actions.FETCH_SINGLE_HOME_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        singleHomeAssessment: payload,
      };
    }
    case actions.FETCH_SINGLE_HOME_ASSESSMENT_FAILED: {
      return {
        ...state,
        loading: false,
        singleHomeAssessment: null,
      };
    }

    case actions.FETCH_SINGLE_CLASS_ASSESSMENT_LOADING: {
      return {
        ...state,
        loading: true,
        singleClassAssessment: null,
      };
    }
    case actions.FETCH_SINGLE_CLASS_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        singleClassAssessment: payload,
      };
    }
    case actions.FETCH_SINGLE_CLASS_ASSESSMENT_FAILED: {
      return {
        ...state,
        loading: false,
        singleClassAssessment: null,
      };
    }

    case actions.FETCH_STUDENTS_CLASS_ASSESSMENT_LOADING: {
      return {
        ...state,
        loading: true,
        studentClassAssessment: null,
      };
    }
    case actions.FETCH_STUDENTS_CLASS_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentClassAssessment: payload,
      };
    }
    case actions.FETCH_STUDENTS_CLASS_ASSESSMENT_FAILED: {
      return {
        ...state,
        loading: false,
        studentClassAssessment: null,
      };
    }

    case actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_LOADING: {
      return {
        ...state,
        loading: true,
        studentSingleHomeAssessment: null,
      };
    }
    case actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentSingleHomeAssessment: payload,
      };
    }
    case actions.FETCH_STUDENTS_SINGLE_HOME_ASSESSMENT_FAILED: {
      return {
        ...state,
        loading: false,
        studentSingleHomeAssessment: null,
      };
    }

    case actions.CREATE_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.CREATE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.CREATE_ASSESSMENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        message: payload,
        createSuccessful: false,
        loading: false,
      };

    case actions.CREATE_CLASS_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        newClassAssessment: null,
      };
    case actions.CREATE_CLASS_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        newClassAssessment: payload,
        loading: false,
      };
    case actions.CREATE_CLASS_ASSESSMENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        loading: false,
        newClassAssessment: null,
      };

    case actions.UPDATE_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
      };
    case actions.UPDATE_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.UPDATE_ASSESSMENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        message: payload,
        loading: false,
      };

    case actions.SUBMIT_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.SUBMIT_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.SUBMIT_ASSESSMENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        message: payload,
        loading: false,
      };



    case actions.SEND_ASSESSMENT_TO_STUDENTS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,

      };
    case actions.SEND_ASSESSMENT_TO_STUDENTS_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,

      };
    case actions.SEND_ASSESSMENT_TO_STUDENTS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
      };

    case actions.FETCH_ASSESSMENT_SCORE_LOADING: {
      return {
        ...state,
        loading: true,
        assessmentScore: {},
      };
    }
    case actions.FETCH_ASSESSMENT_SCORE_SUCCESS: {
      return {
        ...state,
        loading: false,
        assessmentScore: payload,
      };
    }
    case actions.FETCH_ASSESSMENT_SCORE_FAILED: {
      return {
        ...state,
        loading: false,
        assessmentScore: {},
      };
    }
    case actions.FETCH_SCORE_RECORD_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_SCORE_RECORD_SUCCESS: {
      return {
        ...state,
        loading: false,
        scoreRecordList: payload,
      };
    }
    case actions.FETCH_SCORE_RECORD_FAILED: {
      return {
        ...state,
        loading: false,
        scoreRecordList: [],
      };
    }
    case actions.INCLUDE_CLASS_SCORE_RECORD_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.INCLUDE_CLASS_SCORE_RECORD_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.INCLUDE_CLASS_SCORE_RECORD_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        message: payload,
        loading: false,
      };

    case actions.INCLUDE_STUDENT_SCORE_RECORD_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.INCLUDE_STUDENT_SCORE_RECORD_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        createSuccessful: true,
        message: payload,
        loading: false,
      };
    case actions.INCLUDE_STUDENT_SCORE_RECORD_FAILED:
      return {
        ...state,
        isSuccessful: false,
        createSuccessful: false,
        message: payload,
        loading: false,
      };


    default:
      return state;
  }
};
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}
