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
        e.persist();
        console.log(e.target.name, e.target.value);
        setUser(user => ({...user, [e.target.name]: e.target.value}));
        console.log(user);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        data.createUser(user)
            //no news is good news (201 status)
            .then( response => {
                if (!response) {
                    console.log('createUser request successful! Check the database.');
                } else {
                    console.log(`createUser request was not successful:(.`, response );
                }
            })
            .catch( error => console.log(error) );
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
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" value={user.firstName} onChange={handleChange} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" value={user.lastName} onChange={handleChange} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={user.emailAddress} onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={user.password} onChange={handleChange} />
                    <button className="button" type="submit">Sign Up</button><Link to='/' className="button button-secondary">Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to='/sign-in'>sign in</Link>!</p>
            </div>
        </React.Fragment>
    );
};

export default UserSignUp;