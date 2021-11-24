import { TYPES } from "../utils/constants"

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

const initialState = {
    event: {},
    events: []
}

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

export const selectAllClasses = (state) => {
    return state.classes
}

export const selectClassById = (classId, classes) => {
    console.log(classes)
    return classes.filter(classData => classData.id === classId)
}