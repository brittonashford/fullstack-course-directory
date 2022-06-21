import React, { useContext, useState, useEffect } from 'react';
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

    //for validation
    let emailNotBlank = false;
    let passwordNotBlank = false;
    let allowContinue = false

    useEffect( () => {
        emailFieldLabel = document.getElementById('emailAddressLabel');
        passwordFieldLabel = document.getElementById('passwordLabel');
        emailField = document.getElementById('emailAddress');
        passwordField = document.getElementById('password');
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

        e.preventDefault(); 

        //reset each time, innocent until proven guilty
        setErrors([]);
        passwordNotBlank = false;
        emailNotBlank = false;
        allowContinue = false;

        //check that credentials are not blank
        if (credentials.emailAddress.length === 0){
            setErrors(errors => [...errors, 'email address is required.'])       
            notValid(emailField, emailFieldLabel);
            emailNotBlank = false;
        } else {
            valid(emailField, emailFieldLabel);
            emailNotBlank = true;
        }
        
        if (credentials.password.length === 0){
            console.log('pw hit');
            setErrors(errors => [...errors, 'password is required.'])          
            notValid(passwordField, passwordFieldLabel);
            passwordNotBlank = false;
        } else {
            valid(passwordField, passwordFieldLabel);
            passwordNotBlank = true;
        }

        if(emailNotBlank && passwordNotBlank){
            signIn(credentials.emailAddress, credentials.password)
                .then( (user) => {
                    if (!user) {
                        setErrors(errors => [...errors, 'Sign in unsuccessful. Invalid credentials.']);
                        allowContinue = false;
                    } else {
                        allowContinue = true;                       
                    }
                })
                .then( () => {
                    if(allowContinue){
                        navigate('/');
                    }             
                })
                .catch( error => {
                    console.log('error caught: ', error);
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
                <h2 className="page--title">Sign In</h2>  
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
                    <Link to='/' className="button button-secondary cancel--button" >Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to='/sign-up' className="sign--up--link">sign up</Link>!</p>               
            </div>
        </React.Fragment>
    );
};

export default UserSignIn;