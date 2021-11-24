import { TYPES } from "../utils/constants"

export const setUserProfile = (profile) => {
    return {
        type: TYPES.SET_USER_PROFILE,
        payload: profile
    }
}

const initialState = {}

export const profileReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.SET_USER_PROFILE:
            return action.payload
        default:
            return state
    }
}