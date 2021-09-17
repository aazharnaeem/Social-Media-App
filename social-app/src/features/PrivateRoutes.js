import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    return (
        <Route {...rest} render={props => (
            userInfo ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;