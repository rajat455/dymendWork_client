import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { thunk } from "redux-thunk"
import { AuthReducer } from "./Auth/AuthReducers"
import GetLocalToken from "../Commen/Constents"



const initState = {
    Auth: GetLocalToken(),
}


const reducers = combineReducers({
    Auth: AuthReducer
})

const store = createStore(reducers, initState, compose(applyMiddleware(thunk)))


export default store