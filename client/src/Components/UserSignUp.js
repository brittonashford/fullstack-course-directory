import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context';

function UserSignUp() {
    const { data, signIn } = useContext(AppContext);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });

    //react router's useNavigate can handle things that history.push, etc. used to due in older approaches
    //https://www.geeksforgeeks.org/reactjs-usenavigate-hook/


    //event handlers
    const handleChange = (e) => {
        //.persist() prevents event properties from getting reset.
        //https://reactjs.org/docs/legacy-event-pooling.html
        e.persist();
        console.log(e.target.name, e.target.value);
        setUser(user => ({...user, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        console.log('handleSubmit hit');
        console.log(user);
        data.createUser(user)
            //no news is good news (201 status)
            .then( response => {
                if (!response) {
                    console.log('createUser request successful! Check the database.');

                    //sign user in and return to home screen if successful
                    signIn(user.emailAddress, user.password);
                } else {
                    console.log(`createUser request was not successful:(.`, response );
                }
            })
            .catch( error => console.log(error) );
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
                        value={user.firstName} 
                        onChange={handleChange} />
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        value={user.lastName} 
                        onChange={handleChange} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={user.emailAddress} 
                        onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={user.password} 
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