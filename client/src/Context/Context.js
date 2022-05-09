import React, { useState } from 'react';

export const CoursesContext = React.createContext();

export const Provider = (props) => {


    
    return (
        <CoursesContext.Provider value={{
            //state data and functions to pass to Consumers
        }}>
            { this.props.children }
        </CoursesContext.Provider>
    )
};