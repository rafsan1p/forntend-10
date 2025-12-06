import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if(user && user.emailVerified){
        return children;
    }

    if(user && !user.emailVerified){
        toast.error('Please verify your email to access this page!');
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>;
};

export default PrivateRoute;