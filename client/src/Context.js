import React, { useState, useEffect, useContext } from 'react';
import Data from './Data';

export const AppContext = React.createContext();

export const Provider = (props) => {

// instance of Data() for Provider to share with its children
const data = new Data();

// eventually, user auth stuff will go here...
//for now, it just exposes the Data.js functions

    return (
        <AppContext.Provider value={{ data }}>
            { props.children }
        </AppContext.Provider>
    );
};


