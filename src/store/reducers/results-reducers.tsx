import { actions } from "../action-types/results-action-types"
import { _state } from "../states/results-state"

export const resultsReducer = (state = _state, { type, payload }: any) => {
  switch (type) {
    case actions.FETCH_STAFF_CLASSES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
        fetchPreviewSuccessful: false,
      };
    case actions.FETCH_STAFF_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        staffClasses: payload,
      };
    case actions.FETCH_STAFF_CLASSES_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload
      };

    case actions.FETCH_STAFF_CLASS_SUBJECTS_LOADING: {
      return {
        ...state,
        loading: true,
        staffClassSubjects: null,
        fetchPreviewSuccessful: false,
      };
    }
    case actions.FETCH_STAFF_CLASS_SUBJECTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        staffClassSubjects: payload,
      };
    }
    case actions.FETCH_STAFF_CLASS_SUBJECTS_FAILED: {
      return {
        ...state,
        loading: false,
        staffClassSubjects: null,
      };
    }

    case actions.FETCH_CLASS_SCORE_ENTRIES_LOADING: {
      return {
        ...state,
        loading: true,
        scoreEntry: null,
        fetchPreviewSuccessful: false,
      };
    }
    case actions.FETCH_CLASS_SCORE_ENTRIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        scoreEntry: payload,
      };
    }
    case actions.FETCH_CLASS_SCORE_ENTRIES_FAILED: {
      return {
        ...state,
        loading: false,
        scoreEntry: null,
      };
    }

    case actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_LOADING: {
      return {
        ...state,
        loading: true,
        scoreEntryPreview: null,
        fetchPreviewSuccessful: false,
      };
    }
    case actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        scoreEntryPreview: payload,
        fetchPreviewSuccessful: true,
      };
    }
    case actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_FAILED: {
      return {
        ...state,
        loading: false,
        scoreEntryPreview: null,
      };
    }

    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_LOADING: {
      return {
        ...state,
        loading: true,
        previousScoreEntry: null,
        fetchPreviousPreviewSuccessful: false,
      };
    }
    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        previousScoreEntry: payload,
      };
    }
    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_FAILED: {
      return {
        ...state,
        loading: false,
        previousScoreEntry: null,
      };
    }


    case actions.FETCH_MASTER_LIST_LOADING: {
      return {
        ...state,
        loading: true,
        listEntry: null,
      };
    }
    case actions.FETCH_MASTER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        listEntry: payload,
      };
    }
    case actions.FETCH_MASTER_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        listEntry: null,
      };
    }


    case actions.UPDATE_SCORE_ENTRY: {
      return {
        ...state,
        scoreEntry: payload,
      };
    }

    case actions.CLOSE_PREVIEW: {
      return {
        ...state,
        fetchPreviewSuccessful: payload,
      };
    }

    default:
      return state
  }
}