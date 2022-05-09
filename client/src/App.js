import React, {useContext, useEffect} from 'react';
import './index.css';

function App() {
  const { courses } = useContext(CoursesContext)

  return (
      <React.Fragment>
        <Header></Header>
        
      </React.Fragment>
  );
}

export default App;
