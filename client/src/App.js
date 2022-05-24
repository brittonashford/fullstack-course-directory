import React from 'react';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import Courses from './Components/Courses';
import CourseDetail from './Components/CourseDetail';


function App() {

  //note: <Provider> wraps <App> in index.js, so context is available to all children components
  return (
      <React.Fragment>
        <Routes>
          <Route path='/' element={ <Courses /> } />
            <Route path='courses/:id' index element={ <CourseDetail /> } />
        </Routes>       
      </React.Fragment>
  );
}

export default App;
