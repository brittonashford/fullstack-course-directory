import React from 'react';
import { Link } from 'react-router-dom';

function CreateCourse(){

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
                            <input id="courseTitle" name="courseTitle" type="text" value=""/>

                            <p>By Joe Smith</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value=""/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button><Link className="button button-secondary" to='/' >Cancel</Link>
                </form>
            </div>
        </React.Fragment>
    );
};

export default CreateCourse;