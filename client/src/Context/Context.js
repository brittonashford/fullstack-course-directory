import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const AppContext = React.createContext();
export const Provider = (props) => {

    const [ courseList, setCourseList ] = useState(["nothing yet"]);

    const getCourseList = async () => {
        await axios('http://localhost:5000/api/courses')
        .then( response => setCourseList(response.data) )
        .then( response => console.log("Context.js:  ", response.data) )
        .catch( error => console.log(error.message) ) 
    };

    useEffect( () => { getCourseList() }, []);
    
    return (
        
        <AppContext.Provider value={{ courseList }}>
            { props.children }
        </AppContext.Provider>
    );
};


