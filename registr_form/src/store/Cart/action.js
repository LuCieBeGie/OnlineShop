import { SET_MY_CART } from "./types";

export function setMyCart(data) {
    return {
        type: SET_MY_CART,
        payload: data
    }
}