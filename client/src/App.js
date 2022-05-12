import React from 'react';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import Courses from './components/Courses';


function App() {
  // const { courses } = useContext(AppContext)


  //note: <Provider> wraps <App> in index.js, so context is available here
  return (
      <React.Fragment>
        <Routes>
          <Route exact path='/' element={<Courses />}></Route>
        </Routes>       
      </React.Fragment>
  );
}

export default App;
