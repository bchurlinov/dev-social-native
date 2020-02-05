import {
    LOG_IN,
    AUTO_LOGGED,
    LOG_OUT,
    AUTH_ERROR_MESSAGE,
    CLEAR_AUTH,
    LOAD_USER
} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    userData: [],
    errorMessage: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload
            }
        case AUTO_LOGGED:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOAD_USER:
            return {
                ...state,
                userData: action.payload
            }
        case LOG_OUT:
            return {
                ...state,
                isAuthenticated: false,
            }
        case AUTH_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message
            }
        case CLEAR_AUTH:
            return {
                ...state,
                errorMessage: ""
            }
        default:
            return state
    }
}

export default authReducer;