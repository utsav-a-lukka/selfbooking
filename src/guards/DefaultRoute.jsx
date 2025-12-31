import { Navigate } from "react-router-dom";

const DefaultRoute = () =>{
    const authData = JSON.parse(localStorage.getItem("authData"));
    const role = authData?.role
    if(!authData){
        return <Navigate to='/login' replace/>
    }
    if(role === "ADMIN"){
        return <Navigate to='admin/dashboard' replace />
    }
    if(role === "USER"){
        return <Navigate to='user/dashboard' replace />
    }
}

export default DefaultRoute;