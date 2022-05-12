import { productState } from "./state";
import { SET_PRODUCT, SET_PRODUCTS } from "./types";

export const prodReducer = (state = productState, option) => {
    switch (option.type) {
        case SET_PRODUCTS:
            state.products = option.payload
            break;
        case SET_PRODUCT:
            state.product = option.payload
            break
        default:
            break;
    }
    return { ...state }
}