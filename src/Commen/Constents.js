import { jwtDecode } from "jwt-decode"

export const role = {
    all: "all",
    manager: "manager",
    employee: "employee",
    admin: "admin"
}

export const purpose = {
    toching: "toching",
    fourP: "fourP",
}


export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_ERROR = "LOGIN_ERROR"

export const UnAuthorized = "UnAuthorized"

export default function GetLocalToken() {
    try {
        return jwtDecode(localStorage.getItem("token"))
    } catch (error) {
        return null
    }
}