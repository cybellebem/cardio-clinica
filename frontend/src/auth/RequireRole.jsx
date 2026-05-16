import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function RequireRole({funcao,children}){
    const {pessoa,loading}=useAuth()

    if(loading) return null;

    if(!pessoa||pessoa.funcao!==funcao) return <Navigate to="/forbidden" replace />;

    return children
}