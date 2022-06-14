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
            };
          }
          case actions.FETCH_CLASS_SCORE_ENTRIES_SUCCESS: {
            return {
              ...state,
              loading: false,
              scoreEntries: payload,
            };
          }
          case actions.FETCH_CLASS_SCORE_ENTRIES_FAILED: {
            return {
              ...state,
              loading: false,
              scoreEntries: null,
            };
          }


        default:
            return state
    }
}