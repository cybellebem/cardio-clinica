import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"

import "./Forbidden.css"

export default function Forbidden(){
    const [collapsed,setCollapsed]=useState(false)

    function toggleSidebar(){
        setCollapsed(!collapsed)
    }

    return(
        <div
            className={
                collapsed ? "forbidden-container collapsed" : "forbidden-container"
            }
        >
            {/* SIDEBAR */}
            <Sidebar/>

            {/* ÁREA DIREITA */}
            <div className="content-area">
                {/* HEADER */}
                <Header toggleSidebar={toggleSidebar} collapsed={collapsed}/>
                {/* CONTEÚDO */}
                <main className="main-content error">
                    <h1>Acesso Negado</h1>
                    <h2>Você não possui permissão para acessar este recurso</h2>
                    <img className="forbidden-img" src="/src/assets/forbidden.jpg" />
                </main>
            </div>
        </div>
    )
}