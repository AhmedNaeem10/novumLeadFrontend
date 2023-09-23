import { REDUX_CONSTANS } from "../../constants/ReduxConstants"

const initialState = {
    username: '',
    token: null,
}

export const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case REDUX_CONSTANS.LOGIN:
            {
                return {
                    ...state,
                    username: action.payload.username,
                    token: action.payload.token,
                }
            }
        case REDUX_CONSTANS.LOGOUT:
            {
                return {
                    ...state,
                    username: '',
                    token: null,
                }
            }
        default: {
            return state;
        }
    }
}