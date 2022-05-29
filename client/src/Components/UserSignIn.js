import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context';

function UserSignIn() {
    //store credentials in state
    const [ credentials, setCredentials ] = useState({
        emailAddress: '',
        password: ''
    });

    const { data } = useContext(AppContext);
    const navigate = useNavigate();

    //event handlers
    const handleChange = (e) => {
        e.preventDefault();
        e.persist()
        console.log(e.target.name, e.target.value);
        setCredentials( credentials => ({...credentials, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        data.getUser(credentials.emailAddress, credentials.password)
            .then( response => {
                console.log('success!', response);
                navigate('/');
            })
            .catch( error => console.log('nope:(', error))
        //redirect user to home page
        

    }

    return (
        <React.Fragment>
            <div className="form--centered">
                <h2>Sign In</h2>               
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={credentials.emailAddress}
                        onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={credentials.password}
                        onChange={handleChange} />
                    <button className="button" type="submit">Sign In</button>
                    <Link to='/' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to='/sign-up'>sign up</Link>!</p>               
            </div>
        </React.Fragment>
    );
};

export default UserSignIn;