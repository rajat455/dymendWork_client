import GetLocalToken from "../../Commen/Constents"

export const AuthReducer = (state = GetLocalToken(), action) => {
    return state || action.payload || null
}