import React, { useState, useContext } from 'react';
import Data from './Data';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const AppContext = React.createContext();

export const Provider = (props) => {
    //state  
    let authUserCookie = Cookies.set('authUserCookie', null);
    const [ authUser, setAuthUser ] = useState(authUserCookie ? JSON.parse(authUserCookie) : null);

    //simplified version for testing
    // const [ authUser, setAuthUser ] = useState(null);

    // instance of Data() for Provider to share with its children
    const data = new Data();

    const options = { 
        expires: 1 
    };

    //sign in
    const signIn = async(emailAddress, password) => {
        console.log('Context.signIn() hit');

        const user = await data.getUser(emailAddress, password)

        if (user !== null) {     
            console.log('getUser() returned...', user);   
            user.password = password;
            setAuthUser(user); //***authUser not getting set... user obj has data
            console.log('setAuthUser() called. user object in state set to:', authUser);
            Cookies.set('authUserCookie', JSON.stringify(user), options);           
            // console.log('cookie set: ', authUserCookie);
            return authUser;
        } else {
            console.log('no user found for: ', emailAddress, password);
            return;
        }        
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

