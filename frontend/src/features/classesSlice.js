import { TYPES } from "../utils/constants"

// Actions
export const setClass = (event) => {
    return {
        type: TYPES.SET_CLASS,
        payload: event
    }
}

export const setClasses = (events) => {
    return {
        type: TYPES.SET_CLASSES,
        payload: events
    }
}

// Initial State
const initialState = {
    event: {},
    events: []
}

// Reducer
export const classesReducer = (state = initialState, action) => {
    switch(action.type){
        case TYPES.SET_CLASS:
            return {
                ...state,
                event: action.payload
            }
        case TYPES.SET_CLASSES:
            return {
                ...state,
                events: action.payload
            }
        default:
            return state
    }
}

// Selectors
export const selectAllClasses = (state) => {
    return state.classes
}

export const selectClassById = (classId, classes) => {
    return classes.filter(classData => classData.id === classId)
}