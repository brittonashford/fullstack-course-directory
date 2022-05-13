import React from 'react';
// import Data from './Data';



export const AppContext = React.createContext();

export const Provider = (props) => {
    let placeholder = "I moved all my API stuff to Data.js and now I'm not sure what to put here lol...";

    
    return (
        
        <AppContext.Provider value={{
            //create, update, delete course functions
            //create user, sign in, sign out

        }}>
            { props.children }
        </AppContext.Provider>
    );
};