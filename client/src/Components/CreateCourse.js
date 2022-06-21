import React, { useState, useContext, useEffect} from 'react';
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
    const [ errors, setErrors ] = useState([]);

    const navigate = useNavigate();

     //for validation
     let allowContinue = false;
     let titleNotBlank = false;
     let descriptionNotBlank = false;

     useEffect( () => {
         titleFieldLabel = document.getElementById('titleFieldLabel');
         titleField = document.getElementById('title');
         descriptionFieldLabel = document.getElementById('descriptionFieldLabel');
         descriptionField = document.getElementById('description');     
     }, [])
 
     let titleFieldLabel = document.getElementById('titleFieldLabel');
     let titleField = document.getElementById('title');
     let descriptionFieldLabel = document.getElementById('descriptionFieldLabel');
     let descriptionField = document.getElementById('description');     


    //event handlers
    const handleChange = (e) => {
        e.persist();
        setNewCourseData(newCourseData => ({...newCourseData, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //reset validation params
        setErrors([]);
        allowContinue = false;

        //flag erroneous fields
        if (titleField.value === ''){     
            notValid(titleField, titleFieldLabel);
        } else {
            valid(titleField, titleFieldLabel);
        }
        
        if (descriptionField.value === ''){      
            notValid(descriptionField, descriptionFieldLabel);
        } else {
            valid(descriptionField, descriptionFieldLabel);
        }

        data.createCourse(newCourseData, authUser)
            .then( errors => {               
                if (errors.length) {
                    setErrors(errors);
                    console.log('error(s) occurred: ', errors);
                    allowContinue = false;
                } else {
                    console.log('createCourse() was successful!');
                    allowContinue = true;
                }
            })
            .then( () => {
                if(allowContinue){
                    navigate('/');
                } 
            })  
            .catch( error => {
                console.log('error caught: ', error);
                navigate('/error');
            });
    }

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
                <h2 className="page--title">Create Course</h2>
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
                
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label id="titleFieldLabel" htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" value={newCourseData.title} onChange={handleChange} />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label id="descriptionFieldLabel" htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" value={newCourseData.description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label id ="estTimeFieldLabel" htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={newCourseData.estimatedTime} onChange={handleChange} />

                            <label id ="materialsFieldLabel" htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={newCourseData.materialsNeeded} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><Link className="button button-secondary cancel--button" to='/' >Cancel</Link>
                </form>
            </div>
        </React.Fragment>
    );
};

export default CreateCourse;