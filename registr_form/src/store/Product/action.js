import { SET_PRODUCT, SET_PRODUCTS } from "./types"

export function setProducts(product) {
    return {
        type: SET_PRODUCTS,
        payload: product
    }
}

export function setProd(prod) {
    return {
        type: SET_PRODUCT,
        payload: prod
    }
}