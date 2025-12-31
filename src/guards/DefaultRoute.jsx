import { Navigate } from "react-router-dom";

const DefaultRoute = () =>{
    const authData = localStorage.getItem("authData");
    const role = authData?.role

    if(!authData){
        return <Navigate to='/login' replace/>
    }
    if(role === "admin"){
        return <Navigate to='admin/dashboard' replace />
    }
    if(role === "user"){
        return <Navigate to='user/dashboard' replace />
    }
}

export default DefaultRoute;