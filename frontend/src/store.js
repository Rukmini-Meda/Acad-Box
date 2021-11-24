import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import {authReducer} from "./features/authSlice";
import {errorsReducer} from "./features/errorsSlice";
import {classesReducer} from "./features/classesSlice";
import { profileReducer } from "./features/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  classes: classesReducer,
  profile: profileReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default store;
