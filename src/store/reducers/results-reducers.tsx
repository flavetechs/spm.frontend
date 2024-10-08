import { actions } from "../action-types/results-action-types"
import { _state } from "../states/results-state"

export const resultsReducer = (state = _state, { type, payload}: any) => {
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
        scoreEntry: payload.data,
        filterProps: payload,
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
        scoreEntryPreview: payload.data,
        filterProps: payload,
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
        fetchPreviewSuccessful: false,
      };
    }
    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        previousScoreEntry: payload.data,
        filterProps: payload,
      };
    }
    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_FAILED: {
      return {
        ...state,
        loading: false,
        previousScoreEntry: null,
      };
    }

    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRY_PREVIEW_LOADING: {
      return {
        ...state,
        loading: true,
        previousScoreEntryPreview: null,
        fetchPreviewSuccessful: false,
      };
    }
    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRY_PREVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        previousScoreEntryPreview: payload.data,
        filterProps: payload,
        fetchPreviewSuccessful: true,
      };
    }
    case actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRY_PREVIEW_FAILED: {
      return {
        ...state,
        loading: false,
        previousScoreEntryPreview: null,
      };
    }

    case actions.FETCH_MASTER_LIST_LOADING: {
      return {
        ...state,
        loading: true,
        masterEntry: null,
      };
    }
    case actions.FETCH_MASTER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        masterEntry: payload,
      };
    }
    case actions.FETCH_MASTER_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        masterEntry: null,
      };
    }

    case actions.FETCH_CUMULATIVE_MASTER_LIST_LOADING: {
      return {
        ...state,
        loading: true,
        cumulativeEntry: null,
      };
    }
    case actions.FETCH_CUMULATIVE_MASTER_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        cumulativeEntry: payload,
      };
    }
    case actions.FETCH_CUMULATIVE_MASTER_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        cumulativeEntry: null,
      };
    }

    case actions.FETCH_STUDENT_RESULT_LOADING: {
      return {
        ...state,
        loading: true,
        studentResult: null,
      };
    }
    case actions.FETCH_STUDENT_RESULT_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentResult: payload,
      };
    }
    case actions.FETCH_STUDENT_RESULT_FAILED: {
      return {
        ...state,
        loading: false,
        studentResult: null,
      };
    }

    case actions.FETCH_BATCH_RESULT_PREVIEW_LOADING: {
      return {
        ...state,
        loading: true,
        batchResultPreview: null,
        printSuccessful:"loading",
      };
    }
    case actions.FETCH_BATCH_RESULT_PREVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        batchResultPreview: payload,
        printSuccessful:"loading",
      };
    }
    case actions.FETCH_BATCH_RESULT_PREVIEW_FAILED: {
      return {
        ...state,
        loading: false,
        batchResultPreview: null,
      };
    }

    case actions.FETCH_BATCH_RESULT_LOADING: {
      return {
        ...state,
        loading: true,
        batchResult: null,
        printSuccessful:"loading"
      };
    }
    case actions.FETCH_BATCH_RESULT_SUCCESS: {
      return {
        ...state,
        loading: false,
        batchResult: payload,
        printSuccessful:"successful"
      };
    }
    case actions.FETCH_BATCH_RESULT_FAILED: {
      return {
        ...state,
        loading: false,
        batchResult: null,
        printSuccessful:"unsuccessful"
      };
    }

    case actions.FETCH_SINGLE_PRINT_RESULT_LOADING: {
      return {
        ...state,
        loading: true,
        studentResult: null,
      };
    }
    case actions.FETCH_SINGLE_PRINT_RESULT_SUCCESS: {
      return {
        ...state,
        loading: false,
        studentResult: payload,
      };
    }
    case actions.FETCH_SINGLE_PRINT_RESULT_FAILED: {
      return {
        ...state,
        loading: false,
        studentResult: null,
      };
    }

    case actions.UPDATE_SCORE_ENTRY: {
      return {
        ...state,
        scoreEntry: payload,
      };
    }

    case actions.UPDATE_PREVIOUS_SCORE_ENTRY: {
      return {
        ...state,
        previousScoreEntry: payload,
      };
    }
    
    case actions.CLOSE_PREVIEW: {
      return {
        ...state,
        fetchPreviewSuccessful: payload,
      };
    }

    case actions.RESET_MASTER_LIST: {
      return {
        ...state,
        masterEntry: payload,
      };
    }

    case actions.RESET_SCORE_ENTRY: {
      return {
        ...state,
        scoreEntry: payload,
      };
    }

    case actions.RESET_PREVIOUS_SCORE_ENTRY: {
      return {
        ...state,
        previousScoreEntry: payload,
      };
    }
    
    case actions.RESET_CUMULATIVE_MASTER_LIST: {
      return {
        ...state,
        cumulativeEntry: payload,
      };
    }

    case actions.RESET_PRINT_SUCCESSFUL_STATE: {
      return {
        ...state,
        printSuccessful: payload,
      };
    }
//template setting reducer
case actions.SET_TEMPLATE_SETTING_STATE_LOADING: {
  return {
    ...state,
    isSuccessful: false,
    loading: true,
  };
}
case actions.SET_TEMPLATE_SETTING_STATE_SUCCESS: {
  return {
    ...state,
    isSuccessful: true,
    loading: false,
    message: payload,
    
  };
}
case actions.SET_TEMPLATE_SETTING_STATE_FAILED: {
  return {
    ...state,
    isSuccessful: false,
    loading: false,
    message: payload
  };
}
    default:
      return state
  }
}