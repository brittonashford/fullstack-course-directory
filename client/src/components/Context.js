import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {
    //state
    state = {

    };

    //functions and event handlers

    render () {
        return (
            <Context.Provider value={{
                //state data and functions to pass to Consumers
            }}>
                
            </Context.Provider>
        )
    }
}