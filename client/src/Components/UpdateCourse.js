import React, { useContext, useState } from 'react';
import { AppContext } from '../Context';
import { Link, useNavigate } from 'react-router-dom';


export default UpdateCourse = () => {
    const[ updatedCourse, setUpdatedCourse ] = useState({

    });
    const { authUser, data } = useContext(AppContext);

    const navigate = useNavigate();

    //event handlers
    const handleChange = (e) => {
        e.persist();
        setUpdatedCourse(updatedCourse => ({...updatedCourse, [e.target.name]: e.target.value}));
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        //data.updateCourse(course, authUser)
    }

    return(
        <React.Fragment>
            <div className="wrap">
                <h2>Update Course</h2>
                <form>
                    <div className="React.Fragment--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" value={updatedCourse.title} onChange={handleChange}/>

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" value={updatedCourse.description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={updatedCourse.estimatedTime} onChange={handleChange}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={updatedCourse.materialsNeeded} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={handleSubmit}>Update Course</button><Link className="button button-secondary" to=''>Cancel</Link>
                </form>
            </div>
        </React.Fragment>
    );
};
