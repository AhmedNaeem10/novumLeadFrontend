import { REDUX_CONSTANS } from "../../constants/ReduxConstants"

export const adminLogin = (data) => {
    return {
        type: REDUX_CONSTANS.LOGIN,
        payload: data
    }
}


export const adminLogout = () => {
    return {
        type: REDUX_CONSTANS.LOGOUT,
    }
}