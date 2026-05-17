import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { http } from "../api/http";

const AuthContext=createContext(null)

export function AuthProvider({children}){
    const [token,setToken]=useState(null)
    const [pessoa,setPessoa]=useState(null)
    const [loading,setLoading]=useState(true)
    
    function limpar(){
        localStorage.removeItem("pessoa")
        localStorage.removeItem("token")
        setPessoa(null)
        setToken(null)
    }

    useEffect(()=>{
        const t=localStorage.getItem("token")
        const p=localStorage.getItem("pessoa")

        setToken(t||null)

        try{
            setPessoa(p ? JSON.parse(p) : null)
        }catch(error){
            limpar()
        }
        
        setLoading(false)
    },[])

    async function login({cpf,senha}){
        try{
            const {data}=await http.post("/auth/login",{cpf,senha})

            if(!data?.token) throw new Error("Token ausente na resposta");

            localStorage.setItem("token",data.token)
            setToken(data.token)

            if(data?.pessoa){
                localStorage.setItem("pessoa",JSON.stringify(data.pessoa))
                setPessoa(data.pessoa)
            }else{
                localStorage.removeItem("pessoa")
                setPessoa(null)
            }
        }catch(error){
            console.error("Erro no login",error)
            throw error
        }
    }

    function logout(){
        limpar()
    }

    const value=useMemo(
        ()=>({token,pessoa,login,logout,loading}),
        [token,pessoa,loading]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}