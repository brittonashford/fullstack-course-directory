import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AppContext } from '../Context';

function Header() {
    const { authUser } = useContext(AppContext);

    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
                <nav>  
                    {authUser ? (
                        <React.Fragment>
                            <ul className="header--signedin">
                                <span>Welcome, {authUser.firstName}!</span>
                                <NavLink to='sign-out'>Sign Out</NavLink>
                            </ul>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <ul className="header--signedout">
                                <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
                                <li><NavLink to='/sign-in'>Sign In</NavLink></li>
                            </ul>
                        </React.Fragment>
                    )}                      
                </nav>
            </div>
        </header>
    )
};

export default Header;