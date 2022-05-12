import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./saga";

const sagaMidlware = createSagaMiddleware()
export const store = createStore(reducers, applyMiddleware(sagaMidlware))
sagaMidlware.run(rootSaga)