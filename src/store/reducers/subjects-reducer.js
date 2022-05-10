import { actions } from "../action-types/subjects-action-types";
import { _state } from "../states/subjects-state";

export const subjectsReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.SUBJECTS_LOADING:
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
        subjects: payload,
        isSuccessful: true,
      };
    case actions.SUBJECT_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
    case actions.CREATE_UPDATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        subjects: payload,
        message: "Subject created successfuly",
        isSuccessful: true,
      };
    case actions.EDIT_SUBJECT:
      return {
        ...state,
        lookupId: payload.lookupId,
        message: "",
        name: payload.name,
      };
    case actions.REMOVE_SUBJECT_ID: {
      var filteredIds = filterSelectedIds(state.selectIds, payload);
      return {
        ...state,
        selectIds: filteredIds,
      };
    }

    case actions.PUSH_SUBJECT_ID: {
      return {
        ...state,
        selectIds: [...state.selectIds, payload],
      };
    }

    case actions.DELETE_SUCCESS: {
      return {
        ...state,
        selectIds: [],
        message: "Successfuly deleted",
        isSuccessful: true,
      };
    }
    case actions.RETURN_LIST: {
      return {
        ...state,
        subjects: payload,
      };
    }
    case actions.FETCH_SINGLE_SUBJECT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_SINGLE_SUBJECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedSubject: payload,
      };
    }
    case actions.FETCH_SINGLE_SUBJECT_FAILED: {
      return {
        ...state,
        loading: false,
        selectedSubject: null,
      };
    }
    case actions.UPDATE_SUBJECT_ACTIVITY_STATE:
      return {
        ...state,
        selectedSubject: payload,
      };
    case actions.UPDATE_SUBJECT_NAME_STATE:
      return {
        ...state,
        selectedSubject: payload,
      };
    case actions.CREATE_SUBJECT_STATE:
      return {
        ...state,
        newsubject: payload,
      };

    case actions.CREATE_SUBJECT_NAME_STATE:
      return {
        ...state,
        newsubject: payload,
      };

    case actions.DELETE_SUBJECT_STATE:
      return {
        ...state,
        selectIds: [...payload],
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
