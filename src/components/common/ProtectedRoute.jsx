import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const authenticated = localStorage.getItem("token");
    
    return authenticated ? <Component {...rest} /> : <Navigate to="/get-started" replace />;
};

export default ProtectedRoute;
