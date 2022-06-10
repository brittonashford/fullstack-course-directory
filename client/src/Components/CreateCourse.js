import React, { useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context'

function CreateCourse(){

    const { authUser, Data } = useContext(AppContext);
    const [ newCourseData, setNewCourseData ] = useState({
        courseTitle: null,
        courseDescription: null,
        estimatedTime: null,
        materialsNeeded: null,
        userId: null
    });
    const [ errors, setErrors ] = useState([]);

    //event handlers
    const handleChange = (e) => {
        e.persist();
        setNewCourseData(newCourseData => ({...newCourseData, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <React.Fragment>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
                </div>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={newCourseData.courseTitle} onChange={handleChange} />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={newCourseData.courseDescription} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={newCourseData.estimatedTime} onChange={handleChange} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={newCourseData.materialsNeeded} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><Link className="button button-secondary" to='/' >Cancel</Link>
                </form>
            </div>
        </React.Fragment>
    );
};

export default CreateCourse;