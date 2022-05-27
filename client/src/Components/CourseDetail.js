import React, {useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../Context';
import ReactMarkdown from 'react-markdown';

function CourseDetail() {

    const { data } = useContext(AppContext)
    const { id } = useParams();

    //create and update course in state
    const [ course, setCourse ] = useState({});

    //get course detail using async funtion from context
    useEffect( () => {
        console.log('Hello from CourseDetail.js');
        data.getCourseDetail(id)
            .then( response => setCourse(response) )
            .catch( error => console.log(error.message) )
    }, [])

    return(
        <React.Fragment>
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
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
};

export default CourseDetail;