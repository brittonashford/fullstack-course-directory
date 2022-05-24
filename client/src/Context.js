import React, { useState, useEffect, useContext } from 'react';
import Data from './Data';

export const AppContext = React.createContext();

export const Provider = (props) => {

// eventually, user auth stuff will go here...
//for now, it just exposes the Data.js functions

    return (
        <AppContext.Provider value={{ Data }}>
            { props.children }
        </AppContext.Provider>
    );
};


