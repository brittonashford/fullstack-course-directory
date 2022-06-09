import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context';

function UserSignUp() {
    const { data, signIn } = useContext(AppContext);
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });

    const context = useContext(AppContext);
    const [ errors, setErrors ] = useState([]);

    //react router's useNavigate can handle things that history.push, etc. used to due in older approaches
    //https://www.geeksforgeeks.org/reactjs-usenavigate-hook/
    const navigate = useNavigate();

    //event handlers
    const handleChange = (e) => {
        //.persist() prevents event properties from getting reset.
        //https://reactjs.org/docs/legacy-event-pooling.html
        e.persist();
        setNewUser(user => ({...newUser, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit hit');
        console.log(newUser);
        data.createUser(newUser)
            //no news is good news (201 status)
            //if something is returned it will be an error
            .then( errors => {
                if (errors.length) {
                    console.log('error(s) occurred in createNewUser()');
                    setErrors(errors);
                } else { 
                    //no errors and no response means success
                    console.log('createNewUser() was successful.');  
                    context.signIn(newUser.emailAddress, newUser.password)
                        .then(() => navigate('/'));                         
                }                   
            })
            //TODO: add error handling
            .catch( error => {throw new Error(error) });
    }

    return(
        <React.Fragment>
            <div className="form--centered">
                <h2>Sign Up</h2>               
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        value={newUser.firstName} 
                        onChange={handleChange} />
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        value={newUser.lastName} 
                        onChange={handleChange} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={newUser.emailAddress} 
                        onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={newUser.password} 
                        onChange={handleChange} />
                    <button className="button" type="submit">Sign Up</button>
                    <Link to='/' className="button button-secondary">Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to='/sign-in'>sign in</Link>!</p>
            </div>
        </React.Fragment>
    );
};

export default UserSignUp;