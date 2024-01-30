import axios from "axios"
import GetLocalToken, { UnAuthorized } from "./Constents";
import Path from "./Path";
import { jwtDecode } from "jwt-decode";

class ApiHelper {
    constructor() {
        // this.baseUrl = "http://localhost:5000/api"
        this.baseUrl = "http://192.168.1.31:5000/api"
        axios.interceptors.response.use(async function (response) {
            let user = GetLocalToken()
            if(!user) user = jwtDecode(response.data.token)
            try {
                let permissions = await fetch(`http://192.168.1.31:5000/permission/${user.role}`)
                if (permissions.status !== 200) return response
                permissions = await permissions.json()
                permissions = permissions.permissions || null
                if (permissions) localStorage.setItem("permission", JSON.stringify(permissions))
                return response
            } catch (error) {
                return response
            }
        }, function (error) {
            if (error.response && error.response.data && error.response.data.message) {
                if (error.response.status === 401 && error.response.data.message === UnAuthorized) {
                    localStorage.removeItem("token")
                    window.location.pathname = Path.login
                    return Promise.reject(error);
                }
                error.message = error.response.data.message
            }
            return Promise.reject(error);
        });

        axios.interceptors.request.use(function (req) {
            const token = localStorage.getItem("token")
            if (!token) {
                localStorage.removeItem("permission")
            }
            req.headers.set("token", token)
            return req;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    getPermissions(role) {

    }

    getUsers(role) {
        return axios.get(this.baseUrl + "/user/" + role)
    }

    createUser(data) {
        return axios.post(this.baseUrl + "/user", data)
    }
    AssignWork(data) {
        return axios.post(this.baseUrl + "/work", data)
    }
    deleteUser(id) {
        return axios.delete(this.baseUrl + "/user/" + id)
    }
    listKapan() {
        return axios.get(this.baseUrl + "/kapan")
    }
    InsertKapan(data) {
        return axios.post(this.baseUrl + "/kapan", data)
    }
    deleteKapan(id) {
        return axios.delete(this.baseUrl + "/kapan/" + id)
    }
    InsertLot(data) {
        return axios.post(this.baseUrl + "/lot", data)
    }
    listLot() {
        return axios.get(this.baseUrl + "/lot")
    }
    insertLot(data) {
        return axios.post(this.baseUrl + "/lot", data)
    }
    getWork() {
        return axios.get(this.baseUrl + "/work")
    }
    completeWork(data) {
        return axios.post(this.baseUrl + '/work/complet', data)
    }
    loginUser(data) {
        return axios.post(this.baseUrl + "/user/login", data)
    }
}

const apiHelper = new ApiHelper()
export default apiHelper