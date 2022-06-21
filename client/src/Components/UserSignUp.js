import React, { useContext, useState, useEffect } from 'react';
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

    // const context = useContext(AppContext);
    const [ errors, setErrors ] = useState([]);

    //react router's useNavigate can handle things that history.push, etc. used to due in older approaches
    //https://www.geeksforgeeks.org/reactjs-usenavigate-hook/
    const navigate = useNavigate();

        //for validation
        let allowContinue = false;
        let firstNameNotBlank = false;
        let lastNameNotBlank = false;
        let emailNotBlank = false;
        let passwordNotBlank = false;
 
        useEffect( () => {
            firstNameFieldLabel = document.getElementById('firstNameLabel');
            firstNameField = document.getElementById('firstName');
            lastNameFieldLabel = document.getElementById('lastNameLabel');
            lastNameField = document.getElementById('lastName');     
            emailFieldLabel = document.getElementById('emailAddressLabel');
            emailField = document.getElementById('emailAddress');
            passwordFieldLabel = document.getElementById('passwordLabel');
            passwordField = document.getElementById('password');
        }, [])
    
        let firstNameFieldLabel = document.getElementById('firstNameLabel');
        let firstNameField = document.getElementById('firstName');
        let lastNameFieldLabel = document.getElementById('lastNameLabel');
        let lastNameField = document.getElementById('lastName');     
        let emailFieldLabel = document.getElementById('emailAddressLabel');
        let emailField = document.getElementById('emailAddress');
        let passwordFieldLabel = document.getElementById('passwordLabel');
        let passwordField = document.getElementById('password');
    
    //event handlers
    const handleChange = (e) => {
        //.persist() prevents event properties from getting reset.
        //https://reactjs.org/docs/legacy-event-pooling.html
        e.persist();
        setNewUser(newUser => ({...newUser, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleSubmit hit');
        console.log(newUser);

        setErrors([]);
        allowContinue = false;
        firstNameNotBlank = false;
        lastNameNotBlank = false;
        emailNotBlank = false;
        passwordNotBlank = false;

        //check that all inputs have values
        if (firstNameField.value === ''){
            setErrors(errors => [...errors, 'First Name is required.'])       
            notValid(firstNameField, firstNameFieldLabel);
            firstNameNotBlank = false;
        } else {
            valid(firstNameField, firstNameFieldLabel);
            firstNameNotBlank = true;
        }

        if (lastNameField.value === ''){
            setErrors(errors => [...errors, 'Last Name is required.'])       
            notValid(lastNameField, lastNameFieldLabel);
            lastNameNotBlank = false;
        } else {
            valid(lastNameField, lastNameFieldLabel);
            lastNameNotBlank = true;
        }

        if (emailField.value === ''){
            setErrors(errors => [...errors, 'Email Address is required.'])       
            notValid(emailField, emailFieldLabel);
            emailNotBlank = false;
        } else {
            valid(emailField, emailFieldLabel);
            emailNotBlank = true;
        }

        if (passwordField.value === ''){
            setErrors(errors => [...errors, 'Password is required.'])       
            notValid(passwordField, passwordFieldLabel);
            passwordNotBlank = false;
        } else {
            valid(passwordField, passwordFieldLabel);
            passwordNotBlank = true;
        }

        if(firstNameNotBlank && lastNameNotBlank && emailNotBlank && passwordNotBlank){
            data.createUser(newUser)
                //no news is good news (201 status)
                //if something is returned it will be an error
                .then( errors => {
                    if (errors.length) {
                        console.log('error(s) occurred in createNewUser()');
                        setErrors(errors);
                        allowContinue = false;
                    } else { 
                        //no errors and no response means success
                        console.log('createNewUser() was successful.'); 
                        allowContinue = true; 
                        signIn(newUser.emailAddress, newUser.password)                
                    }                   
                })  
                .then( () => {
                    if(allowContinue){
                        navigate('/');
                    } 
                })          
                .catch( error => {
                    console.log('error caught: ', error);
                    navigate('/error');
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
    

    return(
        <React.Fragment>
            <div className="form--centered">
                <h2 className="page--title">Sign Up</h2>     
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
                    <label id="firstNameLabel" htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        value={newUser.firstName} 
                        onChange={handleChange} />
                    <label id="lastNameLabel" htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        value={newUser.lastName} 
                        onChange={handleChange} />
                    <label id="emailAddressLabel" htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        value={newUser.emailAddress} 
                        onChange={handleChange} />
                    <label id="passwordLabel" htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={newUser.password} 
                        onChange={handleChange} />
                    <button className="button" type="submit">Sign Up</button>
                    <Link to='/' className="button button-secondary cancel--button">Cancel</Link>
                </form>
                <p>Already have a user account? Click here to <Link to='/sign-in'>sign in</Link>!</p>
            </div>
        </React.Fragment>
    );
};

export default UserSignUp;