import React, { useContext } from 'react';
import { AppContext } from '../Context';
import { Outlet, Navigate } from 'react-router-dom';

//wrapper component for routes that require authentication
function AuthRoute(){

    const { authUser } = useContext(AppContext);

    //if user is authenticated, take them to create/update page. if not, redirect to sign-in.
    return(
        authUser ? <Outlet /> : <Navigate to='/sign-in' />
    );
}

export default AuthRoute;