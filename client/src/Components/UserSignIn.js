import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context';

function UserSignIn() {



    //store credentials in state
    const [ credentials, setCredentials ] = useState({
        emailAddress: '',
        password: ''
    });

    const [ errors, setErrors ] = useState([]);
    const { signIn } = useContext(AppContext);

    //nav
    const navigate = useNavigate();

    let allowSubmit = false;
    let allowContinue = false
    // let emailField;
    // let passwordField;
    // let emailFieldLabel;
    // let passwordFieldLabel;

    useEffect( () => {
        emailFieldLabel = document.getElementById('emailAddressLabel');
        passwordFieldLabel = document.getElementById('passwordLabel');
        emailField = document.getElementById('emailAddress');
        passwordField = document.getElementById('password');
    
        console.log('emailField: ', emailField)
        console.log('passwordField: ', passwordField)
    }, [])

    let emailFieldLabel = document.getElementById('emailAddressLabel');
    let passwordFieldLabel = document.getElementById('passwordLabel');
    let emailField = document.getElementById('emailAddress');
    let passwordField = document.getElementById('password');




    //event handlers
    const handleChange = (e) => {
        e.preventDefault();
        e.persist()
        setCredentials( credentials => ({...credentials, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        debugger;
        
        console.log('UserSignIn.handleSubmit() hit', credentials);
        e.preventDefault(); 
        setErrors([]);
        console.log('emailField: ', emailField)
        console.log('passwordField: ', passwordField)

        //check that credentials are not blank
        if (credentials.emailAddress.length === 0){
            setErrors(errors => [...errors, 'email address is required.'])
            allowSubmit = false;
            notValid(emailField, emailFieldLabel);
        } else {
            valid(emailField, emailFieldLabel);
        }

        
        if (credentials.password.length === 0){
            console.log('pw hit');
            setErrors(errors => [...errors, 'password is required.'])
            allowSubmit = false;
            notValid(passwordField, passwordFieldLabel);
        } else {
            valid(passwordField, passwordFieldLabel);
            allowSubmit = true;
        }

        if(allowSubmit){
            signIn(credentials.emailAddress, credentials.password)
                .then( (user) => {
                    if (user === null) {
                        console.log('Sign in unsuccessful.');
                        setErrors(errors => [...errors, 'Sign in unsuccessful.']);
                        allowContinue = false;
                    } else {
                        console.log('Sign in successful.');
                        allowContinue = true;                       
                    }
                })
            // .then( () => {
            //     navigate('/');

            //     // if(nextStop === 'Courses'){
            //     //     debugger;
            //         // navigate('/');
            // //     } else if (nextStop === 'CreateCourse'){
            // //         debugger;
            // //         navigate('/courses/create');
            // //     }

            // })
                .catch( error => {
                    console.log('an error occurred: ', error);
                    navigate('error');
                });  
            }
    }

    function notValid(element, elementLabel) {
            element.classList.add('not-valid');
            elementLabel.classList.add('not-valid-label');
    }

    function valid(element, elementLabel) {
            element.classList.remove('not-valid');
            elementLabel.classList.remove('not-valid-label');
    }

    return (
        <React.Fragment>
            <div className="form--centered">
                <h2>Sign In</h2>  
                {errors.length ? (
                    <React.Fragment>
                        <div className="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                                {errors.map( (error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment></React.Fragment>
                )}                        
                <form onSubmit={handleSubmit}>
                    <label id="emailAddressLabel" htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={credentials.emailAddress}
                        onChange={handleChange} />
                    <label id="passwordLabel" htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={credentials.password}
                        onChange={handleChange} />
                    <button className="button" type="submit">Sign In</button>
                    <Link to='/' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to='/sign-up' className="sign--up--link">sign up</Link>!</p>               
            </div>
        </React.Fragment>
    );
};

export default UserSignIn;