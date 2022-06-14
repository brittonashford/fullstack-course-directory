import React, {useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context';
import ReactMarkdown from 'react-markdown';

function CourseDetail() {

    //state
    const [ course, setCourse ] = useState({});
    const [ canChange, setCanChange ] = useState(false);

    const { data, authUser } = useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();
    

    //get course details
    useEffect( () => {
        console.log('Hello from CourseDetail.js');
        data.getCourseDetail(id)
            .then( response => setCourse(response) )
            .catch( error => console.log(error.message) )
    }, [])

    //determine if user should be allowed to update/delete course
    useEffect( () => {
        if(course && authUser && course.userId === authUser.id){
            setCanChange(true);
            console.log('canChange = true');
        } else {
            setCanChange(false);
            console.log('canChange = false');
        }
    }, [course, authUser])

    //event handlers
    const handleUpdate = (e) => {
        navigate('update');
    }

    const handleDelete = (e) => {
        console.log('z');
    }

    return(
        <React.Fragment>
            <div className="actions--bar">
                <div className="wrap">
                {canChange ? (
                    <React.Fragment>
                        <button className="button" onClick={handleUpdate}>Update Course</button>
                        <button className="button" onClick={handleDelete}>Delete Course</button> 
                    </React.Fragment>) 
                    : (<React.Fragment></React.Fragment>)
                }
                    <Link to={'/'} className="button button-secondary">Return to List</Link>
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