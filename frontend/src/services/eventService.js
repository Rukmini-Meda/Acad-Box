// write all API interfacing code here and dispatch actions from features folder
import axios from "axios"
import {API_BASE_URL} from "../utils/constants"
import CalendarEvent from "../models/calendarEvent"
import { setClass, setClasses } from "../features/classesSlice"
import { setCreateClassErrors, unsetCreateClassErrors, setEditEventErrors, setEventViewErrors } from "../features/errorsSlice"
import axiosConfig from "./axiosConfig"
import { setUserLoading, unsetUserLoading } from "../features/authSlice"

export const cancelEvent = (eventId, history) => (dispatch) => {
    axios.delete(API_BASE_URL + "classes/removeEvent?eventId=" + eventId, axiosConfig).then(res => {
        console.log("Removed")
        console.log(res.data)
        history.push("/meetScheduler")
        alert("Event deleted!")
        console.log("Done")
    }).catch(err => {
        console.log(err)
        const errors = {}
        errors.message = err.response.data
        dispatch(setEditEventErrors(errors))
    })
}

export const editEvent = (eventId, data) => (dispatch) => {
    axios.patch(API_BASE_URL + "classes/editEvent?eventId=" + eventId, data, axiosConfig).then(res => {
        console.log("Editted")
        console.log(res.data)
        dispatch(setClass(res.data))
        console.log("Done")
        alert("Event is updated. Click ok to view changes")
    }).catch(err => {
        console.log(err)
        dispatch(setEditEventErrors(err.response.data))
    })
}

export const bookSeat = (eventId, userId) => (dispatch) => {
    axios.patch(API_BASE_URL + "classes/bookSeat?eventId=" + eventId + "&studentId=" + userId, axiosConfig).then(res => {
        console.log("Booked a seat")
        console.log(res.data)
        dispatch(unsetUserLoading())
        dispatch(setClass(res.data.event))
        alert(res.data.message)
        console.log("Done")
    }).catch(err => {
        console.log(err)
        dispatch(unsetUserLoading())
        dispatch({
            type: "errors/setEventViewErrors",
            payload: err.response.data
        })
    })
    dispatch(setUserLoading())
}

export const fetchEventDetails = (classId) => (dispatch) => {
    axios.get(API_BASE_URL + "classes/getClassDetails?classId=" + classId, axiosConfig).then(res => {
        console.log("Fetching event details from api")
        console.log(res.data)
        dispatch(setClass(res.data))
        dispatch(setEventViewErrors(""))
        console.log("Done")
    }).catch(err => dispatch({
        type: "errors/setEventViewErrors",
        payload: err.response.data
    }))
}

export const getClasses = (history) => (dispatch) => {
    axios.get(API_BASE_URL + "classes/getClasses", axiosConfig).then(res => {
        console.log("Response from get classes api")
       
        if(res.data == null){
            return
        }
        console.log(res.data)
        let events = [];
        for(let index = 0; index < res.data.length; index ++){
            let event = res.data[index]
            const eventData = CalendarEvent.toDict(event._id, event.startTime, event.endTime, event.courseName, event.courseCode)
            console.log(eventData === event)
            events.push(eventData)
        }
        console.log(events)
        dispatch(setClasses(events))
        console.log("Done")
        // history.push("/meetScheduler")
    }).catch(err => dispatch({
        type: "errors/setErrors",
        payload: err.response.data
    }))
}

export const createClass = (classData, history, facultyId) => (dispatch) => {
    console.log("Over here")
    axios.post(API_BASE_URL + "classes/createClass?facultyId=" + facultyId, classData, axiosConfig).then(res => {
        console.log("In creating")
        console.log(res.data)
        dispatch(setClass(res.data))
        dispatch(unsetCreateClassErrors())
        console.log("Done")
        history.push("/meetScheduler")
    }).catch(err => dispatch(setCreateClassErrors(err.response.data)))
}
