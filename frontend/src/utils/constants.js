export const API_BASE_URL = process.env.REACT_APP_API_URL

export const SLICES = {
    AUTH: "auth",
    ERRORS: "errors",
    CLASSES: "classes",
    PROFILE: "profile"
}

export const ACTION_TYPES = {
    USER_LOADING: "userLoading",
    SET_CURRENT_USER: "setCurrentUser",
    SET_LOGIN_ERRORS: "setLoginErrors",
    SET_REGISTER_ERRORS: "setRegisterErrors",
    SET_CREATE_CLASS_ERRORS: "setCreateClassErrors",
    SET_USER_PROFILE: "setUserProfile",
    UNSET_CREATE_CLASS_ERRORS: "unsetCreateClassErrors",
    SET_EVENT_VIEW_ERRORS: "setEventViewErrors",
    SET_CLASS: "setClass",
    SET_CLASSES: "setClasses",
    FETCH_USER_PROFILE: "fetchUserProfile",
    SET_PROFILE_ERRORS: "setProfileErrors",
    SET_EDIT_EVENT_ERRORS: "setEditEventErrors",
    USER_NOT_LOADING: "userNotLoading"
}

export const TYPES = {
    FETCH_USER_PROFILE: SLICES.PROFILE + "/" + ACTION_TYPES.FETCH_USER_PROFILE,
    SET_CURRENT_USER: SLICES.AUTH + "/" + ACTION_TYPES.SET_CURRENT_USER,
    USER_LOADING: SLICES.AUTH + "/" + ACTION_TYPES.USER_LOADING,
    USER_NOT_LOADING: SLICES.AUTH + "/" + ACTION_TYPES.USER_NOT_LOADING,
    SET_CLASS: SLICES.CLASSES + "/" + ACTION_TYPES.SET_CLASS,
    SET_CLASSES: SLICES.CLASSES + "/" + ACTION_TYPES.SET_CLASSES,
    SET_CREATE_CLASS_ERRORS: SLICES.ERRORS + "/" + ACTION_TYPES.SET_CREATE_CLASS_ERRORS,
    SET_EVENT_VIEW_ERRORS: SLICES.ERRORS + "/" + ACTION_TYPES.SET_EVENT_VIEW_ERRORS,
    SET_LOGIN_ERRORS: SLICES.ERRORS + "/" + ACTION_TYPES.SET_LOGIN_ERRORS,
    SET_USER_PROFILE: SLICES.ERRORS + "/" + ACTION_TYPES.SET_USER_PROFILE,
    SET_REGISTER_ERRORS: SLICES.ERRORS + "/" + ACTION_TYPES.SET_REGISTER_ERRORS,
    UNSET_CREATE_CLASS_ERRORS: SLICES.ERRORS + "/" + ACTION_TYPES.UNSET_CREATE_CLASS_ERRORS,
    SET_PROFILE_ERRORS: SLICES.ERRORS + "/" + ACTION_TYPES.SET_PROFILE_ERRORS,
    SET_EDIT_EVENT_ERRORS: SLICES.ERRORS + "/" + ACTION_TYPES.SET_EDIT_EVENT_ERRORS
}