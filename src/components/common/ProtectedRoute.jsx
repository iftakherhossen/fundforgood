import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const userData = {
        token: localStorage.getItem("token"),
        user_id: localStorage.getItem("user_id"),
    }
    const authenticated = userData ? true : false;
    
    return authenticated ? <Component {...rest} /> : <Navigate to="/get-started" replace />;
};

export default ProtectedRoute;