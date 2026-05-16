import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({children}){
    const {token,loading}=useAuth()
    const location=useLocation()

    // evitar piscar enquanto restaura sessão
    if(loading) return(
        <div style={{padding:24,textAlign:"center"}}>
            <p>Verificando sessão...</p>
        </div>
    );

    // sem token, manda para login e guarda destino desejado
    if(!token) return <Navigate to="/login" state={{from:location}} replace/>;

    // com token válido
    return token ? children : null
}