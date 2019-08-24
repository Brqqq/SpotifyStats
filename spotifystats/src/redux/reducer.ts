import { GlobalState } from "../models/states";
import { handleActions, Action } from "redux-actions";

import * as actions from "./actions";

const initState: GlobalState = {
    accessToken: "",
    expiry: 0
}

export default handleActions({
    [actions.AUTH_TOKEN_RECEIVED]: (state: GlobalState, action: Action<string>) => {
        return { ...state, accessToken: action.payload};
    }
}, initState);