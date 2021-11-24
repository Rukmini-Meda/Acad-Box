import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { rest } from "lodash";
import Header from "../header/header";
import SizedBox from "../CustomSizedBox/sized_box";

const PrivateRoute = ({
    component: Component,
    auth,
    ...rest
}) => (
    <Route
        {...rest}
        render = {props => auth.isAuthenticated === true ? (<><Component {...props}/></>) : (<Redirect to="/login"/>)}
    ></Route>
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute);