import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';


function Header() {
    return(
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
                <nav>
                    <ul className="header--signedout">
                        <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
                        <li><NavLink to='/sign-in'>Sign In</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};

export default Header;

