import React, { useState, useContext } from 'react';
import Data from './Data';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AppContext = React.createContext();

export const Provider = (props) => {
    //state
    const [ authUser, setAuthUser ] = useState(null);
    const [ userCookie, setUserCookie ] = useState(Cookies.set('userCookie', null));

    const options = { 
        expires: 1 
    }
    // const navigate = useNavigate();

    // instance of Data() for Provider to share with its children
    const data = new Data();

    //sign in
    const signIn = async(emailAddress, password) => {
        const user = await data.getUser(emailAddress, password);
        if (user) {        
            setAuthUser(user);
            console.log('signIn() called. user set in state:', authUser);
            // navigate('/');
        } else {
            console.log('no user found for: ', emailAddress, password);
        }
    }

    //sign out
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('userCookie');
        // navigate('/');
    }
    

    return (
        <AppContext.Provider value={{ data, signIn, signOut, authUser }}>
            { props.children }
        </AppContext.Provider>
    );
};


