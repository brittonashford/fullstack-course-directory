import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context';

function UserSignUp() {
    const { data } = useContext(AppContext);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });

    //event handlers
    const handleChange = (e) => {
        console.log(e.target);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        data.createUser(user)
            .then(console.log('createUser request successful!'))
    }

    // const handleCancel = (e) => {
    //     e.preventDefault();
    //     cancel();
    // }

    return(
        <React.Fragment>
            <div className="form--centered">
                <h2>Sign Up</h2>               
                <form onSubmit={handleSubmit}>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value="" onChange={handleChange} />
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value="" onChange={handleChange} />
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="" onChange={handleChange} />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="" onChange={handleChange} />
                    <button className="button" type="submit">Sign Up</button><Link to='/' className="button button-secondary">Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to='/sign-in'>sign in</Link>!</p>
            </div>
        </React.Fragment>
    );
};

export default UserSignUp;