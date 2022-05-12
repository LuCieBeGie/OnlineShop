import { cartState } from "./state";
import { SET_MY_CART } from "./types";

export const myCartReducer = (state = cartState, option) => {
    switch (option.type) {
        case SET_MY_CART:
            state.myCart = option.payload;
            break;
        default:
            break;
    }
    return { ...state }
}