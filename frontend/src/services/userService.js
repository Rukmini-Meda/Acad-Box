import axios from "axios"
import { setUserProfile } from "../features/profileSlice"
import { setProfileErrors } from "../features/errorsSlice"
import { API_BASE_URL } from "../utils/constants"
import axiosConfig from "./axiosConfig"

export const fetchUserProfile = (userId) => (dispatch) => {
    axios.get(API_BASE_URL + "users/getUserProfile?userId=" + userId, axiosConfig).then(res => {
        console.log("Fetching user profile")
        dispatch(setUserProfile(res.data))
        console.log("Done")
    }).catch(err => {
        console.log(err.response.data)
        dispatch(setProfileErrors(err.response.data))
    })
}

export const editProfile = (userId, newData) => (dispatch) => {
    axios.patch(API_BASE_URL + "users/editProfile?userId=" + userId, newData, axiosConfig).then(res =>{
        console.log(res)
        dispatch(setUserProfile(res.data))
        alert("Username updated!")
        console.log("Done")
    }).catch(err => {
        console.log(err.response.data)
        const errors = {}
        errors.message = err.response.data
        dispatch(setProfileErrors(errors))
    })
}