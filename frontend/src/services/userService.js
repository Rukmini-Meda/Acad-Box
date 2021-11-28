import axios from "axios"
import { setUserProfile } from "../features/profileSlice"
import { setProfileErrors } from "../features/errorsSlice"
import { API_BASE_URL } from "../utils/constants"
import axiosConfig from "./axiosConfig"

export const fetchUserProfile = (userId) => (dispatch) => {
    axios.get(API_BASE_URL + "users/getUserProfile?userId=" + userId, axiosConfig).then(res => {
        dispatch(setUserProfile(res.data))
    }).catch(err => {
        dispatch(setProfileErrors(err.response.data))
    })
}

export const editProfile = (userId, newData) => (dispatch) => {
    axios.patch(API_BASE_URL + "users/editProfile?userId=" + userId, newData, axiosConfig).then(res =>{
        dispatch(setUserProfile(res.data))
        alert("Username updated!")
    }).catch(err => {
        const errors = {}
        errors.message = err.response.data
        dispatch(setProfileErrors(errors))
    })
}