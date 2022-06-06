import React, { useContext } from 'react';
import { AppContext } from '../Context';
import { useNavigate } from 'react-router-dom';

//wrapper component for routes that require authentication

function AuthRoute(){

    const { authUser } = useContext(AppContext);
    const navigate = useNavigate();


    //if user is authenticated, take them to create/update page. if not, redirect to sign-in.
//     return(
//         authUser ? create/update page : navigate('/signin');
//     );
}

export default AuthRoute;