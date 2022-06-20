import React, { useContext } from 'react';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import Header from './Components/Header';
import AuthRoute from './Components/AuthRoute';
import CreateCourse from './Components/CreateCourse';
import UpdateCourse from './Components/UpdateCourse';
import Error from './Components/Error';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';


function App() {

//note: <Provider> wraps <App> in index.js, so context is available to all children components

    return (
        <React.Fragment>
            <Header />
            <Routes>
                <Route path='sign-in' element={ <UserSignIn /> } />
                <Route path='sign-up' element={ <UserSignUp /> } />
                <Route path='sign-out' element={ <UserSignOut /> } /> 
                <Route path='/' element={ <Courses /> } />
                    <Route path='courses/:id' index element={ <CourseDetail /> } />                
                    <Route path='courses/:id/update' element={ <AuthRoute /> }>
                        <Route index element={ <UpdateCourse /> } />
                    </Route> 
                    <Route path='courses/create' element={ <AuthRoute /> }>
                        <Route index element={ <CreateCourse /> } />
                    </Route>
                <Route path='error' element={ <Error /> } />
                <Route path='forbidden' element={ <Forbidden /> } />
                <Route path='*' element={ <NotFound /> } />
            </Routes>       
        </React.Fragment>
    );
}

export default App;