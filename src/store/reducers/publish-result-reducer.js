import { actions } from "../action-types/publish-result-action-types";
import { _state } from "../states/publish-state";

export const publishresultsReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_SESSIONS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
        fetchPreviewSuccessful: false,
      };
    case actions.FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        schoolSessions: payload,
      };
    case actions.FETCH_SESSIONS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload
      };



    case actions.FETCH_SESSIONS_TERMS_LOADING: {
      return {
        ...state,
        loading: true,
        sessionTerms: null,
        fetchPreviewSuccessful: false,
      };
    }
    case actions.FETCH_SESSIONS_TERMS_SUCCESS: {
      return {
        ...state,
        loading: false,
        sessionTerms: payload,
      };
    }
    case actions.FETCH_SESSIONS_TERMS_FAILED: {
      return {
        ...state,
        loading: false,
        sessionTerms: null,
      };
    }

    case actions.UPDATE_PUBLISH_RESULT: {
      return {
        ...state,
        publishSingleStudent: payload,
      };
    }


    case actions.FETCH_TERM_CLASSESS_LOADING: {
      return {
        ...state,
        loading: true,
        termClasses: null,
        fetchPreviewSuccessful: false,
      };
    }
    case actions.FETCH_TERM_CLASSESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        termClasses: payload,
      };
    }
    case actions.FETCH_TERM_CLASSESS_FAILED: {
      return {
        ...state,
        loading: false,
        termClasses: null,
      };
    }

    case actions.FETCH_RESULT_LIST_LOADING: {
      return {
        ...state,
        loading: true,
        publishResults: null,
      };
    }
    case actions.FETCH_RESULT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        publishResults: payload.data,
        filterProps: payload,
      };
    }
    case actions.FETCH_RESULT_LIST_FAILED: {
      return {
        ...state,
        loading: false,
        publishResults: null,
      };
    }


    case actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_LOADING: {
      return {
        ...state,
        loading: true,
        publishSingleStudent: null,
      };
    }
    case actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        publishSingleStudent: payload,
      };
    }
    case actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_FAILED: {
      return {
        ...state,
        loading: false,
        publishSingleStudent: null,
      };
    }

    case actions.UPDATE_PUBLISH_RESULT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_PUBLISH_RESULT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_PUBLISH_RESULT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };



    case actions.RESET_RESULT_PUBLISH_LIST: {
      return {
        ...state,
        publishResults: payload,
      };
    }

    case actions.SET_PREVIEW_IDS: {
      return {
        ...state,
        idsObj: payload,
      };
    }

    case actions.FETCH_PUBLISH_LIST_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };

    case actions.FETCH_PUBLISH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        publishedList: payload,
      };

    case actions.FETCH_PUBLISH_LIST_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload
      };

    default:
      return state
  }
}