import React, { useState } from 'react';
import axios from 'axios';

export const AppContext = React.createContext();

export const Provider = (props) => {
    //// COURSE ///////////////////////////////////////////////////////////////////
    const [ courseList, setCourseList ] = useState([]);

    const handleDeleteCourse = (id) => {
        // setCourseList(prevState => prevState.filter(course => course.id != id));
    };

    const handleUpdateCourse = (id, course) => {
        // const updatedCourseList = [ ...prevState ]
        // const updatedCourse = { ...updatedCourseList[index] };


        // updatedCourseList[id] = updatedCourse;
        // return updatedCourseList;
    };

    const handleCreateCourse = (index, course) => {

    };

    const getCourseList = () => {

    };

    const getCourseDetail = () => {

    };



    //// USER /////////////////////////////////////////////////////////////////////
    const getUser = () => {

    };

    const createUser = () => {

    };
    
    return (
        
        <AppContext.Provider value={{
            //global data and functions for courses
            courseList,
            actions: {
                deleteCourse: handleDeleteCourse,
                updateCourse: handleUpdateCourse,
                createCourse: handleCreateCourse,
                getCourseList,
                getCourseDetail,
                getUser,
                createUser
            }
        }}>
            { props.children }
        </AppContext.Provider>
    );
};