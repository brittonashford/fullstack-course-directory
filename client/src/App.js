import React, {useContext, useEffect} from 'react';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Courses } from './Components';

function App() {
  const { courses } = useContext(CoursesContext)


  //note: <Provider> wraps <App> in index.js, so context is available here
  return (
      <React.Fragment>
        <Header></Header>
        <Routes>
          <Route exact path='/' element={<Courses />}></Route>
        </Routes>       
      </React.Fragment>
  );
}

export default App;
