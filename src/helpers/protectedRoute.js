import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import * as CONSTROUTES from '../constants/routes'

export default function ProtectedRoute({ user }) {
    if(user) {
        return <Outlet/>;
    }

    if(!user){
        return (
            <Navigate to={{pathname: CONSTROUTES.LOGIN, state: { from: location}}} />
        )
    }
}


ProtectedRoute.propTypes = {
    user: PropTypes.object,
}