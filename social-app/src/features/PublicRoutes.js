import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    return (
        <Route {...rest} render={props => (
            userInfo && restricted ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;