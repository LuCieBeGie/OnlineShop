import { orderState } from "./state";
import { SET_ORDERS } from "./types";

export const myOrders = (state = orderState, option) => {
    switch (option.type) {
        case SET_ORDERS:
            state.myOrders = option.payload
            break;
        default: break
    }
    return { ...state };
}