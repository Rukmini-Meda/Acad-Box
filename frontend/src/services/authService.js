import axios from "axios"
import setAuthToken from "../utils/set_auth_token";
import jwt_decode from "jwt-decode"
import {API_BASE_URL, ACTION_TYPES, SLICES} from "../utils/constants"
import { setCurrentUser } from "../features/authSlice";
import axiosConfig from "./axiosConfig"

export const loginUser = (userData) => (dispatch) => {
    axios
        .post(API_BASE_URL + "users/login", userData, axiosConfig)
        .then(res => {
            console.log("login")
            const {token} = res.data;
            console.log(res.data)
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("isFaculty", res.data.isFaculty)
            localStorage.setItem("doses", res.data.doses)
            console.log("stored token in local storage")
            setAuthToken(token);
            console.log("set auth token done")
            const decoded = jwt_decode(token);
            console.log("ABout to dispatch action")
            dispatch(setCurrentUser(decoded))
            dispatch({
                type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_LOGIN_ERRORS,
                payload: {}
            })
            console.log("Done")
        })
        .catch(err => dispatch({
            type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_LOGIN_ERRORS,
            payload: err.response.data
        }))
}

export const logoutUser = () => (dispatch) => {
    console.log("Going to log out")
    localStorage.removeItem("jwtToken");
    console.log("removed token from local storage")
    setAuthToken(false);
    console.log("removed from header")
    dispatch(setCurrentUser({}));
    console.log("Emptied current user in state, done!!")
}

export const registerUser = (userData, history) => dispatch => {
    console.log(userData)
    console.log("What's wrong??")
    axios.post(API_BASE_URL + "users/register", userData, axiosConfig).then(res => {
        console.log("About to push login route in frontend")
        alert("Successfully registered")
        dispatch({
            type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_REGISTER_ERRORS,
            payload: {}
        })
        history.push("/login")
    }).catch(err => {
        console.log(err.response.data)
        dispatch({
            type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_REGISTER_ERRORS,
            payload: err.response.data
        })
    })
}