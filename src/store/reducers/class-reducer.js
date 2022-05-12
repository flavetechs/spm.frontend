import { actions } from "../action-types/class-action-types";
import { _state } from "../states/class-state"

export const classReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        classList: payload,
        isSuccessful: false
      };
    case actions.FETCH_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.CREATE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false
      };
    case actions.CREATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        classList: payload,
        isSuccessful: true,
        loading: false
      };
    case actions.CREATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false
      };

    case actions.UPDATE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true
      };
    case actions.UPDATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true
      };
    case actions.UPDATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.DELETE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true
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
        isSuccessful: false
      };

    case actions.GET_SINGLE_CLASS: {
      const selectedClass = state.classList.filter(d => d.lookupId == payload)[0];
      if (selectedClass) {
        return {
          ...state,
          selectedClass: selectedClass,
        }
      }
    }

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
        subjectList: payload,
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
        message: ''
      };
    case actions.CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_SUBJECT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload
      };

    case actions.UPDATE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UPDATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true
      };
    case actions.UPDATE_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.GET_SINGLE_SUBJECT: {
      const selectedSubject = state.subjectList.find(d => d.lookupId == payload);
      if (selectedSubject) {
        return {
          ...state,
          selectedItem: selectedSubject,
        }
      }
    };

    case actions.PUSH_SUBJECT_ID:
      return {
        ...state,
        selectedIds: [...state.selectedIds, payload]
      }

    case actions.DELETE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false
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
        isSuccessful: false
      };



    case actions.PUSH_SUBJECT_ID:
      return {
        ...state,
        selectedIds: payload
      }

    case actions.REMOVE_SUBJECT_ID:
      var filteredIds = filterSelectedIds(state.selectedIds, payload)
      return {
        ...state,
        selectedIds: filteredIds
      }

    case actions.RETURN_LIST:
      return {
        ...state,
        subjectList: payload,
      };

    //SUBJECT ACTION REDUCERS




    default:
      return state;
  }
};
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}
