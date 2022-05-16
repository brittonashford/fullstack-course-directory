import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/Context';

function Courses() {

    //stores and updates the course list in state
    const [ courses, setCourses ] = useState(["Courses.js courseList not set"]);
    const [ isLoading, setIsLoading ] = useState(false);

    // const appContext = useContext(AppContext);

    const getCourseList = async () => {
        await axios('http://localhost:5000/api/courses')
         .then ( console.log('getCourseList called from Courses.js:') )
         .then(response => console.log(response.data))
         .then( response => setCourses(response.data) )
         .catch( error => console.log(error.message) ) 
     };

    // calls function to retrieve course list from API
    useEffect( () => { getCourseList();}, []);

    //react complains and says to create async function in useEffect, 
    //refactoring it this way doesn't seem to work
    // useEffect( () => { 
    //     const getCourseList = async () => {
    //         await axios('http://localhost:5000/api/courses')
    //          .then ( console.log('getCourseList called from Courses.js:') )
    //          .then(response => console.log(response.data))
    //          .then( response => setCourses(response.data) )
    //          .catch( error => console.log(error.message) ) 
    //      };
    // }, []);


    return(
        <React.Fragment>
            <Header />
            <div className="wrap main--grid">
                {
                    courses.map(course =>
                        <Link key= {course.id} to= {`/courses/${course.id}`} className="course--module course--link" href="course-detail.html">
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>              
                    )
                }

                <a className="course--module course--add--module" href="create-course.html">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
            </div>
        </React.Fragment>
    );
};

export default Courses;