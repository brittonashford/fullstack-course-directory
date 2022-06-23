import React, { useState, useEffect } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

export const AppContext = React.createContext();

export const Provider = (props) => {

    //state  
    const [ authUserCookie ]  = useState(Cookies.get('authUserCookie')); 
    const [ authUser, setAuthUser ] = useState(authUserCookie ? JSON.parse(authUserCookie) : null);

    //set cookie once authUser is set
    useEffect( () => {
        if(authUser) {
            Cookies.set('authUserCookie', JSON.stringify(authUser), {expires: 1})
         } 
    }, [authUser])

    //instance of Data() for Provider to share with its children
    const data = new Data();

    //sign in
    const signIn = async(emailAddress, password) => {

        const user = await data.getUser(emailAddress, password)

        if (user) {     
            user.password = password;
            setAuthUser(user);           
            return user;
        } else {
            return;
        }        
    }

    //sign out
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove('authUserCookie');
    }
    
    return (
        <AppContext.Provider value={{ data, signIn, signOut, authUser }}>
            { props.children }
        </AppContext.Provider>
    );
};