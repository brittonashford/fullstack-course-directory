import React, { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context'

function CreateCourse(){

    const { authUser, data } = useContext(AppContext);
    const [ newCourseData, setNewCourseData ] = useState({
        title: null,
        description: "",
        estimatedTime: null,
        materialsNeeded: "",
        userId: authUser.id
    });
    const [ validationErrors, setValidationErrors ] = useState([]);

    const navigate = useNavigate();

    //event handlers
    const handleChange = (e) => {
        e.persist();
        setNewCourseData(newCourseData => ({...newCourseData, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('calling create course with newCourseData: ', newCourseData);
        console.log('calling create course with authUser: ', authUser);

        data.createCourse(newCourseData, authUser)
            .then( errors => {               
                if (errors.length) {
                    setValidationErrors(errors);
                    console.log('error(s) occurred: ', errors);
                    return;
                } else {
                    console.log('createCourse() was successful!');
                }
            })
            .then( () => {
                if(validationErrors.length === 0){
                    navigate('/');
                } else {
                    return;
                }
            })  
            .catch( error => {
                console.log('error caught: ', error);
                navigate('/error');
            });
    }

    return(
        <React.Fragment>
            <div className="wrap">
                <h2>Create Course</h2>
                {validationErrors.length ? (
                    <React.Fragment>
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {validationErrors.map( (error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment></React.Fragment>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" value={newCourseData.title} onChange={handleChange} />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" value={newCourseData.description} onChange={handleChange}></textarea>
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