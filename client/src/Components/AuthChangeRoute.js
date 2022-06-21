import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context';
import { Outlet, Navigate, useParams, useNavigate } from 'react-router-dom';

//wrapper component for routes that require authentication

function AuthChangeRoute(){

    const { authUser, data } = useContext(AppContext);

    //state
    const [ course, setCourse ] = useState(null);
    const [ canChange, setCanChange ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();

    //get the course the user is trying to update or delete
    useEffect( () => {
        data.getCourseDetail(id)
        .then( (response) => {
            if(response) {
                console.log('getCourseDetail() was successful.')
                setCourse(response);
            } else {
                console.log('404, user typed a non-existent course into url.')
                navigate('/not-found')
            }
        })
        .catch( error => console.log(error.message) )
    }, [])

    //make sure user didn't try anything sneaky with the url
    useEffect( () => {
        if(course && authUser){
            setIsLoading(false);
            if(course.userId === authUser.id){
                setCanChange(true);
            } else {
                setCanChange(false);
            }
        } else {
            setIsLoading(true);
        }                  
    }, [course, authUser])

    //if user is should be allowed to update, take them there. if not, redirect to forbidden.
    return(
        <React.Fragment>
            {isLoading ?
                (<React.Fragment></React.Fragment>)
                :               
                (canChange ? <Outlet /> : <Navigate to='/forbidden' />)}
        </React.Fragment>
    );
}

export default AuthChangeRoute;