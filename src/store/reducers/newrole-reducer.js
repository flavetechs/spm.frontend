import { _state } from "../states/newrole-state";
import { actions } from "../action-types/newrole-action-types"
export const newroleReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.CREATE_ROLE_LOADING:
            return {
                ...state, 
                loading: true
            }
            case actions.CREATE_ROLE_SUCCESS:
                return {
                    ...state, 
                    activities:payload,
                    loading: false
                }
        case actions.CREATE_ROLE_FAILED:
            return {
                ...state, 
                loading: false
            }
        default:
            return state
    }
}