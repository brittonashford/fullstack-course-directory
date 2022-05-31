import React, { useState, useContext } from 'react';
import Data from './Data';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AppContext = React.createContext();

export const Provider = (props) => {
    //state
    //not sure if I really need both of these....
    const [ authUser, setAuthUser ] = useState(null);  //delete?
    const authUserCookie = Cookies.set('userCookie', null);

    // instance of Data() for Provider to share with its children
    const data = new Data();

    const options = { 
        expires: 1 
    };

    //sign in
    const signIn = async(emailAddress, password) => {
        console.log('Context.signIn() hit');
        // const user = await data.getUser(emailAddress, password);
        // if (user) {        
        //     setAuthUser(user); //delete?
        //     Cookies.set('userCookie', user, options);
        //     console.log('signIn() called. user set in state:', authUser);
        // } else {
        //     console.log('no user found for: ', emailAddress, password);
        // }
    }

    //sign out
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('userCookie');
    }
    

    return (
        <AppContext.Provider value={{ data, signIn, signOut, authUser }}>
            { props.children }
        </AppContext.Provider>
    );
};

