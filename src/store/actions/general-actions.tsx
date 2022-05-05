import { actions } from "../action-types/general-action-types"

export const resetScreen = (value: any) => (dispatch: any) => {
    dispatch({
        type: actions.RESET_SCREEN,
        payload: value
    });

}