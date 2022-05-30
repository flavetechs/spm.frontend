import { actions } from "../action-types/general-action-types"
import { _state } from "../states/general-state"

export const generalReducer = (state = _state, { type, payload }: any) => {
    switch (type) {
        case actions.RESET_SCREEN:
            return {
                ...state,
                refreshScreen: payload,
            }
            case actions.FETCH_ACTIVE_SESSION_LOADING:
                return {
                  ...state,
                  loading: true,
                  message: '',
                  isSuccessful: false
                };
          
              case actions.FETCH_ACTIVE_SESSION_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  activeSession: payload,
                };
          
              case actions.FETCH_ACTIVE_SESSION_FAILED:
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