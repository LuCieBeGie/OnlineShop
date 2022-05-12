import axios from "axios";
import { put, takeEvery, takeLatest, takeLeading } from 'redux-saga/effects'
import { checkUser, setUser } from "./User/action";
import { setProducts } from "./Product/action";
import { setProd } from "./Product/action";
import Swal from 'sweetalert2'
import {
    ADD_PRODUCT,
    ADD_USER,
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_USER,
    LOG_IN,
    LOG_OUT,
    GET_ALL_PRODUCTS,
    ADD_TO_CART,
    USER_CHECK,
    MY_CART,
    REMOVE_FROM_CART,
    CHECK_OUT
} from "./sagaTypes";
import { setMyCart } from "./Cart/action";
const Axiox = axios.create({
    withCredentials: true,
})

export function* rootSaga() {
    yield takeEvery(ADD_USER, addUser)
    yield takeEvery(LOG_IN, logIn)
    yield takeEvery(GET_USER, getUser)
    yield takeEvery(LOG_OUT, logOut)
    yield takeEvery(ADD_PRODUCT, addProduct)
    yield takeEvery(GET_PRODUCTS, getProducts)
    yield takeEvery(GET_PRODUCT, prodInfo)
    yield takeEvery(GET_ALL_PRODUCTS, allProducts)
    yield takeEvery(ADD_TO_CART, addToCart)
    yield takeEvery(USER_CHECK, userCheck)
    yield takeEvery(MY_CART, myCart)
    yield takeEvery(REMOVE_FROM_CART, removeFromCart)
    yield takeEvery(CHECK_OUT, checkOut)
}

function* addUser({ user, navigate }) {
    let { data } = yield Axiox.post('http://localhost:4000/users', { user: user })
    Swal.fire(data)
    navigate('/login')
}

function* logIn({ data, navigate }) {
    let result = yield Axiox.post('http://localhost:4000/login', data)
    console.log(result.data);
    if ('error' in result.data) {
        Swal.fire(result.data.error)
    } else {
        yield put(checkUser(true))
        navigate('/profile')
    }
}

function* getUser() {
    let { data } = yield Axiox.post('http://localhost:4000/profile')
    yield put(setUser(data.user));
}

function* logOut({ navigate }) {
    let user = yield Axiox.post('http://localhost:4000/logout')
    yield put(checkUser(false))
    navigate('/login')
}

function* addProduct({ product }) {
    const form = new FormData(product)
    let { data } = yield Axiox({
        method: "post",
        url: "http://localhost:4000/products",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
    })
    Swal.fire(data);
}

function* getProducts() {
    let { data } = yield Axiox.post('http://localhost:4000/myProducts')
    // console.log(data);
    yield put(setProducts(data))
}

function* prodInfo({ id }) {
    let { data } = yield Axiox.post('http://localhost:4000/prodInfo', { id: id })
    // console.log(data);
    yield put(setProd(data.product))
}

function* allProducts() {
    let { data } = yield Axiox.post('http://localhost:4000/allProducts')
    // console.log({ data });
    yield put(setProducts(data))
}

function* addToCart({ id }) {
    let { data } = yield Axiox.post('http://localhost:4000/addToCart', { id: id })
    Swal.fire(data)
}
function* userCheck() {
    let { data } = yield Axiox.post('http://localhost:4000/userCheck')
    // console.log('saga',data);
    yield put(checkUser(data))
}

function* myCart() {
    let { data } = yield Axiox.post('http://localhost:4000/myCart')
    // console.log(data);
    yield put(setMyCart(data))
}

function* removeFromCart({ id }) {
    let { data } = yield Axiox.post('http://localhost:4000/removeFromCart', { id: id })
    console.log(data);
    yield put(setMyCart(data))
}

function* checkOut({ body }) {
    let { data } = yield Axiox.post('http://localhost:4000/checkOut', { body: body })
    console.log(data);
    yield put(setMyCart(data))
}
