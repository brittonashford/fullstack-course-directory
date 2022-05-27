import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function UserSignIn() {

    return (
        <React.Fragment>
            <div className="form--centered">
                <h2>Sign In</h2>               
                <form>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value=""/>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value=""/>
                    <button className="button" type="submit">Sign In</button><Link to='/' className="button button-secondary" >Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to='/sign-up'>sign up</Link>!</p>               
            </div>
        </React.Fragment>
    );
};

export default UserSignIn;