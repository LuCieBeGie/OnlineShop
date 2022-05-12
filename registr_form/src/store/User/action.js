import { CHECK_USER, SET_USER } from "./types"

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}
export function checkUser(data) {
    return {
        type: CHECK_USER,
        payload: data
    }
}