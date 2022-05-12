import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';



function Courses() {
   //stores and updates the course list in state
    const [ courseList, setCourseList ] = useState([]);

    const getCourseList = async () => {
        await axios('http://localhost:5000/api/courses')
        .then( response => setCourseList(response.data) )
        .catch( error => console.log(error.message) ) 
    };

    // calls function to retrieve course list from API
    useEffect( () => getCourseList(), []);

    return(
        <React.Fragment>
            <Header />
            <div class="wrap main--grid">
                {
                    courseList.map((course, index) =>
                        <a class="course--module course--link" href="course-detail.html">
                            <h2 className="course--label">Course</h2>
                            <h3 class="course--title">{course.title}</h3>
                        </a>              
                    )
                }

                <a class="course--module course--add--module" href="create-course.html">
                    <span class="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
            </div>
        </React.Fragment>
    );
};

export default Courses;