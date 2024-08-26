import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("token");

    const authenticated = token ? true : false;
    
    return authenticated ? <Component {...rest} /> : <Navigate to="/get-started" replace />;
};

export default ProtectedRoute;