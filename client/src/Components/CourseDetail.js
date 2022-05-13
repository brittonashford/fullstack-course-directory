import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
// access create new course, delete, and update functions w/ useContext?


function CourseDetail() {

    const { id } = useParams();

    // create and update course in state
    const [course, setCourse ] = useState({});

    // get course data from API
    useEffect = ( () => {
        const getCourseDetail = async() => {
            await axios(`http://localhost:5000/api/courses/${id}`)
                .then(response => console.log(response))
                .then( response => setCourse(response.data) )
                .catch( error => console.log(error.message) )
        };

        getCourseDetail();
    }, [course]);


    return(
        <React.Fragment>
            <Header />
            <div className="actions--bar">
                <div className="wrap">
                    <Link to={"/"} className="button">Update Course</Link>
                    <Link to={"/"} className="button">Delete Course</Link>
                    <Link to={"/"} className="button button-secondary">Return to List</Link>
                </div>
            </div>
              
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <p>{course.materialsNeeded}</p>
                            {/* <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul> */}
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
};

export default CourseDetail;