import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Data from '../Data';

export const AppContext = React.createContext();

export const Provider = (props) => {

    const [ courseList, setCourseList ] = useState(["course list not set"]);
    const [ courseDetails, setCourseDetails ] = useState({});
    const { id } = useParams;
;
    //get all courses
    
    // useEffect( () => {
    //     const getCourseList = async () => {
    //         await axios('http://localhost:5000/api/courses')
    //         .then(console.log("Context.js getCourseList results:"))
    //         .then( response => console.log(response.data) )
    //         .then( response => setCourseList(response.data) )
    //         .then(console.log("setCourseList results:"))
    //         .then(console.log(courseList))
    //         .catch( error => console.log(error.message) ) 
    //     }

    //     getCourseList();
    // }, []);
    
    // //get course details
    // useEffect( () => {
    //     const getCourseDetail = async(id) => {
    //         await axios(`http://localhost:5000/api/courses/${id}`)
    //             .then(response => console.log("Context.js getCourseDetail result:"))
    //             .then(console.log("getCourseDetail API call response:"))
    //             .then(response => console.log(response))
    //             .then( response => setCourseDetails(response.data) )
    //             .then(console.log("setCourseDetails result:"))
    //             .then(console.log(courseDetails))
    //             .catch( error => console.log(error.message) )
    //     }

    //     getCourseDetail(id);
    // },)



    return (

        <AppContext.Provider value={{}}>
            { props.children }
        </AppContext.Provider>

        // <AppContext.Provider value={{ courseList }}>
        //     { props.children }
        // </AppContext.Provider>
    );
};


