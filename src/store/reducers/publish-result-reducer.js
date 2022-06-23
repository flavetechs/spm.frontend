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
    case actions.FETCH_TERM_CLASSESS_FAILED: {
      return {
        ...state,
        loading: false,
        sessionTerms: null,
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