import GetLocalToken, { LOGIN_SUCCESS } from "../../Commen/Constents"
import store from "../store"

export const LoginAction = (payload) => {
    if (payload) {
        localStorage.setItem("token", payload)
    } else {
        localStorage.removeItem("token")
        store.getState().Auth = null
    }
    return { payload: GetLocalToken(), type: LOGIN_SUCCESS }
}