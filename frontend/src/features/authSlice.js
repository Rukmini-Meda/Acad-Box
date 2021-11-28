import { isEmpty } from "lodash";
import { TYPES } from "../utils/constants";

// Actions
export const setUserLoading = () => {
    return {
        type: TYPES.USER_LOADING
    }
}

export const unsetUserLoading = () => {
    return {
        type: TYPES.USER_NOT_LOADING
    }
}

export const setCurrentUser = (decoded) => {
    return {
        type: TYPES.SET_CURRENT_USER,
        payload: decoded
    }
}

// Initial State
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
}

// Reducer for this slice
export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.SET_CURRENT_USER:{
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        }
        case TYPES.USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case TYPES.USER_NOT_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

// Selectors
export const selectAuthenticationStatus = (state) => {
    return state.isAuthenticated
}

export const selectLoggedInUser = (state) => {
    return state.user
}

export const selectLoadingStatus = (state) => {
    return state.loading
}
