import { SET_ORDERS } from "./types";

export function setMyOrders(data) {
    return {
        type: SET_ORDERS,
        payload: data
    }
}