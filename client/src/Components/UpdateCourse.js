import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context';
import { useNavigate, useParams } from 'react-router-dom';


function UpdateCourse(){
    //state
    const[ updatedCourseData, setUpdatedCourseData ] = useState({});
    const [ errors, setErrors ] = useState([]);

    const { authUser, data } = useContext(AppContext); 
    const { id } = useParams();
    const navigate = useNavigate();

    //pre-pop course details
    useEffect( () => {
        data.getCourseDetail(id)
            .then( response => setUpdatedCourseData(response) )
            .catch( error => {
                console.log('error caught: ', error);
                navigate('/error');
            })
    }, [])

    //for validation
    let allowContinue = false;
    let titleNotBlank = false;
    let descriptionNotBlank = false;

    useEffect( () => {
        titleFieldLabel = document.getElementById('titleFieldLabel');
        titleField = document.getElementById('title');
        descriptionFieldLabel = document.getElementById('descriptionFieldTitle');
        descriptionField = document.getElementById('description');     
    }, [])

    let titleFieldLabel = document.getElementById('titleFieldLabel');
    let titleField = document.getElementById('title');
    let descriptionFieldLabel = document.getElementById('descriptionFieldLabel');
    let descriptionField = document.getElementById('description');
    
    //event handlers
    const handleChange = (e) => {
        e.persist();
        setUpdatedCourseData(updatedCourseData => ({...updatedCourseData, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //reset validation params
        setErrors([]);
        allowContinue = false;

        //flag erroneous fields
        if (titleField.value === ''){  
            setErrors(errors => [...errors, 'Course Title is Required.'])   
            notValid(titleField, titleFieldLabel);          
            titleNotBlank = false;
        } else {
            valid(titleField, titleFieldLabel);
            titleNotBlank = true;
        }
        
        if (descriptionField.value === ''){      
            setErrors(errors => [...errors, 'Course Description is Required.'])
            notValid(descriptionField, descriptionFieldLabel);          
            descriptionNotBlank = false;
        } else {
            valid(descriptionField, descriptionFieldLabel);
            descriptionNotBlank = true;
        }

        if(titleNotBlank && descriptionNotBlank){
            data.updateCourse(updatedCourseData, authUser)
                //no news is good news
                .then( errors => {
                    if (errors.length) {
                        setErrors(errors);
                        allowContinue = false;
                    } else {
                        allowContinue = true;
                    }
                })
                .then( () => {
                    if(allowContinue){
                        navigate(`/courses/${id}`)
                    }
                })        
                .catch( error => {
                    console.log('error caught: ', error);
                    navigate('/error');
                });
        }
    }

    const handleCancel = (e) => {
        navigate(`/courses/${id}`)
    }
 

    //validation formatting
    function notValid(element, elementLabel) {
        element.classList.add('not-valid');
        elementLabel.classList.add('not-valid-label');
    }

    function valid(element, elementLabel) {
            element.classList.remove('not-valid');
            elementLabel.classList.remove('not-valid-label');
    }

    return(
        <React.Fragment>
            <div className="wrap">
                <h2 className="page--title">Update Course</h2>
                {errors.length ? (
                    <React.Fragment>
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {errors.map( (error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment></React.Fragment>
                )}
                <form>
                    <div className="React.Fragment--flex">
                        <div>
                            <label id="titleFieldLabel" htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" value={updatedCourseData.title} onChange={handleChange}/>

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label id="descriptionFieldLabel" htmlFor="description">Course Description</label>
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
