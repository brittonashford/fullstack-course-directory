import React, { useContext } from 'react';
import { AppContext } from '../Context';
import { useNavigate } from 'react-router-dom';

function UserSignOut() {
    const { signOut } = useContext(AppContext);
    const navigate = useNavigate();
    signOut();
    navigate('/');

    return(
        <React.Fragment>
            {/* sign user out and redirect to course catalog */}
        </React.Fragment>
    );
};

export default UserSignOut;