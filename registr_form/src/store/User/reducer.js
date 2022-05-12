import { userState } from "./state";
import { CHECK_USER, SET_USER } from "./types";

export const userReducer = (state = userState, option) => {
    switch (option.type) {
        case SET_USER:
            state.user = option.payload
            break
        case CHECK_USER:
            state.auth = option.payload
            break
        default:
            break;
    }
    return { ...state }
}