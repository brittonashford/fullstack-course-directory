import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context';
import { Link, useNavigate, useParams } from 'react-router-dom';


function UpdateCourse(){
    //state
    const[ updatedCourseData, setUpdatedCourseData ] = useState({});

    const { authUser, data } = useContext(AppContext); 
    const { id } = useParams();
    const navigate = useNavigate();

    //pre-pop course details
    useEffect( () => {
        console.log('Update Course useEffect');
        data.getCourseDetail(id)
            .then( response => setUpdatedCourseData(response) )
            .catch( error => console.log(error.message) )
    }, [])


    //event handlers
    const handleChange = (e) => {
        e.persist();
        setUpdatedCourseData(updatedCourseData => ({...updatedCourseData, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        data.updateCourse(updatedCourseData, authUser)
            .then( errors => {
                if (errors) {
                    console.log('error(s) occurred: ', errors);
                } else {
                    console.log('updateCourse() was successful!');
                }
            })
            .then( () => navigate(`/courses/${id}`))         
            .catch( error => {throw new Error(error) });
    }

    const handleCancel = (e) => {
        navigate(`/courses/${id}`)
    }

    return(
        <React.Fragment>
            <div className="wrap">
                <h2 className="page--title">Update Course</h2>
                <form>
                    <div className="React.Fragment--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" value={updatedCourseData.title} onChange={handleChange}/>

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" value={updatedCourseData.description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={updatedCourseData.estimatedTime} onChange={handleChange}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={updatedCourseData.materialsNeeded} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={handleSubmit}>Update Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default UpdateCourse
