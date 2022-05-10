import { actions } from "../action-types/general-action-types"
import { _state } from "../states/general-state"

export const generalReducer = (state = _state, { type, payload }: any) => {
    switch (type) {
        case actions.RESET_SCREEN:
            return {
                ...state,
                refreshScreen: payload,
            }
        default:
            return state
    }
}