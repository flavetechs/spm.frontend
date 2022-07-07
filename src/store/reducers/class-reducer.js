import { actions } from "../action-types/class-action-types";
import { _state } from "../states/class-state";

export const classReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.GET_SINGLE_ITEM: {
      const selectedItem = state.itemList.find((d) => d.lookupId == payload);
      if (selectedItem) {
        return {
          ...state,
          selectedItem,
        };
      }
    }
    case actions.PUSH_ITEM_ID:
      return {
        ...state,
        selectedIds: [...state.selectedIds, payload],
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
        loading: false,
        singleClassRegister: payload,
      };
    case actions.CREATE_CLASS_REGISTER_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        singleClassRegister: [],
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
        classRegister: payload,
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
        singleClassRegister: [],
      };

      case actions.FETCH_STUDENTS_PRESENT: {
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

    case actions.UPDATE_ATTENDANCE: 
      return {
        ...state,
        singleClassRegister: payload,
      };

    //ATTENDANCE

    default:
      return state;
  }
};
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}
