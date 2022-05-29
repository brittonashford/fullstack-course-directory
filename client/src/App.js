import React from 'react';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';
import UserSignIn from './Components/UserSignIn';
import UserSignUp from './Components/UserSignUp';
import UserSignOut from './Components/UserSignOut';
import Header from './Components/Header';


function App() {

//note: <Provider> wraps <App> in index.js, so context is available to all children components

    return (
        <React.Fragment>
            <Header />
            <Routes>
                <Route path='sign-in' element={ <UserSignIn /> } />
                <Route path='sign-up' element={ <UserSignUp /> } />
                {/* <Route path='signout' element={ <UserSignOut /> } /> */}
                <Route path='/' element={ <Courses /> } />
                    <Route path='courses/:id' index element={ <CourseDetail /> } />
            </Routes>       
        </React.Fragment>
    );
}

export default App;
