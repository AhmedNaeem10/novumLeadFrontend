import { REDUX_CONSTANS } from "../../constants/ReduxConstants"

const initialState = {
    id: null,
    username: '',
    token: null,
    name: null,
}

export const reducer = (state = initialState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case REDUX_CONSTANS.LOGIN:
            {
                return {
                    ...state,
                    id: action.payload.id,
                    username: action.payload.username,
                    token: action.payload.token,
                    name: action.payload.name,
                }
            }
        case REDUX_CONSTANS.LOGOUT:
            {
                return {
                    ...state,
                    id: null,
                    username: '',
                    token: null,
                    name: null,
                }
            }
        default: {
            return state;
        }
    }
}