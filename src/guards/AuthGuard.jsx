import { Navigate } from "react-router-dom";

const AuthGuard = ({
    children,
    requiredAuth = true,
    allowedRoles = [],
    redirect = "/login"
}) => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const isAuthenticated = !!authData;
    const userRole = authData?.role;

    if(!requiredAuth && isAuthenticated){
        return <Navigate to='/' replace />
    }

    if(requiredAuth && !isAuthenticated){
        return <Navigate to={redirect} replace />
    }

    if(allowedRoles.length > 0 && !allowedRoles.includes(userRole)){
        return <Navigate to='/' replace />
    }
    return children
}

export default AuthGuard;