import axios from "axios"
import setAuthToken from "../utils/set_auth_token";
import jwt_decode from "jwt-decode"
import {API_BASE_URL, ACTION_TYPES, SLICES} from "../utils/constants"
import { setCurrentUser, setUserLoading, unsetUserLoading } from "../features/authSlice";
import axiosConfig from "./axiosConfig"

export const loginUser = (userData) => (dispatch) => {
    axios
        .post(API_BASE_URL + "users/login", userData, axiosConfig)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("isFaculty", res.data.isFaculty)
            localStorage.setItem("doses", res.data.doses)
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(unsetUserLoading())
            dispatch(setCurrentUser(decoded))
            dispatch({
                type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_LOGIN_ERRORS,
                payload: {}
            })
        })
        .catch(err => {
            dispatch(unsetUserLoading())
            dispatch({
                type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_LOGIN_ERRORS,
                payload: err.response.data
            })
        })
    dispatch(setUserLoading())
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}

export const registerUser = (userData, history) => dispatch => {
    axios.post(API_BASE_URL + "users/register", userData, axiosConfig).then(res => {
        alert("Successfully registered")
        dispatch({
            type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_REGISTER_ERRORS,
            payload: {}
        })
        history.push("/login")
    }).catch(err => {
        dispatch({
            type: SLICES.ERRORS + "/" + ACTION_TYPES.SET_REGISTER_ERRORS,
            payload: err.response.data
        })
    })
}