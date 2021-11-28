import { TYPES } from "../utils/constants"

// Actions
export const setEditEventErrors = (errors) => {
    return {
        type: TYPES.SET_EDIT_EVENT_ERRORS,
        payload: errors
    }
}

export const setLoginErrors = (errors) => {
    return {
        type: TYPES.SET_LOGIN_ERRORS,
        payload: errors
    }
}

export const setRegisterErrors = (errors) => {
    return {
        type: TYPES.SET_REGISTER_ERRORS,
        payload: errors
    }
}

export const setCreateClassErrors = (errors) => {
    return {
        type: TYPES.SET_CREATE_CLASS_ERRORS,
        payload: errors
    }
}

export const unsetCreateClassErrors = (errors) => {
    return {
        type: TYPES.UNSET_CREATE_CLASS_ERRORS,
        payload: errors
    }
}

export const setEventViewErrors = (errors) => {
    return {
        type: TYPES.SET_EVENT_VIEW_ERRORS,
        payload: errors
    }
}

export const setProfileErrors = (errors) => {
    return {
        type: TYPES.SET_PROFILE_ERRORS,
        payload: errors
    }
}

// Initial State
const initialState = {
    register: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: "",
        certificate: "",
        doses: ""
    },
    login: {
        email: "",
        password: ""
    },
    createClass: {
        courseName: "",
        courseCode: "",
        numberOfStudents: "",
        percentageOfStudentsAllowed: "",
        startTime: "",
        endTime: ""
    },
    eventView: "",
    profile: {},
    editEvent: {}
}

// Reducer for this slice
export function errorsReducer(state = initialState, action){
    switch(action.type){
        case TYPES.SET_CREATE_CLASS_ERRORS:
            return {
                ...state,
                createClass: action.payload
            }
        case TYPES.SET_LOGIN_ERRORS:
            return {
                ...state,
                login: action.payload
            }
        case TYPES.SET_REGISTER_ERRORS:
            return {
                ...state,
                register: action.payload
            }
        case TYPES.UNSET_CREATE_CLASS_ERRORS:
            return {
                ...state,
                createClass: {
                    courseName: "",
                    courseCode: "",
                    numberOfStudents: "",
                    percentageOfStudentsAllowed: "",
                    startTime: "",
                    endTime: ""
                }
            }
        case TYPES.SET_EVENT_VIEW_ERRORS:
            return {
                ...state,
                eventView: action.payload
            }
        case TYPES.SET_PROFILE_ERRORS:
            return {
                ...state,
                profile: action.payload
            }
        case TYPES.SET_EDIT_EVENT_ERRORS:
            return {
                ...state,
                editEvent: action.payload
            }
        default:
            return state;
    }
}