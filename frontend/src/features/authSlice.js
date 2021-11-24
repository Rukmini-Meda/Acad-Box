import { isEmpty } from "lodash";
import { TYPES } from "../utils/constants";

export const setUserLoading = () => {
    return {
        type: TYPES.USER_LOADING
    }
}

export const setCurrentUser = (decoded) => {
    return {
        type: TYPES.SET_CURRENT_USER,
        payload: decoded
    }
}

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
}

export const authReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.SET_CURRENT_USER:{
            console.log(action);
            console.log(isEmpty(action.payload))
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
        default:
            return state;
    }
}

export const selectAuthenticationStatus = (state) => {
    return state.isAuthenticated
}

export const selectLoggedInUser = (state) => {
    return state.user
}

export const selectLoadingStatus = (state) => {
    return state.loading
}
