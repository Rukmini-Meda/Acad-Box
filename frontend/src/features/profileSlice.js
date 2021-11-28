import { TYPES } from "../utils/constants"

// Actions
export const setUserProfile = (profile) => {
    return {
        type: TYPES.SET_USER_PROFILE,
        payload: profile
    }
}

// Initial State
const initialState = {}

// Reducer for this slice
export const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.SET_USER_PROFILE:
            return action.payload
        default:
            return state
    }
}